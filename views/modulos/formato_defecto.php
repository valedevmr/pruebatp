<div class="ubicacion m-t-10p documento">
    <div class="ayuda">Formato por Defecto  / libro</p>
    </div>
</div>
<main class="buscar_checar ">
    <nav class="nav-libro m-t-10p">
        <ul class="navmenu">
            <li class="active"><a href="index.php?accion=formato_defecto">Formato libro</a></li>
            <li ><a href="index.php?accion=formato_defecto_jorunal">Formato Journal</a></li>
        </ul>
    </nav>
    <div class="busqueda m-t-20p ">

        <div class="extraerCategoria">

            <div class="buscador active">
                <input type="text" placeholder="Buscar Categoria">
                <div class="logo-buscar"><i class="material-icons">search</i></div>
            </div>
            
        </div>

        <div class="btn-formato-listado inputSearch m-t-15p">
            <button class="btn-apa-l" disabled="disabled">Crear formato</button>
        </div>
    </div>
    <div class="container-ckekeds m-t-20p">
        <div class="mostrar_buscados">

        </div>
    </div>
</main>
<section class="seccion_formateo hidden m-t-15">

    <div class="contenedor_estilos m-t-2p">
        <select name="formatodefecto" id="formatodefecto">
            
        </select>
    </div>
    <div class="btn_generar_formato ">
        <button class="formato_apa">Generar formato</button>
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
        <div class="container_i" id="referencias_forma">

        </div>
    </div>
</section>