fetch("./archivo.JSON")
  .then(response => response.json())
  .then(menu => {
    miPrograma(menu)
  })

function miPrograma(menu) {

  let div = document.getElementById("cuadroDeCompras")

  function mostrar(alimento) {
    // div.className= "cuadroDeCompras"
    // acaCarrito.className="hidden"
    div.innerHTML = " "

    for (let index = 0; index < alimento.length; index++) {
      div.innerHTML += `
    <div class="card fondoCard1" style="width: 18rem;">
      <img class="card-img-top" src="${alimento[index].imgUrl}" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">${alimento[index].nombre}</h5>
        <p class="card-text">Su precio es: ${alimento[index].precio}</p>
        <button type="button" id="${alimento[index].id}" class="btn btn-primary boton">Añadir al pedido</button>
      </div>
    </div>
    `
    }
    let botones = document.getElementsByClassName('boton')

    for (const boton of botones) {
      boton.addEventListener("click", agregarAlCarrito)
    }
  }

  mostrar(menu)

  // todo de vegano
  let botonTodo = document.getElementById("todo")
  botonTodo.onclick = () => { 
    mostrar(menu) 
    div.className= "cuadroDeCompras"
    acaCarrito.className="hidden"
  }

  let botonVegano = document.getElementById("botonVegano")
  let vegano = menu.filter((alimento) => (alimento.vegana == true))
  botonVegano.onclick = () => { mostrar(vegano) }
  botonVegano.addEventListener("mouseover", function () {
    botonVegano.classList.add("fondo")
    div.className= "cuadroDeCompras"
    acaCarrito.className="hidden"
  })

  // todo de carne

  let botonCarne = document.getElementById("botonCarne")

  let carne = menu.filter((alimento) => (alimento.vegana == false))
  botonCarne.onclick = () => { mostrar(carne) }
  botonCarne.addEventListener("mouseover", function () {
    botonCarne.classList.add("fondo2")
    div.className= "cuadroDeCompras"
    acaCarrito.className="hidden"
  })

  // carrito
  function agregarAlCarrito(e) {

    let pedidoBuscado = menu.find(alimento => alimento.id == e.target.id)
    let posicionBuscada = carrito.findIndex(alimento => alimento.id == pedidoBuscado.id)
    if (posicionBuscada != -1) {
      Toastify({
        text: "Has añadido otra unidad al carrito",
        className: "info",
        style: {
          background: "#BE1F0A",
          border: "black 2px solid"
        }
      }).showToast();
      carrito[posicionBuscada].unidades++
      carrito[posicionBuscada].precioTotal = carrito[posicionBuscada].unidades * carrito[posicionBuscada].precioPorUnidad
    } else {
      Toastify({
        text: "Has añadido un producto al carrito",
        className: "info",
        style: {
          background: "#BE1F0A",
          border: "black 2px solid"
        }
      }).showToast();
      carrito.push({ id: pedidoBuscado.id, nombre: pedidoBuscado.nombre, precioPorUnidad: pedidoBuscado.precio, unidades: 1, precioTotal: pedidoBuscado.precio })
    }
    localStorage.setItem("carrito", JSON.stringify(carrito))
    mostrarCarrito()
  }

  let cajaDeCarrito = document.getElementById("cajaDeCarrito")
  let total = 0

  function mostrarCarrito() {
    cajaDeCarrito.innerHTML = ""
    for (let index = 0; index < carrito.length; index++) {
      cajaDeCarrito.innerHTML +=
        `<li>Pediste ${carrito[index].unidades} de ${carrito[index].nombre} y el precio es ${carrito[index].precioTotal}</li> 
    <br>`

    }
    total = carrito.reduce((acc, valorTotal) => acc + valorTotal.precioTotal, 0
    )
    cajaDeCarrito.innerHTML += `<br><p>Total a pagar $${total} <p>
 <br>`

  }


  // if (localStorage.getItem("carrito")) {
  //   carrito = JSON.parse(localStorage.getItem("carrito"))
  //   mostrarCarrito()
  // } else { carrito = [] }

  let botonComprar = document.getElementById("botonComprar")
  botonComprar.addEventListener("click", comprar)

  function comprar() {
    if (total != 0) {
      Swal.fire({
        title: 'La compra se ha efectuado con exito.',
        showConfirmButton: false,
        imageUrl: './elisleno.png',
        imageHeight: 150,
        imageAlt: 'A tall image',
        timer: 1500,
        background: '#3d3d3d',
        color: 'coral',
      })
    }
    else if (total == 0) {
      Swal.fire({
        title: 'No has añadido nada al carrito',
        showConfirmButton: false,
        imageUrl: 'https://thumbs.dreamstime.com/b/historieta-triste-de-la-hamburguesa-43762532.jpg',
        imageHeight: 150,
        imageAlt: 'A tall image',
        timer: 1500,
        background: '#3d3d3d',
        color: 'coral',
      })
    }
    localStorage.clear()
    carrito = []
    cajaDeCarrito.innerHTML = ``
    total = 0
  }

  let botonCarrito = document.getElementById("botonCarrito")

  let acaCarrito = document.getElementById("acaCarrito")

  botonCarrito.addEventListener("click", nuevaFuncion)

  function nuevaFuncion() {
    div.className= "hidden"
    acaCarrito.className="acaCarrito"
  
  }


function ver (e) {
  mostrar(e)
  acaCarrito.className="hidden"
}
let carrito = []
  comprobar(carrito)
  function comprobar() {
      if (localStorage.getItem("carrito")) {
          carrito = JSON.parse(localStorage.getItem("carrito"))
          mostrarCarrito(carrito)
         
      } else {
        carrito=[]
        mostrarCarrito(carrito)
      }
  }

}
