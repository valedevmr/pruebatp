import { hiddenCategorias, extraercategorias, addAutor, validarDatos } from "./insertar.js";
import { checkBuscar, revisarCheck, autor, cursiva } from "./formato.js";
import { buscador } from "./eliminar.js";
import { bandera_libro } from "./editaribro.js";
import { $btn_apa_l, checkBuscarj,checkBuscarjou } from "./formato-defecto.js"
import { checkBuscarjournal, revisarCheckJournal } from "./formato_jorunal.js";
// import {bandera_journal} from "./editjournal.js";
const $formulario = document.querySelector(".formulario");
const $btncambioInsertar = document.querySelector(".btncambio");
const crearformato = document.querySelector(".inputSearch .btn-formato");
const checar = document.querySelector(".buscador input");

let datosId = new FormData();



//tODOS LOS EVENTO Y FUNCIONES PARA LA PARTE DE LA INSERCION DE DATOS

if ($formulario) {
    document.addEventListener("DOMContentLoaded", function (event) {
        let $selects = document.querySelectorAll(".numerico select");
        extraercategorias($selects);
    });

    let span = document.querySelector(".mas");
    span.addEventListener("click", function () {

        let autor = document.querySelector(".first input:last-of-type");
        let apellido = document.querySelector(".second input:last-of-type");

        if (/[a-zA-Z]+/.test(autor.value) && /[a-zA-Z]+/.test(apellido.value)) {
            addAutor();
        }
        else {

            autor.classList.add("danger");
            apellido.classList.add("danger");
        }
        setTimeout(() => {
            autor.classList.remove("danger");
            apellido.classList.remove("danger");
        }, 1600);

    })
    $formulario.addEventListener("submit", event => {
        event.preventDefault();
        validarDatos($formulario);

    });
}

if ($btncambioInsertar) {
    $btncambioInsertar.addEventListener("click", event => {
        event.preventDefault();
        hiddenCategorias($btncambioInsertar);

    });
}


//boton para elegir las referencias a formatear en el apartaado 
//de Formato personalizado y por defecto
if (crearformato) {

    crearformato.addEventListener("click", function (event) {
        let formato_j = document.querySelector(".formato_j");
        if (crearformato.classList.contains("btn-apa-l")) {

        }
        else {
            if (formato_j) {
                revisarCheckJournal(event);
            }
            else {
                revisarCheck(event);
            }
        }

    });
}


if (checar) {
    const icono = document.querySelector(".logo-buscar")

    //cuando el input de buscar va generar o se le va
    //escrbiendo atraparemos ese evento e iremos buscando 
    checar.addEventListener("input", function (event) {

        let bandera_formato = document.querySelector(".formato_j");
        let bandera_defecto = document.querySelector(".btn-apa-l");
        const palabra = event.target.value;
        if (bandera_defecto) {
            let bandera_defecto_jorun = document.querySelector(".btn-apa-j");
           
            if(bandera_defecto_jorun){
                checkBuscarjou(palabra);
            }
            else{
                checkBuscarj(palabra);
            }
            
        }
        else {
            if (bandera_formato) {
                checkBuscarjournal(palabra);
            }
            else {
                checkBuscar(palabra);
            }
        }




    })

    //solo para cambiar el color del foco del input
    checar.addEventListener("focus", function (event) {
        checar.classList.add("focus");
        icono.classList.add("focus2");
    });
    checar.addEventListener("blur", function (event) {
        checar.classList.remove("focus");
        icono.classList.remove("focus2");
    })
}

