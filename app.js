// Se crea la variable que va a contener el stock.
let stockProductos = [
    { id: 1, nombre: "PC Gaming R5 5600G", motherboard: "Gigabyte A520M", socket: "AM4", procesador: "Ryzen 5 5600G", tipoRam: "DDR4", gbRam: "16GB", velRam: "3200mhz", grafica: false, fuenteCertificada: true, wattsFuente: 650, precio: 90000, cantidad: 1, img: './images/pc.png' },
    { id: 2, nombre: "PC Gaming R7 5700G", motherboard: "Gigabyte B450M", socket: "AM4", procesador: "Ryzen 5 5700G", tipoRam: "DDR4", gbRam: "32GB", velRam: "3600mhz", grafica: "RTX 3060", fuenteCertificada: true, wattsFuente: 750, precio: 200000, cantidad: 1, img: './images/pc2.png' },
    { id: 3, nombre: "PC Athlon 3000G", motherboard: "Asus A320m-k", socket: "AM4", procesador: "Athlon 3000G", tipoRam: "DDR4", gbRam: "8GB", velRam: "2666mhz", grafica: false, fuenteCertificada: false, wattsFuente: 500, precio: 70000, cantidad: 1, img: './images/pc3.png' }
]




// Modal (menú desplegable contenedor de productos al presionar el boton de carrito)
const contenedorModal = document.getElementsByClassName('modal-contenedor')[0]
const botonAbrir = document.getElementById('boton-carrito')
const botonCerrar = document.getElementById('carritoCerrar')
const modalCarrito = document.getElementsByClassName('modal-carrito')[0]


botonAbrir.addEventListener('click', () => {
    contenedorModal.classList.toggle('modal-active')
})
botonCerrar.addEventListener('click', () => {
    contenedorModal.classList.toggle('modal-active')
})

contenedorModal.addEventListener('click', (event) => {
    contenedorModal.classList.toggle('modal-active')

})
modalCarrito.addEventListener('click', (event) => {
    //Cuando presiono sobre el modal se finaliza la propagacion del click a los elementos padre.
    event.stopPropagation()
})





// Se define el DOM
const contenedorProductos = document.getElementById('contenedor-productos')
const contenedorCarrito = document.getElementById('carrito-contenedor')
const botonVaciar = document.getElementById('vaciar-carrito')
const contadorCarrito = document.getElementById('contadorCarrito')
const cantidad = document.getElementById('cantidad')
const precioTotal = document.getElementById('precioTotal')
const cantidadTotal = document.getElementById('cantidadTotal')
const btnCarrito = document.getElementById('boton-carrito')





// Se define la variable que va a contener los productos que se vayan agregando al carrito
let carrito = []


document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})

// Se resetea el contador de productos del carrito y se llama a la función actualizarCarrito
botonVaciar.addEventListener('click', () => {
    carrito.length >= 1 ? (carrito.length = 0, toastVaciarCarrito()) : toastCarritoYaVacio()
    actualizarCarrito()
})

// Se crea el contenido de las cards mediante un bucle forEach.
stockProductos.forEach((producto) => {
    // Se crea el div que va a contener todo el contenido
    const div = document.createElement('div')
    div.classList.add('producto')
    // Se ingresa al div para agregarle el contenido llamando a las propiedades definidas en stockProductos.
    div.innerHTML = `
    <img src=${producto.img} class="img-fluid" alt="Computadora muy bonita, comprala :)">
    <h3 class="highlightedText">${producto.procesador}</h3>
    <p><strong class="darkHighlightedText">Socket:</strong> ${producto.socket}</p>
    <p><strong class="darkHighlightedText">Motherboard:</strong> ${producto.motherboard}</p>
    <p><strong class="darkHighlightedText">RAM:</strong> ${producto.gbRam}</p>
    <p><strong class="darkHighlightedText">Velocidad RAM:</strong> ${producto.velRam}</p>
    <div class="paddingBottom"></div>
    <div class="contenedorBotonAgregarCarrito">
    <button id="agregar${producto.id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>
    </div>
    `
    // Se agrega un nuevo div hijo a la etiqueta padre para que se repita la creación de otra card.
    contenedorProductos.appendChild(div)

    const boton = document.getElementById(`agregar${producto.id}`)

    //Se ejecuta el agregar el carrito con la id del producto.
    boton.addEventListener('click', () => {
        agregarAlCarrito(producto.id)
    })
})

//Se crea la función para agregar items al carrito.
const agregarAlCarrito = (prodId) => {

    //Aumenta la cantidad del item en vez de cargarlo nuevamente
    // Comprueba si el elemento ya existe en el carro
    const existe = carrito.some(prod => prod.id === prodId)

    //Si el producto seleccionado ya está en el carrito, actualizamos la cantidad en el modal.
    if (existe) {
        const prod = carrito.map(prod => {
            if (prod.id === prodId) {
                prod.cantidad++
            }
        })
        //En caso de que el producto no esté en el carrito, lo agregamos.
    } else {
        // Se busca la ID especificada en el array de stock, si se encuentra, se pushea al carrito
        const item = stockProductos.find((prod) => prod.id === prodId)
        carrito.push(item)
    }
    toastAgregadoAlCarrito()
    actualizarCarrito()
}


// Se crea la función para eliminar productos del carrito.
const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)


    //Busca el elemento del carrito y nos devuelve el índice correspondiente.
    const indice = carrito.indexOf(item)

    // Se le pasa el índice del elemento del carrito y se lo elimina.
    carrito.splice(indice, 1)
    toastEliminadoDelCarrito()
    actualizarCarrito()
    console.log(carrito)
}

// Se crea la función para actualizar el carrito cada vez que algo cambie.
const actualizarCarrito = () => {
    // Cada vez que se llame a actualizarCarrito se borra el nodo, después recorre el array para actualizarlo de nuevo y rellena con la nueva información.
    contenedorCarrito.innerHTML = ""


    //Por cada producto creamos un div con esta estructura y le agregamos un div hijo al modal mediante appendChild.
    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <p>${prod.nombre}</p>
        <p>Precio:$${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `

        contenedorCarrito.appendChild(div)

        // Se agrega al localStorage la variable carrito usando carrito como key y el JSON de carrito como valor.
        localStorage.setItem('carrito', JSON.stringify(carrito))

    })

    // Se actualiza el número del carrito dependiendo la cantidad de productos ingresados
    contadorCarrito.innerText = carrito.length
    // Si la longitud de carrito es mayor o igual a 1, entonces muestra el carrito, en cambio si la longitud es 0, oculta el carrito.
    carrito.length >= 1 ? btnCarrito.style.display = "block" : btnCarrito.style.display = "none"
    console.log(carrito)

    //Por cada producto que recorro en mi carrito, al acumulador (acc) le suma la propiedad precio, con el acumulador empezando en 0.
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)

}



// Librerías



// Toastify
// Se crea la función contenedora del toast que anuncia que el producto se agregó al carrito.
function toastAgregadoAlCarrito() {
    // Se muestra una notificación de que el producto fue agregado al carrito mediante la libreria toastify
    Toastify({
        text: "Producto agregado al carrito.",
        avatar: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/whatsapp/238/white-heavy-check-mark_2705.png",
        duration: 2000,
        stopOnFocus: false,
        className: "info",
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
    }).showToast();

}

// Se crea la función contenedora del toast que anuncia que el producto se eliminó del carrito.
function toastEliminadoDelCarrito() {
    Toastify({
        text: "Producto eliminado del carrito.",
        avatar: "https://cdn-0.emojis.wiki/emoji-pics/facebook/cross-mark-button-facebook.png",
        duration: 2000,
        stopOnFocus: false,
        className: "info",
        style: {
            background: "linear-gradient(to right, #FE8227, #FE2727)",
        }
    }).showToast();
}

// Se crea la función contenedora del toast que anuncia que se eliminaron todos los productos del carrito.
function toastVaciarCarrito() {
    Toastify({
        text: "Carrito vaciado con éxito.",
        avatar: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/lg/307/wastebasket_1f5d1-fe0f.png",
        duration: 2000,
        stopOnFocus: false,
        className: "info",
        style: {
            background: "linear-gradient(to right, #27E4FE, #278CFE)",
        }
    }).showToast();
}

// Toast para cuando el carrito ya está vacío y el usuario sigue intentando vaciarlo.
function toastCarritoYaVacio() {
    Toastify({
        text: "El carrito ya está vacio.",
        avatar: "https://emojipedia-us.s3.amazonaws.com/source/skype/289/question-mark_2753.png",
        duration: 2000,
        stopOnFocus: false,
        className: "info",
        style: {
            background: "linear-gradient(to right, #FFE000, #FFB900)",
        }
    }).showToast();
}