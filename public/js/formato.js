export { checkBuscar, revisarCheck, autor, titulo, cursiva, Anio, parentesis, parentesis2, punto, comilla, coma, pais, dospuntos, Editorial, doi };
import { generarj } from './formato_jorunal.js';
import { obtenerXMLHttRequest } from './xmlhttpreques.js';
const containerdatosMostrar = document.querySelector(".mostrar_buscados");
const btn_formato = document.querySelector(".inputSearch .btn-formato");
const generar_formato = document.querySelector(".btn_generar_formato button");

let datosId = new FormData();

function checkBuscar(palabra) {

    if (palabra.length > 0) {
        containerdatosMostrar.innerHTML = "";

        buscarDatos(palabra, containerdatosMostrar);
    }
    else {
        if (!btn_formato.getAttribute("disabled")) {
            btn_formato.setAttribute("disabled", "disabled");
        }
        containerdatosMostrar.innerHTML = "";
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
                            <td class="checref"><input type="checkbox" name="" id="${indice.id}" value='${indice.id}' class="ref"></td>
                            <td >${indice.titulo}</td>
                            <td>${indice.Autor}</td>
                            <td>${indice.Editorial}</td>
                            <td>${indice.pais}</td>
                            <td>${indice.ISBN}</td>
                            <td>${indice.Anio}</td>
                            
                        </tr>`
                    }
                    btn_formato.removeAttribute("disabled");

                }
                else {
                    console.log("sin numero");
                }
            }
        }
        xhr.send(datos);
    }
}

/********************************************************** */
/********************************************************** */
/********************************************************** */
/**Funiones para verificar si algun check se selecciono */
function revisarCheck(event) {
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

/***funciones para generar el formato */
if (generar_formato) {
    generar_formato.addEventListener("click", function (event) {

        let formato = document.querySelectorAll(".orden label");
        if (formato.length > 0) {
            if (generar_formato.parentElement.classList.contains("journal-btn")) {
                generar_formato.classList.add("hidden");
                generarj(formato);
            }
            else {
                generar_formato.classList.add("hidden");
                generar(formato);
            }

        }
    });
}
function generar(params) {
    document.querySelector(".retornarformato").classList.remove("hidden");
    document.querySelector(".temporales_mostrar").classList.add("hidden");

    document.querySelector(".contenedor_final_formato").classList.remove("hidden");
    imprimirReferencias(params);
}
const retorFormato = document.querySelector(".retornarformato button");

if (retorFormato) {
    retorFormato.addEventListener("click", function () {
        document.querySelector(".temporales_mostrar").classList.remove("hidden");
        retorFormato.parentElement.classList.add("hidden");
        document.querySelector(".contenedor_final_formato").classList.add("hidden");
        document.querySelector(".btn_generar_formato button").classList.remove("hidden");
    });
}


function imprimirReferencias(parametros) {
    let xhr = obtenerXMLHttRequest();
    let lugar_formatos = document.querySelector(".contenedor_final_formato .container_i");
    lugar_formatos.innerHTML = "";
    xhr.open("POST", "views/modulos/ajax.php", true);
    let parrafo = document.createElement("p");
    lugar_formatos.appendChild(parrafo);
    xhr.onload = function () {
        if (this.readyState == 4 && this.status == 200) {
            const respuesta = JSON.parse(this.responseText);
            let orden = document.querySelector(".orden");
            respuesta.forEach(element => {
                let parrafo = document.createElement("p");
                lugar_formatos.appendChild(parrafo);

                /***arui empieza el formateo */
                parametros.forEach(etiqueta => {
                    let count = orden.children.length;
                    if (etiqueta.classList.contains("Autor")) {
                        if (etiqueta.classList.contains("cursiva")) {
                            if (count > 0) {
                                parrafo.innerHTML = parrafo.innerHTML + `<span class="cursiva"> ${element.Autor}</span>`;
                            }
                            else {
                                parrafo.innerHTML = parrafo.innerHTML + `<span class="cursiva">${element.Autor}</span>`;
                            }

                        }
                        else {
                            if (count > 0) {
                                parrafo.innerHTML = parrafo.innerHTML + `<span > ${element.Autor}</span>`;
                            }
                            else {
                                parrafo.innerHTML = parrafo.innerHTML + `<span >${element.Autor}</span>`;
                            }

                        }
                    }
                    if (etiqueta.classList.contains("paginas")) {
                        if (etiqueta.classList.contains("cursiva")) {
                            if (count > 0) {
                                parrafo.innerHTML = parrafo.innerHTML + `<span class="cursiva"> ${element.pagina}</span>`;
                            }
                            else {
                                parrafo.innerHTML = parrafo.innerHTML + `<span class="cursiva">${element.pagina}</span>`;
                            }

                        }
                        else {
                            if (count > 0) {
                                parrafo.innerHTML = parrafo.innerHTML + `<span > ${element.pagina}</span>`;
                            }
                            else {
                                parrafo.innerHTML = parrafo.innerHTML + `<span >${element.pagina}</span>`;
                            }

                        }
                    }
                    else if (etiqueta.classList.contains("titulo")) {
                        if (etiqueta.classList.contains("cursiva")) {
                            if (count > 1) {
                                if(etiqueta.previousSibling.classList.contains("comilla")){
                                    parrafo.innerHTML = parrafo.innerHTML + `<span class="cursiva">${element.titulo}</span>`;
                                }
                                else{
                                    parrafo.innerHTML = parrafo.innerHTML + `<span class="cursiva"> ${element.titulo}</span>`;
                                }
                                
                            }
                            else {
                                parrafo.innerHTML = parrafo.innerHTML + `<span class="cursiva">${element.titulo}</span>`;
                            }

                        }
                        else {
                            if (count > 1) {
                                if(etiqueta.previousSibling.classList.contains("comilla")){
                                    parrafo.innerHTML = parrafo.innerHTML + `<span > ${element.titulo}</span>`;
                                }
                                else{
                                    parrafo.innerHTML = parrafo.innerHTML + `<span > ${element.titulo}</span>`;
                                }
                                
                            }
                            else {
                                parrafo.innerHTML = parrafo.innerHTML + `<span>${element.titulo}</span>`;
                            }
                        }
                    }
                    else if (etiqueta.classList.contains("Editorial")) {

                        if (etiqueta.classList.contains("cursiva")) {
                            if (count > 0) {
                                parrafo.innerHTML = parrafo.innerHTML + `<span class="cursiva"> ${element.Editorial}</span>`;
                            }
                            else {
                                parrafo.innerHTML = parrafo.innerHTML + `<span class="cursiva">${element.Editorial}</span>`;
                            }
                        }
                        else {
                            if (count > 0) {
                                parrafo.innerHTML = parrafo.innerHTML + `<span > ${element.Editorial}</span>`;
                            }
                            else {
                                parrafo.innerHTML = parrafo.innerHTML + `<spa>${element.Editorial}</span>`;
                            }
                        }

                    }
                    else if (etiqueta.classList.contains("pp")) {
                        if (etiqueta.classList.contains("cursiva")) {
                            if (count > 0) {
                                parrafo.innerHTML = parrafo.innerHTML + `<span class="cursiva"> pp</span>`;
                            }
                            else {
                                parrafo.innerHTML = parrafo.innerHTML + `<span class="cursiva">pp</span>`;
                            }

                        }
                        else {
                            if (count > 0) {
                                parrafo.innerHTML = parrafo.innerHTML + `<span > pp</span>`;
                            }
                            else {
                                parrafo.innerHTML = parrafo.innerHTML + `<span >pp</span>`;
                            }
                        }

                    }

                    else if (etiqueta.classList.contains("ape")) {
                        if (etiqueta.classList.contains("cursiva")) {
                            if (count > 0) {
                                parrafo.innerHTML = parrafo.innerHTML + `<span class="cursiva"> ${element.Apellidos}</span>`;
                            }
                            else {
                                parrafo.innerHTML = parrafo.innerHTML + `<span class="cursiva">${element.Apellidos}</span>`;
                            }
                        }
                        else {
                            if (count > 0) {
                                parrafo.innerHTML = parrafo.innerHTML + `<span > ${element.Apellidos}</span>`;
                            }
                            else {
                                parrafo.innerHTML = parrafo.innerHTML + `<span >${element.Apellidos}</span>`;
                            }
                        }

                    }

                    else if (etiqueta.classList.contains("doi")) {
                        if (etiqueta.classList.contains("cursiva")) {
                            if (count > 0) {
                                parrafo.innerHTML = parrafo.innerHTML + `<span class="cursiva"> ${element.doi}</span>`;
                            }
                            else {
                                parrafo.innerHTML = parrafo.innerHTML + `<span class="cursiva">${element.doi}</span>`;
                            }
                        }
                        else {
                            if (count > 0) {
                                parrafo.innerHTML = parrafo.innerHTML + `<span > ${element.doi}</span>`;
                            }
                            else {
                                parrafo.innerHTML = parrafo.innerHTML + `<span >${element.doi}</span>`;
                            }
                        }
                    }
                    else if (etiqueta.classList.contains("Anio")) {
                        let anio = document.createElement("span");


                        if (etiqueta.classList.contains("cursiva")) {
                            if (parrafo.lastChild) {
                                if (parrafo.lastChild.classList.contains("pare1")) {

                                    anio.textContent = element.Anio;
                                    parrafo.appendChild(anio);
                                }
                                else {
                                    anio.textContent = element.Anio;
                                    parrafo.appendChild(anio);
                                }
                                anio.classList.add("cursiva");
                            }
                            else {

                                anio.textContent = element.Anio;
                                parrafo.appendChild(anio);

                                anio.classList.add("cursiva");
                            }
                        }

                        else {
                            if (parrafo.lastChild) {
                                if (parrafo.lastChild.classList.contains("pare1")) {
                                    anio.textContent = element.Anio;
                                    parrafo.appendChild(anio);

                                }
                                else {
                                    anio.textContent = " " + element.Anio;
                                    parrafo.appendChild(anio);
                                }
                            }
                            else {
                                anio.textContent = element.Anio;
                                parrafo.appendChild(anio);
                            }

                        }


                    }
                    else if (etiqueta.classList.contains("pais")) {
                        let pais = document.createElement("span");
                        pais.value = element.pais
                        pais.textContent = element.pais;
                        parrafo.appendChild(pais);
                        if (etiqueta.classList.contains("cursiva")) {
                            if (count > 0) {
                                pais.innerHTML = " " + pais.innerHTML;
                            }
                            pais.classList.add("cursiva");
                        }
                        else {
                            if (count > 0) {
                                pais.innerHTML = " " + pais.innerHTML;
                            }
                        }

                    }



                    else if (etiqueta.classList.contains("parentesis")) {

                        if (count > 0) {
                            parrafo.innerHTML = parrafo.innerHTML + `<span class="pare1"> (</span>`;
                        }
                        else {
                            parrafo.innerHTML = parrafo.innerHTML + `<span class="pare1">(</span>`;
                        }



                    }
                    else if (etiqueta.classList.contains("namec_apec")) {
                        nombreseguidoapellido(parrafo, element, etiqueta, count)
                    }
                    else if (etiqueta.classList.contains("inicialA_y_apellidos")) {
                        nombrecompletoinci(parrafo, element, etiqueta, count)
                    }
                    else if (etiqueta.classList.contains("inicial")) {

                        incialNombre(parrafo, element, etiqueta);
                    }
                    else if (etiqueta.classList.contains("apeI")) {
                        console.log("esto pasa antes de todo");
                        incialApellidos(parrafo, element, etiqueta);

                    }
                    else if (etiqueta.classList.contains("comilla")) {
                        comillafunction(parrafo, element, etiqueta, count);
                        // parrafo.innerHTML = parrafo.innerHTML + `<span>"</span>`
                    }
                    else if (etiqueta.classList.contains("parentesis2")) {
                        parrafo.innerHTML = parrafo.innerHTML + `<span class="pare2">)</span>`
                    }

                    else if (etiqueta.classList.contains("punto")) {
                        parrafo.innerHTML = parrafo.innerHTML + `<span class="pnto">.</span>`
                    }


                    else if (etiqueta.classList.contains("dospuntos")) {
                        parrafo.innerHTML = parrafo.innerHTML + `<span class="pnts">:</span>`
                    }
                    else if (etiqueta.classList.contains("coma")) {
                        parrafo.innerHTML = parrafo.innerHTML + `<span class="cma">,</span>`
                    }



                });
            });
            let total = document.querySelector(".contenedor_final_formato .container_i");
            total.removeChild(total.childNodes[0]);
            /******************************* */
            /**      aqui termina el formateo de las referencias */
        }
    }
    xhr.send(datosId);
}
function comillafunction(parrafo, element, etiqueta, count) {

    let spaneelement = document.createElement("span");
    let elementul = parrafo.lastChild;
    if (elementul) {
        let elementoanterior = parrafo.lastChild.classList;
        if (etiqueta.classList.contains("cursiva")) {
            spaneelement.classList.add("cursiva");
            if (elementoanterior.contains("pare2") || elementoanterior.contains("cma")
                || elementoanterior.contains("pnts")
                || elementoanterior.contains("pnto")) {
                spaneelement.textContent = ` "`;
                parrafo.appendChild(spaneelement);
            }
            else {
                spaneelement.textContent = `"`;
                parrafo.appendChild(spaneelement);
            }
        }
        else {
            if (elementoanterior.contains("pare2") || elementoanterior.contains("cma")
                || elementoanterior.contains("pnts")
                || elementoanterior.contains("pnto")) {
                spaneelement.textContent = ` "`;
                parrafo.appendChild(spaneelement);
            }
            else {
                spaneelement.textContent = `"`;
                parrafo.appendChild(spaneelement);
            }
        }
    }
    else {
        spaneelement.textContent = `"`;
        parrafo.appendChild(spaneelement);
    }

}
function nombreseguidoapellido(parrafo, element, etiqueta, count) {
    let spannewelement = document.createElement("span");
    let nombres = (element.nombrecompleto).split(",");
    let nuevacadena2 = "";
    for (let index = 0; index < nombres.length; index++) {
        let tempnombre = nombres[index].split("#");
        let temporalcompleto = ""

        for (let indexi = 0; indexi < tempnombre.length; indexi++) {
            if (indexi == 0) {
                let primero = tempnombre[indexi];
                primero = primero
                temporalcompleto = temporalcompleto + primero;
            }
            else {

                temporalcompleto = temporalcompleto + " " + tempnombre[indexi];
            }


        }
        if (index == 0) {
            nuevacadena2 = nuevacadena2 + temporalcompleto;
        }
        else {
            nuevacadena2 = nuevacadena2 + ", " + temporalcompleto
        }

    }
    if (etiqueta.classList.contains("cursiva")) {
        spannewelement.classList.add("cursiva");
        if (count > 0) {
            spannewelement.textContent = " " + nuevacadena2;
            parrafo.append(spannewelement);
        }
        else {
            spannewelement.textContent = nuevacadena2;
            parrafo.append(spannewelement);
        }

    }
    else {
        if (count > 0) {
            spannewelement.textContent = " " + nuevacadena2;
            parrafo.append(spannewelement);
        }
        else {
            spannewelement.textContent = nuevacadena2;
            parrafo.append(spannewelement);
        }
    }



}
function nombrecompletoinci(parrafo, element, etiqueta, count) {
    let inicial = document.createElement("span");
    let nuevacadena1 = "";
    let nuevacadena2 = "";
    let nombres = (element.nombrecompleto).split(",");

    for (let index = 0; index < nombres.length; index++) {
        let tempnombre = nombres[index].split("#");
        let temporalcompleto = ""
        for (let indexi = 0; indexi < tempnombre.length; indexi++) {
            if (indexi == 0) {
                let primero = tempnombre[indexi].charAt(0)
                primero = primero + ". "
                temporalcompleto = temporalcompleto + primero;
            }
            else {
                console.log(tempnombre[indexi]);
                temporalcompleto = temporalcompleto + " " + tempnombre[indexi];
            }


        }
        if (index == 0) {
            nuevacadena2 = nuevacadena2 + temporalcompleto;
        }
        else {
            nuevacadena2 = nuevacadena2 + ", " + temporalcompleto
        }

    }
    if (etiqueta.classList.contains("cursiva")) {
        if (count > 0) {
            parrafo.innerHTML = parrafo.innerHTML + `<span class="cursiva"> ${nuevacadena2}</span>`;
        }
        else {
            parrafo.innerHTML = parrafo.innerHTML + `<span class="cursiva">${nuevacadena2}</span>`;
        }
    }
    else {
        if (count > 0) {
            parrafo.innerHTML = parrafo.innerHTML + `<span> ${nuevacadena2}</span>`;
        }
        else {
            parrafo.innerHTML = parrafo.innerHTML + `<span>${nuevacadena2}</span>`;
        }
    }

}
function incialNombre(contenedor, elemento, etiqueta) {
    let inicial = document.createElement("span");
    let nuevacadena = "";
    let contador = 0;
    // parrafo.appendChild(pais)
    let array = (elemento.Autor).split(",");
    if (etiqueta.classList.contains("cursiva")) {
        inicial.classList.add("cursiva");
    }

    if (array.length < 1) {
        nuevacadena = elemento.Autor.charAt(0) + ".";
        inicial.textContent = nuevacadena;
        contenedor.appendChild(inicial);

    }
    else {
        array.forEach(element => {
            if (contador < 1) {
                nuevacadena = nuevacadena + element.charAt(0) + ". ";
            }
            else {
                nuevacadena = nuevacadena + element.charAt(1) + "."
            }
            contador = contador + 1;
        });
        inicial.textContent = nuevacadena;
        contenedor.appendChild(inicial);
    }

}
function incialApellidos(contenedor, elemento, etiqueta) {
    let inicial = document.createElement("span");
    let nuevacadena = "";
    let contador = 0;
    let orden = document.querySelector(".orden");
    let count = orden.children.length;
    // parrafo.appendChild(pais)
    let array = (elemento.Apellidos).split(",");
    if (etiqueta.classList.contains("cursiva")) {

        inicial.classList.add("cursiva");
    }




    if (array.length < 1) {
        nuevacadena = elemento.Apellidos.charAt(0) + ".";
        inicial.textContent = nuevacadena;
        contenedor.appendChild(inicial);

    }
    else {
        array.forEach(element => {
            if (contador < 1) {
                nuevacadena = nuevacadena + element.charAt(0) + ". ";
            }
            else {
                nuevacadena = nuevacadena + element.charAt(1) + "."
            }
            contador = contador + 1;
        });
        inicial.textContent = nuevacadena;
        console.log(inicial.textContent);
        contenedor.appendChild(inicial);
    }
}




/******************************** */
/***eventos para armar el estilo */

const container_formato_orden = document.querySelector(".orden");
const elementos = document.querySelector(".elementos");
const elementos2 = document.querySelector(".dos");
const autor = document.querySelector("#Autor");
const cursiva = document.querySelector("#cursiva");
const Anio = document.querySelector("#Anio");
const titulo = document.querySelector("#titulo");
const parentesis = document.querySelector("#parentesis");
const dospuntos = document.querySelector("#dospuntos");
const parentesis2 = document.querySelector("#parentesis2");
const comilla = document.querySelector("#comilla");
const Editorial = document.querySelector("#Editorial");
const doi = document.querySelector("#doi");
const coma = document.querySelector("#coma");
const pais = document.querySelector("#pais");
const punto = document.querySelector("#punto");
const pp = document.querySelector("#pp");
const ape = document.querySelector("#ape");
const namec_apec = document.querySelector("#namec_apec");
const inicialA_y_apellidos = document.querySelector("#inicialA_y_apellidos");
const pagina = document.querySelector(".paginas");



if (pagina) {
    pagina.addEventListener("click", function (event) {
        if (pagina.parentElement.classList.contains("dos")) {
            container_formato_orden.appendChild(pagina);
        }
        else if (pagina.parentElement.classList.contains("orden")) {
            const clase = pagina.classList;
            if (clase[1]) {

                pagina.classList.remove(clase[1]);
            }
            else {
                elementos2.appendChild(pagina)
            }
        }
    });
}
if (autor) {
    autor.addEventListener("click", function (event) {
        if (autor.parentElement.classList.contains("dos")) {
            container_formato_orden.appendChild(autor);
        }
        else if (autor.parentElement.classList.contains("orden")) {
            const clase = autor.classList;
            if (clase[1]) {

                autor.classList.remove(clase[1]);
            }
            else {
                elementos2.appendChild(autor)
            }
        }
    });
}
if (inicialA_y_apellidos) {
    inicialA_y_apellidos.addEventListener("click", function (event) {
        if (inicialA_y_apellidos.parentElement.classList.contains("dos")) {
            container_formato_orden.appendChild(inicialA_y_apellidos);
        }
        else if (inicialA_y_apellidos.parentElement.classList.contains("orden")) {
            const clase = inicialA_y_apellidos.classList;
            if (clase[1]) {

                inicialA_y_apellidos.classList.remove(clase[1]);
            }
            else {
                elementos2.appendChild(inicialA_y_apellidos)
            }
        }
    });
}

if (ape) {
    ape.addEventListener("click", function (event) {
        if (ape.parentElement.classList.contains("dos")) {
            container_formato_orden.appendChild(ape);
        }
        else if (ape.parentElement.classList.contains("orden")) {
            const clase = ape.classList;
            if (clase[1]) {

                ape.classList.remove(clase[1]);
            }
            else {
                elementos2.appendChild(ape)
            }
        }
    });
}
if (titulo) {
    titulo.addEventListener("click", function (event) {
        if (titulo.parentElement.classList.contains("dos")) {
            container_formato_orden.appendChild(titulo);
        }
        else if (titulo.parentElement.classList.contains("orden")) {
            const clase = titulo.classList;
            if (clase[1]) {

                titulo.classList.remove(clase[1]);
            }
            else {
                elementos2.appendChild(titulo)
            }
        }
    })
}
if (cursiva) {
    cursiva.addEventListener("click", function (evento) {
        if (container_formato_orden.childNodes.length > 0) {
            // if (container_formato_orden.lastChild.classList.contains("Autor") ||
            // container_formato_orden.lastChild.classList.contains("titulo")) {
            if (!container_formato_orden.lastChild.classList.contains("cursiva")) {
                container_formato_orden.lastChild.classList.add("cursiva");
            }
            // }
        }
    });
}

if (Anio) {
    Anio.addEventListener("click", function (event) {
        if (Anio.parentElement.classList.contains("dos")) {
            container_formato_orden.appendChild(Anio);
        }
        else if (Anio.parentElement.classList.contains("orden")) {
            const clase = Anio.classList;
            if (clase[1]) {

                Anio.classList.remove(clase[1]);
            }
            else {
                elementos2.appendChild(Anio)
            }
        }

    });
}
if (parentesis) {
    parentesis.addEventListener("click", function (event) {
        let bandera = document.querySelectorAll(".orden .parentesis2");
        if (parentesis.parentElement.classList.contains("elementos") && (bandera.length) < 10) {

            let copia = parentesis.cloneNode(true);
            //copia.setAttribute("onclick","punto2(this)");            
            container_formato_orden.appendChild(copia);
            copia.addEventListener("click", function () {
                container_formato_orden.removeChild(copia);
            })

        }
    });
}
if (parentesis2) {
    parentesis2.addEventListener("click", function (event) {
        // if (parentesis2.parentElement.classList.contains("elementos")) {
        //     container_formato_orden.appendChild(parentesis2);
        // }
        // else {
        //     elementos.appendChild(parentesis2);
        // }
        let bandera = document.querySelectorAll(".orden .parentesis2");
        if (parentesis2.parentElement.classList.contains("elementos") && (bandera.length) < 10) {

            let copia = parentesis2.cloneNode(true);
            //copia.setAttribute("onclick","punto2(this)");            
            container_formato_orden.appendChild(copia);
            copia.addEventListener("click", function () {
                container_formato_orden.removeChild(copia);
            })

        }
    });
}
if (pais) {
    pais.addEventListener("click", function (event) {
        if (pais.parentElement.classList.contains("dos")) {
            container_formato_orden.appendChild(pais);
        }
        else if (pais.parentElement.classList.contains("orden")) {
            const clase = pais.classList;
            if (clase[1]) {

                pais.classList.remove(clase[1]);
            }
            else {
                elementos2.appendChild(pais)
            }
        }

    });
}

if (punto) {
    punto.addEventListener("click", function (event) {

        let bandera = document.querySelectorAll(".orden .punto");
        if (punto.parentElement.classList.contains("elementos") && (bandera.length) < 10) {

            let copia = punto.cloneNode(true);
            //copia.setAttribute("onclick","punto2(this)");            
            container_formato_orden.appendChild(copia);
            copia.addEventListener("click", function () {
                container_formato_orden.removeChild(copia);
            })

        }

    });
}

if (pp) {
    pp.addEventListener("click", function (event) {
        if (pp.parentElement.classList.contains("elementos")) {
            container_formato_orden.appendChild(pp);
        }
        else if (pp.parentElement.classList.contains("orden")) {
            const clase = pp.classList;
            if (clase[1]) {

                pp.classList.remove(clase[1]);
            }
            else {
                elementos.appendChild(pp)
            }
        }
    });
}
if (coma) {
    coma.addEventListener("click", function (event) {

        let bandera = document.querySelectorAll(".orden .coma");
        if (coma.parentElement.classList.contains("elementos") && (bandera.length) < 10) {

            let copia = coma.cloneNode(true);
            //copia.setAttribute("onclick","punto2(this)");            
            container_formato_orden.appendChild(copia);
            copia.addEventListener("click", function () {
                container_formato_orden.removeChild(copia);
            });

        }


    });
}

if (comilla) {
    comilla.addEventListener("click", function (event) {

        let bandera = document.querySelectorAll(".orden .comilla");
        if (comilla.parentElement.classList.contains("elementos") && (bandera.length) < 2) {

            let copia = comilla.cloneNode(true);
            //copia.setAttribute("onclick","punto2(this)");            
            container_formato_orden.appendChild(copia);
            copia.addEventListener("click", function () {
                container_formato_orden.removeChild(copia);
            });

        }
    });
}

if (dospuntos) {
    dospuntos.addEventListener("click", function (event) {
        if (dospuntos.parentElement.classList.contains("elementos")) {
            container_formato_orden.appendChild(dospuntos);
        }
        else {
            elementos.appendChild(dospuntos);
        }
    });
}

if (Editorial) {
    Editorial.addEventListener("click", function (event) {
        if (Editorial.parentElement.classList.contains("dos")) {
            container_formato_orden.appendChild(Editorial);
        }
        else if (Editorial.parentElement.classList.contains("orden")) {
            const clase = Editorial.classList;
            if (clase[1]) {

                Editorial.classList.remove(clase[1]);
            }
            else {
                elementos2.appendChild(Editorial)
            }
        }

    });
}

if (doi) {
    doi.addEventListener("click", function (event) {
        if (doi.parentElement.classList.contains("dos")) {
            container_formato_orden.appendChild(doi);
        }
        else if (doi.parentElement.classList.contains("orden")) {
            const clase = doi.classList;
            if (clase[1]) {

                doi.classList.remove(clase[1]);
            }
            else {
                elementos2.appendChild(doi)
            }
        }

    });
}

if (namec_apec) {
    namec_apec.addEventListener("click", function (event) {
        if (namec_apec.parentElement.classList.contains("dos")) {
            container_formato_orden.appendChild(namec_apec);
        }
        else if (namec_apec.parentElement.classList.contains("orden")) {
            const clase = namec_apec.classList;
            if (clase[1]) {

                namec_apec.classList.remove(clase[1]);
            }
            else {
                elementos2.appendChild(namec_apec)
            }
        }

    });
}


let cadena = "";
let libro_formato = document.querySelector(".libro_formato");
let radioyes = document.querySelector(".yes");
let radionot = document.querySelector(".not");
let modal_input = document.querySelector(".input");
let nombreformato = document.querySelector(".nombreformato");
let modal_guardar_defecto = document.querySelector(".modal_guardar_defecto");
let btn_guardar_formas = document.querySelector(".btn_guardar_formas");
let journal_guardar = document.querySelector(".journal_guardar");
if (radionot) {
    radionot.addEventListener("change", function (event) {
        modal_input.classList.add("hidden");
    });
    radioyes.addEventListener("change", function (even) {
        modal_input.classList.remove("hidden");
    });
    libro_formato.addEventListener("click", function () {
        if (radionot.checked) {
            modal_guardar_defecto.classList.add("hidden");

        }
        else if (radioyes.checked) {
            if (/[a-zA-Z]+/.test(nombreformato.value)) {
                if (journal_guardar) {
                    enviarFormatoJ(nombreformato.value,cadena);
                }
                else {
                    enviarFormato(nombreformato.value, cadena);
                }
                cadena = "";
                nombreformato.value = ""
                setTimeout(() => {
                    modal_guardar_defecto.classList.add("hidden");
                }, 1600);
            }
            else {
                nombreformato.classList.add("danger");
            }
            setTimeout(() => {
                nombreformato.classList.remove("danger");
            }, 1600);
        }
    });


    btn_guardar_formas.addEventListener("click", function (event) {
        let formato = document.querySelectorAll(".orden label");
        for (let index = 0; index < formato.length; index++) {
            if (index > 0) {
                if (formato[index].classList.contains("cursiva")) {
                    cadena = cadena + "#" + formato[index].classList[0] + "#cursive";
                }
                else {
                    cadena = cadena + "#" + formato[index].classList[0];
                }
            }
            else {
                if (formato[index].classList.contains("cursiva")) {
                    cadena = cadena + formato[index].classList[0] + "#cursive";
                }
                else {
                    cadena = cadena + formato[index].classList[0];
                }

            }

        }
        
        modal_guardar_defecto.classList.remove("hidden");
    });
}

function enviarFormato(nombre, formato) {
    let datos = new FormData();
    let xhr = obtenerXMLHttRequest();
    datos.append("nombre", nombre);
    datos.append("formato", formato);

    xhr.open("POST", "views/modulos/ajax.php", true);
    xhr.onload = function () {
        if (this.readyState == 4 && this.status == 200) {
            const respuesta = JSON.parse(this.responseText)
            console.log(respuesta);
        }
    }
    xhr.send(datos);

}

function enviarFormatoJ(nombre, formato) {
    
    let datos = new FormData();
    let xhr = obtenerXMLHttRequest();
    datos.append("nombreJ", nombre);
    datos.append("formato", formato);

    xhr.open("POST", "views/modulos/ajax.php", true);
    xhr.onload = function () {
        if (this.readyState == 4 && this.status == 200) {
            const respuesta = JSON.parse(this.responseText)
            console.log(respuesta);
        }
    }
    xhr.send(datos);

}
