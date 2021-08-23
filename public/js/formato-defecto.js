export { $btn_apa_l, revisarCheckdefecto, checkBuscarj,checkBuscarjou };
import { obtenerXMLHttRequest } from "./xmlhttpreques.js";

const $btn_apa_l = document.querySelector(".btn-apa-l");
const documentocompleto = document.querySelector(".documento");
const containerdatosMostrar = document.querySelector(".mostrar_buscados");
let datosId = new FormData();
let formato_apa = document.querySelector(".formato_apa");
let formato_defecto_jorunal =  document.querySelector(".formato_defecto_jorunal");

if (documentocompleto) {
    document.addEventListener("DOMContentLoaded", function () {
        let documentoj =  document.querySelector(".documentoj");
        if(documentoj){
            extraerFormatosj()
        }
        else{   
            extraerFormatos()

        }
        

    });
}

if ($btn_apa_l) {
    $btn_apa_l.addEventListener("click", e => {
        let  btn_apa_j =  document.querySelector(".btn-apa-j");
        if(btn_apa_j){
            revisarCheckdefectoj();
        }
        else{
            revisarCheckdefecto();
        }
        
    })
}

function revisarCheckdefecto(event) {
    let check = document.querySelectorAll("tbody input[type='checkbox']");
    let bandera = 0;
    for (let contador = 0; contador < check.length; contador++) {
        if (check[contador].checked) {
            datosId.append(contador, check[contador].value);
            bandera = bandera + 1;
        }
    }

    if (bandera > 0) {
        // console.log("los id de referecnias seleccionadas son: ");
        // console.log(...datosId);
        document.querySelector(".buscar_checar").classList.add("hidden");
        document.querySelector(".seccion_formateo").classList.remove("hidden");
        referenciasTemporal();
    } else {
        console.log("no existen elementos en tbody");
    }

}



function buscarDatos(palabra, elementoContenedor) {
    const xhr = obtenerXMLHttRequest();
    var respuesta;
    const datos = new FormData();

    datos.append("buscandoInput", "true");
    datos.append("datoBuscar", palabra);

    if (xhr) {

        xhr.open('POST', "views/modulos/ajax.php", true);

        xhr.onload = function () {
            if (this.readyState == 4 && this.status == 200) {
                respuesta = JSON.parse(this.responseText);
                const tabla = document.createElement("table");
                const thead = document.createElement("thead");
                const tbody = document.createElement("tbody");
                const ayuda = document.createElement("div");
                ayuda.classList.add("ayuda-help");
                ayuda.textContent = "Selecciona las referencias necesarias a formatear dando click en los checkbox";
                elementoContenedor.appendChild(ayuda);
                elementoContenedor.appendChild(tabla);
                tabla.appendChild(thead);
                tabla.appendChild(tbody);
                if (respuesta != "sinnumero") {
                    thead.innerHTML = `
                    <tr>
                        <th class="checref"><i class="material-icons">help</i> <span class="tooltip-box">Seleccione las referencias neceserias dando click en los checkbox</span></th>
                        <th>Título</th>
                        <th>Autor/Autores</th>
                        <th>Editorial</th>
                        <th>País</th>
                        <th>ISBN</th>
                        <th>Año</th>
                        
                    </tr>`
                    for (let contador = 0; contador < respuesta.length; contador++) {
                        let indice = respuesta[contador];
                        tbody.innerHTML = tbody.innerHTML + `
                        <tr>
                            <td class="checref"><input type="checkbox" name="" id="${indice.id}" value='${indice.id}' class="ref"></td>
                            <td >${indice.titulo}</td>
                            <td>${indice.Autor}</td>
                            <td>${indice.Editorial}</td>
                            <td>${indice.pais}</td>
                            <td>${indice.ISBN}</td>
                            <td>${indice.Anio}</td>
                            
                        </tr>`
                    }
                    $btn_apa_l.removeAttribute("disabled");

                }
                else {
                    console.log("sin numero");
                }
            }
        }
        xhr.send(datos);
    }
}
function checkBuscarj(palabra) {
    if (palabra.length > 0) {
        containerdatosMostrar.innerHTML = "";

        buscarDatos(palabra, containerdatosMostrar);
    }
    else {
        if (!$btn_apa_l.getAttribute("disabled")) {
            $btn_apa_l.setAttribute("disabled", "disabled");
        }
        containerdatosMostrar.innerHTML = "";
    }
}

function referenciasTemporal() {
    let xhr = obtenerXMLHttRequest();
    const temporales = datosId;

    temporales.append("temporal", "temporal");
    let temporal = document.querySelector(".container_i");
    xhr.open("POST", "views/modulos/ajax.php", true);
    xhr.onload = function () {
        if (this.readyState == 4 && this.status == 200) {
            const respuesta = JSON.parse(this.responseText)
            respuesta.forEach(element => {
                temporal.innerHTML = temporal.innerHTML + `<p class="temporal-p">
                    <span >${element[4]}</span> ${element[1]}  ${element[5]}  ${element[6]} ${element[7]} ${element[11]} pagina ${element[8]} 
                </p>`

            });
        }
    }
    xhr.send(temporales);
}

if (formato_apa) {

    let apalibro = document.querySelector("#formatodefecto");
    formato_apa.addEventListener("click", function (even) {
        if (apalibro.value === "apale") {
            APALIBROELEC()
        }
        if (apalibro.value === "apalf") {
            APALIBROFISICO()
        }
        else {
            formatosdefecto(apalibro.value)
        }

    })
}

function APALIBROELEC() {
    let xhr = obtenerXMLHttRequest();
    const temporales = datosId;


    let temporal = document.querySelector(".container_i");
    temporal.innerHTML = "";
    xhr.open("POST", "views/modulos/ajax.php", true);
    xhr.onload = function () {
        if (this.readyState == 4 && this.status == 200) {
            const respuesta = JSON.parse(this.responseText)
            console.log(respuesta);
            respuesta.forEach(element => {
                let nombrecompleto = element.nombrecompleto;
                temporal.innerHTML = temporal.innerHTML + `<p class="temporal-p">
                <span >${ApellidoAutor(nombrecompleto)}</span>
                <span > (${element.Anio}).</span>
                <span > Recuperado de ${element.doi}</span>
                
            </p>`


            });
        }
    }
    xhr.send(datosId);
}
function APALIBROFISICO() {
    let xhr = obtenerXMLHttRequest();
    const temporales = datosId;


    let temporal = document.querySelector(".container_i");
    temporal.innerHTML = "";
    xhr.open("POST", "views/modulos/ajax.php", true);
    xhr.onload = function () {
        if (this.readyState == 4 && this.status == 200) {
            const respuesta = JSON.parse(this.responseText)
            console.log(respuesta);
            respuesta.forEach(element => {
                let nombrecompleto = element.nombrecompleto;
                temporal.innerHTML = temporal.innerHTML + `<p class="temporal-p">
                <span >${ApellidoAutor(nombrecompleto)}</span>
                <span > (${element.Anio}).</span>
                <span class="cursiva"> ${element.titulo}</span>
                <span > ${element.pais}:</span>
                <span > ${element.Editorial}.</span>
                
            </p>`


            });
        }
    }
    xhr.send(datosId);
}

function ApellidoAutor(palabra) {

    let cadenatempral = "";
    let nuevacadena2 = "";
    let nombres = palabra.split(",");
    let nombredevuelto = ""
    for (let index = 0; index < nombres.length; index++) {
        let tempnombre = nombres[index].split("#");
        let temporalcompleto = ""
        for (let indexi = 0; indexi < tempnombre.length; indexi++) {

            if (indexi == 0) {

                temporalcompleto = temporalcompleto + tempnombre[indexi].charAt(0) + ".";
            }
            else {
                let bueno = tempnombre[indexi].split(" ")
                let primero = tempnombre[indexi]
                primero = primero + ", "
                cadenatempral = bueno[0] + ", ";

            }

        }
        if (index == 0) {
            nuevacadena2 = nuevacadena2 + cadenatempral + temporalcompleto;
        }
        else {
            nuevacadena2 = nuevacadena2 + ", " + cadenatempral + temporalcompleto
        }
    }
    return nuevacadena2;

}


function extraerFormatos() {
    let formatodefecto = document.querySelector("#formatodefecto");
    let temporales = new FormData();
    let xhr = obtenerXMLHttRequest();
    temporales.append("formatoplis", "formatosplis");
    xhr.open("POST", "views/modulos/ajax.php", true);
    xhr.onload = function () {
        if (this.readyState == 4 && this.status == 200) {
            const respuesta = JSON.parse(this.responseText)
            console.log(respuesta);
            respuesta.forEach(element => {
                formatodefecto.innerHTML = formatodefecto.innerHTML + `
                <option value="${element.formato}" id="${element.id}">
                    ${element.nombre}
                </option>`

            });
        }
    }
    xhr.send(temporales);

}
function formatosdefecto(formato) {
    let arrayformato = formato.split("#")
    let temporal = document.querySelector(".container_i");
    temporal.innerHTML = ""
    let xhr = obtenerXMLHttRequest();
    let bandera = 0
    const temporales = datosId;
    temporal.innerHTML = "";
    xhr.open("POST", "views/modulos/ajax.php", true);
    xhr.onload = function () {
        if (this.readyState == 4 && this.status == 200) {
            const respuesta = JSON.parse(this.responseText)
            console.log(respuesta);
            respuesta.forEach(element => {
                let nuevoparrafo = document.createElement("p");

                for (let index = 0; index < arrayformato.length; index++) {

                    if (arrayformato[index] == "apellidoscompletoinicial") {  
                        let span = document.createElement("span");
                        if (arrayformato[index + 1]) {
                            if (arrayformato[index + 1] == "cursive") {
                                console.log("incial sin cursiva");
                                let array = element.nombrecompleto.split(",")
                                let dato = apellidoscompletoinicial(array);
                                span.textContent = dato;
                                span.classList.add("cursiva");
                                nuevoparrafo.appendChild(span);

                            }
                            else {
                                let array = element.nombrecompleto.split(",")
                                let dato = apellidoscompletoinicial(array);
                                span.textContent = dato;
                                nuevoparrafo.appendChild(span);
                            }
                        }
                        else {
                            console.log("incial sin cursiva");
                            let array = element.nombrecompleto.split(",")
                            let dato = apellidoscompletoinicial(array);
                            span.textContent = dato;
                            nuevoparrafo.appendChild(span);
                        }
                    }
                    /****************************************************** */
                    if (arrayformato[index] == "inicialA_y_apellidos") {
                        let span = document.createElement("span");
                        if (arrayformato[index + 1]) {
                            if (arrayformato[index + 1] == "cursive") {
                                console.log("incial sin cursiva");
                                let array = element.nombrecompleto.split(",")
                                let dato = incialApellidos(array);
                                span.textContent = dato;
                                span.classList.add("cursiva");
                                nuevoparrafo.appendChild(span);

                            }
                            else {
                                let array = element.nombrecompleto.split(",")
                                let dato = incialApellidos(array);
                                span.textContent = dato;
                                nuevoparrafo.appendChild(span);
                            }
                        }
                        else {
                            console.log("incial sin cursiva");
                            let array = element.nombrecompleto.split(",")
                            let dato = incialApellidos(array);
                            span.textContent = dato;
                            nuevoparrafo.appendChild(span);
                        }
                    }
                    /**************************************************** */
                    if (arrayformato[index] == "namec_apec") {
                        let span = document.createElement("span");
                        if (arrayformato[index + 1]) {
                            if (arrayformato[index + 1] == "cursive") {
                                console.log("incial sin cursiva");
                                let array = element.nombrecompleto.split(",")
                                let dato = namec_apec(array);
                                span.textContent = " "+dato;
                                span.classList.add("cursiva");
                                nuevoparrafo.appendChild(span);

                            }
                            else {
                                let array = element.nombrecompleto.split(",")
                                let dato = namec_apec(array);
                                span.textContent = " "+dato;
                                nuevoparrafo.appendChild(span);
                            }
                        }
                        else {
                            console.log("incial sin cursiva");
                            let array = element.nombrecompleto.split(",")
                            let dato = namec_apec(array);
                            span.textContent = " "+dato;
                            nuevoparrafo.appendChild(span);
                        }
                    }                    
                    /******************************************************* */
                    if (arrayformato[index] == "coma") {
                        let span = document.createElement("span");
                        if (arrayformato[index + 1]) {
                            if (arrayformato[index + 1] == "cursive") {
                                span.classList.add("cursiva");
                                span.textContent = ","
                                nuevoparrafo.appendChild(span);
                            }
                            else {
                                span.textContent = ",";
                                nuevoparrafo.appendChild(span);
                            }
                        }
                        else {
                            span.textContent = ",";
                            nuevoparrafo.appendChild(span);
                        }
                    }
                    /******************************************************* */
                    if (arrayformato[index] == "pp") {
                        let span = document.createElement("span");
                        if (arrayformato[index + 1]) {
                            if (arrayformato[index + 1] == "cursive") {
                                span.classList.add("cursiva");
                                span.textContent = " pp"
                                nuevoparrafo.appendChild(span);
                            }
                            else {
                                span.textContent = " pp";
                                nuevoparrafo.appendChild(span);
                            }
                        }
                        else {
                            span.textContent = " pp";
                            nuevoparrafo.appendChild(span);
                        }
                    }
                    /******************************************************* */
                    if (arrayformato[index] == "punto") {
                        let span = document.createElement("span");
                        if (arrayformato[index + 1]) {
                            if (arrayformato[index + 1] == "cursive") {
                                span.classList.add("cursiva");
                                span.textContent = "."
                                nuevoparrafo.appendChild(span);
                            }
                            else {
                                span.textContent = ".";
                                nuevoparrafo.appendChild(span);
                            }
                        }
                        else {
                            span.textContent = ".";
                            nuevoparrafo.appendChild(span);
                        }
                    }
                    /******************************************************* */
                    if (arrayformato[index] == "dospuntos") {
                        let span = document.createElement("span");
                        if (arrayformato[index + 1]) {
                            if (arrayformato[index + 1] == "cursive") {
                                span.classList.add("cursiva");
                                span.textContent = ":"
                                nuevoparrafo.appendChild(span);
                            }
                            else {
                                span.textContent = ":";
                                nuevoparrafo.appendChild(span);
                            }
                        }
                        else {
                            span.textContent = ":";
                            nuevoparrafo.appendChild(span);
                        }
                    }
                    /******************************************************* */
                    if (arrayformato[index] == "parentesis") {
                        let span = document.createElement("span");
                        if (arrayformato[index + 1]) {
                            if (arrayformato[index + 1] == "cursive") {
                                span.classList.add("cursiva");
                                span.textContent = " ("
                                nuevoparrafo.appendChild(span);
                            }
                            else {
                                span.textContent = " (";
                                nuevoparrafo.appendChild(span);
                            }
                        }
                        else {
                            span.textContent = "(";
                            nuevoparrafo.appendChild(span);
                        }
                    }
                    /****************************************************** */
                    if (arrayformato[index] == "parentesis2") {
                        let span = document.createElement("span");
                        if (arrayformato[index + 1]) {
                            if (arrayformato[index + 1] == "cursive") {
                                span.classList.add("cursiva");
                                span.textContent = ")"
                                nuevoparrafo.appendChild(span);
                            }
                            else {
                                span.textContent = ")";
                                nuevoparrafo.appendChild(span);
                            }
                        }
                        else {
                            span.textContent = ")";
                            nuevoparrafo.appendChild(span);
                        }
                    }
                    /****************************************************** */
                    if (arrayformato[index] == "comilla") {
                        let span = document.createElement("span");
                        if (arrayformato[index + 1]) {
                            if (arrayformato[index + 1] == "cursive") {
                                if (bandera === 0) {
                                    span.classList.add("cursiva");
                                    span.textContent = ` "`
                                    nuevoparrafo.appendChild(span);
                                }
                                else {
                                    span.classList.add("cursiva");
                                    span.textContent = `"`
                                    nuevoparrafo.appendChild(span);
                                }

                            }
                            else {
                                if (bandera === 0) {
                                    span.textContent = ` "`
                                    nuevoparrafo.appendChild(span);
                                }
                                else {
                                    span.textContent = `"`
                                    nuevoparrafo.appendChild(span);
                                }

                                // span.textContent = `"`;
                                // nuevoparrafo.appendChild(span);
                            }
                        }
                        else {
                            if (bandera === 0) {
                                span.textContent = ` "`
                                nuevoparrafo.appendChild(span);
                            }
                            else {
                                span.textContent = `"`
                                nuevoparrafo.appendChild(span);
                            }
                        }
                    }
                    /***************************************************** */
                    if (arrayformato[index] == "doi") {
                        let span = document.createElement("span");
                        if (arrayformato[index + 1]) {
                            if (arrayformato[index + 1] == "cursive") {
                                span.classList.add("cursiva");
                                span.textContent = " " + element.doi;
                                nuevoparrafo.appendChild(span);
                            }
                            else {
                                span.textContent = " " + element.doi;
                                nuevoparrafo.appendChild(span);
                            }
                        }
                        else {
                            span.textContent = " " + element.doi;
                            nuevoparrafo.appendChild(span);
                        }
                    }
                    /****************************************************** */
                    if (arrayformato[index] == "Anio") {
                        let span = document.createElement("span");
                        if (arrayformato[index + 1]) {
                            if (arrayformato[index + 1] == "cursive") {
                                span.classList.add("cursiva");
                                if (arrayformato[index - 1] === "parentesis") {
                                    span.textContent = element.Anio;
                                    nuevoparrafo.appendChild(span);
                                }
                                else {
                                    span.textContent = " " + element.Anio;
                                    nuevoparrafo.appendChild(span);
                                }

                            }
                            else {
                                if (arrayformato[index - 1] === "parentesis") {
                                    span.textContent = element.Anio;
                                    nuevoparrafo.appendChild(span);
                                }
                                else {
                                    span.textContent = " " + element.Anio;
                                    nuevoparrafo.appendChild(span);
                                }
                            }

                        }
                        else {
                            span.textContent = " " + element.Anio;
                            nuevoparrafo.appendChild(span);
                        }
                    }
                    /******************************************************** */
                    if (arrayformato[index] == "VOLUMEN") {
                        let span = document.createElement("span");
                        if (arrayformato[index + 1]) {
                            if (arrayformato[index + 1] == "cursive") {
                                span.classList.add("cursiva");
                                if (arrayformato[index - 1] === "parentesis") {
                                    span.textContent = "Vol. "+element.Volumen;
                                    nuevoparrafo.appendChild(span);
                                }
                                else {
                                    span.textContent = " Vol. " + element.Volumen;
                                    nuevoparrafo.appendChild(span);
                                }

                            }
                            else {
                                if (arrayformato[index - 1] === "parentesis") {
                                    span.textContent = "Vol. "+element.Volumen;
                                    nuevoparrafo.appendChild(span);
                                }
                                else {
                                    span.textContent = " Vol. " + element.Volumen;
                                    nuevoparrafo.appendChild(span);
                                }
                            }

                        }
                        else {
                            span.textContent = " Vol. " + element.Volumen;
                            nuevoparrafo.appendChild(span);
                        }
                    }
                    /************************************************************* */
                    if (arrayformato[index] == "journalConference") {
                        let span = document.createElement("span");
                        if (arrayformato[index + 1]) {
                            if (arrayformato[index + 1] == "cursive") {
                                span.classList.add("cursiva");
                                if (arrayformato[index - 1] === "parentesis") {
                                    span.textContent = element.Journal_Conferencia;
                                    nuevoparrafo.appendChild(span);
                                }
                                else {
                                    span.textContent = " " + element.Journal_Conferencia;
                                    nuevoparrafo.appendChild(span);
                                }

                            }
                            else {
                                if (arrayformato[index - 1] === "parentesis") {
                                    span.textContent = element.Journal_Conferencia;
                                    nuevoparrafo.appendChild(span);
                                }
                                else {
                                    span.textContent = " " + element.Journal_Conferencia;
                                    nuevoparrafo.appendChild(span);
                                }
                            }

                        }
                        else {
                            span.textContent = " " + element.Journal_Conferencia;
                            nuevoparrafo.appendChild(span);
                        }
                    }
                    /****************************************************** */
                    if (arrayformato[index] == "titulo") {

                        let span = document.createElement("span");
                        if (arrayformato[index + 1]) {
                            if (arrayformato[index + 1] == "cursive") {
                                span.classList.add("cursiva");
                                if (bandera ===0 && arrayformato[index - 1] === "comilla") {
                                    bandera = 1
                                    span.textContent = element.titulo;
                                    nuevoparrafo.appendChild(span);
                                }
                                else { 
                                    span.textContent = " " + element.titulo;
                                    nuevoparrafo.appendChild(span);
                                }

                            }
                            else {
                                if (bandera ===0 && arrayformato[index - 1] === "comilla" ) {
                                    bandera = 1
                                    span.textContent = element.titulo;
                                    nuevoparrafo.appendChild(span);
                                }
                                else {
                                    span.textContent = " " + element.titulo;
                                    nuevoparrafo.appendChild(span);
                                }
                            }

                        }
                        else {
                            span.textContent = " " + element.titulo;
                            nuevoparrafo.appendChild(span);
                        }
                    }
                    /********************************************************* */
                    if (arrayformato[index] == "Editorial") {
                        
                        let span = document.createElement("span");
                        if (arrayformato[index + 1]) {
                            if (arrayformato[index + 1] == "cursive") {
                                span.classList.add("cursiva");
                                if (arrayformato[index - 1] === "parentesis") {
                                    span.textContent = element.Editorial;
                                    nuevoparrafo.appendChild(span);
                                }
                                else {
                                    span.textContent = " " + element.Editorial;
                                    nuevoparrafo.appendChild(span);
                                }

                            }
                            else {
                                if (arrayformato[index - 1] === "parentesis") {
                                    span.textContent = element.Editorial;
                                    nuevoparrafo.appendChild(span);
                                }
                                else {
                                    span.textContent = " " + element.Editorial;
                                    nuevoparrafo.appendChild(span);
                                }
                            }

                        }
                        else {
                            span.textContent = " " + element.Anio;
                            nuevoparrafo.appendChild(span);
                        }
                    }
                    /********************************************************* */
                    if (arrayformato[index] == "pais") {

                        let span = document.createElement("span");
                        if (arrayformato[index + 1]) {
                            if (arrayformato[index + 1] == "cursive") {
                                span.classList.add("cursiva");
                                if (bandera ===0 && arrayformato[index - 1] === "comilla") {
                                    bandera = 1
                                    span.textContent = element.pais;
                                    nuevoparrafo.appendChild(span);
                                }
                                else { 
                                    span.textContent = " " + element.pais;
                                    nuevoparrafo.appendChild(span);
                                }

                            }
                            else {
                                if (bandera ===0 && arrayformato[index - 1] === "comilla" ) {
                                    bandera = 1
                                    span.textContent = element.pais;
                                    nuevoparrafo.appendChild(span);
                                }
                                else {
                                    span.textContent = " " + element.pais;
                                    nuevoparrafo.appendChild(span);
                                }
                            }

                        }
                        else {
                            span.textContent = " " + element.pais;
                            nuevoparrafo.appendChild(span);
                        }
                    }                    
                    /****************************************************** */
                    if (arrayformato[index] == "paginas") {
                        let span = document.createElement("span");
                        if (arrayformato[index + 1]) {
                            if (arrayformato[index + 1] == "cursive") {
                                span.classList.add("cursiva");
                                span.textContent = " " + element.pagina;
                                nuevoparrafo.appendChild(span);
                            }
                            else {
                                span.textContent = " " + element.pagina;
                                nuevoparrafo.appendChild(span);
                            }
                        }
                        else {
                            span.textContent = " " + element.pagina;
                            nuevoparrafo.appendChild(span);
                        }
                    }

                }
                bandera = 0;
                temporal.appendChild(nuevoparrafo)

            });
        }
    }
    xhr.send(datosId);

}

function incialApellidos(elemento) {
    let cadenaretorno = "";
    let contador = 0
    let nuevacadena = ""
    if (elemento.length < 2) {
        let temporal = elemento[0].split("#");
        cadenaretorno = cadenaretorno + temporal[0].charAt(0) + ". " + temporal[1]
        return cadenaretorno;
    }
    else {
        for (let index = 0; index < elemento.length; index++) {
            let temporal = elemento[index].split("#");
            for (let indexi = 0; indexi < temporal.length; indexi++) {
                if (indexi == 0) {
                    nuevacadena = nuevacadena + temporal[indexi].charAt(0) + ". ";
                }
                else {
                    nuevacadena = nuevacadena + temporal[indexi];
                }
            }
            if (index == 0) {
                cadenaretorno = cadenaretorno + nuevacadena;
                nuevacadena = ""
            }
            else {
                cadenaretorno = cadenaretorno + ", " + nuevacadena;
                nuevacadena = ""
            }

        }
    }
    return cadenaretorno;
}

function namec_apec(elemento) {

    let cadenaretorno = "";
    let contador = 0
    let nuevacadena = ""
    if (elemento.length < 2) {
        let temporal = elemento[0].split("#");
        cadenaretorno = cadenaretorno + temporal[0] + ". " + temporal[1]
        return cadenaretorno;
    }
    else {
        for (let index = 0; index < elemento.length; index++) {
            let temporal = elemento[index].split("#");
            for (let indexi = 0; indexi < temporal.length; indexi++) {
                if (indexi == 0) {
                    nuevacadena = nuevacadena + temporal[indexi]+ ". ";
                }
                else {
                    nuevacadena = nuevacadena + temporal[indexi];
                }
            }
            if (index == 0) {
                cadenaretorno = cadenaretorno + nuevacadena;
                nuevacadena = ""
            }
            else {
                cadenaretorno = cadenaretorno + ", " + nuevacadena;
                nuevacadena = ""
            }

        }
    }
    return cadenaretorno;


}


function apellidoscompletoinicial(elemento) {
    let cadenaretorno = "";
    let contador = 0
    let nuevacadena = ""
    if (elemento.length < 2) {
        let temporal = elemento[0].split("#");
        cadenaretorno = cadenaretorno + temporal[1] + ". " + temporal[0].charAt(0)
        return cadenaretorno;
    }
    else {
        for (let index = 0; index < elemento.length; index++) {
            let temporal = elemento[index].split("#");
            for (let indexi = 0; indexi < temporal.length; indexi++) {
                if (indexi == 0) {
                    nuevacadena = nuevacadena + temporal[indexi].charAt(0) + ".";
                }
                else {
                    nuevacadena = temporal[indexi]+ " " + nuevacadena;
                }
            }
            if (index == 0) {
                cadenaretorno = cadenaretorno + nuevacadena;
                nuevacadena = ""
            }
            else {
                cadenaretorno = cadenaretorno + ", " + nuevacadena;
                nuevacadena = ""
            }

        }
    }
    return cadenaretorno;
}



//****************************** */
function checkBuscarjou(palabra) {
    
    if (palabra.length > 0) {
        containerdatosMostrar.innerHTML = "";

        buscarDatosJ(palabra, containerdatosMostrar);
    }
    else {
        if (!$btn_apa_l.getAttribute("disabled")) {
            $btn_apa_l.setAttribute("disabled", "disabled");
        }
        containerdatosMostrar.innerHTML = "";
    }
}

/************************************** */
function buscarDatosJ(palabra, elementoContenedor) {
    const xhr = obtenerXMLHttRequest();
    var respuesta;
    const datos = new FormData();

    datos.append("buscandoInputdefectoj", "true");
    datos.append("datoBuscar", palabra);

    if (xhr) {

        xhr.open('POST', "views/modulos/ajax.php", true);

        xhr.onload = function () {
            if (this.readyState == 4 && this.status == 200) {
                respuesta = JSON.parse(this.responseText);
                const tabla = document.createElement("table");
                const thead = document.createElement("thead");
                const tbody = document.createElement("tbody");
                const ayuda = document.createElement("div");
                ayuda.classList.add("ayuda-help");
                ayuda.textContent = "Selecciona las referencias necesarias a formatear dando click en los checkbox";
                elementoContenedor.appendChild(ayuda);
                elementoContenedor.appendChild(tabla);
                tabla.appendChild(thead);
                tabla.appendChild(tbody);
                if (respuesta != "fallo") {
                    thead.innerHTML = `
                    <tr>
                        <th class="checref"><i class="material-icons">help</i> <span class="tooltip-box">Seleccione las referencias neceserias dando click en los checkbox</span></th>
                        <th>Título</th>
                        <th>Autor/Autores</th>
                        <th>Journal / Conference</th>
                        <th>País</th>
                        <th>ISSN</th>
                        <th>Año</th>
                        
                    </tr>`
                    for (let contador = 0; contador < respuesta.length; contador++) {
                        let indice = respuesta[contador];
                        tbody.innerHTML = tbody.innerHTML + `
                        <tr>
                            <td class="checref"><input type="checkbox" name="" id="${indice.id}" value='${indice.id}' class="ref"></td>
                            <td >${indice.titulo}</td>
                            <td>${indice.Autor}</td>
                            <td>${indice.Journal_Conferencia}</td>
                            <td>${indice.pais}</td>
                            <td>${indice.ISSN}</td>
                            <td>${indice.Anio}</td>
                            
                        </tr>`
                    }
                    $btn_apa_l.removeAttribute("disabled");

                }
                else {
                    console.log("sin numero");
                }
            }
        }
        xhr.send(datos);
    }
}
/************************************ */
function revisarCheckdefectoj(event) {
    let check = document.querySelectorAll("tbody input[type='checkbox']");
    let bandera = 0;
    for (let contador = 0; contador < check.length; contador++) {
        if (check[contador].checked) {
            datosId.append(contador, check[contador].value);
            bandera = bandera + 1;
        }
    }

    if (bandera > 0) {
        // console.log("los id de referecnias seleccionadas son: ");
        // console.log(...datosId);
        document.querySelector(".buscar_checar").classList.add("hidden");
        document.querySelector(".seccion_formateo").classList.remove("hidden");
        referenciasTemporalj();
    } else {
        console.log("no existen elementos en tbody");
    }

}
/**************************************** */
function referenciasTemporalj() {
    let xhr = obtenerXMLHttRequest();
    const temporales = datosId;

    temporales.append("temporal_j", "temporal");
    let temporal = document.querySelector(".container_i");
    xhr.open("POST", "views/modulos/ajax.php", true);
    xhr.onload = function () {
        if (this.readyState == 4 && this.status == 200) {
            const respuesta = JSON.parse(this.responseText)
            respuesta.forEach(element => {
                temporal.innerHTML = temporal.innerHTML + `<p class="temporal-p">
                    <span >${element[4]}</span> ${element[1]}  ${element[5]}  ${element[6]} ${element[7]} ${element[11]} pagina ${element[8]} 
                </p>`

            });
        }
    }
    xhr.send(temporales);
}
/************************************************************ */
function extraerFormatosj() {
    let formatodefecto = document.querySelector("#formatodefecto");
    let temporales = new FormData();
    let xhr = obtenerXMLHttRequest();
    temporales.append("formatoplisdos", "formatosplis");
    xhr.open("POST", "views/modulos/ajax.php", true);
    xhr.onload = function () {
        if (this.readyState == 4 && this.status == 200) {
            const respuesta = JSON.parse(this.responseText)
            console.log(respuesta);
            respuesta.forEach(element => {
                formatodefecto.innerHTML = formatodefecto.innerHTML + `
                <option value="${element.formato}" id="${element.id}">
                    ${element.nombre}
                </option>`

            });
        }
    }
    xhr.send(temporales);

}
/********************************************************************* */
if(formato_defecto_jorunal){
    let apalibro = document.querySelector("#formatodefecto");
    formato_defecto_jorunal.addEventListener("click", function (even) {
        if (apalibro.value === "APDI") {
            APDI();
        }
        if (apalibro.value === "ANEDI") {
            ANEDI()
        }
        else {
            
            formatosdefecto(apalibro.value)
        }

    })
}
/*************************************************************** */
function APDI() {
    let xhr = obtenerXMLHttRequest();
    const temporales = datosId;


    let temporal = document.querySelector(".container_i");
    temporal.innerHTML = "";
    xhr.open("POST", "views/modulos/ajax.php", true);
    xhr.onload = function () {
        if (this.readyState == 4 && this.status == 200) {
            const respuesta = JSON.parse(this.responseText)
            console.log(respuesta);
            respuesta.forEach(element => {
                let nombrecompleto = element.nombrecompleto;
                temporal.innerHTML = temporal.innerHTML + `<p class="temporal-p">
                <span >${ApellidoAutor(nombrecompleto)}</span>
                <span > (${element.Anio}).</span>
                <span > ${element.titulo}.</span>
                <span class="cursiva"> ${element.Journal_Conferencia},</span>
                <span > p. ${element.Paginas}.</span>
                
            </p>`


            });
        }
    }
    xhr.send(datosId);
}
/*************************************************************** */
function ANEDI() {
    let xhr = obtenerXMLHttRequest();
    const temporales = datosId;


    let temporal = document.querySelector(".container_i");
    temporal.innerHTML = "";
    xhr.open("POST", "views/modulos/ajax.php", true);
    xhr.onload = function () {
        if (this.readyState == 4 && this.status == 200) {
            const respuesta = JSON.parse(this.responseText)
            console.log(respuesta);
            respuesta.forEach(element => {
                let nombrecompleto = element.nombrecompleto;
                temporal.innerHTML = temporal.innerHTML + `<p class="temporal-p">
                <span >${ApellidoAutor(nombrecompleto)}</span>
                <span > (${element.Anio}).</span>
                <span > ${element.titulo}.</span>
                <span class="cursiva"> ${element.Journal_Conferencia},</span>
                <span > ${element.Paginas}.</span>
                
            </p>`


            });
        }
    }
    xhr.send(datosId);
}