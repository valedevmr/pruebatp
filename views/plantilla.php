<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans+Condensed:wght@300&display=swap" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Saira+Extra+Condensed:wght@300&display=swap" rel="stylesheet">

    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@300&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="public/css/edit_libro.css">
    <!-- <link rel="stylesheet" href="public/css/formulario.css"> -->
    <link rel="stylesheet" href="public/css/navegacion.css">
    <link rel="stylesheet" href="public/css/index.css">
    <link rel="stylesheet" href="public/css/insertar.css">
    <link rel="stylesheet" href="public/css/Formato_libro.css">
    <link rel="stylesheet" href="public/css/buscador-select.css">

</head>

<body>
    <?php
    //Importamos la navegacion
    include "navegacion.php";
    ?>
    <?php
    //Instanciamos el Controlador y usamos el metodo enlaces,
    //el cual controlar la direciones(url) del menu
    $enlacesContenidos = new Controller();
    $enlacesContenidos->enlacesC();
    ?>


    <script src="public/js/modulo.js" type="module"></script>
    <!-- <script src="public/js/crear.js"></script>
    <script src="public/js/modulo.js" type="module"></script>
   -->
</body>

</html>