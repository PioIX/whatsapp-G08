/**3. Crear un componente Clase, que se utiliza para mostrar por pantalla las distintas horas de clase que
dicta cada docente. Por lo tanto, va a recibir por parámetros la hora de comienzo de la clase, la hora
de fin y el aula asignada al docente, que son tres textos. */

"use client"
import React from 'react';
import { useState, useEffect } from 'react';

export default function Clase({horacomienzo, horafin, aulaasignada}){
    return(
        <div>
            <h1>Clases</h1>
            <h3> hora de comienzo={horacomienzo}</h3>
            <h3>hora fin={horafin}</h3>
            <h3>aula asignada={aulaasignada}</h3>
            
        </div>
    )
}