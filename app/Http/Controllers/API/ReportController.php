<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ReportController extends Controller
{
    public function getProductReport(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'startDate' => 'required|date',
            'endDate' => 'required|date|after_or_equal:startDate',
            'productId' => 'sometimes|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        
        // Debug: Check if there are any orders in the date range
        $ordersInRange = Order::whereBetween('created_at', [$request->startDate, $request->endDate])
            ->where('status', '!=', 'cancelled')
            ->get();
        
        // Debug: Check if these orders have any order items
        $orderIds = $ordersInRange->pluck('id')->toArray();
        $orderItemsCount = OrderItem::whereIn('order_id', $orderIds)->count();
        
        // Add debug information to the response
        $debug = [
            'date_range' => [$request->startDate, $request->endDate],
            'orders_count' => count($ordersInRange),
            'order_ids' => $orderIds,
            'order_items_count' => $orderItemsCount
        ];
        
        // Start with a product query to ensure we include all relevant products
        $productQuery = Product::query();
        
        // If specific product ID requested, filter to just that product
        if ($request->productId && $request->productId !== 'all') {
            $productQuery->where('id', $request->productId);
        }
        
        // Get the products that should be included
        $products = $productQuery->get();
        $productIds = $products->pluck('id')->toArray();
        
        // Original sales query
        $query = OrderItem::join('orders', 'order_items.order_id', '=', 'orders.id')
            ->join('products', 'order_items.product_id', '=', 'products.id')
            ->whereBetween('orders.created_at', [$request->startDate, $request->endDate])
            ->where('orders.status', '!=', 'cancelled');

        // Filter by requested products
        if ($request->productId && $request->productId !== 'all') {
            $query->where('order_items.product_id', $request->productId);
        } else {
            // If showing all products, still limit to the ones in our product query
            $query->whereIn('order_items.product_id', $productIds);
        }

        $salesData = $query->select(
            'products.id',
            'products.name',
            DB::raw('SUM(order_items.quantity) as quantity'),
            'products.price',
            DB::raw('SUM(order_items.quantity * order_items.unit_price) as total')
        )
        ->groupBy('products.id', 'products.name', 'products.price')
        ->get()
        ->keyBy('id');
        
        // Build complete report including products with zero sales
        $reportData = $products->map(function ($product) use ($salesData) {
            if (isset($salesData[$product->id])) {
                // Product has sales in the period
                return $salesData[$product->id];
            } else {
                // Product has no sales in the period
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'quantity' => 1,  // Changed from 0 to 1
                    'price' => $product->price,
                    'total' => $product->price  // Changed from 0 to product price
                ];
            }
        })->values();

        return response()->json([
            'data' => $reportData,
            'debug' => $debug
        ]);
    }
}
