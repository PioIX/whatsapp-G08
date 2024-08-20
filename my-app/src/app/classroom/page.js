"use client"

import Button from "@/components/button";
import Header from "@/components/Header"
import { useState } from "react";

export default function Home() {
    let [num, setNum] = useState(5);
    let [nombre, setNombre] = useState("Falta un nombre");
    let [cont, setCont] = useState("Resta")

    function incrementar(){
        let valor = cont
        if(valor == "Resta"){
            setNum(num -1)
        }
        else if(valor == "Suma"){
            setNum(num +1)
        }
        
    }

    function cambiarNombre(){
        let newNombre = document.getElementById("ingNombre").value
        setNombre(newNombre)
    }

    function tituloCheckbox(){
        let check = document.getElementById("checkbox").checked
        if (check == false) {
            setCont("Resta")
        }
        else if (check){
            setCont("Suma")
        }
    }

    //Siempre un componente tiene que devolver una etiqueta html
    return(
        <>
            <Header text = "Home"></Header>
            <h2 id="valorContador">Contador: {num}</h2>
            <Button onClick={incrementar} text="Incrementar"/> 
            <h2>Mi nombre es: {nombre}</h2>
            <input type="text" id="ingNombre" placeholder="Ingrese su nombre"></input>
            <Button onClick={cambiarNombre} text="Modificar"/>
            <Header text={cont}/>
            <input type="checkbox" id="checkbox" onChange={tituloCheckbox}></input>
        </>
    )
}