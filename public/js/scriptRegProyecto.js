const arrayColaboradores  = [];

function agregarColaborador(){
  const colaborador = document.getElementById("nombre");
  const colaboradorActual = colaborador.options[colaborador.selectedIndex];
  // aqui escribimos los nombres de los colaboradores
  const lista = document.getElementById("listaColabradores");
  lista.innerHTML = lista.innerHTML + '<div class="notification is-info is-light py-2 my-3 notificacionAgregarColab">' + colaboradorActual.innerHTML +' </div>';
  arrayColaboradores.push(colaboradorActual.value);
  console.log(arrayColaboradores);
}

function postProyecto(){

  let nombreP = document.getElementById("nombreP");
  let descripcion = document.getElementById("descripcion");
  let estatus = document.getElementById('estatus');
  let stackTecnologico = document.getElementById('stackTecnologico');
  let stakeholders = document.getElementById('stakeholders');

  let ruta = "/registrarProyecto/nuevo";
  let data = {
    nombreP: nombreP.value,
    descripcion: descripcion.value,
    arrayColaboradores: arrayColaboradores,
    estatus: estatus.value,
    stackTecnologico: stackTecnologico.value,
    stakeholders: stakeholders.value

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

