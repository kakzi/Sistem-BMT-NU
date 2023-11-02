import React, { useState, useEffect } from "react";

//import layout web
import LayoutWeb from "../../../layouts/Web";

//import component slider
import Slider from "../../../components/web/Slider";

//import service api
import Api from "../../../services/Api";

//import alert
import AlertDataEmpty from "../../../components/general/AlertDataEmpty";

//import Loading
import Loading from "../../../components/general/Loading";

//import card product
import CardProduct from "../../../components/general/CardProduct";

//import card post home
import CardPostHome from "../../../components/general/CardPostHome";

export default function Home() {
    //title page
    document.title = "Selamat Datang di Portal BMT NU Ngasem";

    //init state products
    const [products, setProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(true);

    //init state posts
    const [posts, setPosts] = useState([]);
    const [loadingPosts, setLoadingPosts] = useState(true);

    //fetch data products
    const fetchDataProducts = async () => {
        //setLoadingProducts "true"
        setLoadingProducts(true);

        //fetch data
        await Api.get("/api/public/products_home").then((response) => {
        //assign response to state "products"
        setProducts(response.data.data);

        //setLoadingProducts "false"
        setLoadingProducts(false);
        });
    };

    //fetch data posts
    const fetchDataPosts = async () => {
        //setLoadingPosts "true"
        setLoadingPosts(true);

        //fetch data
        await Api.get("/api/public/posts_home").then((response) => {
        //assign response to state "posts"
        setPosts(response.data.data);

        //setLoadingPosts "false"
        setLoadingPosts(false);
        });
    };

    //hook useEffect
    useEffect(() => {
        //call method "fetchDataProducts"
        fetchDataProducts();

        //call method "fetchDataPosts"
        fetchDataPosts();
    }, []);

    return (

        <LayoutWeb>
        <Slider />
        <div className="container mt-5 mb-3">
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
            <div className="row">
            <div className="col-md-12 mb-3">
                <div className="section-title">
                <h4>
                    <i className="fa fa-shopping-bag"></i>
                    <strong style={{ color: "rgb(209 104 0)" }}> PRODUK </strong>
                    UMKM
                </h4>
                </div>
            </div>
            {loadingProducts ? (
                <Loading />
            ) : products.length > 0 ? (
                products.map((product) => (
                <CardProduct
                    key={product.id}
                    image={product.image}
                    title={product.title}
                    slug={product.slug}
                    price={product.price}
                    phone={product.phone}
                />
                ))
            ) : (
                <AlertDataEmpty />
            )}
            </div>
        </div>

        <div className="container mt-2 mb-4">
            <div className="row">
            <div className="col-md-12 mb-3">
                <div className="section-title">
                <h4>
                    <i className="fa fa-book"></i>
                    <strong style={{ color: "rgb(209 104 0)" }}> BERITA </strong>
                    TERBARU
                </h4>
                </div>
            </div>
            {loadingPosts ? (
                <Loading />
            ) : posts.length > 0 ? (
                posts.map((post) => (
                <CardPostHome
                    key={post.id}
                    image={post.image}
                    slug={post.slug}
                    title={post.title}
                    content={post.content}
                    user={post.user.name}
                    date={post.created_at}
                />
                ))
            ) : (
                <AlertDataEmpty />
            )}
            </div>
        </div>
        </LayoutWeb>
    );
}