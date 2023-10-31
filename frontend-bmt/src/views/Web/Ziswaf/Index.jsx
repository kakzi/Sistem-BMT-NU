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

export default function WebZiswafIndex() {
    //title page
    document.title = "Ziswaf - BMT NU Ngasem";

    //init state
    const [ziswafs, setZiswafs] = useState([]);
    const [loadingZiswaf, setloadingZiswaf] = useState(true);

    //define state "pagination"
    const [pagination, setPagination] = useState({
        currentPage: 0,
        perPage: 0,
        total: 0,
    });

    //fetch data ziswafs
    const fetchDataZiswafs = async (pageNumber = 1) => {
        //setLoadingPhoto "true"
        setloadingZiswaf(true);

        //define variable "page"
        const page = pageNumber ? pageNumber : pagination.currentPage;

        await Api.get(`/api/public/ziswafs?page=${page}`).then((response) => {
        //assign response to state "ziswafs"
        setZiswafs(response.data.data.data);

        //set data pagination to state "pagination"
        setPagination(() => ({
            currentPage: response.data.data.current_page,
            perPage: response.data.data.per_page,
            total: response.data.data.total,
        }));

        //setLoadingPhoto "false"
        setloadingZiswaf(false);
        });
    };

    //hook useEffect
    useEffect(() => {
        //call method "fetchDataziswafs"
        fetchDataZiswafs();
    }, []);

    return (
        <LayoutWeb>
        <div className="container mt-4 mb-3">
            <div classname="row">
            <div className="col-md-12">
                <h5 className="text">
                <i className="fa fa-shopping-bag"></i> Ziswaf
                </h5>
                <hr />
            </div>
            </div>
            <div className="row mt-4">
            {loadingZiswaf ? (
                <Loading />
            ) : ziswafs.length > 0 ? (
                ziswafs.map((saving) => (
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
            onChange={(pageNumber) => fetchDataziswafs(pageNumber)}
            position="center"
            />
        </div>
        </LayoutWeb>
    );
}