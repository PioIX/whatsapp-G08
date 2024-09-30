"use client";

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@/app/chat/fetch'

export default function Login() {

  async function GetNombre() {
    //Llamo a un pedido Get del servidor
    const response = await fetch('http://localhost:4000/NombreGet', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    console.log(response)
    const result = await response.json()
    console.log(result)

    //document.getElementById("mail").innerHTML = result.respuesta
  }

  async function GetContraseña() {
    //Llamo a un pedido Get del servidor
    const response = await fetch('http://localhost:4000/ContraseñaGet', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    console.log(response)
    const result = await response.json()
    console.log(result)

    //document.getElementById("password").innerHTML = result.respuesta
  }

  async function login() {
    const username = document.getElementById("mail").value;
    const password = document.getElementById("contrasena").value;

    if (!username || !password) {
      alert("Please fill in both username and password");
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
        // Set the user's session here
        // ...
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function registro() {
    const username = document.getElementById("mail").value;
    const password = document.getElementById("contrasena").value;
  
    if (!username || !password) {
      alert("Please fill in both username and password");
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
        // Set the user's session here
        // ...
        changeScreen();
      } else {
        alert("Error registering user");
      }
    } catch (error) {
      console.error(error);
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
                <button type="submit" onClick={GetContraseña}></button>

                <hr className="my-4" />


              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



// cosas 

/** esto va en el layout
 * async function botonLogOut() {
    usuarioLogueadoId = 0
    screenLogin()   
    document.getElementById("username").value = ""
    document.getElementById("password").value = ""
    localStorage.clear();
    location.href = "index.html";
}

async function botonLogOutAdmin () {
    usuarioLogueadoId = 0
    changeScreenAdmin() 
    document.getElementById("username").value = ""
    document.getElementById("password").value = ""
    document.getElementById("dni").value = ""
}
 */