import React, { useState, useEffect } from "react";

//import layout web
import LayoutWeb from "../../../layouts/Web";

//import service api
import Api from "../../../services/Api";

//import component alert
import AlertDataEmpty from "../../../components/general/AlertDataEmpty";

//import component loading
import Loading from "../../../components/general/Loading";

//import component card product
import CardSaving from "../../../components/general/CardSaving";

//import pagination component
import Pagination from "../../../components/general/Pagination";

export default function WebLayananIndex() {
    //title page
    document.title = "Layanan Digital - BMT NU Ngasem";

    //init state
    const [layanans, setlayanans] = useState([]);
    const [loadingLayanan, setloadingLayanan] = useState(true);

    //define state "pagination"
    const [pagination, setPagination] = useState({
        currentPage: 0,
        perPage: 0,
        total: 0,
    });

    //fetch data layanans
    const fetchDatalayanans = async (pageNumber = 1) => {
        //setLoadingPhoto "true"
        setloadingLayanan(true);

        //define variable "page"
        const page = pageNumber ? pageNumber : pagination.currentPage;

        await Api.get(`/api/public/layanans?page=${page}`).then((response) => {
        //assign response to state "layanans"
        setlayanans(response.data.data.data);

        //set data pagination to state "pagination"
        setPagination(() => ({
            currentPage: response.data.data.current_page,
            perPage: response.data.data.per_page,
            total: response.data.data.total,
        }));

        //setLoadingPhoto "false"
        setloadingLayanan(false);
        });
    };

    //hook useEffect
    useEffect(() => {
        //call method "fetchDatalayanans"
        fetchDatalayanans();
    }, []);

    return (
        <LayoutWeb>
        <div className="container mt-4 mb-3">
        <header class="py-5">
            <div class="container px-5 pb-5">
                <div class="row gx-5 align-items-center">
                        <div class="col-xxl-6">
                            
                            <div class="text-center text-xxl-start">
                                <div class="fs-3 fw-light">Layanan Digital Terbaik</div>
                                <h2 class="display-2 fw-bolder"><span class="text-green d-inline">BMT NU NGASEM Mobile</span></h2>
                                <div class="fs-3 mb-5">Transaksi mudah dalam satu genggaman!</div>
                                <div class="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xxl-start mb-3">
                                    <a class="btn btn-primary btn-lg px-5 py-3 me-sm-3 fs-6 fw-bolder" href="https://play.google.com/store/apps/details?id=com.alfatechnosoft.bmtnungasem">Download</a>
                                </div>
                            </div>
                        </div>
                        <div class="col-xxl-6">
                            <div class="d-flex justify-content-center mt-5 mt-xxl-0">
                                <div class="profile bg-gradient-primary-to-secondary">
                                    <img class="profile-img" src="images/digital_satu.png" width={450} />
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </header>

        <section class="bg-light py-3">
                <div class="container px-5">
                    <div class="row justify-content-center">
                        <div class="col-xxl-8">
                            <div class="text-center my-5">
                                <h2 class="display-5 fw-bolder">
                                    <span class="text-gradient d-inline">BMT NU NGASEM Mobile</span>
                                </h2>
                                <p class="lead mb-4 text-bold">Satu Aplikasi untuk Beragam Kemudahan</p>
                                <p class="text">
                                    Top up shopee, dana, gopay, ovo, dan lain lain, Beli Pulsa All Operator, Transfer Kesemua Bank dengan biaya admin yang terjangkau, Bayar tagihan listrik, Indihome, dan iuran BPJS Kesehatan, Cek saldo, histori transaksi dan lain lain.
                                </p>
                                
                            </div>
                        </div>
                    </div>
                </div>
        </section>
        <header class="py-5">
            <div class="container px-5 pb-5">
                <div class="row gx-5 align-items-center">
                        <div class="col-xxl-6">
                            <div class="d-flex justify-content-center mt-5 mt-xxl-0">
                                <div class="profile bg-gradient-primary-to-secondary">
                                    <img class="profile-img" src="images/digital_dua.png" width={500} />
                                </div>
                            </div>
                        </div>
                        <div class="col-xxl-6">
                            <div class="text-center text-xxl-start mt-5">
                                <div class="fs-3 fw-light">Layanan Digital Terbaik</div>
                                <h2 class="display-2 fw-bolder"><span class="text-green d-inline">ATM 24 JAM BMT NU NGASEM</span></h2>
                                <div class="fs-3 mb-5">Tarik tunai bisa kapanpun!</div>
                                <div class="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xxl-start mb-3">
                                    <a class="btn btn-primary btn-lg px-5 py-3 me-sm-3 fs-6 fw-bolder" href="https://play.google.com/store/apps/details?id=com.alfatechnosoft.bmtnungasem">Daftar Sekarang</a>
                                </div>
                            </div>
                            
                        </div>
                </div>
            </div>
        </header>

        <section class="bg-light py-3">
                <div class="container px-5">
                    <div class="row justify-content-center">
                        <div class="col-xxl-8">
                            <div class="text-center my-5">
                                <h2 class="display-5 fw-bolder">
                                    <span class="text-gradient d-inline">ATM 24 JAM BMT NU NGASEM</span>
                                </h2>
                                <p class="lead mb-4 text-bold">Tarik Tunai bisa kapanpun, Tanpa menunggu</p>
                                <p class="text">
                                    Kini ATM 24 Jam sudah tersedia di beberapa Kantor Cabang di antaranya, Kantor Cabang Bareng, Kantor Cabang Malo, Kantor Cabang Kepohbaru, Kantor Cabang Ngraho. dan seterusnya akan tersedia di kantor cabang terdekat kesayangan anda.
                                </p>
                                
                            </div>
                        </div>
                    </div>
                </div>
        </section>


        <header class="py-5">
            <div class="container px-5 pb-5">
                <div class="row gx-5 align-items-center">
                        <div class="col-xxl-6">
                            
                            <div class="text-center text-xxl-start">
                                <div class="fs-3 fw-light">Layanan Digital Terbaik</div>
                                <h2 class="display-2 fw-bolder"><span class="text-green d-inline">POS BMT NU NGASEM LINK</span></h2>
                                <div class="fs-3 mb-5">Satu Satunya yang punya POS Agen</div>
                                <div class="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xxl-start mb-3">
                                    <a class="btn btn-primary btn-lg px-5 py-3 me-sm-3 fs-6 fw-bolder" href="https://play.google.com/store/apps/details?id=com.alfatechnosoft.bmtnungasem">Daftar Sekarang</a>
                                </div>
                            </div>
                        </div>
                        <div class="col-xxl-6">
                            <div class="d-flex justify-content-center mt-5 mt-xxl-0">
                                <div class="profile bg-gradient-primary-to-secondary">
                                    <img class="profile-img" src="images/digital_tiga.png" width={500} />
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </header>
        <section class="bg-light py-3 mb-5">
                <div class="container px-5">
                    <div class="row justify-content-center">
                        <div class="col-xxl-8">
                            <div class="text-center my-5">
                                <h2 class="display-5 fw-bolder">
                                    <span class="text-gradient d-inline">POS BMT NU NGASEM LINK</span>
                                </h2>
                                <p class="lead mb-4 text-bold">Satu Satunya BMT NU yang punya Agen</p>
                                <p class="text">
                                    Melayani Setoran dan Penarikan serta Top up shopee, dana, gopay, ovo, dan lain lain, Beli Pulsa All Operator, Transfer Kesemua Bank dengan biaya admin yang terjangkau, Bayar tagihan listrik, Indihome, dan iuran BPJS Kesehatan, Cek saldo, histori transaksi dan lain lain.
                                </p>
                                
                            </div>
                        </div>
                    </div>
                </div>
        </section>
        </div>
        </LayoutWeb>
    );
}