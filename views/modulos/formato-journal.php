<main class="modal_guardar_defecto hidden">

    <section class="menu_guardar journal_guardar">
        <p class="title">
            ¿Está seguro de guardar este formato?
        </p>
        <div class="radios">
            <div class="si">
                <input type="Radio" class="yes" id="yes" value="yes" name="opcion">
                <label for="yes">Si</label>

            </div>
            <div class="no">
                <input type="Radio" class="not" id="not" value="not" name="opcion">
                <label for="not">No</label>
            </div>
        </div>
        <div class="input hidden">
            <label for="nombreformato">Ingrese nombre de formato</label>
            <input type="text" class="nombreformato" id="nombreformato">
        </div>
        <div class="boton">

            <button class="libro_formato">
                Aceptar
            </button>
        </div>
    </section>

</main>

<div class="ubicacion m-t-10p">
    <div class="ayuda">Formato Personalizado > Referencias Journal - Conferencia</p>
    </div>
</div>
<main class="buscar_checar">
    <nav class="nav-libro m-t-10p">
        <ul class="navmenu">
            <li><a href="index.php?accion=formato-libro">Libro</a></li>
            <li class="active"><a href="index.php?accion=formato-journal&datos=dato">Journal-Conferencia</a></li>
        </ul>
    </nav>

    <div class="busqueda m-t-20p ">

        <div class="extraerCategoria">

            <div class="buscador active formato_j">
                <input type="text" placeholder="Buscar Categoria">
                <div class="logo-buscar"><i class="material-icons">search</i></div>
            </div>

        </div>

        <div class="btn-formato-listado inputSearch m-t-15p">
            <button class="btn-formato" disabled="disabled">Crear formato</button>
        </div>


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
            <label class="parentesis" id="parentesis">(</label>



            <label class="parentesis2" id="parentesis2">)</label>
            <label class="comilla" id="comilla">"</label>

            <label class="coma" id="coma">,</label>
            <label class="punto" value="." id="punto">.</label>
            <label class="dospuntos" id="dospuntos">:</label>
            <label class="cursiva" id="cursiva">cursiva</label>
            <label class="pp" id="pp">pp</label>

        </div>
        <div class="separacion">
        
        </div>
        <div class="dos">
            <label class="paginasoooo" id="PAGINASJoooooo">Páginas</label>
            <label class="VOLUMEN" id="VOLUMEN">Volumen</label>
            <label class="journalConference" id="JOURNALJ">Journal-conferencia</label>
            <label class="doi" id="DOIJ">doi</label>
            <label class="ISSN" id="ISSNJ">ISSN</label>
            <label class="titulo" id="TITULOJ">titulo</label>
            <label class="pais" id="PAISJ">pais</label>
            <label class="Anio" id="ANIOJ">año</label>
            <label class="apellidoscompletoinicial" id="apellidoscompletoinicialJ">Apellido_e_inicialAutor</label>
            <label class="incialA_apellido" id="incialA_apellidoJoooooooo">Inicial_autor_y_apellido</label>
            <label class="namec_apec" id="NAMEC_APECJ">Autor_y_apellido</label>
        </div>

    </div>
    <div class="btn_generar_formato journal-btn">
        <button>Generar formato</button>
    </div>
    <div class="retornarformato hidden">
        <button>Volver a generar formato</button>
    </div>
    <div class="temporales_mostrar">
        <div class="texto-title">
            Referencias que fueron seleccionadas
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