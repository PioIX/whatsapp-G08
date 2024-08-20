"use client"
import Button from "@/components/button"

//Componente FUNCTIONAL
export default function Ranking() {

    function funcio (){
        console.log("Buneass")
    }

    //Siempre un componente tiene que devolver una etiqueta html
    return(
        <>
            <h1>Ranking 1</h1>
            <h1>Ranking 2</h1>
            <h1>Ranking 3</h1>
            <h1>Ranking 4</h1>

            <Button onClick={funcio}></Button>

        </>
    )
}