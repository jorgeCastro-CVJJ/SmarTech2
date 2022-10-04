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
    totalPersonal.innerHTML = parseInt(personalMedioT) + parseInt(personalCompletoT);
}

function horasEsperadas() {
    const personalMedioT = document.getElementById("personalMedioT").value;
    const personalCompletoT = document.getElementById("personalCompletoT").value;
    const horasEsperadas = document.getElementById("horasEsperadas");
    const horasVacaciones = document.getElementById("horasVacaciones").value;
    horasEsperadas.innerHTML = parseInt(personalCompletoT * 48) + parseInt(personalMedioT * 34) - parseInt(horasVacaciones);
}

/*document.getElementById("personalMedioT").onkeyup = horasMedioT;
document.getElementById("personalMedioT").onkeyup = personal;
document.getElementById("personalMedioT").onkeyup = horasEsperadas;
document.getElementById("personalCompletoT").onkeyup = horasCompletoT;
document.getElementById("personalCompletoT").onkeyup = personal;
document.getElementById("personalCompletoT").onkeyup = horasEsperadas;*/