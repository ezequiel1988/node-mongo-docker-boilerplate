export default class ValidationHelper {

    static validar(valor, validaciones) {
        let resultado = "";
        validaciones.forEach(validacion => {

            if (validacion == "email") {
                var re = /(^$|^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(?:[a-zA-Z]{2}|com|org|net|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)$)/;
                if (!re.test(valor)) {
                    resultado = "Formato de email incorrecto.";
                }
            }

            if (validacion == "telefono") {
                var re = new RegExp('^([0-9]+[\-]?)*$');
                if (!re.test(valor)) {
                    resultado = "Formato numerico incorrecto.";
                }
            }

            if (validacion == "int") {
                if(valor){
                    if (parseFloat(valor) % 1 != 0) {
                        resultado = "Solo números enteros.";
                    }
                }
            }

            if (validacion == "longitud4") {
                if (valor.length != 4) {
                    resultado = "Solo 4 caracteres."
                }
            }

            if (validacion == "longitud6") {
                if (valor.length != 6 && valor.length != 0) {
                    resultado = "Solo 6 caracteres."
                }
            }

            if (validacion == "longitud18") {
                if (valor.length != 18) {
                    resultado = "Solo 18 caracteres."
                }
            }

            if (validacion == "fechaString") {
                var re = /(^(((0[1-9]|1[0-9]|2[0-8])[-](0[1-9]|1[012]))|((29|30|31)[-](0[13578]|1[02]))|((29|30)[-](0[4,6,9]|11)))[-](19|[2-9][0-9])\d\d$)|(^29[-]02[-](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)/
                if (valor != "") {
                    if (!re.test(valor)) {
                        resultado = "Formato DD-MM-AAAA."
                    }
                }
            }

            if (validacion == "number") {
                if (isNaN(parseFloat(valor))) {
                    resultado = "Solo numeros."
                }
            }
            if (validacion == "Entre1y24") {
                var num = parseInt(valor);
                if (num < 1 || num > 24) {
                    resultado = "Solo numeros del 1 al 24."
                }
            }

            if (validacion == "numGrande") {
                var num = parseInt(valor);
                if (num > 9999999) {
                    resultado = "8 dígitos o menos."
                }
            }

            if (validacion == "mayorA0") {
                var num = parseFloat(valor);
                if (num < 0) {
                    resultado = "Solo valores mayores a 0."
                }
            }

            if (validacion == "tieneMayuscula") {
                var re = new RegExp('^.*[A-Z].*')
                if (!re.test(valor)) {
                    resultado = "Una mayuscula requerida."
                }
            }

            if (validacion == "tieneMinuscula") {
                var re = new RegExp('^.*[a-z].*')
                if (!re.test(valor)) {
                    resultado = "Una minuscula requerida."
                }
            }

            if (validacion == "minLongitud8") {
                if (valor.length < 8) {
                    resultado = "Minimo 8 caracteres"
                }
            }

            if (validacion == "string") {
                if(valor){
                    var re = new RegExp('^[^0-9]+$');
                    if (!re.test(valor)) {
                        resultado = "Solo letras."
                    }
                }
            }

            if (validacion == "requerido") {
                if (!valor) {
                    resultado = "Campo requerido.";
                }
            }

        });
        return resultado;
    }
}