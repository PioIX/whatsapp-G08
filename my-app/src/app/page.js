"use client";

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Login() {
  async function login() {
    const username = document.getElementById("mail").value;
    const password = document.getElementById("contrasena").value;
  
    if (!username || !password) {
      alert("Por favor llena ambos campos.");
      return;
    }
  
    try {
      const response = await fetch('http://localhost:4000/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log(result);
        // Redirigir a /whatsapp
        window.location.href = '/whatsapp';
      } else {
        const error = await response.json();
        alert(error.error);
      }
    } catch (error) {
      console.error("Error en login: ", error);
    }
  }
  

  async function registro() {
    const username = document.getElementById("mail").value;
    const password = document.getElementById("contrasena").value;

    if (!username || !password) {
      alert("Por favor llena ambos campos.");
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/registro', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
      } else {
        const error = await response.json();
        alert(error.error);
      }
    } catch (error) {
      console.error("Error en registro: ", error);
    }
  }

  return (
    <section className="vh-100" style={{ backgroundColor: '#075E54' }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-2-strong" style={{ borderRadius: '1rem' }}>
              <div className="card-body p-5 text-center">
                <h3 className="mb-5">Log in</h3>
                <div className="form-outline mb-4">
                  <input type="email" id="mail" className="form-control form-control-lg" />
                  <label className="form-label" htmlFor="typeEmailX-2">Nombre</label>
                </div>
                <div className="form-outline mb-4">
                  <input type="password" id="contrasena" className="form-control form-control-lg" />
                  <label className="form-label" htmlFor="typePasswordX-2">Contraseña</label>
                </div>
                <button className="btn btn-success btn-lg btn-block" type="submit" style={{ margin: '10px' }} onClick={login}>Login</button>
                <button className="btn btn-success btn-lg btn-block" type="submit" onClick={registro}>Registrarse</button>
                <hr className="my-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
