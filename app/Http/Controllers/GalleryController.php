<?php

namespace App\Http\Controllers;

use App\File;
use App\Gallery;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class GalleryController extends Controller
{
    //
    public function index(){
        return Gallery::where('user_id',1)->with('user')->get();
    }

    public function show($id){
        return Gallery::with('user')->where('id',$id)->first();
    }

    public function store(Request $request){
        $validator = Validator::make($request->all(),[
           'name'=>'required|min:3',
        ]);

        if ($validator->fails()){
            return response($validator->errors()->all(),422);
        }
        $gallery = Gallery::create([
            'name' => $request->input('name'),
            'user_id'=> 1,
        ]);

        return response($gallery, 201);
    }

    public function uploadImage(Request $request){
        $galleryId = $request->input('gallery_id');

        if (!$request->hasFile('file')){
            return response('No File Sent',400);
        }

        if(!$request->file('file')->isValid()){
            return response('File is not Valid',400);
        }

        $validator = Validator::make($request->all(),[
            'gallery_id' => 'required|integer',
            'file' => 'required|mimes:jpeg,jpg,png|max:10000',
        ]);

        if ($validator->fails()){
            return response('There are an Error in Form', 400);
        }

        $mimeType = $request->file('file')->getClientMimeType();
        $fileSize = $request->file('file')->getClientSize();
        $fileName = 'gallery_'.$galleryId.'_'.uniqid().'.'.$request->file('file')->getClientOriginalExtension();


        if($request->file('file')->move(public_path().'/uploads/', $fileName)){
            $file = File::create([
                'file_name' => $fileName,
                'mime_type' => $mimeType,
                'file_size' => $fileSize,
                'file_path' => 'uploads/'.$fileName,
                'status' => 0
            ]);

            DB::table('gallery_images')->insert([
                'gallery_id'=>$galleryId,
                'file_id' => $file->id
            ]);

            $fileImg = File::find($file->id);
            $fileImg->status = 1;
            $fileImg->save();

        }

        return response($file , 201);
    }
}
