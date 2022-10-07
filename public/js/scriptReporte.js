function horasMedioT() {
    const personalMedioT = document.getElementById("personalMedioT").value;
    const horasMedioT = document.getElementById("horasMedioT");
    horasMedioT.innerHTML = personalMedioT * 34;
    personal();
    horasEsperadas();
}

function horasCompletoT() {
    const personalCompletoT = document.getElementById("personalCompletoT").value;
    const horasCompletoT = document.getElementById("horasCompletoT");
    horasCompletoT.innerHTML = personalCompletoT * 48;
    personal();
    horasEsperadas();
}

function personal() {
    const personalMedioT = document.getElementById("personalMedioT").value;
    const personalCompletoT = document.getElementById("personalCompletoT").value;
    const totalPersonal = document.getElementById("totalPersonal");
    totalPersonal.innerHTML = parseInt(personalMedioT * 1) + parseInt(personalCompletoT * 1);
}

function horasEsperadas() {
    const personalMedioT = document.getElementById("personalMedioT").value;
    const personalCompletoT = document.getElementById("personalCompletoT").value;
    const horasEsperadas = document.getElementById("horasEsperadas");
    const horasVacaciones = document.getElementById("horasVacaciones").value;
    horasEsperadas.innerHTML = parseInt(personalCompletoT * 48) + parseInt(personalMedioT * 34) - parseInt(horasVacaciones * 1);
    eficiencia();
    if (horasEsperadas < 0){
        console.log("Negativo");
        alert("Las horas de vacaciones no pueden ser mayor que las horas esperadas");
    }
}

/*En construcción*/
function eficiencia() {
    const proporcion = document.getElementById("proporcion").value;
    const horasEsperadas = document.getElementById("horasEsperadas").value;
    const porcentajeEficiencia = document.getElementById("porcentajeEficiencia");
    porcentajeEficiencia.innerHTML = parseInt(horasEsperadas * 1) * parseInt(proporcion * 1);
}

/*let totalHoras = 0;
let celdasHorasReales = document.querySelectorAll('td + td');
for (let i = 0; i < celdasHorasReales.length; i++){
    total += parseInt(celdasHorasReales[i].firstChild.data);
}
let nuevaFila  = document.createElement('tr');
let celdaTotal = document.createElement('td');
let textoCeldaTotal = document.createTextNode('Total: ');
celdaTotal.appendChild(textoCeldaTotal);
nuevaFila.appendChild(celdaTotal);

let celdaValorTotal = document.createElement('td');
let textoCeldaValorTotal = document.createTextNode(total);
celdaValorTotal.appendChild(textoCeldaValorTotal);
nuevaFila.appendChild(celdaValorTotal);

document.getElementById('table').appendChild(nuevaFila);*/

window.addEventListener("load", function(){
    sumHoras();
})

function sumHoras(){
    let totalHoras = 0;
    const horasTrabajo = document.getElementById("horasTrabajo");
    for (let i = 0; i < horasTrabajo.rows; i++){
        console.log(horasTrabajo);
    }
}

function postNuevoReporte() {
    let proporcion = document.getElementById("proporcion");
    let porcentajeEficiencia = document.getElementById("porcentajeEficiencia");
    let personalMedioT = document.getElementById('personalMedioT');
    let personalCompletoT = document.getElementById('personalCompletoT');
    let horasVacaciones = document.getElementById('horasVacaciones');
    let descripcion = document.getElementById('descripcion');

    let ruta = "/reporte/registrarReporte";
    let data = {
        proporcion: proporcion.value,
        porcentajeEficiencia: porcentajeEficiencia.value,
        personalMedioT: personalMedioT.value,
        personalCompletoT: personalCompletoT.value,
        horasVacaciones: horasVacaciones.value,
        descripcion: descripcion
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
    window.location.href = '/reporte/nuevoReporte';
    }).catch(err => {
        console.log(err);
    });
      }