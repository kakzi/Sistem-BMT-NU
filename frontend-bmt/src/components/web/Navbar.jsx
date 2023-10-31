import React from "react";

import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
    //assigning location variable
    const location = useLocation();

    //destructuring pathname from location
    const { pathname } = location;

    //Javascript split method to get the name of the path in array
    const activeRoute = pathname.split("/");

    return (
        <>
        <nav className="navbar navbar-expand-md navbar-light navbar-top d-none d-md-block d-lg-block">
            <div className="container">
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item me-4">
                    <i className="fa fa-envelope"></i> bmtnungasem@gmail.com
                </li>
                <li className="nav-item me-4">
                    <i className="fa fa-phone"></i> (0353) 552187923
                </li>
                </ul>
                <div>
                Follow Us on :
                <a href="#" className="ms-2 me-2">
                    <i className="fab fa-facebook-square text-white fa-lg"></i>
                </a>
                <a href="http://" className="ms-2 me-2">
                    <i className="fab fa-instagram text-white fa-lg"></i>
                </a>
                <a href="#" className="ms-2 me-2">
                    <i className="fab fa-youtube text-white fa-lg"></i>
                </a>
                <a href="#" className="ms-2 me-2">
                    <i className="fab fa-tiktok text-white fa-lg"></i>
                </a>
                </div>
            </div>
            </div>
        </nav>

        <div className="jumbotron-header pb-3">
            <div className="container">
            <div className="row">
                <div className="col-md-9 d-none d-md-block d-lg-block">
                <div className="header-logo">
                    <a href="#">
                    <img
                        src="/images/logobmt.png"
                        width="110"
                        className="img-responsive"
                    />
                    </a>
                </div>
                <div className="header-text">
                    <h2 className="header-school">KOPSYAH BMT NU NGASEM</h2>
                    <hr />
                    <div className="header-address">
                    Sudah Terbukti dan Teruji
                    </div>
                </div>
                </div>

                <div className="row d-block d-md-none d-lg-none">
                <div className="col-md-6 text-center mt-3">
                    <a href="#">
                    <img
                        src="/images/logobmt.png"
                        width="110"
                        className="img-responsive"
                    />
                    </a>
                </div>
                <div className="col-md-12 text-center text-white mb-3">
                    <h2 className="header-school">KOPSYAH BMT NU NGASEM</h2>
                    <hr />
                    <div className="header-address">
                    Sudah Terbukti dan Teruji
                    </div>
                </div>
                </div>

                <div className="col-md-3">
                <div
                    className="d-none d-md-block d-lg-block"
                    style={{ marginTop: "60px" }}
                ></div>
                <form
                    className="d-flex"
                    action="#"
                    method="GET"
                >
                    <input
                    className="form-control border-0 me-2"
                    type="search"
                    name="q"
                    placeholder="cari sesuatu..."
                    aria-label="Search"
                    />
                    <button className="btn btn-primary-dark" type="submit" style={{ backgroundColor: '#005005',borderColor: '#005005',color: 'white' }}>
                    CARI
                    </button>
                </form>
                </div>
            </div>
            </div>
        </div>
        <nav className="navbar navbar-expand-md navbar-light navbar-blue nav-web">
            <div className="container">
            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarCollapse"
                aria-controls="navbarCollapse"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
                <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item ms-2">
                    <Link
                    className={
                        activeRoute[1] === ""
                        ? "nav-link active text-uppercase"
                        : "nav-link text-uppercase"
                    }
                    to="/"
                    >
                    <i className="fa fa-home"></i> Beranda
                    </Link>
                </li>

                
                {/* <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle ms-2" data-bs-toggle="dropdown" role="button" aria-expanded="false"><i className="fa fa-info-circle"></i>  PRODUK</a>
                    <ul class="dropdown-menu">
                        <li className="nav-item ms-2 me-2">
                            <Link
                            className={
                                activeRoute[1] === "savings"
                                ? "nav-links active text-uppercase"
                                : "nav-links text-uppercase"
                            }
                            to="/savings"
                            >
                            <i className="fa fa-info-circle"></i> Simpanan
                            </Link>
                        </li>
                        <li className="nav-item ms-2 me-2 mt-1">
                            <Link
                            className={
                                activeRoute[1] === "finances"
                                ? "nav-links active text-uppercase"
                                : "nav-links text-uppercase"
                            }
                            to="/finances"
                            >
                            <i className="fa fa-info-circle"></i> Pembiayaan
                            </Link>
                        </li>

                    </ul>
                </li> */}

                <li class="nav-item dropdown ms-2">
                    <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false"> <i class="fa-solid fa-cart-shopping"></i> PRODUK</a>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="/savings">SIMPANAN</a></li>
                        <li><a class="dropdown-item" href="/finances">PEMBIAYAAN</a></li>
                    </ul>
                </li>

                <li className="nav-item ms-2">
                    <Link
                    className={
                        activeRoute[1] === "posts"
                        ? "nav-link active text-uppercase"
                        : "nav-link text-uppercase"
                    }
                    to="/posts"
                    >
                    <i className="fa fa-book"></i> Berita
                    </Link>
                </li>

                <li className="nav-item ms-2">
                    <Link
                    className={
                        activeRoute[1] === "ziswafs"
                        ? "nav-link active text-uppercase"
                        : "nav-link text-uppercase"
                    }
                    to="/ziswafs"
                    >
                    <i className="fa-solid fa-hand-holding-medical"></i> BAITUL MAAL
                    </Link>
                </li>
                <li className="nav-item ms-2">
                    <Link
                    className={
                        activeRoute[1] === "layanans"
                        ? "nav-link active text-uppercase"
                        : "nav-link text-uppercase"
                    }
                    to="/layanans"
                    >
                    <i class="fa-solid fa-fire"></i> Layanan Digital
                    </Link>
                </li>

                <li className="nav-item ms-2">
                    <Link
                    className={
                        activeRoute[1] === "products"
                        ? "nav-link active text-uppercase"
                        : "nav-link text-uppercase"
                    }
                    to="/products"
                    >
                    <i className="fa fa-shopping-bag"></i> Produk UMKM
                    </Link>
                </li>

                <li className="nav-item ms-2">
                    <Link
                    className={
                        activeRoute[1] === "photos"
                        ? "nav-link active text-uppercase"
                        : "nav-link text-uppercase"
                    }
                    to="/photos"
                    >
                    <i className="fa fa-images"></i> Galeri
                    </Link>
                </li>

                <li className="nav-item ms-2">
                    <Link
                    className={
                        activeRoute[1] === "pages"
                        ? "nav-link active text-uppercase"
                        : "nav-link text-uppercase"
                    }
                    to="/pages"
                    >
                    <i className="fa fa-info-circle"></i> Tentang Kami
                    </Link>
                </li>

                <li className="nav-item ms-2">
                    <Link
                    className={
                        activeRoute[1] === "aparaturs"
                        ? "nav-link active text-uppercase"
                        : "nav-link text-uppercase"
                    }
                    to="/aparaturs"
                    >
                    <i class="fa-solid fa-business-time"></i> Karir
                    </Link>
                </li>
                <li class="nav-item dropdown ms-2">
                    <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false"> <i class="flag-icon flag-icon-idn"></i></a>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#"><i class="flag-icon flag-icon-idn"></i>  Indonesia</a></li>
                        <li><a class="dropdown-item" href="#"><i class="flag-icon flag-icon-eng"></i>  English</a></li>
                        <li><a class="dropdown-item" href="#"><i class="flag-icon flag-icon-chn"></i>  Mandarin</a></li>
                        <li><a class="dropdown-item" href="#"><i class="flag-icon flag-icon-sau"></i>  Arab</a></li>
                    </ul>
                </li>
                
                </ul>
            </div>
            </div>
        </nav>
        </>
    );
}