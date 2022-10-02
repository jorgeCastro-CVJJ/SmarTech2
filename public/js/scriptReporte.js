function horasMedioT() {
    const personalMedioT = document.getElementById("personalMedioT");
    const horasMedioT = document.getElementById("horasMedioT");
    number1 = 34;
    horasMedioT.innerHTML = parseInt(personalMedioT) * parseInt(number1);
    console.log(typeof parseInt(personalMedioT));
    console.log(typeof parseInt(number1));
}

function horasCompletoT() {
    const personalCompletoT = document.getElementById("personalCompletoT");
    const horasCompletoT = document.getElementById("horasCompletoT");
    horasCompletoT.innerHTML = personalCompletoT * 48;
}