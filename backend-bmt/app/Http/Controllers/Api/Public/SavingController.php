<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Http\Resources\SavingResource;
use App\Models\Saving;
use Illuminate\Http\Request;

class SavingController extends Controller
{
    /**
     * index
     *
     * @return void
     */
    public function index()
    {
        $savings = Saving::latest()->paginate(9);

        //return with Api Resource
        return new SavingResource(true, 'List Data savings', $savings);
    }

    /**
     * show
     *
     * @param  mixed $slug
     * @return void
     */
    public function show($slug)
    {
        $saving = Saving::where('slug', $slug)->first();

        if ($saving) {
            //return with Api Resource
            return new SavingResource(true, 'Detail Data Product', $saving);
        }

        //return with Api Resource
        return new SavingResource(false, 'Detail Data Product Tidak Ditemukan!', null);
    }

    public function homePage()
    {
        $savings = Saving::latest()->take(6)->get();

        //return with Api Resource
        return new SavingResource(true, 'List Data Products HomePage', $savings);
    }
}
