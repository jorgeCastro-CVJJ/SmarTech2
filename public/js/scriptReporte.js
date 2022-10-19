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
}

function eficiencia() {
    const porcentaje = document.getElementById("porcentaje").value;
    const horasEsperadas = Number(document.getElementById("horasEsperadas").innerHTML);
    const totalHorasReales = Number(document.getElementById("totalHorasReales").innerHTML);
    const porcentajeEficiencia = document.getElementById("porcentajeEficiencia");
    porcentajeEficiencia.innerHTML = (totalHorasReales / horasEsperadas).toFixed(2);
    proporcion();
}

function proporcion(){
    const proporcion = document.getElementById("proporcion");
    const porcentajeEficiencia = Number(document.getElementById("porcentajeEficiencia").innerHTML);
    const porcentaje = Number(document.getElementById("porcentaje").value);
    proporcion.innerHTML = (parseFloat(porcentajeEficiencia) / parseFloat(porcentaje)).toFixed(2);
}

/*Row de total*/
window.addEventListener("load", function(){
    sumHoras();
})

function sumHoras(){
    horasTotales = 0;
    horasTotales2 = 0;
    for (let proyecto of nombreP){
        let id = "horasTrabajo['" + proyecto + "']";
        let id2 = "horasReales['" + proyecto + "']";
        horasTotales += parseInt( document.getElementById(id).value );
        horasTotales2 += parseInt( document.getElementById(id2).value );
        totalHorasTrabajo.innerHTML = horasTotales;
        totalHorasReales.innerHTML = parseInt(horasTotales2 * 1);
    }
}


