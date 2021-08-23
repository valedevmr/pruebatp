const checar = document.querySelector(".buscador input");
const datosMostrar = document.querySelector(".elem_selec_busc");
const btn_formato = document.querySelector(".btn-formato");
const cambio = document.querySelector(".btn-cambio-busqueda");
const inputSearch = document.querySelector(".inputSearch .btn-formato");
const selectlist = document.querySelector(".selectlist");
let datosId = new FormData();
let redate = new FormData();

/******************************************************************* */
//verificamos que el input para buscar exista caso contraio hara apsolutamente nada
/************************************************************************ */
if (checar) {
    const icono = document.querySelector(".logo-buscar")

    //cuando el input de buscar va generar o se le ba
    //escrbiendo atraparemos ese evento e iremos buscando 
    checar.addEventListener("input", function (event) {


        const palabra = event.target.value;
        if (palabra.length > 0) {
            datosMostrar.innerHTML = "";

            buscarDatos(palabra, datosMostrar);
        }
        else {
            if (btn_formato.getAttribute("disabled")) {

            }

            else {
                btn_formato.setAttribute("disabled", "disabled");
            }

            datosMostrar.innerHTML = "";
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



function buscarDatos(palabra, elementoContenedor) {
    const xhr = obtenerXMLHttRequest();
    var respuesta;
    const datos = new FormData();

    datos.append("buscandoInput", "true");
    datos.append("datoBuscar", palabra);

    if (xhr) {

        xhr.open('POST', "views/ajax.php", true);

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
                        <th class="checref tooltip"><span class="tooltiptext">Selecciona las referencias a formatear</span></th>
                        <th>Título</th>
                        <th>Autor</th>
                        <th>Apellidos</th>
                        <th>Revista o Conferencia</th>
                        <th>País</th>
                        <th>Año</th>
                        
                    </tr>`
                    for (let contador = 0; contador < respuesta.length; contador++) {
                        let indice = respuesta[contador];
                        tbody.innerHTML = tbody.innerHTML + `
                        <tr>
                        <td class="checref" >
                            <input type="checkbox" name="" id="${indice.id_ref}" value='${indice.id_ref}' class="ref"></td>
                            <td>${indice.titulo}</td>
                            <td>${indice.autor}</td>
                            <td>${indice.apellidos}</td>
                            <td>${indice.Rev_Con_Edit}</td>
                            <td>${indice.pais}</td>
                            <td>${indice.anio}</td>
                            
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


//*************************************************************** */
//secion de botone para enviar las referencias seleccionadas 
//                      para ser formateadas
/***************************************************************** */

if (inputSearch) {
    inputSearch.addEventListener("click", function () {
        let bandera = 0;
        let check = document.querySelectorAll("tbody input[type='checkbox']");
        let busqueda = document.querySelector(".busqueda");
        for (let contador = 0; contador < check.length; contador++) {
            if (check[contador].checked) {
                datosId.append(contador, check[contador].value);
                console.log(check[contador]);

                bandera = bandera + 1;
            }
        }
        if (bandera > 0) {
            document.querySelector(".seleccionados").classList.remove("hidden");
            const datosSekeccionados = document.querySelector(".datosS");
            let copiaid = datosId;
            datosS(copiaid);
            busqueda.classList.add("hidden");
            document.querySelector(".contenedorFormato").classList.remove("hidden");

        }

        function datosS(copiaid) {
            let contendorProvisional = document.querySelector(".datosS");
            // let p = document.createElement("p");
            // p.classList.add("ptemp");
            // contendorProvisional.appendChild(p);
            copiaid.append("datos","datos");
            const xhr = obtenerXMLHttRequest();
            xhr.open('POST', "views/ajax2.php", true);
            xhr.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    let respuest= JSON.parse(this.responseText);
                    console.log(respuest);
                    for (let contador = 0; contador < respuest.length; contador++){
                        contendorProvisional.innerHTML =  contendorProvisional.innerHTML+
                        `<p class="ptemp"><span>${respuest[contador].autor} </span> <span>${respuest[contador].apellidos} </span> <span>${respuest[contador].titulo} 
                        </span> <span>${respuest[contador].anio} </span> <span>${respuest[contador].paginas} </span> <span>${respuest[contador].volumen} </span> 
                        <span>${respuest[contador].Rev_Con_Edit} </span>
                        <span>${respuest[contador].pais} </span></p>`

                    }
                    
                }
            }
            xhr.send(copiaid);

        }


    });
}

if (selectlist) {
    selectlist.addEventListener("click", function () {
        let check = document.querySelectorAll(".checref input[type='checkbox']");
        let busqueda = document.querySelector(".busqueda");
        for (let contador = 0; contador < check.length; contador++) {
            if (check[contador].checked) {
                datosId.append(contador, check[contador].value);
                console.log(check[contador]);

            }
        }
        busqueda.classList.add("hidden");

        document.querySelector(".contenedorFormato").classList.remove("hidden");
        console.log(...datosId);
    })
}
//////////////////////////////////////////////////
function pruebaAjax() {
    let ajaxd = new FormData();
    ajaxd.append("ajax", "ajax");
    let xhr = obtenerXMLHttRequest();
    xhr.open('POST', "views/ajax.php", true);
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let respuesta = JSON.parse(this.responseText);
            for (let valor of datosId.values()) {
                for (let indice = 0; indice < respuesta.length; indice++) {
                    if (respuesta[indice].id_ref == valor) {
                        redate = [...redate, JSON.stringify(respuesta[indice])];
                    }
                }
            }

        }
    }
    xhr.send(ajaxd);
}
/***************************************************************** */
//              fin de las bonotes para inputSearch y
//                        selectList
/***************************************************************** */





/************************************************ */
//Para llenar el select con las categorias y despues enviarlas
/************************************************ */

//variable que ejecutara el evento para generar la tabla de loas referncias
//de acuerdo al filtro de las referncias selecionadas
const $btn_flecha_se = document.querySelector(".btn-flecha-se");
const $categorias = document.querySelector("#categoria");

//validamos si existe ese elemento en el documento
if ($categorias) {


    function ajaxSelecCategorias() {

        const xhr = obtenerXMLHttRequest();
        const datos = new FormData();
        datos.append("bandera", "selecct");
        xhr.open("POST", "views/ajax.php", true);
        xhr.onload = function () {
            if (this.readyState == 4 && this.status == 200) {
                respuesta = JSON.parse(this.responseText);
                crearOption($categorias, respuesta);
            }
        }
        xhr.send(datos);
    }
    function crearOption(elemento, respuesta) {

        for (let contador = 0; contador < respuesta.length; contador++) {
            elemento.innerHTML = elemento.innerHTML + `<option class="cate" value="${respuesta[contador].cateforia}" name="${respuesta[contador].cateforia}">${respuesta[contador].cateforia}</option>`;
        }
    }
    if ($btn_flecha_se) {
        datosMostrar.innerHTML = "";
        $btn_flecha_se.addEventListener("click", validarSelect);
    }

    function validarSelect() {
        console.log(document.querySelector(".elem_selec_busc"));
        const datos = new FormData();
        let bandera = 0;
        for (let contador = 1; contador < $categorias.length; contador++) {


            if ($categorias.options[contador].selected) {
                let dato = $categorias.options[contador].value;
                bandera++;;
                datos.append(bandera, dato);
            }
            if (bandera > 2) {
                break;
            }
        }
        ajaxExtraerCategorias(datos);
    }
    function ajaxExtraerCategorias(datos) {
        datosMostrar.innerHTML = "";
        let numerodatos = 0;
        for (let valor of datos.values()) {
            numerodatos++;
        }
        console.log(numerodatos);
        if (numerodatos > 0) {


            const xhr = obtenerXMLHttRequest();
            xhr.open("POST", "views/ajax.php", true);
            xhr.onload = function () {
                if (this.readyState == 4 && this.status == 200) {
                    let respuesta = JSON.parse(this.responseText);
                    const tabla = document.createElement("table");
                    const thead = document.createElement("thead");
                    const tbody = document.createElement("tbody");
                    datosMostrar.appendChild(tabla);
                    tabla.appendChild(thead);
                    tabla.appendChild(tbody);
                    if (respuesta != "categoria no encotrada") {
                        thead.innerHTML = `
                    <tr>
                        <th>Título</th>
                        <th>Autor</th>
                        <th>Apellidos</th>
                        <th>Revista o Conferencia</th>
                        <th>País</th>
                        <th>Año</th>
                        <th class="checref"></th>
                    </tr>`
                        for (let contador = 0; contador < respuesta.length; contador++) {
                            let indice = respuesta[contador];
                            tbody.innerHTML = tbody.innerHTML + `
                        <tr>
                            <td>${indice.titulo}</td>
                            <td>${indice.autor}</td>
                            <td>${indice.apellidos}</td>
                            <td>${indice.Rev_Con_Edit}</td>
                            <td>${indice.pais}</td>
                            <td>${indice.anio}</td>
                            <td class="checref"><input type="checkbox" name="" id="${indice.id_ref}" value="${indice.id_ref}" class="ref"></td>
                        </tr>`
                        }
                        btn_formato.removeAttribute("disabled");

                    }
                }
            }
            xhr.send(datos);
        }
    }

    ajaxSelecCategorias();
}

/************************************************* */
//Fin de extraer los datos para selecionar las categorias
/************************************************* */




/************************************************************* */
//  obteniendo el objeto XMLHttpRequest en culaquier navegador
//************************************************************ */

function obtenerXMLHttRequest() {
    //varianle para obetener el objeto XMLHttpRequest
    let xhr = false;

    if (window.XMLHttpRequest) {
        if (typeof XMLHttpRequest != "undefined")
            xhr = new XMLHttpRequest();
        else
            xhr = new false;
    }
    else if (window.ActiveXObject) {
        try {
            xhr = new ActiveXObject('Msxml2.XMLHTTP');
        } catch (e) {
            try {
                xhr = new ActiveXObject('Microsoft.XMLHTTP');
            } catch (e) {
                xhr = false;
            }
        }
    }
    return xhr;

}

/********************************************************** */
// fin de la generacion de l objeto XMLHttpRequest
/********************************************************** */



/****************************************************************** */
//Funcion para saber sobre que parte del sitio estamos, dandole un color 
//al li blanco mostradonos nuestra ubicacion
/****************************************************************** */
function rutasNavs() {
    var parametro = window.location.search;
    var urlParams = new URLSearchParams(parametro);
    var anuncioParam = urlParams.get('accion');
    const ruta = document.querySelectorAll(".ruta-activa a");

    if (parametro) {
        for (let i = 0; i < ruta.length; i++) {
            const elemento = ruta[i];
            if (elemento.classList.contains("active")) {
                elemento.classList.remove("active");
                elemento.parentElement.classList.remove("active");
            }
        }
        const liRuta = document.querySelector("." + anuncioParam);
        const aruta = document.querySelector("." + anuncioParam + " a");
        liRuta.classList.add("active")
        aruta.classList.add("active");
    }
    else {
        document.querySelector(".inicio.ruta-activa").classList.add("active");
        document.querySelector(".inicio.ruta-activa a").classList.add("active");
    }




}
rutasNavs();

/********************************************************************** */
//          fin de funcion rutasNavs
/********************************************************************** */





////////// codigo del archivo ajax.js



//se obtiene el objeto XMLHttpRequest o 
//ActiveXObject para navegadores que aun
// no soporten el primero
function obtenerXMLHttRequest() {
    //varianle para obetener el objeto XMLHttpRequest
    let xhr = false;

    if (window.XMLHttpRequest) {
        if (typeof XMLHttpRequest != "undefined")
            xhr = new XMLHttpRequest();
        else
            xhr = new false;
    }
    else if (window.ActiveXObject) {
        try {
            xhr = new ActiveXObject('Msxml2.XMLHTTP');
        } catch (e) {
            try {
                xhr = new ActiveXObject('Microsoft.XMLHTTP');
            } catch (e) {
                xhr = false;
            }
        }
    }
    return xhr;

}



//selecionando elementos para el formato

const $parentesisDerechoElementos = document.querySelector(".elementos .parentesis");
if ($parentesisDerechoElementos) {
    $parentesisDerechoElementos.addEventListener("click", function () {
        const formato = document.querySelector(".formatoF");
        formato.appendChild($parentesisDerechoElementos);
        $parentesisDerechoElementos.setAttribute("onclick", "regresa(this)");
    })
}

function regresa(valor) {
    const $elementos = document.querySelector(".elementos");
    const $funcion = document.querySelector(".formatoF ." + valor.classList.item(0));
    $funcion.removeAttribute("onclick");
    $elementos.appendChild(valor);
    console.log($elementos.lastChild);

}
//Sleciondo apellido

const $apellido = document.querySelector(".elementos .apellidos");
if ($apellido) {
    $apellido.addEventListener("click", function () {
        const formato = document.querySelector(".formatoF");
        formato.appendChild($apellido);
        $apellido.setAttribute("onclick", "regresa(this)");
    })
}
//seleccionar nombre
const $nombre = document.querySelector(".elementos .nombre");
if ($nombre) {
    $nombre.addEventListener("click", function () {
        const formato = document.querySelector(".formatoF");
        formato.appendChild($nombre);
        $nombre.setAttribute("onclick", "retornoNombre(this)");
    })
}
function retornoNombre(valor) {
    const $elementos = document.querySelector(".elementos");
    const ele = "" + valor.classList.item(0);
    const $funcion = document.querySelector(".formatoF ." + valor.classList.item(0));
    $funcion.removeAttribute("onclick");
    $funcion.classList.remove("cur");
    $elementos.appendChild(valor);
    console.log($elementos.lastChild);

}



//selecionamos el elemento cursiva
const $cursiva = document.querySelector(".elementos .cursiva");
if ($cursiva) {

    $cursiva.addEventListener("click", function () {
        const formato = document.querySelector(".formatoF");
        if (formato.childNodes.length > 1) {

            formato.lastChild.classList.add("cur");
            formato.appendChild($cursiva);

            $cursiva.setAttribute("onclick", "cursivaRetorno(this)");

        }
        else {
            console.log();
        }

    })
}

function cursivaRetorno(valor) {
    const formato = document.querySelector(".formatoF");

    if (formato.lastChild.classList.contains("cur")) {

        formato.lastChild.classList.remove("cur");
        const $elementos = document.querySelector(".elementos");
        const ele = "" + valor.classList.item(0);
        const $funcion = document.querySelector(".formatoF ." + valor.classList.item(0));
        $funcion.removeAttribute("onclick");
        $elementos.appendChild(valor);
        console.log($elementos.lastChild);
        console.log(formato.lastChild);
        formato.lastChild.classList.remove("cur");

    }
}

//selecionamos paginas
const $paginas = document.querySelector(".elementos .pagina");
if ($paginas) {
    $paginas.addEventListener("click", function () {
        const formato = document.querySelector(".formatoF");
        formato.appendChild($paginas);
        $paginas.setAttribute("onclick", "retornoPaginas(this)");
    })

}
function retornoPaginas(valor) {
    const $elementos = document.querySelector(".elementos");
    const $funcion = document.querySelector(".formatoF ." + valor.classList.item(0));
    $funcion.removeAttribute("onclick");
    $funcion.classList.remove("cur");
    $elementos.appendChild(valor);
    console.log($elementos.lastChild);
}
//Seleccionamos titulo
const $titulo = document.querySelector(".elementos .titulo");
if ($titulo) {
    $titulo.addEventListener("click", function () {
        const formato = document.querySelector(".formatoF");
        formato.appendChild($titulo);
        $titulo.setAttribute("onclick", "retornoPaginas(this)");
    })

}
function retornoPaginas(valor) {
    const $elementos = document.querySelector(".elementos");
    const ele = "" + valor.classList.item(0);
    const $funcion = document.querySelector(".formatoF ." + valor.classList.item(0));
    $funcion.removeAttribute("onclick");
    $funcion.classList.remove("cur");
    $elementos.appendChild(valor);
    console.log($elementos.lastChild);
}
//seleciono el parentesis derecho

const $parDer = document.querySelector(".elementos .parentesis2");
if ($parDer) {
    $parDer.addEventListener("click", function () {
        const formato = document.querySelector(".formatoF");
        formato.appendChild($parDer);
        $parDer.setAttribute("onclick", "retornoParD(this)");
    })
}
function retornoParD(valor) {
    const $elementos = document.querySelector(".elementos");
    const $funcion = document.querySelector(".formatoF ." + valor.classList.item(0));
    $funcion.removeAttribute("onclick");
    $funcion.classList.remove("cur");
    $elementos.appendChild(valor);
    console.log($elementos.lastChild);
}
//revista
const $rep = document.querySelector(".elementos .rep");
if ($rep) {
    $rep.addEventListener("click", function () {
        const formato = document.querySelector(".formatoF");
        formato.appendChild($rep);
        $rep.setAttribute("onclick", "retornoPEP(this)");
    })
}
function retornoPEP(valor) {
    const $elementos = document.querySelector(".elementos");
    const $funcion = document.querySelector(".formatoF ." + valor.classList.item(0));
    $funcion.removeAttribute("onclick");
    $funcion.classList.remove("cur");
    $elementos.appendChild(valor);
    console.log($elementos.lastChild);
}


//negritas
const $negritas = document.querySelector(".elementos .negrita");
if ($negritas) {

    $negritas.addEventListener("click", function () {
        const formato = document.querySelector(".formatoF");
        if (formato.childNodes.length > 1) {

            formato.lastChild.classList.add("neg");
            formato.appendChild($negritas);
            $negritas.setAttribute("onclick", "retornoNegrita(this)");

        }
        else {
            console.log();
        }

    })
}

function retornoNegrita(valor) {
    const formato = document.querySelector(".formatoF");

    if (formato.lastChild.classList.contains("neg")) {

        formato.lastChild.classList.remove("neg");
        const $elementos = document.querySelector(".elementos");
        const ele = "" + valor.classList.item(0);
        const $funcion = document.querySelector(".formatoF ." + valor.classList.item(0));
        $funcion.removeAttribute("onclick");
        $elementos.appendChild(valor);
        console.log($elementos.lastChild);
        console.log(formato.lastChild);
        formato.lastChild.classList.remove("neg");

    }
}
const $comillas = document.querySelector(".elementos .comillas");
if ($comillas) {

    $comillas.addEventListener("click", function (e) {
        const formato = document.querySelector(".formatoF");
        if (formato.childNodes.length > 1) {

            formato.lastChild.classList.add("comi");
            formato.appendChild($comillas);
            $comillas.setAttribute("onclick", "retornoComillas(this)");

        }
        else {
            console.log();
        }

    })

}
function retornoComillas(valor) {
    const formato = document.querySelector(".formatoF");

    if (formato.lastChild.classList.contains("comi")) {

        formato.lastChild.classList.remove("comi");
        const $elementos = document.querySelector(".elementos");
        const ele = "" + valor.classList.item(0);
        const $funcion = document.querySelector(".formatoF ." + valor.classList.item(0));
        $funcion.removeAttribute("onclick");
        $elementos.appendChild(valor);
        console.log($elementos.lastChild);
        console.log(formato.lastChild);
        formato.lastChild.classList.remove("comi");

    }
}

const $btnGuardar = document.querySelector(".generar");

if ($btnGuardar) {
    $btnGuardar.addEventListener("click", function () {
        let banderaS =  document.querySelector(".seleccionados");
        banderaS.classList.add("hidden");
        $btnGuardar.classList.add("hidden")
        document.querySelector(".denuevohacer").classList.remove("hidden");
        const contenedoFormato = document.querySelectorAll(".formatoF h3");
        if (contenedoFormato.length > 0) {
            let tamanio = 0;
            for (let valor of datosId.values()) {
                tamanio = tamanio + 1;
            }

            if (tamanio > 0) {
                ConexionAjax2(contenedoFormato, datosId);
            }

        }


    })
}
function ConexionAjax2(contenedoFormato, datosId) {

    const xhr = obtenerXMLHttRequest();
    var respuesta;
    if (xhr) {

        xhr.open('POST', "models/Datos.php", true);

        xhr.onload = function () {

            if (this.readyState == 4 && this.status == 200) {
                respuesta = JSON.parse(this.responseText);

                console.log(respuesta);
                const padre = document.querySelector(".elementosFormateados");
                padre.innerHTML = "";
                for (var i = 0; i < respuesta.length; i++) {
                    var index = respuesta[i];
                    const nuevoElemento = document.createElement("p");
                    nuevoElemento.classList.add("formatoN");
                    nuevoElemento.classList.add(`f${i + 1}`);
                    padre.appendChild(nuevoElemento);
                    const ref = document.querySelector(`.f${i + 1}`);

                    console.log(ref);
                    for (let contador = 0; contador < contenedoFormato.length; contador++) {

                        if (contenedoFormato[contador].textContent == "apellidos" ||
                            contenedoFormato[contador].textContent == "Rev_Con_Edit" ||
                            contenedoFormato[contador].textContent == "autor" ||
                            contenedoFormato[contador].textContent == "paginas" ||
                            contenedoFormato[contador].textContent == "titulo" ||
                            contenedoFormato[contador].textContent == "(" ||
                            contenedoFormato[contador].textContent == ")") {
                            let nuevohijo = document.createElement("span");
                            ref.appendChild(nuevohijo);
                            nuevohijo.classList.add(`elemento${contador}`);
                            autor(nuevohijo, contenedoFormato[contador].textContent, index);
                            let key = contenedoFormato[contador].textContent;
                            if (contenedoFormato[contador + 1]) {
                                if (contenedoFormato[contador + 1].textContent == "cursiva" ||
                                    contenedoFormato[contador + 1].textContent == "negrita" ||
                                    contenedoFormato[contador + 1].textContent == "comillas") {
                                    nuevohijo.classList.add("" + contenedoFormato[contador + 1].textContent + "");

                                }
                            }
                        }
                    }
                }
            }
        }

        xhr.send(datosId);
    }
    return respuesta;
}

function autor(elementohtml, formato, index) {

    if (formato == "apellidos") {
        elementohtml.textContent = index.apellidos;
    }
    else if (formato == "Rev_Con_Edit") {
        elementohtml.textContent = index.Rev_Con_Edit;
    }
    else if (formato == "autor") {
        elementohtml.textContent = index.autor;
    }
    else if (formato == "paginas") {
        elementohtml.textContent = index.paginas;
    }
    else if (formato == "titulo") {
        elementohtml.textContent = index.titulo;
    }
    else if (formato == "(") {
        elementohtml.textContent = "(";
    }
    else if (formato == ")") {
        elementohtml.textContent = ")";
    }
}



////////////////////////////////////////////////////
/*       Conexion Ajax para insertar Datos        */

const btnRequestFormulario = document.querySelector(".formulario");
if (btnRequestFormulario) {
    btnRequestFormulario.onsubmit = function (event) {
        event.preventDefault();
        let datos = new FormData();
        let titulo = document.querySelector("#titulo");
        let publicada = document.querySelector("#publicada");
        let nombre = document.querySelector("#nombre");
        let primer = document.querySelector("#primer");
        let pais = document.querySelector("#pais");
        let anio = document.querySelector("#anio");
        let numero = document.querySelector("#numero");
        let volumen = document.querySelector("#volumen");
        let paginas = document.querySelector("#paginas");
        let categoria1 = document.querySelector(".categoria1");
        let categoria2 = document.querySelector(".categoria2");
        let categoria3 = document.querySelector(".categoria3");

        datos.append("titulo", titulo.value);
        datos.append("publicada", publicada.value);
        datos.append("nombre", nombre.value);
        datos.append("primer", primer.value);
        datos.append("pais", pais.value);
        datos.append("anio", anio.value);
        datos.append("numero", numero.value);
        datos.append("volumen", volumen.value);
        datos.append("paginas", paginas.value);
        datos.append("categoria1", categoria1.value);
        datos.append("categoria2", categoria2.value);
        datos.append("categoria3", categoria3.value);

        insertarDatos(datos);


    }
}

function insertarDatos(datos) {
    const xhr = obtenerXMLHttRequest();

    if (xhr) {

        xhr.open('POST', "models/datos_insert.php", true);

        xhr.onload = function () {

            if (this.readyState == 4 && this.status == 200) {
                respuesta = JSON.parse(this.responseText);
                console.log(respuesta);
            }
        }

        xhr.send(datos);
    }

}

document.addEventListener("DOMContentLoaded", function (event) {
    const $cat_personales = document.querySelector(".personalizado");
    if ($cat_personales) {
        $cat_personales.classList.add("hidden");
        const $btn_cambio = document.querySelector(".btncambio");
        extraerategorias(document.querySelectorAll(".numericos select"));

        $btn_cambio.addEventListener("click", function (e) {
            if (e.target.classList.contains("pordefecto")) {
                $btn_cambio.classList.remove("pordefecto");
                $btn_cambio.classList.add("personalCar");
                $btn_cambio.innerHTML = "Seleccionar Categorias"
                const select = document.querySelectorAll(".numericos select");
                select[1].parentElement.parentElement.classList.add("hidden");

                select[0].removeAttribute("name");
                select[1].removeAttribute("name");
                select[2].removeAttribute("name");

                select[0].classList.remove("categoria1");
                select[1].classList.remove("categoria2");
                select[2].classList.remove("categoria3");
                $cat_personales.classList.remove("hidden");



                const personalizada_input = document.querySelectorAll(".personalizado input");
                personalizada_input[0].setAttribute("name", "categoria1");
                personalizada_input[1].setAttribute("name", "categoria2");
                personalizada_input[2].setAttribute("name", "categoria3");

                personalizada_input[0].classList.add("categoria1");
                personalizada_input[1].classList.add("categoria2");
                personalizada_input[2].classList.add("categoria3");
                let input1 = document.querySelector("#primerInput");
                let select1 = document.querySelector("#categoria1");
                let input2 = document.querySelector("#segundoInput");
                let select2 = document.querySelector("#categoria2");
                let input3 = document.querySelector("#tercerInput");
                let select3 = document.querySelector("#categoria3");

                if (!input1.value) {

                }
                input1.value = select1.value;
                if (!input2.value) {

                }
                input2.value = select2.value;
                if (!input3.value) {

                }
                input3.value = select3.value;


            }
            else if (e.target.classList.contains("personalCar")) {
                $btn_cambio.classList.remove("personalCar");
                $btn_cambio.classList.add("pordefecto");
                $cat_personales.classList.add("hidden");
                $btn_cambio.innerHTML = "Introducir Categorias";



                const personalizada_input = document.querySelectorAll(".personalizado input");
                personalizada_input[0].removeAttribute("name");
                personalizada_input[1].removeAttribute("name");
                personalizada_input[2].removeAttribute("name");

                personalizada_input[0].classList.remove("categoria1");
                personalizada_input[1].classList.remove("categoria2");
                personalizada_input[2].classList.remove("categoria3");


                const select = document.querySelectorAll(".numericos select");
                select[1].parentElement.parentElement.classList.remove("hidden");

                select[0].setAttribute("name", "categoria1");
                select[1].setAttribute("name", "categoria2");
                select[2].setAttribute("name", "categoria3");

                select[0].classList.add("categoria1");
                select[1].classList.add("categoria2");
                select[2].classList.add("categoria3");
                //selecionamos los elementos select para posterior llenar los inputs en 
                //caso de que ecnontremos un categoria de los select e ingresar otro a mano
                //pero cargando en el input uno de los ya en ele select


            }
        });
    }



});



function extraerategorias(elemento) {
    xhr = obtenerXMLHttRequest();
    if (xhr) {

        xhr.open('GET', "views/ajax.php?extraer=true", true);
        xhr.onload = function () {

            if (this.readyState == 4 && this.status == 200) {
                respuesta = JSON.parse(this.responseText);
                console.log(respuesta);

                for (var i = 0; i < elemento.length; i++) {
                    for (let categorias = 0; categorias < respuesta.length; categorias++) {
                        elemento[i].innerHTML = elemento[i].innerHTML + `<option value="${respuesta[categorias].cateforia}">${respuesta[categorias].cateforia}</option>`;
                    }
                }

            }
        }

        xhr.send();

    }
}







/************************************************ */
// codigo para el boton del meny selecionar busqueda 
//por el input o por el select
/************************************************ */
const menu = document.querySelector(".ham");
if (menu) {
    const ul = document.querySelector(".mn");
    menu.addEventListener("click", e => {
        if (e.target.classList.contains("activo")) {
            menu.classList.remove("activo");
            ul.classList.add("hidden");
        }
        else {
            menu.classList.add("activo");

            ul.classList.remove("hidden");
        }
    })
}


const bu = document.querySelector(".bu");
if (bu) {
    bu.addEventListener("click", function (e) {
        checar.parentElement.classList.add("hidden");

        document.querySelector(".inputSearch").classList.add("hidden");

        document.querySelector(".selectlist").classList.remove("hidden");
        document.querySelector(".seleccionar").classList.remove("hidden");
    })
}
const se = document.querySelector(".se");
if (se) {
    se.addEventListener("click", function (e) {
        document.querySelector(".selectlist").classList.add("hidden");

        document.querySelector(".inputSearch").classList.remove("hidden");

        document.querySelector(".seleccionar").classList.add("hidden");
        document.querySelector(".buscador").classList.remove("hidden");;
    })
}



//para tomar la captura de imagen

const btn_pdf = document.querySelector(".pdf");
if (btn_pdf) {
    btn_pdf.addEventListener("click", function () {
        var doc = new jsPDF();
        var elementHTML = $('#content').html();
        var specialElementHandlers = {
            '#elementH': function (element, renderer) {
                return true;
            }
        };
        doc.fromHTML(elementHTML, 15, 15, {
            'width': 170,
            'elementHandlers': specialElementHandlers
        });

        // Save the PDF
        doc.save('sample-document.pdf');
    });
}





/**Boton para volver a recrear el formato*/ 
let recrear = document.querySelector(".denuevohacer");
if(recrear){
    recrear.addEventListener("click",function(){
        document.querySelector(".seleccionados").classList.remove("hidden");
        $btnGuardar.classList.remove("hidden");
        recrear.classList.add("hidden");
        let elementos =document.querySelector(".elementosFormateados");
        elementos.innerHTML = "";
    });
}