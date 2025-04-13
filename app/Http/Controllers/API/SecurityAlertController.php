<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\SecurityAlert;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SecurityAlertController extends Controller
{
    /**
     * Display a listing of the security alerts.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $query = SecurityAlert::query();

        // Apply filters
        if ($request->has('severity')) {
            $query->where('severity', $request->severity);
        }

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        if ($request->has('assigned_to')) {
            $query->where('assigned_to', $request->assigned_to);
        }

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        $alerts = $query->latest()->paginate(10);

        return response()->json($alerts);
    }

    /**
     * Store a newly created security alert.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'severity' => 'required|in:low,medium,high,critical',
            'reported_by' => 'nullable|string|max:255',
            'assigned_to' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $alert = SecurityAlert::create([
            'title' => $request->title,
            'description' => $request->description,
            'severity' => $request->severity,
            'status' => 'open',
            'reported_by' => $request->reported_by,
            'assigned_to' => $request->assigned_to,
        ]);

        return response()->json([
            'message' => 'Security alert created successfully',
            'alert' => $alert
        ], 201);
    }

    /**
     * Display the specified security alert.
     *
     * @param SecurityAlert $alert
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $alert = SecurityAlert::findOrFail($id);

        return response()->json([
            'status' => 'success',
            'data' => $alert
        ]);
    }


    /**
     * Update the specified security alert.
     *
     * @param Request $request
     * @param SecurityAlert $alert
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $alert = SecurityAlert::findOrFail($id);
        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'severity' => 'sometimes|required|in:low,medium,high,critical',
            'status' => 'sometimes|required|in:open,in_progress,resolved,closed',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // If status is changing to resolved, set resolved_at timestamp
        if ($request->has('status') && $request->status === 'resolved' && $alert->status !== 'resolved') {
            $alert->resolved_at = now();
        }

        $alert->update($request->all());

        return response()->json([
            'message' => 'Security alert updated successfully',
            'alert' => $alert->fresh()
        ]);
    }

    /**
     * Delete the specified security alert.
     *
     * @param SecurityAlert $alert
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)  // Change from SecurityAlert $alert
    {
        $alert = SecurityAlert::findOrFail($id);
        $alert->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Security alert deleted successfully'
        ]);
    }

}
