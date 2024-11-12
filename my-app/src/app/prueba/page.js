"use client"
import React, { useEffect, useState } from "react";
import Docente from "@/components/Docente";
import Clase from "@/components/Clase";

/**Cuando se abra la página por primera vez, se debe realizar un pedido FETCH para obtener el listado
de docentes. Este será un pedido tipo GET que devuelve un vector de docentes, con sus nombres,
apellido y materia que dicta. Una vez obtenido el vector, muéstrelo en consola para evaluar cómo es
el vector de objetos que recibe.
La dirección IP será proporcionada por los docentes. El puerto será el 4000. La URL del pedido GET es
“/docentes”.
CONSEJO: También podrían probar de realizar el pedido GET con el navegador para visualizar el
objeto que les devuelve, para descartar problemas en su código. 
---------------------------------------------------------------------------------------------------------------------
Dentro de la página principal figura la lista de docentes obtenida desde el backend, un input y un
botón. En el input el Carra va a ingresar el apellido EXACTO del docente que quiere conocer sus
horarios. Una vez que presione el botón, se realiza el pedido FETCH para obtener estos horarios con
el apellido ingresado en el input.
----------------------------------------------------------------------------------------------------------------------
El pedido FETCH para obtener horarios es un GET o un POST (para facilidad de los alumnos el
backend responde ambos) al que se le debe pasar como parámetro “docente” el apellido del
docente que se quiere consultar. Ej: docente: “Facón”
La URL del pedido es “/cursos”
De la respuesta, SOLO QUEREMOS VER EL PRIMER HORARIO DEL DOCENTE. Por lo tanto, solo se
renderizará UN componente Clase con UN horario de docente (el que quieran).
Una respuesta a esta consulta sería un vector de objetos con los siguientes dos objetos:
-----------------------------------------------------------------------------------------------------------------------*/
export default function Prueba(){
    const[docente, setDocentes] = useState([])
    const[curso, setCursos] = useState([])
    
    function obtenerListado(){
        fetch(`http://localhost:4000/docentes`)
        .then(response => response.json())
        .then(data => {
        setDocentes(data); // Suponiendo que la respuesta es un array de chats        
        console.log('Lista de docentes:', data); // Para depuración
        return true
      })
      .catch(error => console.error('Error al obtener la lista de docentes:', error));
    }

    useEffect(() => {
        if(obtenerListado() == true){
            console.log(data)
        }
    }, [])    
    
    function buscar(){
        fetch(`http://localhost:4000/cursos`)
        .then(response => response.json())
        .then(data => {
        setCursos(data); // Suponiendo que la respuesta es un array de chats        
        console.log('Lista de cursos:', data); // Para depuración
        return true
    })
}
    return(
        <>
            <h1>Prueba</h1>
            <Docente/>
            {curso.length > 0 &&
                <Clase nombre={curso[0].apellido} />
            }
            <input type="text" />
            <button type="submit" style={{ margin: '10px' }} onClick={buscar} >buscar </button>

        </>
    )
}