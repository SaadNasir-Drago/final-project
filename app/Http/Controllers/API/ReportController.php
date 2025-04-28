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
        
        // Original query
        $query = OrderItem::join('orders', 'order_items.order_id', '=', 'orders.id')
            ->join('products', 'order_items.product_id', '=', 'products.id')
            ->whereBetween('orders.created_at', [$request->startDate, $request->endDate])
            ->where('orders.status', '!=', 'cancelled');
    
        // Filter by product if specified
        if ($request->productId && $request->productId !== 'all') {
            $query->where('order_items.product_id', $request->productId);
        }
    
        $reportData = $query->select(
            'products.id',
            'products.name',
            DB::raw('SUM(order_items.quantity) as quantity'),
            'products.price',
            DB::raw('SUM(order_items.quantity * order_items.unit_price) as total')
        )
        ->groupBy('products.id', 'products.name', 'products.price')
        ->orderBy('products.name')
        ->get();
    
        return response()->json([
            'data' => $reportData,
            'debug' => $debug
        ]);
    }
    
    
    
}
