<?php
require_once "../../models/conexion.php";

class DatosAjax
{
    public function extraerCategorias()
    {
        $con = new  Conexion();
        $query = "SELECT * FROM categoria";
        $stmt = $con->Conectar()->prepare($query);
        if ($stmt->execute()) {
            $json = array();
            $results = $stmt->fetchAll(PDO::FETCH_OBJ);
            foreach ($results as $row) {
                array_push($json, $row);
            }
            echo json_encode($json);
        } else {
            echo json_encode("ocurrio un problema");
        }
    }
    public function extraerformatos()
    {
        $con = new  Conexion();
        $query = "SELECT * FROM formatolibrosave";
        $stmt = $con->Conectar()->prepare($query);
        if ($stmt->execute()) {
            $json = array();
            $results = $stmt->fetchAll(PDO::FETCH_OBJ);
            foreach ($results as $row) {
                array_push($json, $row);
            }
            echo json_encode($json);
        } else {
            echo json_encode("ocurrio un problema");
        }
    }
    public function extraerformatosdos()
    {
        $con = new  Conexion();
        $query = "SELECT * FROM formatosjournal";
        $stmt = $con->Conectar()->prepare($query);
        if ($stmt->execute()) {
            $json = array();
            $results = $stmt->fetchAll(PDO::FETCH_OBJ);
            foreach ($results as $row) {
                array_push($json, $row);
            }
            echo json_encode($json);
        } else {
            echo json_encode("ocurrio un problema");
        }
    }
    public function leerReferencias($datos)
    {
        $con = new  Conexion();
        $query = "SELECT * FROM libro";
        $stmt = $con->Conectar()->prepare($query);
        if ($stmt->execute()) {
            $json = array();
            $numero = 0;
            $results = $stmt->fetchAll();
            foreach ($datos as $valores => $valor) {
                $numero = $numero + 1;
            }
            if ($numero > 0) {
                foreach ($datos as $valores => $valor) {
                    foreach ($results as $row) {
                        if($valor == $row["id"]){
                            array_push($json, $row);
                        }
                    }
                }
                echo json_encode($json);
            }
            else{
                echo json_encode("ocurrio un problema");
            }
            
           
        } else {
            echo json_encode("ocurrio un problemsaddddddd");
        }
    }
    public function leerReferenciasJ($datos)
    {
        $con = new  Conexion();
        $query = "SELECT * FROM journal";
        $stmt = $con->Conectar()->prepare($query);
        if ($stmt->execute()) {
            $json = array();
            $numero = 0;
            $results = $stmt->fetchAll();
            foreach ($datos as $valores => $valor) {
                $numero = $numero + 1;
            }
            if ($numero > 0) {
                foreach ($datos as $valores => $valor) {
                    foreach ($results as $row) {
                        if($valor == $row["id"]){
                            array_push($json, $row);
                        }
                    }
                }
                echo json_encode($json);
            }
            else{
                echo json_encode("ocurrio un problema");
            }
            
           
        } else {
            echo json_encode("ocurrio un problemsaddddddd");
        }
    }
    public function insertarformatoJournal($datos){
        $hosting = "localhost";
        $password = "";
        $usuario = "root";
        $database = "terminal_pt";

        $conn = new mysqli($hosting,$usuario,$password,$database);
        $nombre = $datos["nombreJ"];
        $formato = $datos["formato"];
        $queryInsert ="INSERT INTO formatosjournal (nombre,formato) VALUES('".$nombre."','".$formato."')";     
        if ($conn) {


            if ($conn->query($queryInsert)) {
                echo json_encode("bien");
            } else {
                echo json_encode("fallo");
            }
        }
    }
    public function insertarformatolibro($datos){
        $hosting = "localhost";
        $password = "";
        $usuario = "root";
        $database = "terminal_pt";

        $conn = new mysqli($hosting,$usuario,$password,$database);
        $nombre = $datos["nombre"];
        $formato = $datos["formato"];
        $queryInsert ="INSERT INTO formatolibrosave (nombre,formato) VALUES('".$nombre."','".$formato."')";     
        if ($conn) {


            if ($conn->query($queryInsert)) {
                echo json_encode("bien");
            } else {
                echo json_encode("fallo");
            }
        }
    }


    public function insertarLibro($datos)
    {
        
        $hosting = "localhost";
        $password = "";
        $usuario = "root";
        $database = "terminal_pt";

        $conn = new mysqli($hosting,$usuario,$password,$database);
        $autores = $datos["autor"];
        $apellido = $datos["apellidos"];
        $titulo = $datos["titulo"];
        $editorial = $datos["editorial"];
        $isbn = $datos["isbn"];
        $pais = $datos["pais"];
        $doi = $datos["doi"];
        $categoria1 = $datos["categoria1"];
        $categoria2 = $datos["categoria2"];
        $categoria3 = $datos["categoria3"];
        $paginas = $datos["paginas"];
        $anio = $datos["anio"];
        $nombre_completo = $datos["nombrecompleto"];        
        

        $queryInsert ="INSERT INTO libro(Autor,Apellidos,Anio,titulo,Editorial,pais,ISBN,pagina,categoria1,categoria2,categoria3,doi,nombrecompleto)
        VALUES('".$autores."','".$apellido."','".$anio."','".$titulo."','".$editorial."','".$pais."','".$isbn ."','".$paginas."','".$categoria1."','".$categoria2. "','".$categoria3."','".$doi."','".$nombre_completo."')";
        if ($conn) {


            if ($conn->query($queryInsert)) {
                echo json_encode("bien");
            } else {
                echo json_encode("fallo");
            }
        }
    }
    public function insertarJournal($datos){
        $hosting = "localhost";
        $password = "";
        $usuario = "root";
        $database = "terminal_pt";
        
        $conn = new mysqli($hosting,$usuario,$password,$database);
        $autores = $datos["autor"];
        $anio = $datos["anio"];
        $titulo = $datos["titulo"];
        $journal = $datos["jpc"];
        $issn = $datos["issn"];
        $volumen = $datos["volumen"];
        $doi = $datos["doi"];
        $paginas = $datos["paginas"];
        $apellido = $datos["apellidos"];
        $pais = $datos["pais"];
        $categoria1 = $datos["categoria1"];
        $categoria2 = $datos["categoria2"];
        $categoria3 = $datos["categoria3"];
        $nombre_completo = $datos["nombrecompleto"];

        $queryInsert ="INSERT INTO journal(Autor,Anio,titulo,Journal_Conferencia,volumen,Paginas,ISSN,apellidos,pais,categoria1,categoria2,categoria3,doi,nombrecompleto)
        VALUES('".$autores."','".$anio."','".$titulo."','".$journal."','".$volumen."','".$paginas ."','".$issn."','".$apellido."','".$pais."','".$categoria1 ."','".$categoria2."','".$categoria3."','".$doi ."','".$nombre_completo ."')";
        if ($conn) {


            if ($conn->query($queryInsert)) {
                echo json_encode("bien");
            } else {
                echo json_encode("fallo");
            }
        }
       
    }

    public function BuscarCategoria($palabra){
        $con = new  Conexion();
        $query = "SELECT * FROM libro WHERE categoria1 like '%$palabra%' or categoria2 like '%$palabra%' or categoria3 like '%$palabra%'";
        $stmt = $con->Conectar()->prepare($query);
        if($stmt->execute()){
            $json = array(); 
            $results = $stmt -> fetchAll(PDO::FETCH_OBJ);
            foreach ($results AS $row) { 
                array_push($json,$row);
            }
            if($stmt->rowCount()>0){
                echo json_encode($json);
            }
            else{
                echo json_encode("sinnumero");
            }

            
        }
        else{
            echo json_encode("sinnumero");
        }
    }
    public function BuscarCategoriaJournal($palabra){
        $con = new  Conexion();
        $query = "SELECT * FROM journal WHERE categoria1 like '%$palabra%' or categoria2 like '%$palabra%' or categoria3 like '%$palabra%'";
        $stmt = $con->Conectar()->prepare($query);
        if($stmt->execute()){
            $json = array(); 
            $results = $stmt -> fetchAll(PDO::FETCH_OBJ);
            foreach ($results AS $row) { 
                array_push($json,$row);
            }
            if($stmt->rowCount()>0){
                echo json_encode($json);
            }
            else{
                echo json_encode("fallo");
            }

            
        }
        else{
            echo json_encode("fallo");
        }
    }
    public function eliminarLibro($id){
        $con = new  Conexion();
        $query ="DELETE FROM libro WHERE id =".$id["ideleminiar"];
        try {
            // set the PDO error mode to exception
            $con->Conectar()->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
          
            
            $con->Conectar()->exec($query);
            echo json_encode("bien");
          } catch(PDOException $e) {
            echo json_encode("error");
          }
          
          $conn = null;
    }
    public function actualizarLibro($datos){
    {
        
            $hosting = "localhost";
            $password = "";
            $usuario = "root";
            $database = "terminal_pt";
            
    
            $conn = new mysqli($hosting,$usuario,$password,$database);
            $id = $datos["id"];
            $nombre_completo = $datos["nombrecompleto"];
            $autores = $datos["autor"];
            $apellido = $datos["apellidos"];
            $titulo = $datos["titulo"];
            $editorial = $datos["editorial"];
            $isbn = $datos["isbn"];
            $pais = $datos["pais"];
            $doi = $datos["doi"];
            $categoria1 = $datos["categoria1"];
            $categoria2 = $datos["categoria2"];
            $categoria3 = $datos["categoria3"];
            $paginas = $datos["pagina"];
            $anio = $datos["anio"];        
            
            $queryUpdate = "UPDATE libro SET Autor = '".$autores."', Apellidos = '".$apellido."',Anio = '".$anio."', titulo = '".$titulo."',Editorial = '".$editorial."', pais = '".$pais."', ISBN = '".$isbn."', pagina = '".$paginas."', categoria1 = '".$categoria1."', categoria2 = '".$categoria2."', categoria3='".$categoria3."',doi = '".$doi."', nombrecompleto = '".$nombre_completo."' WHERE id = ".$id."";
            // echo json_encode($queryUpdate);
            // VALUES('".$autores."','".$apellido."','".$anio."','".$titulo."','".$editorial."','".$pais."','".$isbn ."','".$paginas."','".$categoria1."','".$categoria2. "','".$categoria3."','".$doi."','".$doi.")";
            if ($conn) {
    
    
                if ($conn->query($queryUpdate)) {
                    echo json_encode("bien");
                } else {
                    echo json_encode("fallo");
                }
            }
            
        }
    
    }
    public function actualizarJournal($datos){
        {
            
                $hosting = "localhost";
                $password = "";
                $usuario = "root";
                $database = "terminal_pt";
                
        
                $conn = new mysqli($hosting,$usuario,$password,$database);
                $id = $datos["id"];
                $nombre_completo = $datos["nombrecompleto"];
                $autores = $datos["autor"];
                $apellido = $datos["apellidos"];
                $titulo = $datos["titulo"];
                $editorial = $datos["editorial"];
                $isbn = $datos["isbn"];
                $pais = $datos["pais"];
                $doi = $datos["doi"];
                $categoria1 = $datos["categoria1"];
                $categoria2 = $datos["categoria2"];
                $categoria3 = $datos["categoria3"];
                $paginas = $datos["pagina"];
                $anio = $datos["anio"];
                $volumen = $datos["volumen"];        
                
                $queryUpdate = "UPDATE journal SET Autor = '".$autores."',Anio = '".$anio."', titulo = '".$titulo."', Journal_Conferencia = '".$editorial."',Volumen = '".$volumen."', Paginas = '".$paginas."', ISSN = '".$isbn."',apellidos = '".$apellido."', pais = '".$pais."', categoria1 = '".$categoria1."', categoria2 = '".$categoria2."', categoria3='".$categoria3."',doi = '".$doi."', nombrecompleto = '".$nombre_completo."' WHERE id = ".$id."";
                
                if ($conn) {
        
        
                    if ($conn->query($queryUpdate)) {
                        echo json_encode("bien");
                    } else {
                        echo json_encode("fallo");
                    }
                }
               
            }
        
        }
    public function editarLibro($id){
        $con = new  Conexion();
        $query = "SELECT * FROM libro WHERE id =".$id["ideditar"]."";
        
        $stmt = $con->Conectar()->prepare($query);
        if($stmt->execute()){
            $json = array(); 
            $results = $stmt -> fetchAll(PDO::FETCH_OBJ);
            foreach ($results AS $row) { 
                array_push($json,$row);
            }
            if($stmt->rowCount()>0){
                echo json_encode($json);
            }
            else{
                echo json_encode("sinnumero");
            }

            
        }
        else{
            echo json_encode("sinnumeroexterior");
        }

    }
    public function editarJournal($id){
        $con = new  Conexion();
        $query = "SELECT * FROM journal WHERE id =".$id["ideditarjorunal"]."";
        
        $stmt = $con->Conectar()->prepare($query);
        if($stmt->execute()){
            $json = array(); 
            $results = $stmt -> fetchAll(PDO::FETCH_OBJ);
            foreach ($results AS $row) { 
                array_push($json,$row);
            }
            if($stmt->rowCount()>0){
                echo json_encode($json);
            }
            else{
                echo json_encode("sinnumero");
            }

            
        }
        else{
            echo json_encode("sinnumeroexterior");
        }

    }
    public function eliminarJournal($id){
        $con = new  Conexion();
        $query = "DELETE FROM journal WHERE id =".$id["eliminarjorunal"];
        
        try {
            // set the PDO error mode to exception
            $con->Conectar()->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
          
            
            $con->Conectar()->exec($query);
            echo json_encode("bien");
        } catch(PDOException $e) {
            echo json_encode("error");
        }
          
        $conn = null;
    }

}
if (isset($_GET["extCat"])) {
    $datosSelect = new DatosAjax();
    $datosSelect->extraerCategorias();
} else if (isset($_POST["book"])) {
    $datosLibros = new DatosAjax();
    $datosLibros->insertarLibro($_POST);
}
else if(isset($_POST["journal"])){
    $datosJournal = new DatosAjax();
    $datosJournal->insertarJournal($_POST);
}
else if(isset($_POST["buscandoInput"])){
    $Buscardatosporcategoria = new DatosAjax();
    $Buscardatosporcategoria->BuscarCategoria($_POST["datoBuscar"]);
}
else if(isset($_POST["buscandoInputJ"])){$Buscardatosporcategoria = new DatosAjax();
    $Buscardatosporcategoria->BuscarCategoriaJournal($_POST["datoBuscar"]);
}
else if(isset($_POST["buscandoInputJournal"])){
    $Buscardatosporcategoria = new DatosAjax();
    $Buscardatosporcategoria->BuscarCategoriaJournal($_POST["datoBuscar"]);
}
elseif(isset($_POST["temporal"])){
    $exef = new DatosAjax();
    $exef->leerReferencias($_POST);
}
elseif (isset($_POST["temporal_j"])) {
    $exef = new DatosAjax();
    $exef->leerReferenciasJ($_POST);
}
elseif (isset($_POST["ideleminiar"])) {
    $eliminar = new DatosAjax();
    $eliminar->eliminarLibro($_POST);
} 
elseif (isset($_POST["ideditar"])) {
    $editar = new DatosAjax();
    $editar->editarLibro($_POST);
} 
elseif (isset($_POST["ideditarjorunal"])) {
    $editarjournal = new DatosAjax();
    $editarjournal->editarJournal($_POST);
} 
elseif (isset($_POST["eliminarjorunal"])) {
    
    $eliminar = new DatosAjax();
    $eliminar->eliminarJournal($_POST);
}
elseif (isset($_POST["actualizar"])){
    // echo json_encode("todo chido");
    $actualizar = new DatosAjax();
    $actualizar->actualizarLibro($_POST);

}
elseif (isset($_POST["actualizar_j"])) {
    $actualizar = new DatosAjax();
    $actualizar->actualizarJournal($_POST);
}
else if(isset($_POST["buscandoInputJO"])){
    $Buscardatosporcategoria = new DatosAjax();
    $Buscardatosporcategoria->BuscarCategoriaJournal($_POST["datoBuscar"]);
}
else if(isset($_POST["buscandoInputdefectoj"])){
    $Buscardatosporcategoria = new DatosAjax();
    $Buscardatosporcategoria->BuscarCategoriaJournal($_POST["datoBuscar"]);
}
else if(isset($_POST["nombre"])){
    $insertarformatobook =  new DatosAjax();
    $insertarformatobook->insertarformatolibro($_POST);
}
else if(isset($_POST["nombreJ"])){
    
    $insertarformatobook =  new DatosAjax();
    $insertarformatobook->insertarformatoJournal($_POST);
}
else if(isset($_POST["formatoplis"])){
    $extraerformatos =  new DatosAjax();
    $extraerformatos->extraerformatos();
}
else if(isset($_POST["formatoplisdos"])){
    $extraerformatos =  new DatosAjax();
    $extraerformatos->extraerformatosdos();
}
else {
    echo json_encode("ocurrio un problema");
}

