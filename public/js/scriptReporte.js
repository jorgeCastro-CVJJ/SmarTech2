function horasMedioT() {
    const personalMedioT = document.getElementById("personalMedioT").value;
    const horasMedioT = document.getElementById("horasMedioT");
    horasMedioT.innerHTML = parseInt(personalMedioT) * 34;
    personal();
    horasEsperadas();
}

function horasCompletoT() {
    const personalCompletoT = document.getElementById("personalCompletoT").value;
    const horasCompletoT = document.getElementById("horasCompletoT");
    horasCompletoT.innerHTML = parseInt(personalCompletoT) * 48;
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
    //let porcentaje = document.getElementById("porcentaje");
    const horasEsperadas = Number(document.getElementById("horasEsperadas").innerHTML);
    const totalHorasReales = Number(document.getElementById("totalHorasReales").innerHTML);
    const porcentajeEficiencia = document.getElementById("porcentajeEficiencia");
    console.log(totalHorasReales);
    console.log(horasEsperadas);
    porcentajeEficiencia.innerHTML = totalHorasReales / horasEsperadas;

    
}

/*Row de total*/
window.addEventListener("load", function(){
    sumHoras();
})

function sumHoras(){
    console.log("sumHoras");
    horasTotales = 0;
    horasTotales2 = 0;
    console.log(nombreP);
    for (let proyecto of nombreP){
        let id = "horasTrabajo['" + proyecto + "']";
        let id2 = "horasReales['" + proyecto + "']";
        horasTotales += parseInt( document.getElementById(id).value );
        horasTotales2 += parseInt( document.getElementById(id2).value );
        totalHorasTrabajo.innerHTML = horasTotales;
        totalHorasReales.innerHTML = parseInt(horasTotales2 * 1);
    }
    console.log(typeof(totalHorasTrabajo));
    console.log(typeof(totalHorasTotales));
}

function postNuevoReporte() {
    let porcentaje = document.getElementById("porcentaje");
    let horasVacaciones = document.getElementById('horasVacaciones');
    let personalCompletoT = document.getElementById('personalCompletoT');
    let personalMedioT = document.getElementById('personalMedioT');
    let descripcion = document.getElementById('descripcion');
    let fechaInicio = document.getElementById('fechaInicio');
    let fechaFinal = document.getElementById('fechaFinal');

    let ruta = "/reporte/crearReporte";
    let data = {
        porcentaje: porcentaje.value,
        horasVacaciones: horasVacaciones.value,
        personalCompletoT: personalCompletoT.value,
        personalMedioT: personalMedioT.value,
        descripcion: descripcion.value,
        fechaInicio: fechaInicio.value,
        fechaFinal: fechaFinal.value
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

//Creacion de reporte
// function getPDF() {

// }