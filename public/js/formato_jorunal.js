export { checkBuscarjournal, revisarCheckJournal, generarj };
import { obtenerXMLHttRequest } from './xmlhttpreques.js';

const containerdatosMostrar = document.querySelector(".mostrar_buscados");
const btn_formato = document.querySelector(".inputSearch .btn-formato");
const generar_formato = document.querySelector(".btn_generar_formato button");
let datosId = new FormData();
function checkBuscarjournal(palabra) {

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

    datos.append("buscandoInputJ", "true");
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
                console.log(respuesta);
                if (respuesta != "fallo") {
                    thead.innerHTML = `
                    <tr>
                        <th class="checref"><i class="material-icons">help</i> <span class="tooltip-box">Seleccione las referencias neceserias dando click en los checkbox</span></th>
                        <th>Título</th>
                        <th>Autor</th>
                        <th>Journal-conferencia</th>
                        <th>País</th>
                        <th>issn</th>
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

function revisarCheckJournal(event) {
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

    temporales.append("temporal_j", "temporal");
    let temporal = document.querySelector(".container_i");
    xhr.open("POST", "views/modulos/ajax.php", true);
    xhr.onload = function () {
        if (this.readyState == 4 && this.status == 200) {
            const respuesta = JSON.parse(this.responseText)
            console.log(respuesta);
            respuesta.forEach(element => {
                temporal.innerHTML = temporal.innerHTML + `<p class="temporal-p">
                    <span >${element.Autor}</span> ${element.titulo}  ${element.nombrecompleto}  ${element[6]} ${element[7]} ${element[11]} ${element.Journal_Conferencia} 
                </p>`

            });
        }
    }
    xhr.send(temporales);
}
function generarj(params) {
    document.querySelector(".retornarformato").classList.remove("hidden");
    document.querySelector(".temporales_mostrar").classList.add("hidden");

    document.querySelector(".contenedor_final_formato").classList.remove("hidden");
   
    imprimirReferenciasj(params);
}
function imprimirReferenciasj(parametros) {
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


                    if (etiqueta.classList.contains("paginasoooo")) {
                        if (etiqueta.classList.contains("cursiva")) {
                            if (count > 0) {
                                parrafo.innerHTML = parrafo.innerHTML + `<span class="cursiva"> ${element.Paginas}</span>`;
                            }
                            else {
                                parrafo.innerHTML = parrafo.innerHTML + `<span class="cursiva">${element.Paginas}</span>`;
                            }

                        }
                        else {
                            if (count > 0) {
                                parrafo.innerHTML = parrafo.innerHTML + `<span > ${element.Paginas}</span>`;
                            }
                            else {
                                parrafo.innerHTML = parrafo.innerHTML + `<span>${element.Paginas}</span>`;
                            }
                        }
                    }
                    if (etiqueta.classList.contains("titulo")) {
                        if (etiqueta.classList.contains("cursiva")) {
                            if (count > 0) {
                                parrafo.innerHTML = parrafo.innerHTML + `<span class="cursiva"> ${element.titulo}</span>`;
                            }
                            else {
                                parrafo.innerHTML = parrafo.innerHTML + `<span class="cursiva">${element.titulo}</span>`;
                            }

                        }
                        else {
                            if (count > 0) {
                                parrafo.innerHTML = parrafo.innerHTML + `<span > ${element.titulo}</span>`;
                            }
                            else {
                                parrafo.innerHTML = parrafo.innerHTML + `<span>${element.titulo}</span>`;
                            }
                        }
                    }
                    if (etiqueta.classList.contains("pais")) {
                        if (etiqueta.classList.contains("cursiva")) {
                            if (count > 0) {
                                parrafo.innerHTML = parrafo.innerHTML + `<span class="cursiva"> ${element.pais}</span>`;
                            }
                            else {
                                parrafo.innerHTML = parrafo.innerHTML + `<span class="cursiva">${element.pais}</span>`;
                            }

                        }
                        else {
                            if (count > 0) {
                                parrafo.innerHTML = parrafo.innerHTML + `<span > ${element.pais}</span>`;
                            }
                            else {
                                parrafo.innerHTML = parrafo.innerHTML + `<span>${element.pais}</span>`;
                            }
                        }
                    }
                    else if (etiqueta.classList.contains("journalConference")) {

                        if (etiqueta.classList.contains("cursiva")) {
                            if (count > 0) {
                                parrafo.innerHTML = parrafo.innerHTML + `<span class="cursiva"> ${element.Journal_Conferencia}</span>`;
                            }
                            else {
                                parrafo.innerHTML = parrafo.innerHTML + `<span class="cursiva">${element.Journal_Conferencia}</span>`;
                            }
                        }
                        else {
                            if (count > 0) {
                                parrafo.innerHTML = parrafo.innerHTML + `<span > ${element.Journal_Conferencia}</span>`;
                            }
                            else {
                                parrafo.innerHTML = parrafo.innerHTML + `<spa>${element.Journal_Conferencia }</span>`;
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

                                    anio.textContent =  element.Anio;
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
                                anio.textContent = element.Anio + " ";
                                parrafo.appendChild(anio);
                            }

                        }


                    }
                    else if (etiqueta.classList.contains("VOLUMEN")) {
                        let pais = document.createElement("span");

                        pais.textContent = "Vol." + element.Volumen;
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



                    } else if (etiqueta.classList.contains("apellidoscompletoinicial")) {
                        apellidoscompletoiniciaL(parrafo, element, etiqueta, count)
                    }
                    else if (etiqueta.classList.contains("incialA_apellido")) {
                        console.log("haz llegado aojpjiodfsjiodsv");
                        inicialA_apellido(parrafo, element, etiqueta, count)
                    }
                  
                    else if (etiqueta.classList.contains("namec_apec")) {
                        nombreseguidoapellido(parrafo, element, etiqueta, count)
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
// function nombrecompletoinci(parrafo, element, etiqueta, count) {
//     let inicial = document.createElement("span");
//     let nuevacadena1 = "";
//     let nuevacadena2 = "";
//     let nombres = (element.nombrecompleto).split(",");

//     for (let index = 0; index < nombres.length; index++) {
//         let tempnombre = nombres[index].split("#");
//         let temporalcompleto = ""
//         for (let indexi = 0; indexi < tempnombre.length; indexi++) {
//             if (indexi == 0) {
//                 let primero = tempnombre[indexi].charAt(0)
//                 primero = primero + ". "
//                 temporalcompleto = temporalcompleto + primero;
//             }
//             else {
//                 console.log(tempnombre[indexi]);
//                 temporalcompleto = temporalcompleto + " " + tempnombre[indexi];
//             }


//         }
//         if (index == 0) {
//             nuevacadena2 = nuevacadena2 + temporalcompleto;
//         }
//         else {
//             nuevacadena2 = nuevacadena2 + ", " + temporalcompleto
//         }

//     }
//     if (etiqueta.classList.contains("cursiva")) {
//         if (count > 0) {
//             parrafo.innerHTML = parrafo.innerHTML + `<span class="cursiva"> ${nuevacadena2}</span>`;
//         }
//         else {
//             parrafo.innerHTML = parrafo.innerHTML + `<span class="cursiva">${nuevacadena2}</span>`;
//         }
//     }
//     else {
//         if (count > 0) {
//             parrafo.innerHTML = parrafo.innerHTML + `<span> ${nuevacadena2}</span>`;
//         }
//         else {
//             parrafo.innerHTML = parrafo.innerHTML + `<span>${nuevacadena2}</span>`;
//         }
//     }

// }

function apellidoscompletoiniciaL(parrafo, element, etiqueta, count){
    let inicial = document.createElement("span");
    let cadenatempral = "";
    let nuevacadena2 = "";
    let nombres = (element.nombrecompleto).split(",");

    for (let index = 0; index < nombres.length; index++) {
        let tempnombre = nombres[index].split("#");
        let temporalcompleto = ""
        for (let indexi = 0; indexi < tempnombre.length; indexi++) {
            
            if (indexi == 0) {
                
                temporalcompleto = temporalcompleto + " " + tempnombre[indexi].charAt(0);
            }
            else {
                let primero = tempnombre[indexi];
                primero = primero + ". "
                cadenatempral= primero;
               
            }

        }
        if (index == 0) {
            nuevacadena2 = nuevacadena2 +cadenatempral + temporalcompleto;
        }
        else {
            nuevacadena2 = nuevacadena2 + ", " + cadenatempral+temporalcompleto
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
function inicialA_apellido(parrafo, element, etiqueta, count){
    let inicial = document.createElement("span");
    let cadenatempral = "";
    let nuevacadena2 = "";
    let nombres = (element.nombrecompleto).split(",");

    for (let index = 0; index < nombres.length; index++) {
        let tempnombre = nombres[index].split("#");
        let temporalcompleto = ""
        for (let indexi = 0; indexi < tempnombre.length; indexi++) {
            
            if (indexi == 0) {
                
                temporalcompleto = temporalcompleto + " " + tempnombre[indexi].charAt(0)+". ";
            }
            else {
                let primero = tempnombre[indexi];
                primero = primero + ". "
                cadenatempral= primero;
               
            }

        }
        if (index == 0) {
            nuevacadena2 = nuevacadena2 +temporalcompleto+cadenatempral  ;
        }
        else {
            nuevacadena2 = nuevacadena2 + ", " + temporalcompleto+cadenatempral  ;
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
/*************
 * 
 * 
 * 
 * OBTNEDREMOS TODOS LOS ID PARA ARRASTRARSE
 */


const VOLUMEN = document.querySelector("#VOLUMEN");
const NAMEC_APECJ = document.querySelector("#NAMEC_APECJ");
const JOURNALJ = document.querySelector("#JOURNALJ");
const DOIJ = document.querySelector("#DOIJ");
const ISSNJ = document.querySelector("#ISSNJ");
const TITULOJ = document.querySelector("#TITULOJ");
const PAISJ = document.querySelector("#PAISJ");
const ANIOJ = document.querySelector("#ANIOJ");
const apellidoscompletoinicial = document.querySelector("#apellidoscompletoinicialJ");
const container_formato_orden = document.querySelector(".orden");
const elementos2 = document.querySelector(".dos");
const elementos = document.querySelector(".elementos");
const incialA_apellidoJ = document.querySelector("#incialA_apellidoJoooooooo");
const PAGINASJ = document.querySelector("#PAGINASJoooooo");

if (TITULOJ) {
    TITULOJ.addEventListener("click", function (event) {
        if (TITULOJ.parentElement.classList.contains("dos")) {
            container_formato_orden.appendChild(TITULOJ);
        }
        else if (TITULOJ.parentElement.classList.contains("orden")) {
            const clase = TITULOJ.classList;
            if (clase[1]) {

                TITULOJ.classList.remove(clase[1]);
            }
            else {
                elementos2.appendChild(TITULOJ)
            }
        }
    })
}
if (VOLUMEN) {
    VOLUMEN.addEventListener("click", function (event) {
        if (VOLUMEN.parentElement.classList.contains("dos")) {
            container_formato_orden.appendChild(VOLUMEN);
        }
        else if (VOLUMEN.parentElement.classList.contains("orden")) {
            const clase = VOLUMEN.classList;
            if (clase[1]) {

                VOLUMEN.classList.remove(clase[1]);
            }
            else {
                elementos2.appendChild(VOLUMEN)
            }
        }
    })
}
if (NAMEC_APECJ) {
    NAMEC_APECJ.addEventListener("click", function (event) {
        if (NAMEC_APECJ.parentElement.classList.contains("dos")) {
            container_formato_orden.appendChild(NAMEC_APECJ);
        }
        else if (NAMEC_APECJ.parentElement.classList.contains("orden")) {
            const clase = NAMEC_APECJ.classList;
            if (clase[1]) {

                NAMEC_APECJ.classList.remove(clase[1]);
            }
            else {
                elementos2.appendChild(NAMEC_APECJ)
            }
        }
    })
}
if (JOURNALJ) {
    JOURNALJ.addEventListener("click", function (event) {
        if (JOURNALJ.parentElement.classList.contains("dos")) {
            container_formato_orden.appendChild(JOURNALJ);
        }
        else if (JOURNALJ.parentElement.classList.contains("orden")) {
            const clase = JOURNALJ.classList;
            if (clase[1]) {

                JOURNALJ.classList.remove(clase[1]);
            }
            else {
                elementos2.appendChild(JOURNALJ)
            }
        }
    })
}
if (DOIJ) {
    DOIJ.addEventListener("click", function (event) {
        if (DOIJ.parentElement.classList.contains("dos")) {
            container_formato_orden.appendChild(DOIJ);
        }
        else if (DOIJ.parentElement.classList.contains("orden")) {
            const clase = DOIJ.classList;
            if (clase[1]) {

                DOIJ.classList.remove(clase[1]);
            }
            else {
                elementos2.appendChild(DOIJ)
            }
        }
    })
}
if (ISSNJ) {
    ISSNJ.addEventListener("click", function (event) {
        if (ISSNJ.parentElement.classList.contains("dos")) {
            container_formato_orden.appendChild(ISSNJ);
        }
        else if (ISSNJ.parentElement.classList.contains("orden")) {
            const clase = ISSNJ.classList;
            if (clase[1]) {

                ISSNJ.classList.remove(clase[1]);
            }
            else {
                elementos2.appendChild(ISSNJ)
            }
        }
    })
}
if (PAISJ) {
    PAISJ.addEventListener("click", function (event) {
        if (PAISJ.parentElement.classList.contains("dos")) {
            container_formato_orden.appendChild(PAISJ);
        }
        else if (PAISJ.parentElement.classList.contains("orden")) {
            const clase = PAISJ.classList;
            if (clase[1]) {

                PAISJ.classList.remove(clase[1]);
            }
            else {
                elementos2.appendChild(PAISJ)
            }
        }
    })
}
if (ANIOJ) {
    ANIOJ.addEventListener("click", function (event) {
        if (ANIOJ.parentElement.classList.contains("dos")) {
            container_formato_orden.appendChild(ANIOJ);
        }
        else if (ANIOJ.parentElement.classList.contains("orden")) {
            const clase = ANIOJ.classList;
            if (clase[1]) {

                ANIOJ.classList.remove(clase[1]);
            }
            else {
                elementos2.appendChild(ANIOJ)
            }
        }
    })
}
if (apellidoscompletoinicial) {
    apellidoscompletoinicial.addEventListener("click", function (event) {
        if (apellidoscompletoinicial.parentElement.classList.contains("dos")) {
            container_formato_orden.appendChild(apellidoscompletoinicial);
        }
        else if (apellidoscompletoinicial.parentElement.classList.contains("orden")) {
            const clase = apellidoscompletoinicial.classList;
            if (clase[1]) {

                apellidoscompletoinicial.classList.remove(clase[1]);
            }
            else {
                elementos2.appendChild(apellidoscompletoinicial)
            }
        }
    })
}
if (PAGINASJ) {
    PAGINASJ.addEventListener("click", function (event) {
        console.log("haz dado click en la paginas");
        if (PAGINASJ.parentElement.classList.contains("dos")) {
            container_formato_orden.appendChild(PAGINASJ);
        }
        else if (PAGINASJ.parentElement.classList.contains("orden")) {
            const clase = PAGINASJ.classList;
            if (clase[1]) {

                PAGINASJ.classList.remove(clase[1]);
            }
            else {
                elementos2.appendChild(PAGINASJ)
            }
        }
    })
}
if(incialA_apellidoJ){
    incialA_apellidoJ.addEventListener("click", function (event) {
       
        if (incialA_apellidoJ.parentElement.classList.contains("dos")) {
            container_formato_orden.appendChild(incialA_apellidoJ);
        }
        else if (incialA_apellidoJ.parentElement.classList.contains("orden")) {
            const clase = incialA_apellidoJ.classList;
            if (clase[1]) {

                incialA_apellidoJ.classList.remove(clase[1]);
            }
            else {
                elementos2.appendChild(incialA_apellidoJ)
            }
        }
    })
}