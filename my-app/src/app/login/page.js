"use client";

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Login() {

  async function login() {
    let user = getNombre();
    let password = GetContraseña();

    let usuariosExistentes = await usuariosDB();

    for (let i = 0; i < usuariosExistentes.length; i++) {
      if (usuariosExistentes[i].nombre == user) {
        if (usuariosExistentes[i].password == password) {
          usuarioLogueadoId = usuariosExistentes[i].id_usuario;
          changeScreen();
          return; // Salir de la función después de un inicio de sesión exitoso
        } else {
          alert("La contraseña es incorrecta");
          return; // Salir de la función después de un error de contraseña
        }
      }
    }

    // Si ningún usuario coincide, muestra el mensaje de error
    alert("Ese usuario no existe. Inicie el registro");
  }

  async function registro() {
    let usuariosExistentes = await usuariosDB();
    let user = getNombre();
    let password = GetContraseña();
  
    // Verificar si el usuario ya existe
    for (let i = 0; i < usuariosExistentes.length; i++) {
      if (user == usuariosExistentes[i].user) {
        alert("Este usuario ya existe. Aprete el boton ingresar");
        return;
      }
    }
  
    // Si no existe, registrar nuevo usuario
    let operacion = await registroUsuarios(user, password);
  
    if (operacion === true) {
      let usuariosExistentesActual = await usuariosDB();
      usuarioLogueadoId = usuariosExistentesActual[usuariosExistentesActual.length - 1].id_usuario;
      changeScreen();
    } else {
      alert("Hubo un error en el ingreso de datos");
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

                <button className="btn btn-success btn-lg btn-block" type="submit" style={{margin: '10px'}} onclick={login}>Login</button>
                <button className="btn btn-success btn-lg btn-block" type="submit" onclick={registro}>Registrarse</button>

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