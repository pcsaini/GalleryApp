<?php

namespace App\Http\Controllers;


use App\File;
use App\Gallery;
use Illuminate\Support\Facades\Storage;
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
        $galleryObj = new Gallery;
        return $galleryObj->getSingleGallery($id);
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

        $fileObj =  new File();


        return $fileObj->uploadThumbAndMailImage($request);
    }

    public function deleteSingleImage(Request $request){
        $imageId = $request->input('id');
        $galleryId = $request->input('galleryId');



        try{
            DB::beginTransaction();

            $file = File::findOrFail($imageId);
            $file->delete();

            DB::table('gallery_images')->where('file_id',$file->id)->delete();


            Storage::delete([
                'public/gallery_'.$galleryId.'/main/'.$file->file_name,
                'public/gallery_'.$galleryId.'/thumb/'.$file->file_name,
                'public/gallery_'.$galleryId.'/medium/'.$file->file_name
            ]);

            DB::commit();

        }catch (\PDOException $e){
            DB::rollBack();
        }
        return response($this->show($galleryId),200);
    }
}
