export { bandera_libro };
import { obtenerXMLHttRequest } from "./xmlhttpreques.js";
let bandera_libro = document.querySelector(".edi-book");
let cerrarmodallibro = document.querySelector(".close");
let form_editar_libro = document.querySelector(".form_editar_libro");
const numero_inputs = form_editar_libro;
let dinamicos_nombre = document.querySelector(".dinamicos");
let btn_guardar_editar = document.querySelector(".btn-editar");
let buscador = document.querySelector(".editarlibroB input");
let palabraAuxiliar = ""
let TITULO = document.querySelector(".TITULO");
let EDITORIAL = document.querySelector(".EDITORIAL");
const PAGINA = document.querySelector(".PAGINA");
const ANIO = document.querySelector(".ANIO");
let PAIS = document.querySelector(".PAIS");
const ISBN = document.querySelector(".ISBN");
const DOI = document.querySelector(".DOI");
const primerInput = document.querySelector("#primerInput");
const segundoInput = document.querySelector("#segundoInput");
const tercerInput = document.querySelector("#tercerInput");

const icono = document.querySelector(".logo-buscar")
let containerdatosMostrar = document.querySelector(".mostrar_buscados");

if (bandera_libro) {

    btn_guardar_editar.addEventListener("click", function (e) {
        e.preventDefault();
        if (e.target.classList.contains("btn-editar-j")) {
            procesarinfo_j();
        }
        else {
            procesarinfo();
        }
    })
    cerrarmodallibro.addEventListener("click", e => {
        bandera_libro.classList.add("hidden");
        for (let index = 0; index < numero_inputs.length - 1; index++) {
            form_editar_libro.elements[index].value = "";
        }
        dinamicos_nombre.innerHTML = "";

    })




    buscador.addEventListener("input", event => {
        const palabra = event.target.value;
        palabraAuxiliar = palabra;
        console.log(palabraAuxiliar);
        revisar(palabra);
    });


    buscador.addEventListener("focus", function (event) {
        buscador.classList.add("focus");
        icono.classList.add("focus2");
    });
    buscador.addEventListener("blur", function (event) {
        buscador.classList.remove("focus");
        icono.classList.remove("focus2");
    })

}


function revisar(palabra) {

    if (palabra.length > 0) {
        if (buscador.parentElement.classList.contains("original")) {

            containerdatosMostrar.innerHTML = "";
            buscarDatoslibro(palabra, containerdatosMostrar);
        }
        else {
            containerdatosMostrar.innerHTML = "";
            buscarDatosJournal(palabra, containerdatosMostrar);
        }
    }
    else {
        containerdatosMostrar.innerHTML = "";
    }
}



function buscarDatoslibro(palabra, elementoContenedor) {
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

                elementoContenedor.appendChild(tabla);
                tabla.appendChild(thead);
                tabla.appendChild(tbody);
                if (respuesta != "sinnumero") {
                    thead.innerHTML = `
                    <tr>
                        <th class="checref" ><i class="material-icons">help</i> <span class="tooltip-box">Editar libro dando click en algun icono con el lápiz</span></th>
                        <th>Título</th>
                        <th>Autor</th>
                        <th>Editorial</th>
                        <th>País</th>
                        <th>isbn</th>
                        <th>Año</th>
                        
                    </tr>`
                    for (let contador = 0; contador < respuesta.length; contador++) {
                        let indice = respuesta[contador];
                        tbody.innerHTML = tbody.innerHTML + `
                        <tr>
                            <td class="checref"><span class="btn-edit-libro" ${indice.id}"><i class="large material-icons banderaedit ${indice.id}" id="${indice.id}" value='${indice.id}'>edit</i> </span></td>
                            <td >${indice.titulo}</td>
                            <td>${indice.Autor}</td>
                            <td>${indice.Editorial}</td>
                            <td>${indice.pais}</td>
                            <td>${indice.ISBN}</td>
                            <td>${indice.Anio}</td>
                            
                        </tr>`

                    }

                }
                else {
                    console.log("sin numero");
                }
            }
        }
        xhr.send(datos);
    }
}
if (containerdatosMostrar) {
    containerdatosMostrar.addEventListener("click", function (e) {
        if (e.target.classList.contains("banderaedit")) {
            console.log(e.target.classList[3]);
            let id = e.target.classList[3];
            editarLibro(id);
            document.querySelector("#id").innerHTML = id;

        }
        if (e.target.classList.contains("banderda2")) {
            // let id = e.target.classList[3];
            let id = e.target.getAttribute("id");
            console.log(id);
            editarJournal(id)
            document.querySelector("#id").innerHTML = id;
        }

    });
}
function editarLibro(id) {

    let datos = new FormData();
    datos.append("ideditar", id);
    let xhr = obtenerXMLHttRequest();
    xhr.open('POST', "views/modulos/ajax.php", true);
    xhr.onload = function () {
        if (this.readyState == 4 && this.status == 200) {
            // console.log(this.responseText);
            let respuesta = JSON.parse(this.responseText);
            if (respuesta != "fallo") {
                let auxilianombres = [];
                let nombres = (respuesta[0].Autor).split(",");
                let apellidos = (respuesta[0].Apellidos).split(",");

                bandera_libro.classList.remove("hidden");
                TITULO.value = respuesta[0].titulo;
                EDITORIAL.value = respuesta[0].Editorial;
                PAGINA.value = respuesta[0].pagina;
                ANIO.value = respuesta[0].Anio;
                PAIS.value = respuesta[0].pais;
                ISBN.value = respuesta[0].ISBN;
                DOI.value = respuesta[0].doi;
                primerInput.value = respuesta[0].categoria1;
                segundoInput.value = respuesta[0].categoria2;
                tercerInput.value = respuesta[0].categoria3;
                let nombreApellidos = document.querySelector(".dinamicos");
                for (let index = 0; index < nombres.length; index++) {
                    nombreApellidos.innerHTML = nombreApellidos.innerHTML + `
                    <div class="container_par">
                        <label for="${index}+n">Autor ${index + 1}</label>
                        <input type="text" class="AUTOR" name="APELLIDOS" id="${index}+n" value="${nombres[index]}">
                    </div>
                    <div class="container_par">
                        <label for="${index}+a">Apellidos ${index + 1}</label>
                        <input type="text" class="APELLIDOS" name="APELLIDOS" id="${index}+a" value="${apellidos[index]}">
                    </div>
                    `


                }

            }

        }

    }
    xhr.send(datos);
}

function eliminardanger(elemento) {
    for (let contador = 0; contador < elemento.length - 1; contador++) {

        let clase = elemento.elements[contador];
        clase.classList.remove("danger");

    }
}
function procesarinfo(numeroElementos) {
    let namesinput = document.querySelectorAll(".AUTOR");
    let apesinput = document.querySelectorAll(".APELLIDOS");
    let names = "";
    let apes = "";
    let auxiliarp = "";
    let auxiliarn = "";
    let nombre_completo = "";

    for (let index = 0; index < namesinput.length; index++) {
        if (index > 0) {
            nombre_completo = nombre_completo + "," + (namesinput[index].value + "#" + apesinput[index].value);
        }
        else {
            nombre_completo = nombre_completo + (namesinput[index].value + "#" + apesinput[index].value);

        }

    }
    apesinput.forEach((element, index) => {

        if (index > 0) {
            apes = apes + "," + element.value;
        }
        else
            apes = apes + element.value;

    });
    namesinput.forEach((element, index) => {
        if (index > 0) {
            names = names + "," + element.value;
        }
        else
            names = names + element.value;
    });

    let TITULO = document.querySelector(".TITULO");
    let EDITORIAL = document.querySelector(".EDITORIAL");
    const PAGINA = document.querySelector(".PAGINA");
    const ANIO = document.querySelector(".ANIO");
    let PAIS = document.querySelector(".PAIS");
    const ISBN = document.querySelector(".ISBN");
    const DOI = document.querySelector(".DOI");
    const primerInput = document.querySelector("#primerInput");
    const segundoInput = document.querySelector("#segundoInput");
    const tercerInput = document.querySelector("#tercerInput");
    let id = document.querySelector("#id").textContent;
    let datos = new FormData();

    datos.append("autor", names);
    datos.append("apellidos", apes);
    datos.append("titulo", TITULO.value);
    datos.append("editorial", EDITORIAL.value);
    datos.append("isbn", ISBN.value);
    datos.append("pais", PAIS.value);
    datos.append("doi", DOI.value)
    datos.append("categoria1", primerInput.value);
    datos.append("categoria2", segundoInput.value);
    datos.append("categoria3", tercerInput.value);
    datos.append("pagina", PAGINA.value);
    datos.append("anio", ANIO.value);
    datos.append("id", id);
    datos.append("nombrecompleto", nombre_completo);
    datos.append("actualizar", "actualizar")
    

    actualizar(datos);

}


function actualizar(datos) {


    let xhr = obtenerXMLHttRequest();
    xhr.open('POST', "views/modulos/ajax.php", true);
    xhr.onload = function () {
        if (this.readyState == 4 && this.status == 200) {
            let respuesta = JSON.parse(this.responseText)
            let exito = document.querySelector(".view-modal.exito");

            if (respuesta === "bien") {

                document.querySelector("#id").classList.remove("hidden");
                document.querySelector("#id").textContent = "Datos guardados correctamente"
                document.querySelector("#id").innerHTML = "Datos guardados correctamente"
                document.querySelector("#id").backgroundcolor;
                console.log("todo chido");
            }
            setTimeout(() => {
                document.querySelector("#id").classList.add("hidden");
                bandera_libro.classList.add("hidden")
                document.querySelector(".dinamicos").innerHTML = "";
                containerdatosMostrar.innerHTML =  ""
                buscarDatoslibro(palabraAuxiliar,containerdatosMostrar);
            
            }, 1700);
        }
    }
    xhr.send(datos);

}
/***
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 *para editar los de journal
 * 
 * 
 * 
 * 
 * 
 * 
 */
function buscarDatosJournal(palabra, elementoContenedor) {
    const xhr = obtenerXMLHttRequest();
    var respuesta;
    const datos = new FormData();

    datos.append("buscandoInputJO", "true");
    datos.append("datoBuscar", palabra);

    if (xhr) {

        xhr.open('POST', "views/modulos/ajax.php", true);

        xhr.onload = function () {
            if (this.readyState == 4 && this.status == 200) {
                respuesta = JSON.parse(this.responseText);
                const tabla = document.createElement("table");
                const thead = document.createElement("thead");
                const tbody = document.createElement("tbody");

                elementoContenedor.appendChild(tabla);
                tabla.appendChild(thead);
                tabla.appendChild(tbody);
                if (respuesta != "fallo") {
                    thead.innerHTML = `
                    <tr>
                        <th class="checref" ><i class="material-icons">help</i> <span class="tooltip-box">Editar libro dando click en algun icono con el lápiz</span></th>
                        <th>Título</th>
                        <th>Autor</th>
                        <th>Journal</th>
                        <th>País</th>
                        <th>isbn</th>
                        <th>Año</th>
                        
                    </tr>`
                    for (let contador = 0; contador < respuesta.length; contador++) {
                        let indice = respuesta[contador];
                        tbody.innerHTML = tbody.innerHTML + `
                        <tr>
                            <td class="checref"><span class="btn-edit-libro" ${indice.id}"><i class="large material-icons banderda2 ${indice.id}" id="${indice.id}" value='${indice.id}'>edit</i> </span></td>
                            <td >${indice.titulo}</td>
                            <td>${indice.Autor}</td>
                            <td>${indice.Journal_Conferencia}</td>
                            <td>${indice.pais}</td>
                            <td>${indice.ISSN}</td>
                            <td>${indice.Anio}</td>
                            
                        </tr>`

                    }

                }
                else {
                    console.log("sin numero");
                }
            }
        }
        xhr.send(datos);
    }
}

function editarJournal(id) {
    let volumen = document.querySelector(".Volumen");
    let datos = new FormData();
    datos.append("ideditarjorunal", id);
    let xhr = obtenerXMLHttRequest();
    xhr.open('POST', "views/modulos/ajax.php", true);
    xhr.onload = function () {
        if (this.readyState == 4 && this.status == 200) {
            // console.log(this.responseText);
            let respuesta = JSON.parse(this.responseText);
            if (respuesta != "fallo") {
                let auxilianombres = [];
                let nombres = (respuesta[0].Autor).split(",");
                let apellidos = (respuesta[0].apellidos).split(",");

                bandera_libro.classList.remove("hidden");
                TITULO.value = respuesta[0].titulo;
                EDITORIAL.value = respuesta[0].Journal_Conferencia;
                PAGINA.value = respuesta[0].Paginas;
                ANIO.value = respuesta[0].Anio;
                PAIS.value = respuesta[0].pais;
                ISBN.value = respuesta[0].ISSN;
                DOI.value = respuesta[0].doi;
                primerInput.value = respuesta[0].categoria1;
                segundoInput.value = respuesta[0].categoria2;
                tercerInput.value = respuesta[0].categoria3;
                volumen.value = respuesta[0].Volumen;
                let nombreApellidos = document.querySelector(".dinamicos");
                for (let index = 0; index < nombres.length; index++) {
                    nombreApellidos.innerHTML = nombreApellidos.innerHTML + `
                    <div class="container_par">
                        <label for="${index}+n">Autor ${index + 1}</label>
                        <input type="text" class="AUTOR" name="APELLIDOS" id="${index}+n" value="${nombres[index]}">
                    </div>
                    <div class="container_par">
                        <label for="${index}+a">Apellidos ${index + 1}</label>
                        <input type="text" class="APELLIDOS" name="APELLIDOS" id="${index}+a" value="${apellidos[index]}">
                    </div>
                    `


                }

            }

        }

    }
    xhr.send(datos);
}

function procesarinfo_j(numeroElementos) {
    let namesinput = document.querySelectorAll(".AUTOR");
    let apesinput = document.querySelectorAll(".APELLIDOS");
    let names = "";
    let apes = "";
    let auxiliarp = "";
    let auxiliarn = "";
    let nombre_completo = "";

    for (let index = 0; index < namesinput.length; index++) {
        if (index > 0) {
            nombre_completo = nombre_completo + "," + (namesinput[index].value + "#" + apesinput[index].value);
        }
        else {
            nombre_completo = nombre_completo + (namesinput[index].value + "#" + apesinput[index].value);

        }

    }
    apesinput.forEach((element, index) => {

        if (index > 0) {
            apes = apes + "," + element.value;
        }
        else
            apes = apes + element.value;

    });
    namesinput.forEach((element, index) => {
        if (index > 0) {
            names = names + "," + element.value;
        }
        else
            names = names + element.value;
    });

    let TITULO = document.querySelector(".TITULO");
    let EDITORIAL = document.querySelector(".EDITORIAL");
    const PAGINA = document.querySelector(".PAGINA");
    const ANIO = document.querySelector(".ANIO");
    let PAIS = document.querySelector(".PAIS");
    const ISBN = document.querySelector(".ISBN");
    const DOI = document.querySelector(".DOI");
    const primerInput = document.querySelector("#primerInput");
    const segundoInput = document.querySelector("#segundoInput");
    const tercerInput = document.querySelector("#tercerInput");
    let volumen = document.querySelector(".Volumen");
    let datos = new FormData();

    datos.append("autor", names);
    datos.append("apellidos", apes);
    datos.append("titulo", TITULO.value);
    datos.append("editorial", EDITORIAL.value);
    datos.append("isbn", ISBN.value);
    datos.append("pais", PAIS.value);
    datos.append("doi", DOI.value)
    datos.append("categoria1", primerInput.value);
    datos.append("categoria2", segundoInput.value);
    datos.append("categoria3", tercerInput.value);
    datos.append("pagina", PAGINA.value);
    datos.append("anio", ANIO.value);
    datos.append("volumen",volumen.value);
    datos.append("nombrecompleto", nombre_completo);
    datos.append("actualizar_j", "actualizar")
    
    actualizar_j(datos);

}
function actualizar_j(datos) {
    let id = document.querySelector("#id").textContent;
    let xhr = obtenerXMLHttRequest();
    datos.append("id", id);
    console.log(...datos);

    xhr.open('POST', "views/modulos/ajax.php", true);
    xhr.onload = function () {
        if (this.readyState == 4 && this.status == 200) {
            let respuesta = JSON.parse(this.responseText)
           
            console.log(respuesta);
            if (respuesta === "bien") {

                document.querySelector("#id").classList.remove("hidden");
                document.querySelector("#id").textContent = "Datos guardados correctamente"
                document.querySelector("#id").innerHTML = "Datos guardados correctamente"
                document.querySelector("#id").backgroundcolor;
                console.log("todo chido");
            }
            setTimeout(() => {
                document.querySelector("#id").classList.add("hidden");
                bandera_libro.classList.add("hidden")
                document.querySelector(".dinamicos").innerHTML = "";
                containerdatosMostrar.innerHTML = ""
                buscarDatosJournal(palabraAuxiliar,containerdatosMostrar);

            }, 1700);
        }
    }
    xhr.send(datos);

}