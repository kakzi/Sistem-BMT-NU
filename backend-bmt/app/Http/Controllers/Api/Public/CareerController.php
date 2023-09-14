<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Http\Resources\CareerResource;
use App\Models\Career;
use Illuminate\Http\Request;

class CareerController extends Controller
{
    /**
     * index
     *
     * @return void
     */
    public function index()
    {
        $careers = Career::latest()->paginate(9);

        //return with Api Resource
        return new CareerResource(true, 'List Data careers', $careers);
    }

    /**
     * show
     *
     * @param  mixed $slug
     * @return void
     */
    public function show($slug)
    {
        $saving = Career::where('slug', $slug)->first();

        if ($saving) {
            //return with Api Resource
            return new CareerResource(true, 'Detail Data Product', $saving);
        }

        //return with Api Resource
        return new CareerResource(false, 'Detail Data Product Tidak Ditemukan!', null);
    }

    public function homePage()
    {
        $savings = Career::latest()->take(6)->get();

        //return with Api Resource
        return new CareerResource(true, 'List Data Products HomePage', $savings);
    }
}