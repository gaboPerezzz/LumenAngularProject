<?php

namespace App\Http\Controllers\Notes;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Notes;
use Tymon\JWTAuth\Facades\JWTAuth;

class NotesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

// ------------------------------ GET ALL ----------------------------------------
  public function index()
{
    // Use JWTAuth to authenticate the user
    $user = JWTAuth::parseToken()->authenticate();
  
    $notes = Notes::all();

    return response()->json([
        'status' => 'success',
        'status_code' => 200,
        'data' => $notes
    ], 200);

   
}

// ------------------------------ POST----------------------------------------
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $user = auth()->user();
        error_log($request);
        $notes = new Notes();
        $notes->title = $request->title;
        $notes->description = $request->description;
        $notes->color = $request->color; 
        $notes->user_id = $user->id; // Assuming you want to associate the note with the authenticated user
        $notes->save();
        if (!$notes) {
            return response()->json([
                'status' => 'error',
                'status_code' => 500,
                'message' => 'Failed to create note'
            ], 500);
        }
        if (!$user) {
            return response()->json([
                'status' => 'error',
                'status_code' => 401,
                'message' => 'Unauthorized: Invalid or missing token.',
            ], 401);
        }
        
        return response()->json([   
            'status' => 'success',
            'status_code' => 201,
            'data' => $notes
        ], 201);
    }

    
    // ------------------------------ GET ALL BY USER_ID ---------------------------------
    /**
     * Display the specified resource.
     *
     * @param  int  $user_id
     * @return \Illuminate\Http\Response
     */
    public function getUserNotes()
    {
    $user = auth()->user();

    if (!$user) {
        return response()->json([
            'status' => 'error',
            'status_code' => 401,
            'message' => 'Unauthorized: Invalid or missing token.',
        ], 401);
    }

    $notes = Notes::where('user_id', $user->id)->get();

    return response()->json([
        'status' => 'success',
        'status_code' => 200,
        'data' => $notes
    ], 200);
    }

    // ------------------------------ UPDATE ----------------------------------------
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $user = auth()->user();
        $notes = Notes::find($id);

        if (!$notes) {
            return response()->json([
                'status' => 'error',
                'status_code' => 404,
                'message' => 'Note not found'
            ], 404);
        }

        if($notes->user_id !== $user->id) {
            return response()->json([
                'status' => 'error',
                'status_code' => 403,
                'message' => 'Unauthorized to update this note'
            ], 403);
        }

        $notes->title = $request->title;
        $notes->description = $request->description;
        $notes->save();
        return response()->json([   
            'status' => 'success',
            'status_code' => 201,
            'data' => $notes
        ], 201);
    }

    // ------------------------------ DELETE ----------------------------------------
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        {
        $user = auth()->user();
        $notes = Notes::find($id);
             if (!$notes) {
            return response()->json([
                'status' => 'error',
                'status_code' => 404,
                'message' => 'Note not found'
            ], 404);
        }

        if($notes->user_id !== $user->id) {
            return response()->json([
                'status' => 'error',
                'status_code' => 403,
                'message' => 'Unauthorized to delete this note'
            ], 403);
        }
           $notes->delete();
           return response()->json([   
            'status' => 'success',
            'status_code' => 201,
            'data' => $notes
        ], 201);
    }
}
};