<?php

namespace App\Http\Controllers\Api\Admin;

use App\Models\Career;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Validation\Rules\Can;
use App\Http\Resources\CareerResource;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class CareerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //get Simpanan
        $careers = Career::when(request()->search, function ($careers) {
            $careers = $careers->where('title', 'like', '%' . request()->search . '%');
        })->latest()->paginate(5);

        //append query string to pagination links
        $careers->appends(['search' => request()->search]);

        //return with Api Resource
        return new CareerResource(true, 'List Data Simpanan', $careers);
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
        $image->storeAs('public/careers', $image->hashName());
        //create page
        $career = Career::create([
            'title'     => $request->title,
            'slug'      => Str::slug($request->title),
            'image' => $image->hashName(),
            'content'   => $request->content,
            'user_id'   => auth()->guard('api')->user()->id
        ]);

        if ($career) {
            //return success with Api Resource
            return new CareerResource(true, 'Data Simpanan Berhasil Disimpan!', $career);
        }

        //return failed with Api Resource
        return new CareerResource(false, 'Data Simpanan Gagal Disimpan!', null);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $career = Career::whereId($id)->first();

        if ($career) {
            //return success with Api Resource
            return new CareerResource(true, 'Detail Data Simpanan!', $career);
        }

        //return failed with Api Resource
        return new CareerResource(false, 'Detail Data Simpanan Tidak DItemukan!', null);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Career $career)
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
            Storage::disk('local')->delete('public/careers/' . basename($career->image));

            //upload new image
            $image = $request->file('image');
            $image->storeAs('public/careers', $image->hashName());

            //update Product with new image
            $career->update([
                'image' => $image->hashName(),
                'title' => $request->title,
                'slug'  => Str::slug($request->title, '-'),
                'content' => $request->content,
                'user_id'     => auth()->guard('api')->user()->id,
            ]);
        }

        //update Product without image
        $career->update([
            'title' => $request->title,
            'slug'  => Str::slug($request->title, '-'),
            'content' => $request->content,
            'user_id'  => auth()->guard('api')->user()->id,
        ]);

        if ($career) {
            //return success with Api Resource
            return new CareerResource(true, 'Data Simpanan Berhasil Diupdate!', $career);
        }

        //return failed with Api Resource
        return new CareerResource(false, 'Data Simpanan Gagal Diupdate!', null);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Career $career)
    {
        if ($career->delete()) {
            //return success with Api Resource
            return new CareerResource(true, 'Data Simpanan Berhasil Dihapus!', null);
        }

        //return failed with Api Resource
        return new CareerResource(false, 'Data Simpanan Gagal Dihapus!', null);
    }
}
