<?php

namespace App\Http\Controllers\Api\Admin;

use App\Models\Saving;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\SavingResource;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class SavingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //get Simpanan
        $savings = Saving::when(request()->search, function ($savings) {
            $savings = $savings->where('title', 'like', '%' . request()->search . '%');
        })->latest()->paginate(5);

        //append query string to pagination links
        $savings->appends(['search' => request()->search]);

        //return with Api Resource
        return new SavingResource(true, 'List Data Simpanan', $savings);
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
        $image->storeAs('public/savings', $image->hashName());
        //create page
        $saving = Saving::create([
            'title'     => $request->title,
            'slug'      => Str::slug($request->title),
            'image' => $image->hashName(),
            'content'   => $request->content,
            'user_id'   => auth()->guard('api')->user()->id
        ]);

        if ($saving) {
            //return success with Api Resource
            return new SavingResource(true, 'Data Simpanan Berhasil Disimpan!', $saving);
        }

        //return failed with Api Resource
        return new SavingResource(false, 'Data Simpanan Gagal Disimpan!', null);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $saving = Saving::whereId($id)->first();

        if ($saving) {
            //return success with Api Resource
            return new SavingResource(true, 'Detail Data Simpanan!', $saving);
        }

        //return failed with Api Resource
        return new SavingResource(false, 'Detail Data Simpanan Tidak DItemukan!', null);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Saving $saving)
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
            Storage::disk('local')->delete('public/savings/' . basename($saving->image));

            //upload new image
            $image = $request->file('image');
            $image->storeAs('public/savings', $image->hashName());

            //update Product with new image
            $saving->update([
                'image' => $image->hashName(),
                'title' => $request->title,
                'slug'  => Str::slug($request->title, '-'),
                'content' => $request->content,
                'user_id'     => auth()->guard('api')->user()->id,
            ]);
        }

        //update Product without image
        $saving->update([
            'title' => $request->title,
            'slug'  => Str::slug($request->title, '-'),
            'content' => $request->content,
            'user_id'     => auth()->guard('api')->user()->id,
        ]);

        if ($saving) {
            //return success with Api Resource
            return new SavingResource(true, 'Data Simpanan Berhasil Diupdate!', $saving);
        }

        //return failed with Api Resource
        return new SavingResource(false, 'Data Simpanan Gagal Diupdate!', null);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Saving $saving)
    {
        if ($saving->delete()) {
            //return success with Api Resource
            return new SavingResource(true, 'Data Simpanan Berhasil Dihapus!', null);
        }

        //return failed with Api Resource
        return new SavingResource(false, 'Data Simpanan Gagal Dihapus!', null);
    }
}
