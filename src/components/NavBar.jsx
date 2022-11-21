import React from "react";
import CartWidget from "./CartWidget";

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid d-flex flex-row mb-1">
                <a className="navbar-brand" href="#"><img src="images/logoazul.svg" alt="DLB" width="180" /></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" aria-current="page" href="#">Productos</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Nosotros</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Eventos</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="container justify-content-end m-5">
                <CartWidget />
            </div>
        </nav>
    )
}

export default NavBar;