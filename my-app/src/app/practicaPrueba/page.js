import { useState, useEffect } from "react";

// Recibe las props 'nombre' y 'foto' de un deportista y las muestra en la interfaz de usuario.
function Deportista({ nombre, foto }) {
  return (
    <>
      {/* Muestra el nombre del deportista en un párrafo */}
      <p>{nombre}</p>
      {/* Muestra la foto del deportista con una etiqueta <img> */}
      <img src={foto} alt={`${nombre}'s profile`} />
    </>
  );
}

// Componente principal que maneja la obtención de los datos de los deportistas desde el backend.
// Muestra la lista de deportistas y sus fotos en la interfaz de usuario.
export default function Practica() {
  // useState se usa para almacenar los datos obtenidos de los deportistas
  const [deportistas, setDeportistas] = useState([]);

  // Función para obtener los datos de los deportistas desde el servidor
  async function buscarDeportistas() {
    try {
      // Realiza una solicitud GET al backend para obtener la lista de deportistas
      const response = await fetch("http://localhost:3000/obtenerDeportistas", {
        method: "GET", // Solicitud de tipo GET
        headers: {
          "Content-Type": "application/json", // El tipo de contenido esperado es JSON
        },
      });

      // Verifica si la respuesta es exitosa (código de estado 2xx)
      if (!response.ok) {
        throw new Error("Error al obtener los deportistas");
      }

      // Convierte la respuesta del servidor a formato JSON
      const result = await response.json();
      console.log(result); // Imprime la respuesta para verificar los datos

      // Actualiza el estado con los deportistas obtenidos
      setDeportistas(result);
    } catch (error) {
      console.error('Error al obtener los deportistas:', error);
    }
  }

  // useEffect se ejecuta cuando el componente se monta por primera vez.
  // Llama a la función buscarDeportistas solo una vez después de que el componente se haya renderizado.
  useEffect(() => {
    buscarDeportistas(); // Llama a la función que obtiene los deportistas desde el backend
  }, []); // El array vacío [] asegura que solo se ejecute una vez al montar el componente

  return (
    <div>
      <h1>Deportistas</h1>
      {/* Mapea la lista de deportistas y los pasa al componente 'Deportista' */}
      <div id="deportistasList">
        {deportistas.map((deportista) => (
          // Pasamos 'nombre' y 'foto' como props a cada componente Deportista
          <Deportista
            key={deportista.id} // 'key' es necesaria para ayudar a React a identificar cada elemento
            nombre={deportista.nombre} // El nombre del deportista
            foto={deportista.fotoPerfil} // La foto del deportista, asumimos que el campo es 'fotoPerfil'
          />
        ))}
      </div>
    </div>
  );
}

/////////////////////////////////////////////BACKEND////////////////////////////////////////////////
//maneja la solicitud en el backend para obtener los deportistas
const obtenerDeportistas = async (req, res, db) => {
    try {
      //consulta a la base de datos para obtener los deportistas
      const [result] = await db.query('SELECT id, nombre, fotoPerfil FROM Deportistas');
      
      // Envía los datos obtenidos como respuesta en formato JSON
      res.status(200).json(result);
    } catch (error) {
      // Si hay un error, lo captura y responde con un mensaje de error
      console.error('Error al obtener los deportistas:', error);
      res.status(500).json({ message: 'Error al obtener los deportistas' });
    }
  };
  
  export default obtenerDeportistas;
  