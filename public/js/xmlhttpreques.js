export {obtenerXMLHttRequest}

function obtenerXMLHttRequest() {
    //varianle para obetener el objeto XMLHttpRequest
    let xhr = false;

    if (window.XMLHttpRequest) {
        if (typeof XMLHttpRequest != "undefined")
            xhr = new XMLHttpRequest();
        else
            xhr = new false;
    }
    else if (window.ActiveXObject) {
        try {
            xhr = new ActiveXObject('Msxml2.XMLHTTP');
        } catch (e) {
            try {
                xhr = new ActiveXObject('Microsoft.XMLHTTP');
            } catch (e) {
                xhr = false;
            }
        }
    }
    return xhr;

}