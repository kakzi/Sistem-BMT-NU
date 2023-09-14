<?php

namespace App\Http\Controllers\Api\Admin;

use App\Models\Finance;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\FinanceResource;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class FinanceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //get Simpanan
        $finances = Finance::when(request()->search, function ($finances) {
            $finances = $finances->where('title', 'like', '%' . request()->search . '%');
        })->latest()->paginate(5);

        //append query string to pagination links
        $finances->appends(['search' => request()->search]);

        //return with Api Resource
        return new FinanceResource(true, 'List Data Simpanan', $finances);
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
        $image->storeAs('public/finances', $image->hashName());
        //create page
        $finance = Finance::create([
            'title'     => $request->title,
            'slug'      => Str::slug($request->title),
            'image' => $image->hashName(),
            'content'   => $request->content,
            'user_id'   => auth()->guard('api')->user()->id
        ]);

        if ($finance) {
            //return success with Api Resource
            return new FinanceResource(true, 'Data Simpanan Berhasil Disimpan!', $finance);
        }

        //return failed with Api Resource
        return new FinanceResource(false, 'Data Simpanan Gagal Disimpan!', null);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $finance = Finance::whereId($id)->first();

        if ($finance) {
            //return success with Api Resource
            return new FinanceResource(true, 'Detail Data Simpanan!', $finance);
        }

        //return failed with Api Resource
        return new FinanceResource(false, 'Detail Data Simpanan Tidak DItemukan!', null);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Finance $finance)
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
            Storage::disk('local')->delete('public/finances/' . basename($finance->image));

            //upload new image
            $image = $request->file('image');
            $image->storeAs('public/finances', $image->hashName());

            //update Product with new image
            $finance->update([
                'image' => $image->hashName(),
                'title' => $request->title,
                'slug'  => Str::slug($request->title, '-'),
                'content' => $request->content,
                'user_id'     => auth()->guard('api')->user()->id,
            ]);
        }

        //update Product without image
        $finance->update([
            'title' => $request->title,
            'slug'  => Str::slug($request->title, '-'),
            'content' => $request->content,
            'user_id'  => auth()->guard('api')->user()->id,
        ]);

        if ($finance) {
            //return success with Api Resource
            return new FinanceResource(true, 'Data Simpanan Berhasil Diupdate!', $finance);
        }

        //return failed with Api Resource
        return new FinanceResource(false, 'Data Simpanan Gagal Diupdate!', null);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Finance $finance)
    {
        if ($finance->delete()) {
            //return success with Api Resource
            return new FinanceResource(true, 'Data Simpanan Berhasil Dihapus!', null);
        }

        //return failed with Api Resource
        return new FinanceResource(false, 'Data Simpanan Gagal Dihapus!', null);
    }
}
