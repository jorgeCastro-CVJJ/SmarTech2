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

  let ruta = "/proyecto/registrarProyecto";
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

    swal("¡Exito!", "Tarea creada correctamente", "success")

}).catch(err => {
    console.log(err);
});
}

const input = document.querySelector('input');

input.addEventListener('input',botonDeshabilitado);
/*nombreP.addEventListener('nombreP',botonDeshabilitado);
descripcion.addEventListener('descripcion',botonDeshabilitado);
estatus.addEventListener('estatus',botonDeshabilitado);
stackTecnologico.addEventListener('stackTecnologico',botonDeshabilitado);
stakeholders.addEventListener('stakeholders',botonDeshabilitado);*/

function botonDeshabilitado(){
  const nombreP = document.querySelector('nombreP');
  const descripcion = document.querySelector('descripcion');
  const estatus = document.querySelector('estatus');
  const stackTecnologico = document.querySelector('stackTecnologico');
  const stakeholders = document.querySelector('stakeholders');
  const submitbtn = document.getElementById('submitbtn');
  if (nombreP == "" || descripcion == "" || estatus == "" || stackTecnologico == "" || stakeholders == ""){
    submitbtn.disabled = true;
  } 
  else if (nombreP != "" || descripcion != "" || estatus != "" || stackTecnologico != "" || stakeholders != "") {
    submitbtn.disabled = false;
  }
}