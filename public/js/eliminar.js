export {buscador}
import { obtenerXMLHttRequest } from './xmlhttpreques.js';
let containerdatosMostrar = document.querySelector(".mostrar_buscados");
let buscador = document.querySelector(".buscadorLibro input");
let btn_delete =document.querySelector(".btn-delete-libro");
let palabraAuxiliar = "";
if (buscador) {
    const icono = document.querySelector(".logo-buscar")

    //cuando el input de buscar va generar o se le va
    //escrbiendo atraparemos ese evento e iremos buscando 
    buscador.addEventListener("input", function (event) {


        const palabra = event.target.value;
        palabraAuxiliar = palabra;    
        revisar(palabra);


    })

    //solo para cambiar el color del foco del input
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
        if(buscador.parentElement.classList.contains("original")){
            containerdatosMostrar.innerHTML = "";
            buscarDatoslibro(palabra, containerdatosMostrar);
        }
        else{
            containerdatosMostrar.innerHTML = "";
            buscarDatosJournal(palabra,containerdatosMostrar);
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
                        <th class="checref" ><i class="material-icons">help</i> <span class="tooltip-box">Elimina referencias dando click en el icono de la basura</span></th>
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
                            <td class="checref"><span class="btn-delete-libro" ${indice.id}"><i class="large material-icons bandera ${indice.id}" id="${indice.id}" value='${indice.id}'>delete</i> </span></td>
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


if(containerdatosMostrar){
    containerdatosMostrar.addEventListener("click",function(e){
        if(e.target.classList.contains("bandera")){
            let id = e.target.classList[3];
            eliminarLibro(id);
        }
        if(e.target.classList.contains("bandera2")){
            let id = e.target.classList[3];
            eliminarJournal(id);
        }
    });
}
function eliminarLibro(id){
    console.log(palabraAuxiliar);
    
    let datos = new FormData();
    datos.append("ideleminiar",id);
    let xhr = obtenerXMLHttRequest();
    xhr.open('POST', "views/modulos/ajax.php", true);
    xhr.onload = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            containerdatosMostrar.innerHTML = "";
            document.querySelector(".view-modal.exitoeliminar").parentElement.classList.remove("hidden");
            if(JSON.parse(this.responseText) =="bien"){
                setTimeout(() => {
                    document.querySelector(".view-modal.exitoeliminar").parentElement.classList.add("hidden");
                    buscarDatoslibro(palabraAuxiliar,containerdatosMostrar)
                }, 1000);
            }
        }

    }
    xhr.send(datos);
}




/***pa el journal */
function buscarDatosJournal(palabra,elementoContenedor){
    const xhr = obtenerXMLHttRequest();
    var respuesta;
    const datos = new FormData();

    datos.append("buscandoInputJournal", "true");
    datos.append("datoBuscar", palabra);

    if (xhr) {

        xhr.open('POST', "views/modulos/ajax.php", true);

        xhr.onload = function () {
            if (this.readyState == 4 && this.status == 200) {
                let respuesta = JSON.parse(this.responseText);
                const tabla = document.createElement("table");
                const thead = document.createElement("thead");
                const tbody = document.createElement("tbody");
                console.log(respuesta);
                elementoContenedor.appendChild(tabla);
                tabla.appendChild(thead);
                tabla.appendChild(tbody);
                if (respuesta != "fallo") {
                    thead.innerHTML = `
                    <tr>
                        <th class="checref" ><i class="material-icons">help</i> <span class="tooltip-box">Elimina referencias dando click en el icono de la basura</span></th>
                        <th>Título</th>
                        <th>Autor</th>
                        <th>Editorial</th>
                        <th>País</th>
                        <th>isbn</th>
                        <th>Año</th>
                        <th>Volumen</th>
                        
                    </tr>`
                    for (let contador = 0; contador < respuesta.length; contador++) {
                        let indice = respuesta[contador];
                        tbody.innerHTML = tbody.innerHTML + `
                        <tr>
                            <td class="checref"><span class="btn-delete-libro" ${indice.id}"><i class="large material-icons bandera2 ${indice.id}" id="${indice.id}" value='${indice.id}'>delete</i> </span></td>
                            <td >${indice.titulo}</td>
                            <td>${indice.Autor}</td>
                            <td>${indice.Journal_Conferencia}</td>
                            <td>${indice.pais}</td>
                            <td>${indice.ISSN}</td>
                            <td>${indice.Anio}</td>
                            <td>vol.${indice.Volumen}</td>
                            
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


function eliminarJournal(id){
    console.log(palabraAuxiliar);
    
    let datos = new FormData();
    datos.append("eliminarjorunal",id);
    
    let xhr = obtenerXMLHttRequest();
    xhr.open('POST', "views/modulos/ajax.php", true);
    xhr.onload = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            containerdatosMostrar.innerHTML = "";
            document.querySelector(".view-modal.exitoeliminar").parentElement.classList.remove("hidden");
            if(JSON.parse(this.responseText) =="bien"){
                setTimeout(() => {
                    document.querySelector(".view-modal.exitoeliminar").parentElement.classList.add("hidden");
                    buscarDatosJournal(palabraAuxiliar,containerdatosMostrar)
                }, 1000);
            }
        }

    }
    xhr.send(datos);
}