<?php

namespace App\Http\Controllers\API;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Cookie;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'role' => 'required|string', // Added role validation
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'role' => $request->role,
            'password' => Hash::make($request->password),
        ]);

        // Assign default role (e.g., 'user')
        $defaultRole = Role::where('name', 'user')->first();
        if ($defaultRole) {
            $user->roles()->attach($defaultRole);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        // Create user data for cookie
        $userData = json_encode([
            'id' => $user->id,
            'role' => $user->role
        ]);

        // Create response with cookie
        $response = response()->json([
            'user' => $user,
            'token' => $token,
            'token_type' => 'Bearer',
        ], 201);

        // Set cookie with user data (expires in 24 hours)
        $response->cookie('user_data', $userData, 60 * 24, null, null, false, false);

        return $response;
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'message' => 'Invalid login credentials',
            ], 401);
        }

        $user = User::where('email', $request->email)->firstOrFail();

        if (!$user->is_active) {
            return response()->json([
                'message' => 'Your account is inactive. Please contact an administrator.',
            ], 403);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        // Create user data for cookie
        $userData = json_encode([
            'id' => $user->id,
            'role' => $user->role
        ]);

        // Create response with cookie
        $response = response()->json([
            'user' => $user->load('roles'),
            'token' => $token,
            'token_type' => 'Bearer',
        ]);

        // Set cookie with user data (expires in 24 hours)
        $response->cookie('user_data', $userData, 60 * 24, null, null, false, false);

        return $response;
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        // Create response
        $response = response()->json([
            'message' => 'Logged out successfully',
        ]);

        // Clear the user_data cookie
        $response->cookie('user_data', '', -1);

        return $response;
    }

    public function profile(Request $request)
    {
        return response()->json($request->user()->load('roles'));
    }
}
