const arrayColaboradores  = [];
//let proyecto = null;


function agregarColaborador(){
  const colaborador = document.getElementById("nombre");
  const colaboradorActual = colaborador.options[colaborador.selectedIndex];
  // aqui escribimos los nombres de los colaboradores
  const lista = document.getElementById("listaColabradores");
  lista.innerHTML = lista.innerHTML + '<div class="notification is-info is-light py-2 my-3 notificacionAgregarColab">' + colaboradorActual.innerHTML +' </div>';
  arrayColaboradores.push(colaboradorActual.value);
}

function postTarea(){
  let nombreT = document.getElementById("nombreT");
  let horasRegistradas = document.getElementById("horasTrabajo");
  let nombreP = document.getElementById('buscar');
  // se cambia al hacer click en busqueda click
  let idProyecto = document.getElementById('idProyecto');

  let ruta = "/tarea/registrarTarea";
  let data = {
    nombreT: nombreT.value,
    horasRegistradas: horasRegistradas.value,
    arrayColaboradores: arrayColaboradores,
    nombreP: nombreP.value,
    idProyecto: idProyecto.value,
  }
  console.log(data);
  fetch(ruta, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body:JSON.stringify(data)
})
.then(response => response.json())
.then(response => {
  window.location.href = '/tarea/misTareas';
}).catch(err => {
    console.log(err);
});
}

function busquedaClick(event){
   // event target es una referencua al elemento que la activo
   //evento es el que llega por ser event listener
  const nombreProyecto = event.target.dataset.proyecto;
  // en nombreProyecto estou obteniendo el valor de los seleccionados
  // AL HACER CLICK SE OBTIENE EL VALOR OSEA EL NOMBRE
  document.getElementById("buscar").value = nombreProyecto;
  // DESPLIGA EL NOMBRE DEL PROYECTO SELECCIONADO
  console.log(nombreProyecto)
  // se despliega en la barra de buscar
  document.getElementById("listaProyectos").innerHTML = "";
  // guardar el id del proyecto
  // para la variable global guardar el proyecto al que se le hizo click
  //proyecto = event.target.dataset.proyectoID;
  let html = '';
  html += `<input type="hidden" name="idProyecto" id="idProyecto" value="${p.idProyecto}">`;
  //html += `<input type="text" name="nombreP" id="nombreP"  value="${p.nombreP}">`;    
  document.getElementById("listaProyectos").innerHTML = html;
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
            html += `<p class="card-header-title"  data-proyecto="${p.nombreP}" data-proyectoID=${p.idProyecto}>`;
            html += p.nombreP;
            html += '</p>';
            // html += `<input type="hidden" name="idProyecto" id="idProyecto"  value="${p.idProyecto}">`;
            // html += `<input type="text" name="nombreP" id="nombreP"  value="${p.nombreP}">`;       
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


function deshabilitarTarea() {
  if (document.getElementById("buscar").value==""
  || document.getElementById("nombreT").value==""
  || document.getElementById("horasTrabajo").value=="") {
    document.getElementById('submitTareabtn').disabled = true;
  }
  else {
    document.getElementById('submitTareabtn').disabled = false;
  }
}
document.getElementById("submitTareabtn").onclick = postTarea;
/*Llamada de funciones*/
document.getElementById("buscar").onkeyup = accion_asincrona;