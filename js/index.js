const contenedorTarjetas = document.getElementById("productos-container");

// Función para obtener productos desde el archivo JSON
async function obtenerProductos() {
  try {
    const response = await fetch('/suplementos.json');
    if (!response.ok) {
      throw new Error('Error al cargar los productos');
    }
    const productos = await response.json();
    crearTarjetasProductosInicio(productos);
  } catch (error) {
    console.error(error);
  }
}

// Creamos las tarjetas del JSON
function crearTarjetasProductosInicio(productos) {
  productos.forEach(producto => {
    const nuevoSuplemento = document.createElement("div");
    nuevoSuplemento.classList = "tarjeta-producto";
    nuevoSuplemento.innerHTML = `
    <img src="./img/productos/${producto.id}.jpg" alt="${producto.nombre}">
    <h3>${producto.nombre}</h3>
    <p class="precio">$${producto.precio}</p>
    <button>Agregar al carrito</button>`;
    contenedorTarjetas.appendChild(nuevoSuplemento);
    nuevoSuplemento.getElementsByTagName("button")[0].addEventListener("click", () => agregarAlCarrito(producto));
  });
}

// Llamar a la función para obtener productos
obtenerProductos();