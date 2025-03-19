import React from 'react'
import c1 from '../Assets/c1.jpeg'
import c5 from '../Assets/c5.jpeg'
import c3 from '../Assets/c3.jpeg'
import c4 from '../Assets/c4.jpeg' 
import Navbar from '../Home/Navbar'
import Footer from '../Home/Footer'
function About() {
    return (
        <div>
            <Navbar />
            <section class="py-5">
                <div class="container-fluid">
                    <div class="row gx-4 align-items-center justify-content-between">
                        <div class="col-md-5 order-2 order-md-1">
                            <div class="mt-5 mt-md-0">
                                <span class="text-muted"></span>
                                <h2 class="display-5 fw-bold">About our College</h2>
                                <p class="lead">Welcome to St.Joseph's College (Arts & Science), a premier institution dedicated to academic excellence, innovation, and holistic development. Established in 1995, our college has been a center of learning, empowering students with knowledge, skills, and values to excel in their careers and contribute to society.</p>
                                <br/><br />
                               <h2> <b>Our Mission</b></h2>
                                <p class="lead">
                                We are dedicated to providing a holistic education that not only imparts academic knowledge but also nurtures critical thinking, leadership, and ethical values. Our mission is to inspire students to pursue their passions and make meaningful contributions to society.</p>
                            </div>
                        </div>
                        <div class="col-md-6 offset-md-1 order-1 order-md-2">
                            <div class="row gx-2 gx-lg-3">
                                <div class="col-6">
                                    <div class="mb-2"><img class="img-fluid rounded-3" src={c1} /></div>
                                </div>
                                <div class="col-6">
                                    <div class="mb-2"><img class="img-fluid rounded-3" src={c5} /></div>
                                </div>
                                <div class="col-6">
                                    <div class="mb-2"><img class="img-fluid rounded-3" src={c3} /></div>
                                </div>
                                <div class="col-6">
                                    <div class="mb-2"><img class="img-fluid rounded-3" src={c4} /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default About
