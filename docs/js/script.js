//Declacación de variables
const textInput = document.getElementById("textInput");
const encryptButton = document.getElementById("encryptButton");
const decryptButton = document.getElementById("decryptButton");
const encryptData = { a: "ai", e: "enter", i: "imes", o: "ober", u: "ufat" };
const decryptData = Array("ai", "enter", "imes", "ober", "ufat");
const vocalsData = Array("a", "e", "i", "o", "u");
let textEncryptedData = Array();
let countEncryptedData = 0;
const containerResult = document.getElementById("containerResult");
const containerOptions = document.getElementById("containerOptions");
let confirmationButton = false;
let emptyResults = true;
let textResult = document.getElementsByClassName("textResultInput").length;

//----------------------------------------------------------------------------
//Declaración de funciones
//Encriptar texto
function encriptText() {
  let textEncripted = "";
  let previousText = textInput.value;
  textInput.value = textInput.value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  textInput.value = textInput.value.toLocaleLowerCase();
  if (previousText != textInput.value) {
    try {
      swal({
        title: "Advertencia",
        text: "Se ha realizado una conversión del texto!",
        icon: "info",
      });
    } catch {
      alert("Se ha realizado una conversión del texto");
    }
  }
  textInput.value = textInput.value.trim();
  for (i = 0; i < textInput.value.length; i++) {
    if (encryptData[textInput.value[i]] != undefined) {
      textEncripted += encryptData[textInput.value[i]];
    } else {
      textEncripted += textInput.value[i];
    }
  }
  return textEncripted;
}

//Desencriptar texto
function decryptText() {
  let resultDecrypt = textInput.value;
  let previousText = textInput.value;
  textInput.value = textInput.value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  textInput.value = textInput.value.toLocaleLowerCase();
  if (previousText != textInput.value) {
    try {
      swal({
        title: "Advertencia",
        text: "Se ha realizado una conversión del texto!",
        icon: "info",
      });
    } catch {
      alert("Se ha realizado una conversión del texto");
    }
  }
  textInput.value = textInput.value.trim();
  for (i = 0; i < 5; i++) {
    resultDecrypt = resultDecrypt.replaceAll(decryptData[i], vocalsData[i]);
  }
  addElements(resultDecrypt);
}

//Condición para agregar elementos de resultados
function addElements(dataResult) {
  for (i = 0; i < textEncryptedData.length; i++) {
    if (textEncryptedData[i] == dataResult) {
      try {
        swal({
          title: "Advertencia",
          text: "Este resultado ya existe!",
          icon: "error",
        });
      } catch {
        alert("Este resultado ya existe");
      }
      textInput.focus();
      return false;
    }
  }
  if (textInput.value == "") {
    try {
      swal({
        title: "Error",
        text: "Debes llenar el campo",
        icon: "error",
      });
    } catch {
      alert("Debes llenar el campo");
    }
    textInput.focus();
    return false;
  } else {
    if (emptyResults == true) {
      while (containerResult.firstChild) {
        containerResult.removeChild(containerResult.firstChild);
      }
    }
    if (countEncryptedData < 5) {
      textEncryptedData[countEncryptedData] = dataResult;
      elementsResults(textEncryptedData, countEncryptedData);
      countEncryptedData++;
    } else {
      countEncryptedData = 0;
      textEncryptedData[countEncryptedData] = dataResult;
      elementsResults(textEncryptedData, countEncryptedData);
    }
  }

  emptyResults = false;
  textResult = document.getElementsByClassName("textResultInput").length;
  deleteFirstElement();
  resultElements();
}

//Eliminar primer resultado creado
function deleteFirstElement() {
  if (textResult > 5) {
    containerResult.removeChild(containerResult.firstChild);
  }
}

//Elementos Resultados
function elementsResults(textEncryptedData, countEncryptedData) {
  const textResultInput = document.createElement("textarea");
  textResultInput.setAttribute("class", "textResultInput");
  textResultInput.value = textEncryptedData[countEncryptedData];
  textResultInput.readOnly = true;
  containerResult.appendChild(textResultInput);
  return true;
}

//crear botones con opciones
function createOptions() {
  const textLimits = document.createElement("h5");
  textLimits.innerHTML =
    "Acepta un máximo de 5 resultados, al llegar al límite se borrará la primera respuesta guardada actualmente";
  textLimits.setAttribute("class", "textLimits");
  containerOptions.appendChild(textLimits);
  const btnDeleteAll = document.createElement("button");
  btnDeleteAll.type = "button";
  btnDeleteAll.textContent = "Eliminar todos los resultados";
  btnDeleteAll.setAttribute("class", "button");
  btnDeleteAll.addEventListener("click", () => {
    //Crear evento del boton al hacer click
    while (containerResult.firstChild) {
      containerResult.removeChild(containerResult.firstChild);
    }
    btnCopyLast.remove();
    btnDeleteAll.remove();
    textLimits.remove();
    clearResults();
    const imageResultNull = document.createElement("img");
    imageResultNull.setAttribute("alt", "Muñeco sin resultados");
    imageResultNull.setAttribute("src", "images/noResults.png");
    imageResultNull.setAttribute("id", "imageNoResult");
    imageResultNull.setAttribute("style", "display:visible");
    const pNullOne = document.createElement("p");
    pNullOne.innerHTML = "Ningún mensaje fue encontrado";
    const pNullTwo = document.createElement("p");
    pNullTwo.innerHTML = "Ingresa el texto que desees encriptar o desencriptar";
    containerResult.appendChild(imageResultNull);
    containerResult.appendChild(pNullOne);
    containerResult.appendChild(pNullTwo);
    loadImageNoResult();
    emptyResults = true;
    confirmationButton = false;
  }); // Finalizan las opciones del boton
  containerOptions.appendChild(btnDeleteAll);
  const btnCopyLast = document.createElement("button");
  btnCopyLast.setAttribute("class", "button");
  btnCopyLast.type = "button";
  btnCopyLast.textContent = "Copiar ultimo resultado";
  btnCopyLast.addEventListener("click", () => {
    //Crear evento del boton al hacer click
    lastResult = document.getElementsByClassName("textResultInput");
    lastResult[lastResult.length - 1].select();
    document.execCommand("selectAll");
    document.execCommand("copy");
    setTimeout(function () {
      document.execCommand("unSelect");
    }, 2000);
  }); // Finalizan las opciones del boton
  containerOptions.appendChild(btnCopyLast);
  confirmationButton = true;
}

//Elimina los elementos y devuelve los resultados
function resultElements() {
  textResult = document.getElementsByClassName("textResultInput").length;
  if (textEncryptedData.length != 0 && confirmationButton == false) {
    createOptions();
  }
}

//Insertar Resultados
function insertResults() {
  let dataResult = encriptText();
  addElements(dataResult);
}

//Limpiar resultados
function clearResults() {
  textEncryptedData.length = 0;
  countEncryptedData = 0;
}

//Dimensionar textArea segun texto
function textAreaAutosize() {
  let textAreas = document.querySelectorAll("textResultInput");
  textAreas.forEach((textAreaResult) => {
    setTimeout(function () {
      textAreaResult.style.cssText = "height:auto; padding:0";
      textAreaResult.style.cssText =
        "height:" + textAreaResult.scrollHeight + "px";
    }, 0);
  });
}

//Cargar imagen si la resolucion de pantalla es mayor a 850px
function loadImageNoResult() {
  const imageNoResult = document.getElementById("imageNoResult");
  if (imageNoResult) {
    if (screen.width < 850) {
      imageNoResult.setAttribute("style", "display:none");
    } else {
      imageNoResult.setAttribute("style", "display:visible");
    }
  }
}

//----------------------------------------------------------------------------
//Declaración de funciones (OnLoad, OnChange, etc)
//Limpiar texto al recargar pagina
window.addEventListener("load", () => {
  loadImageNoResult();
  clearResults;
});

//Encriptar al oprimir boton
encryptButton.addEventListener("click", insertResults);

//Desencriptar al oprimir boton
decryptButton.addEventListener("click", decryptText);

//Mostrar u ocultar imagen segun tamaño de pantalla
window.addEventListener("resize", () => {
  loadImageNoResult();
});

//Autoajustar textAreas de resultados
window.addEventListener("change", textAreaAutosize);
