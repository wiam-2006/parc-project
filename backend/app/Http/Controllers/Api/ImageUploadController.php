<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ImageUploadController extends Controller
{
    public function upload(Request $request)
    {
        $request->validate([
            'image' => 'required|image'
        ]);

        $path = $request->file('image')->store('images', 'public');

        return response()->json([
            'image' => $path
        ]);
    }
}