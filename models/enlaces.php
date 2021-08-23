<?php
    class models{
        public function enlacesmodel($enlace){
            $retorno = "";
            if($enlace== "inicio"||
               $enlace == "insertar"||
                $enlace == "journal"||
                $enlace == "formato-libro"||
                $enlace == "formato-journal" ||
                $enlace == "eliminar" ||
                $enlace == "eliminarJournal" ||
                $enlace == "editar" ||
                $enlace == "editar-journal"||
                $enlace == "formato_defecto"||
                $enlace == "formato_defecto_jorunal"
                ){
                $retorno = "views/modulos/".$enlace.".php";
            }
            // if($enlace== "inicio"||
            //    $enlace == "insertar"||
            //    $enlace== "crear"||
            //     $enlace == "editar"||
            //     $enlace == "journal"){
            //     $retorno = "views/modulos/".$enlace.".php";
            // }
            else{
                $retorno = "views/modulos/inicio.php";
            }
            return $retorno;
        }
    }

 ?>