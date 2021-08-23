<main class="edi-book hidden">
    <div class="edit_libro">
        <div class="titulo_libro">
            <div class="cerrar">
                <span class="close"><i class="material-icons color">close</i></span>
            </div>
            <h3>Edición de datos libro</h3>
        </div>
        <form class="form_editar_libro">
            <div class="container-inputs">
                <div class="group_container dinamicos">

                </div>
                
                <div class="group_container">
                    <div class="container_par">
                        <label for="TITULO">Título</label>
                        <input type="text" class="TITULO" name="TITULO" id="TITULO">
                    </div>
                    <div class="container_par">
                        <label for="EDITORIAL">Journal-Conferencia</label>
                        <input type="text" class="EDITORIAL" name="EDITORIAL" id="EDITORIAL">
                    </div>

                </div>
                <div class="group_container first">
                    
                   
                    <div class="container_par">
                        <label for="ANIO">Año</label>
                        <input type="text" class="ANIO" name="ANIO" id="ANIO">
                    </div>
                    <div class="container_par">
                        <label for="PAIS">País</label>
                        <input type="text" class="PAIS" name="PAIS" id="PAIS">
                    </div>

                </div>
                <div class="group_container ">
                    <div class="container_par">
                        <label for="PAGINA">Página</label>
                        <input type="text" class="PAGINA" name="PAGINA" id="PAGINA">
                    </div>
                    <div class="container_par">
                        <label for="ISN">ISBN</label>
                        <input type="text" class="ISBN" name="ISBN" id="ISBN">
                    </div>

                </div>
                
                <div class="group_container">
                    <div class="container_par">
                        <label for="DOI">DOI</label>
                        <input type="text" class="DOI" name="DOI" id="DOI">
                    </div>
                    <div class="container_par">
                        <label for="Volumen">Volumen/Número</label>
                        <input type="text" class="Volumen" name="Volumen" id="Volumen">
                    </div>
                </div>
                <div class="group_container personalizado">
                    <div class="numerico">
                        <label for="categoria1">Categoría </label>
                        <input type="text" class="cat" id="primerInput" class="primerInput">
                    </div>
                    <div class="numerico">
                        <label for="categoria2">Categoría </label>
                        <input type="text" class="cat" id="segundoInput" class="segundoInput">
                    </div>
                    <div class="numerico">
                        <label for="categoria3">Categoría </label>
                        <input type="text" class="cat" id="tercerInput">
                    </div>
                </div>
        </form>
        <span class="hidden" id="id"></span>
        <div class="guardar">
            <button type="submit" class="btn-editar btn-editar-j btn">
                Guardar
            </button>
        </div>

    </div>

    </div>
</main>

<!-- 

aqui empieza el codigo para recuprar las referncias y ser editadas
 -->


<main>
    <div class="ubicacion m-t-10p">
        <div class="ayuda">Referencias > Editar Referencia / Journal - Conferencia</p>
        </div>
    </div>

    <nav class="nav-libro m-t-10p">
        <ul class="navmenu">
            <li ><a href="index.php?accion=editar">Editar libro</a></li>
            <li class="active"  ><a href="index.php?accion=editar-journal">Editar Journal-Conferencia</a></li>
        </ul>
    </nav>
    <div class="busqueda m-t-20p">

        <div class="extraerCategoria">

            <div class="active editarlibroB">
                <input type="text" placeholder="Buscar Categoria de Libro a editar">
                <div class="logo-buscar"><i class="material-icons">search</i></div>
            </div>

        </div>


    </div>
    <div class="container-ckekeds m-t-20p">
        <div class="mostrar_buscados">

        </div>
    </div>
</main>
<section class="modal hidden red">
    <div class="view-modal">
        <div class="title">
            <h3>Ingrese Nuevo Autor y sus Apellidos</h3>
        </div>
    </div>
</section>
<section class="modal red hidden hello">
    <div class="view-modal modal-obliogatorios">
        <div class="title">
            <h3>Todos los datos son obligatorios</h3>
        </div>
    </div>
</section>
<section class="modal hidden verde">
    <div class="view-modal exitoeliminar">
        <div class="title">
            <h3>Se elimino correctamente</h3>
        </div>
    </div>
</section>