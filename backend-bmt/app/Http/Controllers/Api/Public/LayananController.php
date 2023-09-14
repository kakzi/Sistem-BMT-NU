<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Http\Resources\LayananResource;
use App\Models\Layanan;
use Illuminate\Http\Request;

class LayananController extends Controller
{
    /**
     * index
     *
     * @return void
     */
    public function index()
    {
        $layanans = Layanan::latest()->paginate(9);

        //return with Api Resource
        return new LayananResource(true, 'List Data layanans', $layanans);
    }

    /**
     * show
     *
     * @param  mixed $slug
     * @return void
     */
    public function show($slug)
    {
        $layanan = Layanan::where('slug', $slug)->first();

        if ($layanan) {
            //return with Api Resource
            return new LayananResource(true, 'Detail Data Product', $layanan);
        }

        //return with Api Resource
        return new LayananResource(false, 'Detail Data Product Tidak Ditemukan!', null);
    }

    public function homePage()
    {
        $savings = Layanan::latest()->take(6)->get();

        //return with Api Resource
        return new LayananResource(true, 'List Data Products HomePage', $savings);
    }
}
