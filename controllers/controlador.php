<?php
    require_once "models/enlaces.php";
    class Controller{
        public function plantilla(){
            include "views/plantilla.php";
        }
        public function enlacesC(){
            if(isset($_GET["accion"])){
                include models::enlacesmodel($_GET["accion"]);
            }
            else {
                include models::enlacesmodel("home");
            }
        }
        public function extraerDatosController(){
            echo json_encode("todo chido");
        }
    }
?>