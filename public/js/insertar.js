export { hiddenCategorias, extraercategorias, validarDatos, addAutor }
import { obtenerXMLHttRequest } from "./xmlhttpreques.js"


const defecto = document.querySelector(".defecto");
const personalizado = document.querySelector(".personalizado");


/**funcion para seleciconar categoria o ingresar mediante un campo de texto */
function hiddenCategorias(referencia) {
    if (referencia.classList.contains("pordefecto")) {
        referencia.classList.remove("pordefecto");
        defecto.classList.add("hidden");
        personalizado.classList.remove("hidden");
        referencia.innerHTML = "Seleccionar Categorias"


        const select = document.querySelectorAll(".group_container select");

        select[0].removeAttribute("name");
        select[1].removeAttribute("name");
        select[2].removeAttribute("name");

        select[0].classList.remove("categoria1");
        select[1].classList.remove("categoria2");
        select[2].classList.remove("categoria3");
        select[0].classList.remove("categoria");
        select[1].classList.remove("categoria");
        select[2].classList.remove("categoria");

        const personalizada_input = document.querySelectorAll(".personalizado input");
        personalizada_input[0].setAttribute("name", "categoria1");
        personalizada_input[1].setAttribute("name", "categoria2");
        personalizada_input[2].setAttribute("name", "categoria3");


        personalizada_input[0].classList.add("categoria1");
        personalizada_input[1].classList.add("categoria2");
        personalizada_input[2].classList.add("categoria3");
        personalizada_input[0].classList.add("categoria");
        personalizada_input[1].classList.add("categoria");
        personalizada_input[2].classList.add("categoria");

        personalizada_input[2].value = select[2].value;
        personalizada_input[0].value = select[0].value;
        personalizada_input[1].value = select[1].value;


    }
    else if (!referencia.classList.contains("pordefecto")) {
        referencia.classList.add("pordefecto");
        defecto.classList.remove("hidden");
        personalizado.classList.add("hidden");
        referencia.innerHTML = "Introducir Categorias";


        const personalizada_input = document.querySelectorAll(".personalizado input");
        personalizada_input[0].removeAttribute("name");
        personalizada_input[1].removeAttribute("name");
        personalizada_input[2].removeAttribute("name");

        personalizada_input[0].classList.remove("categoria1");
        personalizada_input[1].classList.remove("categoria2");
        personalizada_input[2].classList.remove("categoria3");
        personalizada_input[0].classList.remove("categoria");
        personalizada_input[1].classList.remove("categoria");
        personalizada_input[2].classList.remove("categoria");


        const select = document.querySelectorAll(".group_container select");
        select[1].parentElement.parentElement.classList.remove("hidden");

        select[0].setAttribute("name", "categoria1");
        select[1].setAttribute("name", "categoria2");
        select[2].setAttribute("name", "categoria3");

        select[0].classList.add("categoria1");
        select[1].classList.add("categoria2");
        select[2].classList.add("categoria3");
        select[0].classList.add("categoria");
        select[1].classList.add("categoria");
        select[2].classList.add("categoria");
    }
}

/***llenarlos selects con las categorias */
function extraercategorias(elemento) {
    let xhr = obtenerXMLHttRequest();
    if (xhr) {

        xhr.open('GET', "views/modulos/ajax.php?extCat=si", true);
        xhr.onload = function () {

            if (this.readyState == 4 && this.status == 200) {
                let respuesta = JSON.parse(this.responseText);
                // console.log(respuesta);
                // console.log(elemento);
                for (var i = 0; i < elemento.length; i++) {
                    for (let categorias = 0; categorias < respuesta.length; categorias++) {
                        elemento[i].innerHTML = elemento[i].innerHTML + `<option value="${respuesta[categorias].categoria}">${respuesta[categorias].categoria}</option>`;
                    }
                }

            }
        }

        xhr.send();

    }
}

function addAutor() {
    let autor = document.querySelector(".first input:last-of-type");
    
    let apellido = document.querySelector(".second input:last-of-type");

    

    let ventanamodal = document.querySelector(".modal");
    let nuevo = document.createElement("input");
    let nuevoApellido = document.createElement("input");

    ventanamodal.classList.remove("hidden");

    nuevo.type = "text";
    nuevo.classList.add("AUTOR");
    nuevo.setAttribute("name", "AUTOR");
    nuevo.setAttribute("id", "AUTOR");
    nuevo.classList.add("newA");
    autor.parentElement.append(nuevo);

    nuevoApellido.type = "text";
    nuevoApellido.classList.add("APELLIDOS");
    nuevoApellido.setAttribute("name", "APELLIDOS");
    nuevoApellido.setAttribute("id", "APELLIDOS");
    nuevoApellido.classList.add("newA");
    apellido.parentElement.append(nuevoApellido);

    setTimeout(() => {
        nuevo.classList.remove("newA");
        ventanamodal.classList.add("hidden");
        nuevoApellido.classList.remove("newA");
    }, 1700);
}


///EN ESTE APARTADO SE ELIGE SI VALIDAMOS EL FORMULARIO DE JOURNAL O LIBRO
function validarDatos(formulario) {
    if (formulario.classList.contains("bookform")) {
        validarformLibro(formulario);
    }
    else if (formulario.classList.contains("journalform")) {
        validarformJournal();
    }
}
//seccion y funciones para insertar los datos del formulario
//en la base de datos
function validarformLibro(formulario) {

    let autores = document.querySelectorAll(".AUTOR");
    let apellidos = document.querySelectorAll(".APELLIDOS");
    let PAGINAS = document.querySelector("#PAGINA");
    let ANIO = document.querySelector("#ANIO");
    let TITULO = document.querySelector("#TITULO");
    let EDITORIAL = document.querySelector("#EDITORIAL");
    let PAIS = document.querySelector("#PAIS");
    let ISBN = document.querySelector("#ISBN");
    let DOI = document.querySelector("#DOI");
    let categorias = document.querySelectorAll(".categoria");
    
    let nombreCompleto = "";

    let valoresAceptados = /^[0-9]/;
    let autoresConcat = "";
    let apellidosConcat = "";
    let minimoCounterCategoria = 0;
    let contador = 0;

    for (let index = 0; index < autores.length; index++) {
        if (index > 0) {
            // console.log(autores[index].value.trim());
            nombreCompleto = nombreCompleto + "," + (autores[index].value.trim() + "#" + apellidos[index].value.trim());
        }
        else {
            // console.log(autores[index].value.trim());
            nombreCompleto = nombreCompleto + (autores[index].value.trim() + "#" + apellidos[index].value.trim());

        }
        
    }
    
    
    contador = 0;
    for (let i of apellidos) {

        contador = contador + 1;
        if (contador == 1) {
            if (i.value) {
                apellidosConcat = apellidosConcat + i.value;
            }
            else {
                apellidosConcat = apellidosConcat + "Sin-apellido"

            }

        }
        else {
            if (i.value) {
                apellidosConcat = apellidosConcat + "," + i.value;
            }
            else {
                apellidosConcat = apellidosConcat + "," + "Sin-apellido";
            }
        }

    }
    contador = 0;
    for (let i of autores) {

        contador = contador + 1;
        if (contador == 1) {
            if (i.value) {
                autoresConcat = autoresConcat + i.value;
            }
            else {
                autoresConcat = autoresConcat + "Sin-apellido"

            }

        }
        else {
            if (i.value) {
                autoresConcat = autoresConcat + "," + i.value;
            }
            else {
                autoresConcat = autoresConcat + "," + "Sin-apellido";
            }
        }

    }


    for (let index of categorias) {
        if (index.value) {
            minimoCounterCategoria = minimoCounterCategoria + 1;
        }
    }


    if (minimoCounterCategoria < 1 || !ANIO.value || !TITULO.value ||
        !EDITORIAL.value || !PAIS.value || !ISBN.value || !DOI.value || !autores[autores.length - 1].value ||
        !apellidos[apellidos.length - 1].value) {
        document.querySelector(".modal-obliogatorios").parentElement.classList.remove("hidden");
        setTimeout(() => {
            document.querySelector(".modal-obliogatorios").parentElement.classList.add("hidden")
        }, 1700);
        return;
    }
    

    guardarDatosLibro(autoresConcat,apellidosConcat,nombreCompleto);

}

function guardarDatosLibro(autores,apellidos,nombrecompleto) {

    let PAGINAS = document.querySelector("#PAGINA");
    let ANIO = document.querySelector("#ANIO");
    let TITULO = document.querySelector("#TITULO");
    let EDITORIAL = document.querySelector("#EDITORIAL");
    let PAIS = document.querySelector("#PAIS");
    let ISBN = document.querySelector("#ISBN");
    let DOI = document.querySelector("#DOI");
    
    let datos = new FormData();

    let categoria1 = document.querySelector(".categoria1");
    let categoria2 = document.querySelector(".categoria2");
    let categoria3 = document.querySelector(".categoria3");

    datos.append("autor", autores);
    datos.append("apellidos",apellidos);
    datos.append("anio", ANIO.value);
    datos.append("titulo", TITULO.value);
    datos.append("editorial", EDITORIAL.value);
    datos.append("pais", PAIS.value);
    datos.append("isbn", ISBN.value);
    datos.append("doi", DOI.value);
    datos.append("paginas",PAGINAS.value);
    datos.append("categoria1", categoria1.value);
    datos.append("categoria2", categoria2.value);
    datos.append("categoria3", categoria3.value);
    datos.append("nombrecompleto",nombrecompleto);
    datos.append("book", "book");
    console.log(...datos);

    const xhr = obtenerXMLHttRequest();

    xhr.open('POST', "views/modulos/ajax.php", true);
    xhr.onload = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            if(JSON.parse(this.responseText) =="bien"){
                document.querySelector(".view-modal.exito").parentElement.classList.remove("hidden");
                setTimeout(() => {
                    document.querySelector(".formulario").reset();
                    document.querySelector(".view-modal.exito").parentElement.classList.add("hidden");
                }, 2000);

            }
        }

    }
    xhr.send(datos);
}



/********************************************
 * 
 * 
 * 
 * 
 * 
 *********************************************/
//para ingresar datos del Journal
function validarformJournal() {

    let autores = document.querySelectorAll(".AUTOR");
    let apellidos = document.querySelectorAll(".APELLIDOS");
    let ANIO = document.querySelector("#ANIO");
    let PAIS = document.querySelector("#PAIS");
    let TITULO = document.querySelector("#TITULO");
    let JPC = document.querySelector("#JPC");
    let VOLUMEN = document.querySelector("#VOLUMEN");
    let PAGINAS = document.querySelector("#PAGINAS");
    let ISSN = document.querySelector("#ISSN");
    let DOI = document.querySelector("#DOI");
    let categorias = document.querySelectorAll(".categoria");
    let nombreCompleto = "";
    let valoresAceptados = /^[0-9]/;
    let minimoCounterCategoria = 0;
    let contador = 0;
    let autoresConcat = "";
    
    let apellidosConcat = "";

    for (let index = 0; index < autores.length; index++) {
        if (index > 0) {
            nombreCompleto = nombreCompleto + "," + (autores[index].value.trim() + "#" + apellidos[index].value.trim());
        }
        else {
            nombreCompleto = nombreCompleto + (autores[index].value.trim() + "#" + apellidos[index].value.trim());

        }
        
    }
    contador = 0;
    for (let i of apellidos) {

        contador = contador + 1;
        if (contador == 1) {
            if (i.value) {
                apellidosConcat = apellidosConcat + i.value;
            }
            else {
                apellidosConcat = apellidosConcat + "Sin-apellido"

            }

        }
        else {
            if (i.value) {
                apellidosConcat = apellidosConcat + "," + i.value;
            }
            else {
                apellidosConcat = apellidosConcat + "," + "Sin-apellido";
            }
        }

    }
    contador = 0;
    for (let i of autores) {

        contador = contador + 1;
        if (contador == 1) {
            if (i.value) {
                autoresConcat = autoresConcat + i.value;
            }
            else {
                autoresConcat = autoresConcat + "Sin-apellido"

            }

        }
        else {
            if (i.value) {
                autoresConcat = autoresConcat + "," + i.value;
            }
            else {
                autoresConcat = autoresConcat + "," + "Sin-apellido";
            }
        }

    }


    for (let index of categorias) {
        if (index.value) {
            minimoCounterCategoria = minimoCounterCategoria + 1;
        }
    }
    if (minimoCounterCategoria < 1 || !PAGINAS.value || !ANIO.value || !TITULO.value ||
        !JPC.value || !PAIS.value || !ISSN.value || !DOI.value || !autores[autores.length - 1].value||
         !apellidos[apellidos.length - 1].value //|| VOLUMEN.value 
        ) {
        document.querySelector(".modal-obliogatorios").parentElement.classList.remove("hidden");
        setTimeout(() => {
            document.querySelector(".modal-obliogatorios").parentElement.classList.add("hidden")
        }, 1700);
        return;
    }
    guardarDatosJournal(autoresConcat,apellidosConcat,nombreCompleto);
    
    
}

function guardarDatosJournal(autores,apellidos,nombreCompleto) {
    let datos = new FormData();
    let ANIO = document.querySelector("#ANIO");
    let PAIS = document.querySelector("#PAIS");
    let TITULO = document.querySelector("#TITULO");
    let JPC = document.querySelector("#JPC");
    let VOLUMEN = document.querySelector("#VOLUMEN");
    let PAGINAS = document.querySelector("#PAGINAS");
    let ISSN = document.querySelector("#ISSN");
    let DOI = document.querySelector("#DOI");
    let categoria1 = document.querySelector(".categoria1");
    let categoria2 = document.querySelector(".categoria2");
    let categoria3 = document.querySelector(".categoria3");
    datos.append("autor", autores);
    datos.append("apellidos",apellidos)
    datos.append("anio", ANIO.value);
    datos.append("titulo", TITULO.value);
    datos.append("jpc", JPC.value);
    datos.append("volumen", VOLUMEN.value);
    datos.append("paginas", PAGINAS.value);
    datos.append("issn", ISSN.value);
    datos.append("doi", DOI.value);
    datos.append("pais",PAIS.value);
    datos.append("categoria1", categoria1.value);
    datos.append("categoria2", categoria2.value);
    datos.append("categoria3", categoria3.value);
    datos.append("nombrecompleto",nombreCompleto);
    datos.append("journal", "journal");
    console.log(...datos);
    const xhr = obtenerXMLHttRequest();

    xhr.open('POST', "views/modulos/ajax.php", true);
    xhr.onload = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            if(JSON.parse(this.responseText) =="bien"){
                document.querySelector(".view-modal.exito").parentElement.classList.remove("hidden");
                setTimeout(() => {
                    document.querySelector(".formulario").reset();
                    document.querySelector(".view-modal.exito").parentElement.classList.add("hidden");
                }, 2000);
            }
        }

    }
    xhr.send(datos);
}