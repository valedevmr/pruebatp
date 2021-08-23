<main>
    <div class="ubicacion m-t-10p">
        <div class="ayuda">Agregar Referencia > Journal-Conferencia</p>
        </div>
    </div>
    <div class="insertarLibro m-t-15p">

        <div class="container_insercion border-r">
            <div class="Insertar_referencia">
                Ingresar Datos de Referencia
            </div>
            <div class="lib_Conf_menu">
                <div class="">
                    <a href="index.php?accion=insertar">Libro</a>
                </div>
                <div class="active">
                    <a href="index.php?accion=journal">Journal-Conferencia</a>
                </div>
            </div>
            <form class="formulario journalform">
                <div class="agragarautor">
                    <div>
                        <p class="mas">Agregar otro Autor<span class="tooltip-box">Agregar otro Autor y apellidos</span></p>
                    </div>

                </div>
                <div class="principal">
                    <div class="group_container first">
                        <div class="container_par first">
                            <label for="AUTOR">Autor </label>
                            <!-- <p class="mas">+ <span class="tooltip-box">Agregar otro Autor</span></p> -->
                            <input type="text" class="AUTOR" name="AUTOR" id="AUTOR">
                        </div>
                        <div class="container_par second">
                            <label for="APELLIDOS">Apellidos</label>
                            <input type="text" class="APELLIDOS" name="APELLIDOS" id="APELLIDOS">
                        </div>

                    </div>
                    <div class="group_container">
                        <div class="container_par">
                            <label for="TITULO">Título del Trabajo</label>
                            <input type="text" class="TITULO" name="TITULO" id="TITULO">
                        </div>
                        <div class="container_par">
                            <label for="JPC">Journal/Proceedings Conferencia</label>
                            <input type="text" class="JPC" name="JPC" id="JPC">
                        </div>

                    </div>
                    <div class="group_container">
                        <div class="container_par">
                            <label for="ANIO">Año</label>
                            <input type="text" class="ANIO" name="ANIO" id="ANIO" pattern="[0-9]+" placeholder="ejemplo: 2020">
                        </div>
                        <div class="container_par">
                            <label for="PAIS">País</label>
                            <input type="text" class="PAIS" name="PAIS" id="PAIS">
                        </div>


                    </div>

                    <div class="group_container">
                        <div class="container_par">
                            <label for="VOLUMEN">Volumen/Número</label>
                            <input type="text" class="VOLUMEN" name="VOLUMEN" id="VOLUMEN" pattern="[0-9]+" placeholder="ejemplo: 12">
                        </div>
                        <div class="container_par">
                            <label for="PAGINAS">Páginas</label>
                            <input type="text" class="PAGINAS" name="PAGINAS" id="PAGINAS" placeholder="ejemplo: 15-16">
                        </div>
                    </div>

                    <div class="group_container">
                        <div class="container_par">
                            <label for="ISSN">ISSN</label>
                            <input type="text" class="ISSN" name="ISSN" id="ISSN" placeholder="ejemplo: 444-333-...-...">
                        </div>
                        <div class="container_par">
                            <label for="DOI">DOI</label>
                            <input type="text" class="DOI" name="DOI" id="DOI" placeholder="htts://liga.extencion">
                        </div>

                    </div>

                    <div class="group_container defecto">
                        <div class="numerico">
                            <label for="categoria1">Categoría </label>
                            <select name="categoria1" id="categoria1" class="categoria1 categoria">
                                <option value="" disabled selected>Elegir Categoría</option>
                            </select>
                        </div>
                        <div class="numerico">
                            <label for="categoria2">Categoría </label>
                            <select name="categoria2" id="categoria2" class="categoria2 categoria">
                                <option value="" disabled selected>Elegir Categoría</option>

                            </select>
                        </div>
                        <div class="numerico">
                            <label for="categoria3">Categoría </label>
                            <select name="categoria3" id="categoria3" class="categoria3 categoria">
                                <option value="" disabled selected>Elegir Categoría</option>
                            </select>
                        </div>
                    </div>
                    <div class="group_container personalizado hidden">
                        <div class="numerico">
                            <label for="categoria1">Categoría </label>
                            <input type="text" id="primerInput">
                        </div>
                        <div class="numerico">
                            <label for="categoria2">Categoría </label>
                            <input type="text" id="segundoInput">
                        </div>
                        <div class="numerico">
                            <label for="categoria3">Categoría </label>
                            <input type="text" id="tercerInput">
                        </div>
                    </div>

                    <div class="cambio">
                        <div class="btncambio pordefecto ruta_journal">Introducir Categorias</div>
                    </div>
                    <div class="guardar">
                        <button type="submit" class="btn-envio">
                            Guardar
                        </button>
                    </div>
                </div>
            </form>
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
    <div class="view-modal exito">
        <div class="title">
            <h3>Datos guardados correctamente</h3>
        </div>
    </div>
</section>