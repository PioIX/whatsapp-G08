/*
pantalla de inicio de sesión

- formulario donde el usuario ingresa su nombre de usuario y contraseña.
- "Login", la aplicación envía datos al servidor para verificar si son correctos. 
   Si lo son, el usuario es redirigido a otra página.
- Si el usuario no tiene una cuenta, puede hacer clic en "Registrarse" para
  crear una cuenta nueva.

*/

"use client";

const idUser = -1; // Variable inicial del ID del usuario
import 'bootstrap/dist/css/bootstrap.min.css'; // Estilos de Bootstrap
import '@fortawesome/fontawesome-free/css/all.min.css'; // Íconos de FontAwesome
import { useLogin } from '@/hooks/useLogin'; // Importa un hook personalizado para manejar el ID del usuario
import { useEffect } from 'react'; // Hook para ejecutar código al montar el componente

export default function Login() {
  const [idUser, setIdUser] = useLogin(); // Hook para acceder y actualizar el ID del usuario

  // Función para iniciar sesión
  async function login() {
    const username = document.getElementById("mail").value; // Obtiene el nombre de usuario del campo de entrada
    const password = document.getElementById("contrasena").value; // Obtiene la contraseña del campo de entrada
  
    if (!username || !password) { // Verifica si ambos campos están llenos
      alert("Por favor llena ambos campos.");
      return;
    }
  
    try {
      const response = await fetch('http://localhost:4000/login', { // Envía las credenciales al servidor
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.ok) { // Si el servidor confirma el acceso
        const result = await response.json();
        const idUser = result.user[0].ID_Usuario; // Guarda el ID del usuario
        document.cookie = `idUser=${idUser}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`; // Guarda el ID en una cookie
        window.location.href = '/prueba'; // Redirige a la página '/prueba'
      } else { // Si hay un error en la autenticación
        const error = await response.json();
        alert(error.error);
      }
    } catch (error) {
      console.error("Error en login: ", error);
    }
  }

  // Redirige si el usuario ya está conectado
  useEffect(() => {
    if (idUser) {
      window.location.href = '/whatsapp';
    }
  }, [idUser]);

  // Función para registrar un nuevo usuario
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

  // Interfaz del formulario de inicio de sesión
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
