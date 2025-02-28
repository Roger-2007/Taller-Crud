const { jsPDF }=window.jspdf;
const doc = new jsPDF()

const nombreProducto=document.getElementById("nombreProducto")
const precioProducto=document.getElementById("precioProducto")
const descripcionProducto=document.getElementById("descripcionProducto")
const imagenProducto=document.getElementById("imagenProducto")
const btnGuardar=document.getElementById("btnGuardar")
const btnPdf = document.getElementById("btnPdf")
const tabla = document.querySelector(".table tbody")
const inputBuscador=document.getElementById("inputBuscador")

btnGuardar.addEventListener("click",()=>{
   
   
    validarDatos()
    mostrarDatos()

    
})
document.addEventListener("DOMContentLoaded",()=>{
    mostrarDatos()
})

function validarDatos(){
    let producto
    if (nombreProducto.value && precioProducto.value && descripcionProducto.value && imagenProducto.value){
        
     producto = {
        nombre : nombreProducto.value,
        precio : precioProducto.value,
        descripcion : descripcionProducto.value,
        imagen : imagenProducto.value
    }

nombreProducto.value=""
precioProducto.value=""
descripcionProducto.value=""
imagenProducto.value=""
guardarProducto(producto)
    }
    else{
        alert("Todos los campos son obligatorios")
        return
    }
        

}

function guardarProducto(producto){
let productoPrevio =JSON.parse( localStorage.getItem("productos")) ||[]
productoPrevio.push(producto)
localStorage.setItem("productos",JSON.stringify(productoPrevio))
}

function mostrarDatos(){
   borrarTabla()
    let datos = JSON.parse(localStorage.getItem("productos")) || []
    datos.forEach((dato,i)=> {
       let fila = document.createElement("tr")
       fila.innerHTML=
        `<td class="align-middle">${i+1}</td>
        <td class="align-middle">${dato.nombre}</td>
        <td class="align-middle">${dato.precio}</td>
        <td class="align-middle">${dato.descripcion}</td>
<td class="align-middle"><img src="${dato.imagen}" width="30%"> </td>   
<td class="align-middle"><button onclick="actualizarDatos(${i})" class="btn btn-primary btnEditar">📝</button>     
<button onclick="eliminarDatos(${i})" class="btn btn-danger btnEliminar">❌</button></td>
        `
        tabla.appendChild(fila)
    });

}
function borrarTabla(){
    let datos = document.querySelectorAll("table tbody tr")
    datos.forEach((dato)=>{
        dato.remove()
    })
}

function eliminarDatos(i){
    let productos = JSON.parse(localStorage.getItem("productos"))||[]
    let confirmar = confirm(`¿Desea eliminar el producto: ${productos[i].nombre}`)
    if(confirmar){
        alert("Lo eliminaste")
    productos.splice(i,1)
    localStorage.setItem("productos",JSON.stringify(productos))
        mostrarDatos()
    }
}

function actualizarDatos(i){
    let btnActualizar=document.getElementById("btnActualizar")
    
    btnGuardar.classList.toggle("d-none")
btnActualizar.classList.toggle("d-none")
    let productos = JSON.parse(localStorage.getItem("productos"))||[]

nombreProducto.value = productos[i].nombre
precioProducto.value = productos[i].precio
descripcionProducto.value = productos[i].descripcion
imagenProducto.value = productos[i].imagen

btnActualizar.replaceWith(btnActualizar.cloneNode(true));
btnActualizar = document.getElementById("btnActualizar");

btnActualizar.addEventListener("click",function(){
    productos[i].nombre = nombreProducto.value 
    productos[i].precio = precioProducto.value
    productos[i].descripcion = descripcionProducto.value
    productos[i].imagen = imagenProducto.value
    localStorage.setItem("productos",JSON.stringify(productos))
  

alert("Se actualizaron los datos con exito")


  nombreProducto.value = ""
precioProducto.value = ""
descripcionProducto.value = ""
imagenProducto.value = ""   

btnGuardar.classList.toggle("d-none")
btnActualizar.classList.toggle("d-none")
mostrarDatos()
})
}



let buscarPor = document.getElementById("buscarPor")


let valorSelect=buscarPor.value

buscarPor.addEventListener("change",()=>{
  valorSelect = buscarPor.value

})



inputBuscador.addEventListener("input",()=>{

console.log(valorSelect);
    let inputBuscadorValue = inputBuscador.value.toLowerCase()
console.log(inputBuscadorValue);
let productos = JSON.parse(localStorage.getItem("productos"))||[]
let productosBuscados


if(valorSelect==="nombre"){
 productosBuscados = productos.filter(producto => producto.nombre.toLowerCase().includes(inputBuscadorValue))
console.log(productosBuscados);}
else if(valorSelect==="precio"){
     productosBuscados = productos.filter(producto => producto.precio.toLowerCase().includes(inputBuscadorValue))
console.log(productosBuscados);
}
else if(valorSelect==="descripcion"){
     productosBuscados = productos.filter(producto => producto.descripcion.toLowerCase().includes(inputBuscadorValue))
console.log(productosBuscados);
}
 

let datos = document.querySelectorAll("table tbody tr")
    datos.forEach((dato)=>{
        dato.remove()
    })

productosBuscados.forEach((dato,i)=> {
    let fila = document.createElement("tr")
    fila.innerHTML=
     `<td class="align-middle">${i+1}</td>
     <td class="align-middle">${dato.nombre}</td>
     <td class="align-middle">${dato.precio}</td>
     <td class="align-middle">${dato.descripcion}</td>
<td class="align-middle"><img src="${dato.imagen}" width="30%"> </td>   
<td class="align-middle"><button onclick="actualizarDatos(${i})" class="btn btn-primary btnEditar">📝</button>     
<button onclick="eliminarDatos(${i})" class="btn btn-danger btnEliminar">❌</button></td>
     `
     tabla.appendChild(fila)
 });
}


)

btnPdf.addEventListener("click",function(){
    let productos = JSON.parse(localStorage.getItem("productos"))||[]
   
    doc.setFontSize(26);  
    doc.text("Lista de Productos", 70, 15); 
    doc.setFontSize(14);
    const texto = productos.map(producto=>
       `Nombre del producto: ${producto.nombre} - Precio: ${producto.precio} - Descripcion: ${producto.descripcion}`
    ).join("\n\n")

    doc.text(texto, 10, 30);

    doc.save("productos.pdf");
})