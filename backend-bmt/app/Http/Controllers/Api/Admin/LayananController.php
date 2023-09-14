<?php

namespace App\Http\Controllers\Api\Admin;

use App\Models\Layanan;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\LayananResource;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class LayananController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //get Simpanan
        $layanans = Layanan::when(request()->search, function ($layanans) {
            $layanans = $layanans->where('title', 'like', '%' . request()->search . '%');
        })->latest()->paginate(5);

        //append query string to pagination links
        $layanans->appends(['search' => request()->search]);

        //return with Api Resource
        return new LayananResource(true, 'List Data Simpanan', $layanans);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title'     => 'required',
            'content'   => 'required',
            'image'    => 'required|mimes:jpeg,jpg,png|max:2000'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

         //upload image
        $image = $request->file('image');
        $image->storeAs('public/layanans', $image->hashName());
        //create page
        $layanan = Layanan::create([
            'title'     => $request->title,
            'slug'      => Str::slug($request->title),
            'image' => $image->hashName(),
            'content'   => $request->content,
            'user_id'   => auth()->guard('api')->user()->id
        ]);

        if ($layanan) {
            //return success with Api Resource
            return new LayananResource(true, 'Data Simpanan Berhasil Disimpan!', $layanan);
        }

        //return failed with Api Resource
        return new LayananResource(false, 'Data Simpanan Gagal Disimpan!', null);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $saving = Layanan::whereId($id)->first();

        if ($saving) {
            //return success with Api Resource
            return new LayananResource(true, 'Detail Data Simpanan!', $saving);
        }

        //return failed with Api Resource
        return new LayananResource(false, 'Detail Data Simpanan Tidak DItemukan!', null);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Layanan $layanan)
    {
        $validator = Validator::make($request->all(), [
            'title'    => 'required',
            'content'  => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        //check image update
        if ($request->file('image')) {

            //remove old image
            Storage::disk('local')->delete('public/layanans/' . basename($layanan->image));

            //upload new image
            $image = $request->file('image');
            $image->storeAs('public/layanans', $image->hashName());

            //update Product with new image
            $layanan->update([
                'image' => $image->hashName(),
                'title' => $request->title,
                'slug'  => Str::slug($request->title, '-'),
                'content' => $request->content,
                'user_id'     => auth()->guard('api')->user()->id,
            ]);
        }

        //update Product without image
        $layanan->update([
            'title' => $request->title,
            'slug'  => Str::slug($request->title, '-'),
            'content' => $request->content,
            'user_id'     => auth()->guard('api')->user()->id,
        ]);

        if ($layanan) {
            //return success with Api Resource
            return new LayananResource(true, 'Data Simpanan Berhasil Diupdate!', $layanan);
        }

        //return failed with Api Resource
        return new LayananResource(false, 'Data Simpanan Gagal Diupdate!', null);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Layanan $layanan)
    {
        if ($layanan->delete()) {
            //return success with Api Resource
            return new LayananResource(true, 'Data Simpanan Berhasil Dihapus!', null);
        }

        //return failed with Api Resource
        return new LayananResource(false, 'Data Simpanan Gagal Dihapus!', null);
    }
}
