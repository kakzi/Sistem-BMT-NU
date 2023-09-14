import React from "react";

export default function footer() {
    return (
        <footer>
        <div className="container-fluid footer-top">
            <div className="row justify-content-center p-4">
            <div className="col-md-3 mb-4 mt-3">
                <h5>
                TENTANG
                <strong style={{ color: "#ffd22e" }}> BMT NU NGASEM</strong>
                </h5>
                <hr />
                <div className="text">
                <img src="/images/logobmt.png" width="110" />
                </div>
                <p className="text-justify mt-3">
                Lembaga Keuangan Syariah terbesar di Indonesia
                </p>
            </div>
            <div className="col-md-3 mb-4 mt-3">
                <h5>
                DOWNLOAD <strong style={{ color: "#ffd22e" }}> APLIKASI</strong>
                </h5>
                <hr />
                <div className="text-left">
                <img
                    src="/images/store.png"
                    width={"300"}
                    className="text-center align-items-center"
                />
                </div>
                <p className="text-justify mt-2 text-left">
                Dapatkan info update Desa lebih cepat melalui aplikasi Android.
                Silahkan unduh melalui PlayStore.
                </p>
            </div>
            <div className="col-md-3 mb-4 mt-3">
                <h5>
                KONTAK <strong style={{ color: "#ffd22e" }}>KAMI</strong>
                </h5>
                <hr />
                <p>
                <i className="fa fa-map-marker"></i> Jln. Raya Ngasem No.01 Ngasem Bojonegoro 62154
                <br />
                <br />
                <i className="fas fa-envelope"></i> bmtnungasem@gmail.com
                <br />
                <br />
                <i className="fas fa-phone"></i> (0353) 552187923
                </p>
            </div>
            </div>
        </div>
        <div className="container-fluid footer-bottom">
            <div className="row p-3">
            <div className="text-center text-white font-weight-bold">
                Copyright © 2023 BMT NU NGASEM. All Rights Reserved.
            </div>
            </div>
        </div>
        </footer>
    );
}