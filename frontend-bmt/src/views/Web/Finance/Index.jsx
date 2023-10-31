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

export default function WebFinanceIndex() {
    //title page
    document.title = "Produk Pembiayaan - BMT NU Ngasem";

    //init state
    const [finances, setfinances] = useState([]);
    const [loadingfinances, setloadingfinances] = useState(true);

    //define state "pagination"
    const [pagination, setPagination] = useState({
        currentPage: 0,
        perPage: 0,
        total: 0,
    });

    //fetch data finances
    const fetchDatafinances = async (pageNumber = 1) => {
        //setLoadingPhoto "true"
        setloadingfinances(true);

        //define variable "page"
        const page = pageNumber ? pageNumber : pagination.currentPage;

        await Api.get(`/api/public/finances?page=${page}`).then((response) => {
        //assign response to state "finances"
        setfinances(response.data.data.data);

        //set data pagination to state "pagination"
        setPagination(() => ({
            currentPage: response.data.data.current_page,
            perPage: response.data.data.per_page,
            total: response.data.data.total,
        }));

        //setLoadingPhoto "false"
        setloadingfinances(false);
        });
    };

    //hook useEffect
    useEffect(() => {
        //call method "fetchDatafinances"
        fetchDatafinances();
    }, []);

    return (
        <LayoutWeb>
        <div className="container mt-4 mb-3">
            <header class="py-5">
                <div class="container px-5 pb-5">
                    <div class="row gx-5 align-items-center">
                        <div class="col-xxl-5">
                            
                            <div class="text-center text-xxl-start">
                                <div class="fs-3 fw-light text-muted">I can help your business to</div>
                                <h1 class="display-3 fw-bolder mb-5"><span class="text-gradient d-inline">Get online and grow fast</span></h1>
                                <div class="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xxl-start mb-3">
                                    <a class="btn btn-primary btn-lg px-5 py-3 me-sm-3 fs-6 fw-bolder" href="resume.html">Resume</a>
                                    <a class="btn btn-outline-dark btn-lg px-5 py-3 fs-6 fw-bolder" href="projects.html">Projects</a>
                                </div>
                            </div>
                        </div>
                        <div class="col-xxl-7">
                            <div class="d-flex justify-content-center mt-5 mt-xxl-0">
                                <div class="profile bg-gradient-primary-to-secondary">
                                    <img class="profile-img" src="assets/profile.png" alt="..." />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>


            
            {/* <div classname="row">
            <div className="col-md-12">
                <h5 className="text">
                <i className="fa fa-shopping-bag"></i> Produk Pembiayaan 
                </h5>
                <hr />
            </div>
            </div>
            <div className="row mt-4">
            {loadingfinances ? (
                <Loading />
            ) : finances.length > 0 ? (
                finances.map((saving) => (
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
            onChange={(pageNumber) => fetchDatafinances(pageNumber)}
            position="center"
            /> */}
        </div>
        </LayoutWeb>
    );
}