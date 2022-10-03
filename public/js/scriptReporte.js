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
    horasMedioT.innerHTML = parseInt(personalMedioT) * 34;
}

function horasCompletoT() {
    const personalCompletoT = document.getElementById("personalCompletoT").value;
    const horasCompletoT = document.getElementById("horasCompletoT");
    horasCompletoT.innerHTML = personalCompletoT * 48;
}

function personal() {
    const personalMedioT = document.getElementById("personalMedioT");
    const personalCompletoT = document.getElementById("personalCompletoT");
    const personalTotal = document.getElementById("personalTotal");
    personalTotal.innerHTML = personalMedioT + personalCompletoT;
}

function horasEsperadas() {
    const horasMedioT = document.getElementById("horasMedioT");
    const horasCompletoT = document.getElementById("horasCompletoT");
    const personalMedioT = document.getElementById("personalMedioT");
    const personalCompletoT = document.getElementById("personalCompletoT");
    const horasEsperadas = document.getElementById("horasEsperadas");
    horasEsperadas.innerHTML = (horasMedioT * personalMedioT) + (horasCompletoT * personalCompletoT);
}