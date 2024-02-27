
const enviarBtn = document.getElementById("enviar-btn")
const removeBtn = document.getElementById("delete-car-btn");
const getCarsBtn = document.getElementById("get-cars-btn");

enviarBtn.addEventListener('click', submitForm);
removeBtn.addEventListener('click', removeCar);
getCarsBtn.addEventListener('click', getCars);

const url_input = document.getElementById('url_input');
let url = '';

const setUrlBtn = document.getElementById('set-url-btn');

setUrlBtn.addEventListener('click', setUrl);

function setUrl() {
    url = url_input.value;
    const success = document.getElementById('success-msg');
    success.classList.remove('hidden');
}

function submitForm(e) {
    e.preventDefault();
    const licensePlate = document.getElementById("licensePlate");
    const color = document.getElementById("color");
    const photo = document.getElementById("photo");
    const formData = new FormData();
    formData.append("license_plate", licensePlate.value);
    formData.append("color", color.value);
    formData.append("photo", photo.value);

    fetch(url+"/cars", {
        method: 'POST',
        body: formData,
    })
        .then((res) => console.log(res))
        .catch((err) => ("Error occured", err));
}

// script.js
async function getCars() {
    const response = await fetch(url+"/cars");
    const carDescriptions = await response.json();
    const carsList = document.getElementById('carros');
    carDescriptions.forEach(car => {
        const item = document.createElement('li');
        const pColor = document.createElement('p');
        pColor.innerHTML = 'color: ' + car.color;
        
        const pPlaca = document.createElement('p');
        pPlaca.innerHTML = 'placa: ' + car.license_plate;

        
        const pPath = document.createElement('p');
        pPath.innerHTML = 'ruta imagen: ' + car.photoPath;

        const pTime = document.createElement('p');
        pTime.innerHTML = 'Hora: ' + car.currentTime;
        item.appendChild(pPlaca);
        item.appendChild(pPath);
        item.appendChild(pColor);
        item.appendChild(pTime);

        carsList.appendChild(item);
    });
}

function removeCar(e) {
    e.preventDefault();
    const licensePlate = document.getElementById("toRemovelicensePlate");
    const request =   {
        "license_plate": licensePlate.value
        }
    const requestJSON = JSON.stringify(request);
    fetch(url+"/cars", {
        method: 'PATCH',
        body: requestJSON,
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((res) => console.log(res))
        .catch((err) => console.error("Error occurred", err));
}
  