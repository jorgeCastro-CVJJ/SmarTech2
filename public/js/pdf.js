const camposCalculados = () => {
    
    const personalMedioT = document.getElementById("personalMedioT").value;
    const horasMedioT = document.getElementById("horasMedioT");
    const personalCompletoT = document.getElementById("personalCompletoT").value;
    const horasCompletoT = document.getElementById("horasCompletoT");
    const totalPersonal = document.getElementById("totalPersonal");
    const horasEsperadas = document.getElementById("horasEsperadas");
    const horasVacaciones = document.getElementById("horasVacaciones").value;
    const porcentaje = document.getElementById("porcentaje").value;
    const totalHorasReales = Number(document.getElementById("totalHorasReales").innerHTML);
    const porcentajeEficiencia = document.getElementById("porcentajeEficiencia");
    const proporcion = document.getElementById("proporcion");

    let OphorasMedioT = 0;
    let OphorasCompletoT = 0;
    let OptotalPersonal = 0;
    let OphorasEsperadas = 0;
    let OpporcentajeEficiencia = 0;
    let Opproporcion = 0;


    //Personal MT
    OphorasMedioT = personalMedioT * 34;
    
    //Personal TC
    OphorasCompletoT = personalCompletoT * 48;

    //Total Personal
    OptotalPersonal= parseInt(personalMedioT * 1) + parseInt(personalCompletoT * 1);

    //Horas Esperadas
    OphorasEsperadas = parseInt(personalCompletoT * 48) + parseInt(personalMedioT * 34) - parseInt(horasVacaciones * 1);

    //Eficiencia
    OpporcentajeEficiencia = (totalHorasReales / horasEsperadas).toFixed(2);

    //Proporcion
    Opproporcion = (parseFloat(porcentajeEficiencia) / parseFloat(porcentaje)).toFixed(2);

}