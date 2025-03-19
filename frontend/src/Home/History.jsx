import React from 'react';
import achieve from '../Assets/achieve.png';
import achieve1 from '../Assets/achieve1.avif';
// import './animate.css'; // For animations

function History() {
  return (
    <div className="container my-5">
      {/* Title */}
      <div className="text-center mb-4 animate__animated animate__fadeIn">
        <h2 className="fw-bold text-secondary display-4">History of St. Joseph's College</h2>
        <p className="text-muted fs-5">A legacy of excellence, empowerment, and transformation.</p>
      </div>

      {/* History Section */}
      <div className="row align-items-center animate__animated animate__fadeInUp">
        <div className="col-lg-6">
          <p className="fs-5">
            <strong>St. Joseph's College (Arts & Science)</strong>, located in Kovur, Chennai, is a co-educational Christian 
            institution established in 1994. In 2004, the college was taken over by 
            <strong> Rev. Fr. Dr. J.E. Arul Raj OMI</strong> and is now managed by the <strong>DMI Sisters</strong>. 
            The institution operates under the <em>Society for Education for Life</em> and is affiliated with the 
            <strong> University of Madras</strong>.
          </p>
          <p className="fs-5">
            🏆 The college is accredited by <strong>NAAC</strong> with an <strong>'A' Grade</strong> and holds 
            <strong> 2(f) status</strong> under the <strong>UGC Act of 1956</strong>. Additionally, it is an 
            <strong> ISO 21001:2018</strong> certified institution, ensuring top-tier education standards.
          </p>
          <p className="fs-5">
            🌟 <strong>Our Vision:</strong> The college is committed to fostering self-discipline, technical proficiency, 
            and a strong sense of responsibility, particularly among marginalized communities, shaping individuals 
            who contribute positively to society.
          </p>
        </div>

        {/* Image Section */}
        <div className="col-lg-6 text-center">
          <img 
            src={achieve} 
            alt="College Achievements" 
            className="img-fluid rounded shadow-lg animate__animated animate__zoomIn"
            style={{ maxWidth: '90%' }}
          />
        </div>
      </div>

      {/* Academic Offerings */}
      <div className="bg-gradient-primary p-4 mt-5 rounded shadow animate__animated animate__fadeIn">
        <h3 className="text-center text-black mb-3">🎓 Academic Offerings</h3>
        <p className="fs-5 text-center text-black">
          We offer a variety of undergraduate and postgraduate programs across disciplines such as 
          <strong> Science, Arts, Humanities, Social Sciences, Management,</strong> and <strong> Business Administration</strong>.
        </p>
        <div className="row text-center">
          <div className="col-md-6">
            <p className="fs-5 text-black">📚 <strong>Undergraduate:</strong> B.Sc., B.A., B.Com., B.C.A., B.B.A.</p>
          </div>
          <div className="col-md-6">
            <p className="fs-5 text-black">🎓 <strong>Postgraduate:</strong> M.A., M.Sc., M.S.W., M.Com.</p>
          </div>
        </div>
      </div>

      {/* Success Metrics Section */}
      <section className="bg-light py-5 mt-5 rounded shadow animate__animated animate__fadeInUp">
        <div className="container text-center">
          <h3 className="fs-6 text-secondary text-uppercase">Our Success</h3>
          <h2 className="mb-4 display-5">We have a proven track record of excellence.</h2>
          <hr className="w-50 mx-auto mb-5 border-dark-subtle" />

          <div className="row gy-4 align-items-center">
            {/* Success Metrics */}
            <div className="col-md-6">
              <img className="img-fluid rounded animate__animated animate__zoomIn" src={achieve1} alt="Success" loading="lazy" />
            </div>
            <div className="col-md-6">
              <div className="row gy-4">
                <div className="col-sm-6">
                  <div className="card border-0 shadow-sm mb-4 animate__animated animate__fadeInLeft">
                    <div className="card-body text-center p-4">
                      <h3 className="display-2 fw-bold mb-2 text-secondary">200+</h3>
                      <p className="fs-5 text-dark">Finished Projects</p>
                    </div>
                  </div>
                  <div className="card border-0 shadow-sm animate__animated animate__fadeInLeft">
                    <div className="card-body text-center p-4">
                      <h3 className="display-2 fw-bold mb-2 text-secondary">10k+</h3>
                      <p className="fs-5 text-dark">Events</p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="card border-0 shadow-sm mb-4 animate__animated animate__fadeInRight">
                    <div className="card-body text-center p-4">
                      <h3 className="display-2 fw-bold mb-2 text-secondary">5k+</h3>
                      <p className="fs-5 text-dark">Placed Students</p>
                    </div>
                  </div>
                  <div className="card border-0 shadow-sm animate__animated animate__fadeInRight">
                    <div className="card-body text-center p-4">
                      <h3 className="display-2 fw-bold mb-2 text-secondary">78</h3>
                      <p className="fs-5 text-dark">Awards</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <div className="text-center mt-5 animate__animated animate__fadeIn">
        <h4 className="fw-bold">🔍 Explore More!</h4><br />
        <p className="fs-5 text-muted">Watch our video for an insightful glimpse into our history and achievements.</p>
        <button className="btn btn-primary btn-lg animate__animated animate__pulse animate__infinite">Watch Now</button>
      </div>
    </div>
  );
}

export default History;