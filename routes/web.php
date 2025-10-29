<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Str;

Route::get('/call/{roomId}', function (Request $request, string $roomId) {
    $user = $request->user();

    return Inertia::render('CallPage', [
        'roomId' => $roomId,
        'userId' => $user ? (string) $user->id : (string) Str::uuid(),
        'userName' => $user ? (string) $user->name : 'Guest-' . Str::random(4),
        'appId' => (int) env('ZEGO_APP_ID'),
        'serverSecret' => env('ZEGO_SERVER_SECRET'),
    ]);
})->name('call.join');
