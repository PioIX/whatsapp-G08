/*Se desea crear un componente llamado Docente que va a mostrar tres campos de texto fijos, uno
será el nombre del docente, otro el apellido y el último la materia que dicta. Los tres campos los
debe recibir por propiedades.*/

"use client"
import React from 'react';
import { useState, useEffect } from 'react';

export default function Docente({nombre, apellido, materia}){
    return(
        <div>
            <h3> nombre={nombre}</h3>
            <h3>apellido={apellido}</h3>
            <h3>materia={materia}</h3>
            
        </div>
    )
}