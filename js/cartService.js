//Elementos del DOM que voy a usar
const cuentaCarritoElement = document.getElementById("cuenta-carrito");
//Agregar productos al carrito
function agregarAlCarrito(producto){
  //SweetAlert al agregar un producto al carrito
  Swal.fire({
    title: '¡Se agrego este producto al carrito!',
    text: `${producto.nombre} ha sido agregado al carrito.`,
    icon: 'success',
    confirmButtonText: 'Aceptar'
  });
  //Reviso si el producto esta en el carrito
  let memoria = JSON.parse(localStorage.getItem("suplementos"));
  let cantidadProductoFinal;
  //Si no hay localstorage lo creo
  if(!memoria || memoria.length === 0) {
    const nuevoProducto = getNuevoProductoParaMemoria(producto)
    localStorage.setItem("suplementos",JSON.stringify([nuevoProducto]));
    actualizarNumeroCarrito();
    cantidadProductoFinal = 1;
  }
  else {
    //Verifico si ya esta en el localstorage
    const indiceProducto = memoria.findIndex(suplemento => suplemento.id === producto.id)
    const nuevaMemoria = memoria;
    //Si el producto no esta lo agrego
    if(indiceProducto === -1){
      const nuevoProducto = getNuevoProductoParaMemoria(producto);
      nuevaMemoria.push(nuevoProducto);
      cantidadProductoFinal = 1;
    } else {
      //Si el producto ya esta le sumo cantidad
      nuevaMemoria[indiceProducto].cantidad ++;
      cantidadProductoFinal = nuevaMemoria[indiceProducto].cantidad;
    }
    localStorage.setItem("suplementos",JSON.stringify(nuevaMemoria));
    actualizarNumeroCarrito();
    return cantidadProductoFinal;
  }
}

//Restar unidad del carrito
function restarAlCarrito(producto){
  let memoria = JSON.parse(localStorage.getItem("suplementos"));
  let cantidadProductoFinal = 0;
  const indiceProducto = memoria.findIndex(suplemento => suplemento.id === producto.id)
  let nuevaMemoria = memoria;
  nuevaMemoria[indiceProducto].cantidad--;
  cantidadProductoFinal = nuevaMemoria[indiceProducto].cantidad;
  if(cantidadProductoFinal === 0){
    nuevaMemoria.splice(indiceProducto,1)
  };
  localStorage.setItem("suplementos",JSON.stringify(nuevaMemoria));
  actualizarNumeroCarrito();
  return cantidadProductoFinal;
}

// agrega cantidad
function getNuevoProductoParaMemoria(producto){
  const nuevoProducto = producto;
  nuevoProducto.cantidad = 1;
  return nuevoProducto;
}

//Actualizamos el numero del carrito
function actualizarNumeroCarrito(){
  let cuenta = 0;
  const memoria = JSON.parse(localStorage.getItem("suplementos"));
  if(memoria && memoria.length > 0){
    cuenta = memoria.reduce((acum, current)=>acum+current.cantidad,0)
    return cuentaCarritoElement.innerText = cuenta;
  }
  cuentaCarritoElement.innerText = 0;
}

//Reiniciar carrito
function reiniciarCarrito(){
  localStorage.removeItem("suplementos");
  actualizarNumeroCarrito();
}


actualizarNumeroCarrito();