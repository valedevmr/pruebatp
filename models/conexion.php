<?php

    class Conexion{
        public function Conectar(){
            $link =  new PDO("mysql:host=localhost;dbname=terminal_pt","root","");
            return $link;
        }
    }  
?>