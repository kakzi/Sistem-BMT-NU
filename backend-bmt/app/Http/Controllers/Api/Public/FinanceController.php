<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Http\Resources\FinanceResource;
use App\Models\Finance;
use Illuminate\Http\Request;

class FinanceController extends Controller
{
    /**
     * index
     *
     * @return void
     */
    public function index()
    {
        $finances = Finance::latest()->paginate(9);

        //return with Api Resource
        return new FinanceResource(true, 'List Data finances', $finances);
    }

    /**
     * show
     *
     * @param  mixed $slug
     * @return void
     */
    public function show($slug)
    {
        $saving = Finance::where('slug', $slug)->first();

        if ($saving) {
            //return with Api Resource
            return new FinanceResource(true, 'Detail Data Product', $saving);
        }

        //return with Api Resource
        return new FinanceResource(false, 'Detail Data Product Tidak Ditemukan!', null);
    }

    public function homePage()
    {
        $savings = Finance::latest()->take(6)->get();

        //return with Api Resource
        return new FinanceResource(true, 'List Data Products HomePage', $savings);
    }
}
