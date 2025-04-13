<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with(['user', 'items.product'])->latest()->paginate(10);
        return response()->json($orders);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'notes' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            DB::beginTransaction();

            $totalAmount = 0;
            $orderItems = [];

            // Calculate total amount and prepare order items
            foreach ($request->items as $item) {
                $product = Product::findOrFail($item['product_id']);

                if ($product->quantity < $item['quantity']) {
                    throw new \Exception("Insufficient quantity for product: {$product->name}");
                }

                $subtotal = $product->price * $item['quantity'];
                $totalAmount += $subtotal;

                $orderItems[] = [
                    'product_id' => $product->id,
                    'quantity' => $item['quantity'],
                    'unit_price' => $product->price,
                    'subtotal' => $subtotal
                ];

                // Reduce product quantity
                $product->quantity -= $item['quantity'];
                $product->save();
            }

            // Create order
            $order = Order::create([
                'user_id' => auth()->id(),
                'order_number' => 'ORD-' . strtoupper(Str::random(8)),
                'total_amount' => $totalAmount,
                'status' => 'pending',
                'notes' => $request->notes,
            ]);

            // Create order items
            foreach ($orderItems as $item) {
                $order->items()->create($item);
            }

            DB::commit();

            return response()->json([
                'message' => 'Order created successfully',
                'order' => $order->load('items.product')
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => $e->getMessage()], 400);
        }
    }

    public function show(Order $order)
    {
        return response()->json($order->load(['user', 'items.product']));
    }

    public function update(Request $request, Order $order)
    {
        try {
            DB::beginTransaction();
    
            // Validate incoming request
            $validator = Validator::make($request->all(), [
                'items' => 'required|array|min:1',
                'items.*.product_id' => 'required|exists:products,id',
                'items.*.quantity' => 'required|integer|min:1',
                'notes' => 'nullable|string',
            ]);
    
            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }
    
            // If status is changing to cancelled, restore product quantities
            if ($request->has('status') && $request->status === 'cancelled' && $order->status !== 'cancelled') {
                foreach ($order->items as $item) {
                    $product = $item->product;
                    $product->quantity += $item->quantity;
                    $product->save();
                }
            }
    
            // First, restore all quantities from existing order items
            foreach ($order->items as $item) {
                $product = Product::find($item->product_id);
                if ($product) {
                    $product->quantity += $item->quantity;
                    $product->save();
                }
            }
    
            // Delete all existing order items
            $order->items()->delete();
    
            $totalAmount = 0;
            $newOrderItems = [];
    
            // Process new items
            foreach ($request->items as $itemData) {
                $product = Product::findOrFail($itemData['product_id']);
    
                // Check if there's enough quantity
                if ($product->quantity < $itemData['quantity']) {
                    throw new \Exception("Insufficient quantity for product: {$product->name}");
                }
    
                $subtotal = $product->price * $itemData['quantity'];
                $totalAmount += $subtotal;
    
                // Create new order item
                $newOrderItems[] = [
                    'order_id' => $order->id,
                    'product_id' => $product->id,
                    'quantity' => $itemData['quantity'],
                    'unit_price' => $product->price,
                    'subtotal' => $subtotal
                ];
    
                // Update product quantity
                $product->quantity -= $itemData['quantity'];
                $product->save();
            }
    
            // Update order
            $order->update([
                'total_amount' => $totalAmount,
                'notes' => $request->notes ?? $order->notes,
            ]);
    
            // Insert new order items
            OrderItem::insert($newOrderItems);
    
            DB::commit();
    
            return response()->json([
                'message' => 'Order updated successfully',
                'order' => $order->fresh()->load('items.product')
            ]);
    
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => $e->getMessage()], 400);
        }
    }
    



    public function destroy(Order $order)
    {
        try {
            DB::beginTransaction();

            // If order is not cancelled, restore product quantities
            if ($order->status !== 'cancelled') {
                foreach ($order->items as $item) {
                    $product = $item->product;
                    $product->quantity += $item->quantity;
                    $product->save();
                }
            }

            $order->delete();

            DB::commit();

            return response()->json(['message' => 'Order deleted successfully']);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => $e->getMessage()], 400);
        }
    }
}
