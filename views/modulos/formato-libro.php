<main class="modal_guardar_defecto hidden">

    <section class="menu_guardar ">
            <p class="title">
                ¿Está seguro de guardar este formato?
            </p>
            <div class="radios">
                <div class="si">
                    <input type="Radio" class="yes" id="yes" value = "yes" name="opcion">
                    <label for="yes" >Si</label>
                
                </div>
                <div class="no">
                    <input type="Radio" class="not" id="not" value="not" name="opcion">
                    <label for="not">No</label>
                </div>
            </div>
            <div class="input hidden">
                <label for="nombreformato">Ingrese nombre de formato</label>
                <input type="text" class= "nombreformato" id="nombreformato">
            </div>
            <div class="boton">

                <button class="libro_formato">
                    Aceptar
                </button>
            </div>
    </section>

</main>
<div class="ubicacion m-t-10p">
    <div class="ayuda">Formato Personalizado > Referencias de libros</p>
    </div>
</div>
<main class="buscar_checar">
    <nav class="nav-libro m-t-10p">
        <ul class="navmenu">
            <li class="active"><a href="index.php?accion=formato-libro">Libro</a></li>
            <li><a href="index.php?accion=formato-journal">Journal-Conferencia</a></li>
        </ul>
    </nav>

    <div class="busqueda m-t-20p ">

        <div class="extraerCategoria">

            <div class="buscador active">
                <input type="text" placeholder="Buscar Categoria">
                <div class="logo-buscar"><i class="material-icons">search</i></div>
            </div>
            <!-- <div class="seleccionar hidden">
                <select name="categoria[]" id="categoria" multiple="multiple">
                    <option class="cate" value="" disabled selected> Seleccionar categorías</option>

                </select>
                <div class="logo-ir"><i class="material-icons btn-flecha-se">arrow_forward</i></div>

            </div> -->
        </div>

        <div class="btn-formato-listado inputSearch m-t-15p">
            <button class="btn-formato" disabled="disabled">Crear formato</button>
        </div>
        <!-- <div class="btn-formato-listado selectlist hidden">
        <button class="btn-formato">Crear formato</button>
    </div> -->

    </div>
    <div class="container-ckekeds m-t-20p">
        <div class="mostrar_buscados">

        </div>
    </div>
</main>


<!-- seccion para poder fomatear las referencias selecionadas con 
aterioridad -->
<section class="seccion_formateo hidden m-t-15">

    <div class="contenedor_estilos m-t-2p">
        <div class="orden"></div>
        <div class="separacion">
        </div>
        <div class="elementos uno">
            
            <label class="parentesis" id="parentesis" value = "parentesis">(</label>
            <label class="parentesis2" id="parentesis2" value="parentesis2">)</label>
            <label class="comilla" id="comilla" value="comilla">"</label>
            <label class="coma" id="coma" value="coma">,</label>
            <label class="punto" id="punto" value="punto">.</label>
            <label class="dospuntos" id="dospuntos" value="dospuntos">:</label>
            <label class="cursiva" id="cursiva" value="cursiva">cursiva</label>
            <label class="pp" id="pp" class="pp">pp</label>

        </div>
        <div class="separacion">
        </div>
        <div class="dos">
            <label class="paginas" id="paginas" value="paginas">Páginas</label>
           
            <label class="Editorial" id="Editorial" value="Editorial">Editorial</label>
            <label class="doi" id="doi" value="doi">DOI</label>
            <label class="titulo" id="titulo" value="titulo">Titulo</label>
            <label class="pais" id="pais" value="pais">Pais</label>
            <label class="Anio" id="Anio" value="Anio">Año</label>
            <label class="namec_apec" id="namec_apec" value="namec_apec">Autor-y-Apellido</label>
            <label class="inicialA_y_apellidos" id="inicialA_y_apellidos" value="inicialA_y_apellidos">inicial_autor_y_apellidos</label>
        </div>

    </div>
    <div class="btn_generar_formato">
        <button>Generar formato</button>
    </div>
    <div class="retornarformato hidden">
        <button>Volver a generar formato</button>
    </div>
    <div class="temporales_mostrar">
        <div class="texto-title">
            Referencias seleccionadas
        </div>
        <div class="container_i">

        </div>
    </div>
    <div class="contenedor_final_formato hidden">
        <div class="texto-title">
            Referencias formateadas
        </div>
        <div class="contenedor-general">
            <div class="container_i" id="referencias_forma">

            </div>
            <div class="btn_guardar_formas">
                <button>Guardar formato</button>
            </div>
        </div>
    </div>
</section>


