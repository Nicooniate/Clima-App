const apiKey = '00ef5d97209240f79c2235248232206'; // Clave para que funcione la API

const locacionInput = document.getElementById('locacion');
const btnBuscar = document.getElementById('btn-buscar');
const temperaturaLabel = document.getElementById('temperatura');
const descripcionLabel = document.getElementById('descripcion');
const iconoClima = document.getElementById('icono-clima');

btnBuscar.addEventListener('click', buscarDatosClima);

// Esta funcion realiza la peticion a la API que obtiene los datos sobre el clima de cada ciudad
function buscarDatosClima() {
    const locacion = locacionInput.value;
    // Realiza la solicitud del clima a la API
    fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&lang=es&q=${encodeURIComponent(locacion)}`)
    .then(response => response.json())
    .then(data => {
        const {locacion, current} = data;
        const temperatura = current.temp_c;


        temperaturaLabel.textContent = `${temperatura}°C`
        descripcionLabel.textContent = current.condition.text;

        const codigoIcono = current.condition.icon;
        const urlIcono = `https:${codigoIcono}`;
        iconoClima.setAttribute('src', urlIcono);
        iconoClima.setAttribute('alt', current.condition.text);
    })
    // el manejador de error ".catch" recoge el error y envia una respuesta al servidor, ya sea un mensaje que nosotros mandemos o el codigo de error de la consola 
    .catch(error => {
        console.log('Error al obtener los datos del clima', error)
    });
}