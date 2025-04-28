<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\OrderController;
use App\Http\Controllers\API\ProductController;
use App\Http\Controllers\API\BudgetController;
use App\Http\Controllers\API\EmployeeController;
use App\Http\Controllers\API\SecurityAlertController;
use App\Http\Controllers\API\DashboardController;
use App\Http\Controllers\API\ReportController;

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    // Auth routes
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/profile', [AuthController::class, 'profile']);

    // Dashboard Module (System Overview)
    Route::get('/dashboard', [DashboardController::class, 'getSystemOverview']);

    // Sales Module (Orders)
    Route::apiResource('orders', OrderController::class);

    // Inventory Module (Products)
    Route::apiResource('products', ProductController::class);

    // Finance Module (Budgets)
    Route::apiResource('budgets', BudgetController::class);

    // HR Module (Employees)
    Route::apiResource('employees', EmployeeController::class);

    // IT Module (Security Alerts)
    Route::apiResource('security-alerts', SecurityAlertController::class);

    Route::get('/reports/products', [ReportController::class, 'getProductReport']);
});
