/*
Este código implementa una interfaz de usuario en React que muestra una lista de deportistas,
obteniendo sus datos desde un backend. Utiliza los hooks `useState` y `useEffect` para manejar 
el estado y el ciclo de vida del componente principal `Practica`.

Explicación detallada:
1. Componente `Deportista`: 
   - Recibe dos props (`nombre` y `foto`) y los renderiza, mostrando el nombre en un párrafo
     y la foto en una etiqueta `<img>`.

2. Componente `Practica`:
   - Define el estado `deportistas` para almacenar la lista de deportistas obtenida desde el backend.
   - La función `buscarDeportistas` realiza una solicitud HTTP GET al backend para obtener los datos 
     de los deportistas. Si la solicitud es exitosa, los datos en JSON se guardan en el estado `deportistas`.
   - El `useEffect` llama a `buscarDeportistas` cuando el componente se monta, iniciando la carga de datos.
   - Luego, el componente renderiza un título y mapea la lista de deportistas, pasando cada uno como props 
     al componente `Deportista`.

3. Backend (explicado en la sección de código correspondiente):
   - La función `obtenerDeportistas` en el backend gestiona la solicitud para obtener datos desde una base de datos.
   - Realiza una consulta a la base de datos para obtener la lista de deportistas, y responde en formato JSON,
     enviando los datos al frontend para ser mostrados en la interfaz de usuario.
*/

/* 
Explicación de `useEffect`, `useState` y `map`:

1. `useState`:
   - Es un hook en React que permite manejar el estado dentro de un componente funcional.
   - Recibe un valor inicial y devuelve un array con dos elementos: el estado actual y una función para actualizarlo.
   - En este código, `useState` se usa para crear el estado `deportistas`, que almacena la lista de deportistas 
     obtenida del backend, permitiendo que se reactive el componente al cambiar el estado.

2. `useEffect`:
   - Es un hook que permite realizar efectos secundarios en componentes funcionales.
   - Ejecuta una función después de que el componente ha sido renderizado. Al recibir un array de dependencias,
     `useEffect` controla cuándo debe ejecutarse la función: 
     - Un array vacío (`[]`) ejecuta el efecto solo una vez, al montar el componente.
   - En este código, `useEffect` llama a la función `buscarDeportistas` solo una vez al cargar el componente, 
     para hacer la solicitud al backend y llenar el estado `deportistas`.

3. `map`:
   - Es un método de arrays en JavaScript que permite transformar y recorrer cada elemento de un array,
     devolviendo un nuevo array con los elementos transformados.
   - Aquí, `map` se usa para iterar sobre `deportistas`, creando un componente `Deportista` para cada elemento,
     pasando `nombre` y `foto` como props, y asegurando que cada elemento tenga una `key` única para optimizar 
     la renderización en React.
*/

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
  