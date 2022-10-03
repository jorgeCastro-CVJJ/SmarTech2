function funcionesMedioT() {
    function horasMedioT();
    function personal();
    function horasEsperadas();
}

function funcionesCompletoT() {
    function horasCompletoT();
    function personal();
    function horasEsperadas();
}

function horasMedioT() {
    const personalMedioT = document.getElementById("personalMedioT");
    const horasMedioT = document.getElementById("horasMedioT");
    number1 = 34;
    horasMedioT.innerHTML = personalMedioT * number1;
    console.log(typeof parseInt(personalMedioT));
    console.log(typeof parseInt(number1));
}
/*PREGUNTAR A LALO PORQUE LA MULTIPLICACION NO FUNCIONA 
(SALE NaN Y LOS MULTIPLOS SON OBJETOS (NO NUMEROS))*/

function horasCompletoT() {
    const personalCompletoT = document.getElementById("personalCompletoT");
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