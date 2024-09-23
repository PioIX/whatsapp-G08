async function GetNombre() {
    //Llamo a un pedido Get del servidor
    const response = await fetch('http://localhost:3000/NombreGet',{
        method:"GET",
        headers: {
            "Content-Type": "application/json",
          },
    })

    console.log(response)
    const result = await response.json()
    console.log(result)

    document.getElementById("email").innerHTML = result.respuesta
}
async function GetContraseña() {
    //Llamo a un pedido Get del servidor
    const response = await fetch('http://localhost:3000/ContraseñaGet',{
        method:"GET",
        headers: {
            "Content-Type": "application/json",
          },
    })

    console.log(response)
    const result = await response.json()
    console.log(result)

    document.getElementById("password").innerHTML = result.respuesta
}

async function postNombre() {
    //Armo un objeto para mandarlo como formato JSON
    const data = {
        input : document.getElementById("email").value
    }

    //Envio un pedido POST con un JSON en el body
    const response = await fetch('http://localhost:3000/NombrePost',{
        method:"POST",
        headers: {
            "Content-Type": "application/json",
          },
        body:JSON.stringify(data),
    })

}

async function postContraseña() {
    //Armo un objeto para mandarlo como formato JSON
    const data = {
        input : document.getElementById("password").value
    }

    //Envio un pedido POST con un JSON en el body
    const response = await fetch('http://localhost:3000/ContraseñaPost',{
        method:"POST",
        headers: {
            "Content-Type": "application/json",
          },
        body:JSON.stringify(data),
    })

}