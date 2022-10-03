function funcionesMedioT() {
    horasMedioT();
    personal();
    horasEsperadas();
}

function funcionesCompletoT() {
    horasCompletoT();
    personal();
    horasEsperadas();
}

function horasMedioT() {
    const personalMedioT = document.getElementById("personalMedioT").value;
    const horasMedioT = document.getElementById("horasMedioT");
    horasMedioT.innerHTML = personalMedioT * 34;
    personal();
}

function horasCompletoT() {
    const personalCompletoT = document.getElementById("personalCompletoT").value;
    const horasCompletoT = document.getElementById("horasCompletoT");
    horasCompletoT.innerHTML = personalCompletoT * 48;
    personal();
}

function personal() {
    const personalMedioT = document.getElementById("personalMedioT").value;
    const personalCompletoT = document.getElementById("personalCompletoT").value;
    const totalPersonal = document.getElementById("totalPersonal");
    totalPersonal.innerHTML = parseInt(personalMedioT) + parseInt(personalCompletoT);
}

function horasEsperadas() {
    const horasMedioT = document.getElementById("horasMedioT");
    const horasCompletoT = document.getElementById("horasCompletoT");
    const personalMedioT = document.getElementById("personalMedioT");
    const personalCompletoT = document.getElementById("personalCompletoT");
    const horasEsperadas = document.getElementById("horasEsperadas");
    horasEsperadas.innerHTML = (horasMedioT * personalMedioT) + (horasCompletoT * personalCompletoT);
}

/*document.getElementById("personalMedioT").onkeyup = horasMedioT;
document.getElementById("personalMedioT").onkeyup = personal;
document.getElementById("personalMedioT").onkeyup = horasEsperadas;
document.getElementById("personalCompletoT").onkeyup = horasCompletoT;
document.getElementById("personalCompletoT").onkeyup = personal;
document.getElementById("personalCompletoT").onkeyup = horasEsperadas;*/