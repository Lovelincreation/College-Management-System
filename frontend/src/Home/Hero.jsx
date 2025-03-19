import React from 'react'
import { Link, useLocation } from "react-router-dom";
import Navbar from './Navbar';


function Hero() {
  return (
    <div>
      <Navbar />
      <section class="bsb-hero-5 px-3 bsb-overlay" style={{ backgroundImage: "url('https://dial4college.blr1.cdn.digitaloceanspaces.com/pro/1493/gallery/4LPWXM6JU01PWCXN.jpeg')", paddingLeft: "1rem", paddingRight: "1rem", position: "relative" }}>

        <div class="container">
          <div class="row justify-content-md-center align-items-center">
            <div class="col-12 col-md-11 col-lg-9 col-xl-8 col-xxl-7">
              <h2 class="display-1 text-white text-center fw-bold mb-4">Welcome to St.Josephs College</h2>
              <p class="lead text-white text-center mb-5 d-flex justify-content-sm-center">
                <span class="col-12 col-sm-10 col-md-8 col-xxl-7">The Way to Achive the Goals with the help of qualified & experienced Education system . </span>
              </p>
              <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
                <Link to="/login" className="nav-link">
                  <button type="button" class="btn btn btn-primary bsb-btn-2xl btn-outline-light">Login</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Hero
