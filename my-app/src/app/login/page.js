"use client";

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Login() {
  return (
    <section className="vh-100" style={{ backgroundColor: '#075E54' }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-2-strong" style={{ borderRadius: '1rem' }}>
              <div className="card-body p-5 text-center">

                <h3 className="mb-5">Log in</h3>

                <div className="form-outline mb-4">
                  <input type="email" id="typeEmailX-2" className="form-control form-control-lg" />
                  <label className="form-label" htmlFor="typeEmailX-2">Nombre</label>
                </div>

                <div className="form-outline mb-4">
                  <input type="password" id="typePasswordX-2" className="form-control form-control-lg" />
                  <label className="form-label" htmlFor="typePasswordX-2">Contrasena</label>
                </div>

                <button className="btn btn-success btn-lg btn-block" type="submit">Login</button>   

                <hr className="my-4" />


              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
