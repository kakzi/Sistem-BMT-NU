<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Http\Resources\ZiswafResource;
use App\Models\Ziswaf;
use Illuminate\Http\Request;

class ZiswafController extends Controller
{
    /**
     * index
     *
     * @return void
     */
    public function index()
    {
        $ziswafs = Ziswaf::latest()->paginate(9);

        //return with Api Resource
        return new ZiswafResource(true, 'List Data Ziswafs', $ziswafs);
    }

    /**
     * show
     *
     * @param  mixed $slug
     * @return void
     */
    public function show($slug)
    {
        $saving = Ziswaf::where('slug', $slug)->first();

        if ($saving) {
            //return with Api Resource
            return new ZiswafResource(true, 'Detail Data Product', $saving);
        }

        //return with Api Resource
        return new ZiswafResource(false, 'Detail Data Product Tidak Ditemukan!', null);
    }

    public function homePage()
    {
        $savings = Ziswaf::latest()->take(6)->get();

        //return with Api Resource
        return new ZiswafResource(true, 'List Data Products HomePage', $savings);
    }
}
