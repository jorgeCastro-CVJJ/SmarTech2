const arrayColaboradores  = [];
// se cambia al hacer click en busqueda click
let proyecto = null;

function agregarColaborador(){
  const colaborador = document.getElementById("nombre");
  const colaboradorActual = colaborador.options[colaborador.selectedIndex];
  // aqui escribimos los nombres de los colaboradores
  const lista = document.getElementById("listaColabradores");
  lista.innerHTML = lista.innerHTML + '<div class="notification is-info is-light py-2 my-3 notificacionAgregarColab">' + colaboradorActual.innerHTML +' </div>';
  arrayColaboradores.push(colaboradorActual.value);
}

function postTarea(){
  console.log("entra");
  let nombreT = document.getElementById("nombreT");
  let horasRegistradas = document.getElementById("horasTrabajo");
  let nombreP = document.getElementById('buscar')
  let ruta = "/tarea/registrarTarea";
  let data = {
    nombreT: nombreT.value,
    horasRegistradas: horasRegistradas.value,
    arrayColaboradores: arrayColaboradores,
    nombreP: nombreP.value,
    idProyecto: proyecto
  }
  console.log(data)
  fetch(ruta, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body:JSON.stringify(data)
})
.then(response => response.json())
.then(response => {
    console.log(response);
    swal("¡Exito!", "Tarea creada correctamente", "success");
}).catch(err => {
    console.log(err);
});
}

function busquedaClick(event){
   // event target es una referencua al elemento que la activo
   //evento es el que llega por ser event listener
  const nombreProyecto = event.target.dataset.proyecto;
  document.getElementById("buscar").value = nombreProyecto;
  // se despliega en la barra de buscar
  document.getElementById("listaProyectos").innerHTML = "";
  // guardar el id del proyecto
  // para la variable global guardar el proyecto al que se le hizo click
  proyecto = event.target.dataset.proyectoID;
  console.log(proyecto);
}

const accion_asincrona = () => {
    const valor = document.getElementById('buscar').value;
    //función que manda la petición asíncrona
    fetch('/proyecto/buscar/' + valor, {
    method: 'GET',
    }).then(result => {
    return result.json(); //Regresa otra promesa
    }).then(data => {
    //Modificamos el DOM de nuestra página de acuerdo a los datos de la segunda promesa
      console.log(data);
      
      let html = '';
      if (data.proyecto.length > 0) {
        html = '';
          for (p of data.proyecto) {
            html += `<div class="card" id="drop-card">`;
            html += '<header class="card-header">';
            html += `<p class="card-header-title"  data-proyecto="${p.idProyecto}" data-proyectoID=${p.idProyecto}>`;
            html += p.nombreP;
            html += '</p>';
            html += '</header>';
            html += '</div>';
          }
      } else {
        html = '<h2>No hay proyectos registrados que coincidan con los criterios de búsqueda</h2>';
      }
        document.getElementById("listaProyectos").innerHTML = html;
        document
        .querySelectorAll("#drop-card")
        .forEach((agregar) => agregar.addEventListener("click", busquedaClick));
    }).catch(err => {
        console.log(err);
      });
};

document.getElementById('buscar').onkeyup = accion_asincrona
        