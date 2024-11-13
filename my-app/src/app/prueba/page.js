/*
La funcionalidad principal de este componente es mostrar una lista de docentes y permitir la búsqueda del horario de un docente específico, todo 
conectado a un backend que proporciona los datos necesarios.

1. **Estados Locales (`useState`)**:
   - `docentes`: Almacena la lista de docentes obtenida desde el backend.
   - `horario`: Guarda el horario del docente buscado, si está disponible.
   - `apellidoDocente`: Almacena el apellido del docente ingresado por el usuario para la búsqueda.
   - `cargando`: Indica si la aplicación está en estado de carga (cuando se hace una solicitud al backend).

2. **Obtener la Lista de Docentes**:
   - Al montar el componente, el `useEffect` ejecuta la función `obtenerListado`, que hace una solicitud 
     al backend para obtener la lista completa de docentes. 
   - Los datos recibidos se guardan en el estado `docentes` y, mientras la solicitud está en curso, el estado 
     `cargando` se establece en `true` para mostrar un indicador de carga en la interfaz.

3. **Buscar el Horario de un Docente**:
   - La función `buscarHorario` envía una solicitud al backend usando el valor de `apellidoDocente` como 
     parámetro para encontrar el horario de clases de un docente específico.
   - Si la respuesta contiene datos, el primer horario encontrado se almacena en `horario`. Si no hay horarios 
     disponibles, `horario` se establece en `null`.

4. **Actualización del Apellido de Docente**:
   - La función `ponerApellido` captura el valor ingresado en el campo de texto (apellido del docente) y lo 
     guarda en `apellidoDocente`, permitiendo que el valor esté disponible para la búsqueda.

5. **Renderización de la Interfaz**:
   - Muestra la lista de docentes utilizando el componente `Docente` para cada elemento en `docentes`.
   - Incluye un campo de texto y un botón que permiten al usuario buscar el horario de un docente específico.
   - Si `cargando` es `true`, muestra un mensaje de carga para el usuario.
   - Si `horario` contiene información, muestra los detalles del horario usando el componente `Clase`.

Este diseño modular, que usa componentes como `Docente` y `Clase`, permite mantener el código organizado y 
facilita la reutilización en otros contextos. Además, el uso de `useEffect` para la carga inicial y `useState`
para el manejo del estado proporcionan una experiencia de usuario fluida.
*/

"use client";
import React, { useEffect, useState } from "react";
import Docente from "@/components/Docente";
import Clase from "@/components/Clase";

export default function Prueba() {
    // Aquí se crean estados locales:
    const [docentes, setDocentes] = useState([]); // Almacena la lista de docentes
    const [horario, setHorario] = useState(null); // Almacena el horario del docente (solo el primer curso)
    const [apellidoDocente, setApellidoDocente] = useState(""); // Almacena el apellido ingresado por el usuario
    const [cargando, setCargando] = useState(false); // Estado para indicar si los datos están cargando

    // Este `useEffect` se ejecuta al montar el componente y llama a la API para obtener la lista de docentes.
    useEffect(() => {
        const obtenerListado = async () => {
            setCargando(true); // Establecer el estado de carga a true
            try {
                const response = await fetch(`http://localhost:4000/docentes`);
                if (!response.ok) throw new Error("Error en la respuesta del servidor");
                const data = await response.json();
                setDocentes(data); // Guardamos los datos de docentes en el estado
                console.log('Lista de docentes:', data); // Para depuración
            } catch (error) {
                console.error('Error al obtener la lista de docentes:', error);
            } finally {
                setCargando(false); // Establecer el estado de carga a false una vez que la solicitud se complete
            }
        };
        obtenerListado(); // Llamada a la función de obtención de docentes
    }, []);

    // Función `buscarHorario` para obtener el horario del docente por su apellido
    const buscarHorario = () => {
        setCargando(true); // Establecer el estado de carga a true
        fetch(`http://localhost:4000/cursos?docente=${apellidoDocente}`)
            .then(response => {
                if (!response.ok) throw new Error("Error en la respuesta del servidor");
                return response.json();
            })
            .then(data => {
                if (data.length > 0) {
                    setHorario(data[0]); // Si se encuentran horarios, guarda el primero en `horario`
                } else {
                    console.log("No se encontraron horarios para el docente:", apellidoDocente);
                    setHorario(null); // Establece `horario` en null si no hay resultados
                }
            })
            .catch(error => console.error('Error al buscar el horario del docente:', error))
            .finally(() => setCargando(false)); // Establecer el estado de carga a false una vez que la solicitud se complete
    };

    // Esta función actualiza `apellidoDocente` con el valor del input cuando cambia.
    function ponerApellido(event){
        const valor = event.target.value;
        setApellidoDocente(valor);
    }

    // Aquí renderizamos el componente, incluyendo la lista de docentes y los elementos para buscar el horario de un docente específico.
    return (
        <>
            <h1>Prueba</h1>

            {
                // Muestra cada docente utilizando el componente `Docente`.
                docentes.map(docente => (
                    <Docente 
                        key={docente.id} 
                        nombre={docente.nombre} 
                        apellido={docente.apellido} 
                        materia={docente.materia} 
                    />
                ))
            }

            {/* Input y botón para buscar el horario del docente introducido */}
            <input 
                type="text" 
                placeholder="Apellido" 
                onChange={ponerApellido} 
            />
            <button onClick={buscarHorario}>Buscar Horarios de: {apellidoDocente}</button>
            <p>Apellido del Docente: {apellidoDocente}</p>

            {/* Si está cargando, mostramos un mensaje o spinner */}
            {cargando && <p>Cargando...</p>}

            {/* Si hay un horario disponible, muestra la información usando el componente `Clase` */}
            {horario && <Clase id={horario.id} inicio={horario.inicio} fin={horario.fin} aula={horario.aula} />}
        </>
    );
}

<Clase 
    id="clase-facon-001"
    inicio="08:00"      
    fin="09:30"         
    aula="Aula 101"     
/>

/**
 * Pregunta Teórica:
 * Convención de nomenclatura en React:
 * En React, los componentes se nombran utilizando la convención de PascalCase. Esto significa que cada palabra del nombre comienza con una letra mayúscula y las palabras se escriben sin espacios entre ellas, por ejemplo: `MiComponente`, `BotonDeEnvio`, `FormularioDeRegistro`.
 * 
 * ¿Por qué PascalCase?
 * La convención PascalCase es utilizada porque es fácil de leer y distinguir entre componentes React y otros elementos del código, como funciones o variables. En JavaScript, las variables y funciones generalmente se nombran en camelCase (primera letra en minúscula), por lo que al usar PascalCase para los componentes, podemos diferenciar fácilmente los componentes de otras entidades en el código. Además, React sigue esta convención como parte de su sintaxis, ya que los nombres de componentes deben comenzar con una letra mayúscula para ser considerados como componentes válidos por React.
 * 
 * ¿Por qué es importante mantener la convención en React?
 * Mantener una convención de nomenclatura consistente en React es esencial por varias razones:
 * 
 * 1. **Claridad y organización:** El uso de PascalCase facilita la lectura y comprensión del código, especialmente en proyectos grandes con muchos componentes.
 * 2. **Compatibilidad con JSX:** React necesita que los componentes comiencen con una letra mayúscula para poder distinguirlos de los elementos HTML nativos. Si no se sigue esta convención, React tratará el nombre del componente como una etiqueta HTML estándar, lo que puede causar errores de renderizado.
 * 3. **Mantenimiento del código:** Una convención clara y consistente ayuda a los desarrolladores a entender el propósito de cada archivo o clase rápidamente, facilitando el mantenimiento y la colaboración en equipo.
 * 4. **Mejores prácticas:** Seguir las convenciones estándar ayuda a que el código sea más fácil de seguir para otros desarrolladores que puedan trabajar en el proyecto en el futuro, ya que es un patrón ampliamente aceptado en la comunidad React.
 */
