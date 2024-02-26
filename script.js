// script.js
const form = document.getElementById("form");

form.addEventListener("submit", submitForm);

function submitForm(e) {
    e.preventDefault();
    const name = document.getElementById("name");
    const files = document.getElementById("files");
    const formData = new FormData();
    formData.append("name", name.value);
    for(let i =0; i < files.files.length; i++) {
            formData.append("files", files.files[i]);
    }
    fetch("http://localhost:5000/uploadFiles", {
        method: 'POST',
        body: formData,
    })
        .then((res) => console.log(res))
        .catch((err) => ("Error occured", err));
}

document.getElementById("getFilesBtn").addEventListener("click", getFileList);

function getFileLihst() {
    console.log("Soy el del front");
    fetch("http://localhost:5000/getFiles")
        .then(response => {
            console.log(response.body)
        })
        .catch(error => console.error("Error al obtener la lista de archivos:", error));
}


// Función para obtener la lista de archivos del servidor
function getFileList() {
    console.log("Soy el del front");
    fetch("http://localhost:5000/getFiles")
        .then(response => response.json())
        .then(data => {
            console.log(data.files[0]); // Imprimir los datos en la consola para verificar
            displayFileList(data.files[0]); // Llamar a una función para mostrar la lista de archivos en la interfaz de usuario
        })
        .catch(error => console.error("Error al obtener la lista de archivos:", error));
}


// Función para mostrar la lista de archivos en la interfaz de usuario
function displayFileList(files) {
    const path = 'uploads/'
    console.log(files)
    console.log(typeof(files))
    const fileListElement = document.getElementById("fileList");
    fileListElement.innerHTML = ""; // Limpiar la lista de archivos antes de mostrar nuevos datos

    var imagen = document.createElement("img")

    imagen.src = path+files; // Reemplaza con la ruta de tu imagen
    fileListElement.appendChild(imagen);
    //acceder al atributo 


    // Iterar sobre la lista de archivos y agregar cada archivo como un elemento de lista
    // files.forEach(file => {
    //     const listItem = document.createElement("li");
    //     listItem.textContent = file;
    //     fileListElement.appendChild(listItem);
    // });

}