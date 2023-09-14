<?php

namespace App\Http\Controllers\Api\Admin;

use App\Models\Ziswaf;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\ZiswafResource;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ZiswafController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //get Simpanan
        $ziswafs = Ziswaf::when(request()->search, function ($ziswafs) {
            $ziswafs = $ziswafs->where('title', 'like', '%' . request()->search . '%');
        })->latest()->paginate(5);

        //append query string to pagination links
        $ziswafs->appends(['search' => request()->search]);

        //return with Api Resource
        return new ZiswafResource(true, 'List Data Simpanan', $ziswafs);
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
        $image->storeAs('public/ziswaf', $image->hashName());
        //create page
        $ziswaf = Ziswaf::create([
            'title'     => $request->title,
            'slug'      => Str::slug($request->title),
            'image' => $image->hashName(),
            'content'   => $request->content,
            'user_id'   => auth()->guard('api')->user()->id
        ]);

        if ($ziswaf) {
            //return success with Api Resource
            return new ZiswafResource(true, 'Data Simpanan Berhasil Disimpan!', $ziswaf);
        }

        //return failed with Api Resource
        return new ZiswafResource(false, 'Data Simpanan Gagal Disimpan!', null);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $ziswaf = Ziswaf::whereId($id)->first();

        if ($ziswaf) {
            //return success with Api Resource
            return new ZiswafResource(true, 'Detail Data Simpanan!', $ziswaf);
        }

        //return failed with Api Resource
        return new ZiswafResource(false, 'Detail Data Simpanan Tidak DItemukan!', null);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Ziswaf $ziswaf)
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
            Storage::disk('local')->delete('public/ziswaf/' . basename($ziswaf->image));

            //upload new image
            $image = $request->file('image');
            $image->storeAs('public/ziswaf', $image->hashName());

            //update Product with new image
            $ziswaf->update([
                'image' => $image->hashName(),
                'title' => $request->title,
                'slug'  => Str::slug($request->title, '-'),
                'content' => $request->content,
                'user_id'     => auth()->guard('api')->user()->id,
            ]);
        }

        //update Product without image
        $ziswaf->update([
            'title' => $request->title,
            'slug'  => Str::slug($request->title, '-'),
            'content' => $request->content,
            'user_id'  => auth()->guard('api')->user()->id,
        ]);

        if ($ziswaf) {
            //return success with Api Resource
            return new ZiswafResource(true, 'Data Simpanan Berhasil Diupdate!', $ziswaf);
        }

        //return failed with Api Resource
        return new ZiswafResource(false, 'Data Simpanan Gagal Diupdate!', null);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Ziswaf $ziswaf)
    {
        if ($ziswaf->delete()) {
            //return success with Api Resource
            return new ZiswafResource(true, 'Data Simpanan Berhasil Dihapus!', null);
        }

        //return failed with Api Resource
        return new ZiswafResource(false, 'Data Simpanan Gagal Dihapus!', null);
    }
}
