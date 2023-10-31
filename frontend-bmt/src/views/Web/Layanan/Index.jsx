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
                                <div class="fs-3 fw-light text-muted">Layanan Digital Terbaik</div>
                                <h2 class="display-2 fw-bolder mb-5"><span class="text-green d-inline">BMT NU NGASEM Mobile</span></h2>
                                <p class="fs-3 fw-light text-muted">Transaksi mudah hanya dalam satu genggaman.</p>
                                <div class="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xxl-start mb-3">
                                    <a class="btn btn-primary btn-lg px-5 py-3 me-sm-3 fs-6 fw-bolder" href="resume.html">Download</a>
                                </div>
                            </div>
                        </div>
                        <div class="col-xxl-6">
                            <div class="d-flex justify-content-center mt-5 mt-xxl-0">
                                <div class="profile bg-gradient-primary-to-secondary">
                                    <img class="profile-img" src="assets/profile.png" alt="..." />
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </header>
            <section class="bg-light py-5">
                <div class="container px-5">
                    <div class="row gx-5 justify-content-center">
                        <div class="col-xxl-8">
                            <div class="text-center my-5">
                                <h2 class="display-5 fw-bolder"><span class="text-gradient d-inline">Sejarah</span></h2>
                                <p class="lead fw-light mb-4">My name is Start Bootstrap and I help brands grow.</p>
                                <p class="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit dolorum itaque qui unde quisquam consequatur autem. Eveniet quasi nobis aliquid cumque officiis sed rem iure ipsa! Praesentium ratione atque dolorem?</p>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <div classname="row">
            <div className="col-md-12">
                <h5 className="text">
                <i className="fa fa-shopping-bag"></i> Layanan Digital Terbaik
                </h5>
                <hr />
            </div>
            </div>
            <div className="row mt-4">
            {loadingLayanan ? (
                <Loading />
            ) : layanans.length > 0 ? (
                layanans.map((saving) => (
                <CardSaving
                    key={saving.id}
                    image={saving.image}
                    title={saving.title}
                    slug={saving.slug}
                />
                ))
            ) : (
                <AlertDataEmpty />
            )}
            </div>
            <Pagination
            currentPage={pagination.currentPage}
            perPage={pagination.perPage}
            total={pagination.total}
            onChange={(pageNumber) => fetchDatalayanans(pageNumber)}
            position="center"
            /> */}
        </div>
        </LayoutWeb>
    );
}