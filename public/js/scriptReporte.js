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
    console.log("Funciona")
    const proporcion = document.getElementById("proporcion").value;
    const horasEsperadas = document.getElementById("horasEsperadas").value;
    const porcentajeEficiencia = document.getElementById("porcentajeEficiencia");
    porcentajeEficiencia.innerHTML = parseInt(horasEsperadas * 1) + parseInt(proporcion * 1);
}

/*Row de total*/
window.addEventListener("load", function(){
    sumHoras();
})

function sumHoras(){
    const totalHorasTrabajo = document.getElementById("totalHorasTrabajo");
    var horasTrabajo = document.getElementById("horasTrabajo").value;
    horasTotales = 0;
    for (i = 0; i < horasTrabajo; i++){

        console.log(horasTrabajo.values);
    }
}

function postNuevoReporte() {
    let proporcion = document.getElementById("proporcion");
    let horasVacaciones = document.getElementById('horasVacaciones');
    let personalCompletoT = document.getElementById('personalCompletoT');
    let personalMedioT = document.getElementById('personalMedioT');
    let descripcion = document.getElementById('descripcion');

    let ruta = "/reporte/registrarReporte";
    let data = {
        proporcion: proporcion.value,
        horasVacaciones: horasVacaciones.value,
        personalCompletoT: personalCompletoT.value,
        personalMedioT: personalMedioT.value,
        descripcion: descripcion.value
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