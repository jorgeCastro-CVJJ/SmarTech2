const arrayColaboradores  = [];

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
  let nombreP = document.getElementById('nombreP')
  let ruta = "/registrarTarea/nueva";
  let data = {
    nombreT: nombreT.value,
    horasRegistradas: horasRegistradas.value,
    arrayColaboradores: arrayColaboradores,
    nombreP: nombreP.value
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

