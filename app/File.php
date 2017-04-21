<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\Storage;

class File extends Model
{
    //
    protected $fillable = ['file_name','mime_type','file_size','file_path','status'];

    public function uploadThumbAndMailImage(Request $request){
        $galleryId = $request->input('gallery_id');
        $file = $request->file('file');
        $extension = $request->file('file')->guessExtension();
        $fileName = uniqid().'.'.$extension;
        $mimeType = $request->file('file')->getClientMimeType();
        $fileSize = $request->file('file')->getClientSize();
        $image = Image::make($file);
        //$destinationPath = public_path('/uploads/thumb');

        $imageThumb = Image::make($file)->fit(320)->crop(320,240,0,0);
        $imageThumb->encode($extension);

        $imageMedium = Image::make($file)->resize('800',null,function ($contstraint){
            $contstraint->aspectRatio();
        });
        $imageMedium->encode($extension);

        $image->encode($extension);

        Storage::put('public/gallery_'.$galleryId.'/main/'.$fileName,(string)$image,'public');
        Storage::put('public/gallery_'.$galleryId.'/thumb/'.$fileName,(string)$imageThumb,'public');
        Storage::put('public/gallery_'.$galleryId.'/medium/'.$fileName,(string)$imageMedium,'public');

        $file = File::create([
            'file_name' => $fileName,
            'mime_type' => $mimeType,
            'file_size' => $fileSize,
            'file_path' => 'gallery_'.$galleryId.'/main/'.$fileName,
            'status' => 0
        ]);

        DB::table('gallery_images')->insert([
            'gallery_id'=>$galleryId,
            'file_id' => $file->id
        ]);

        $fileImg = File::find($file->id);
        $fileImg->status = 1;
        $fileImg->save();

        return [
            'file'=>$file,
            'file_id'=>$file->id,
            'thumbUrl'=> asset('storage/gallery_'.$galleryId.'/thumb/'.$file->file_name),
            'url'=> asset('storage/gallery_'.$galleryId.'/medium/'.$file->file_name),
            'main'=> asset('storage/gallery_'.$galleryId.'/main/'.$file->file_name),
        ];

    }
}
