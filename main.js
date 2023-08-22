'use strict';

let posX, posY; // Declarar las variables fuera de las funciones

function iniciarArrastre(evento) {
    posX = evento.clientX;
    posY = evento.clientY;

    document.addEventListener("mousemove", arrastrar);
    document.addEventListener("mouseup", finalizarArrastre);
}

function arrastrar(evento) {
    let nuevaPosX = posX - evento.clientX;
    let nuevaPosY = posY - evento.clientY;
    posX = evento.clientX;
    posY = evento.clientY;

    let calculadora = document.getElementById("calculadora");
    calculadora.style.top = (calculadora.offsetTop - nuevaPosY) + "px";
    calculadora.style.left = (calculadora.offsetLeft - nuevaPosX) + "px";
}

function finalizarArrastre(evento) {
    document.removeEventListener("mousemove", arrastrar);
    document.removeEventListener("mouseup", finalizarArrastre);
}

const input = document.getElementById("current_operations");

input.addEventListener("keydown", function (event) {
    if (/[0-9\-\+()\.\,]/.test(event.key) || event.key === "Backspace" || event.key === "ArrowLeft"|| event.key === "ArrowRight"|| event.key === "ArrowUp"|| event.key === "ArrowDown") {
        return true;
    } else if (event.key === "\"" || event.key === "'" || event.key === "`") {
        if (input.selectionStart === input.selectionEnd && input.selectionStart !== null) {
            input.value = input.value.substring(0, input.selectionStart) + event.key + input.value.substring(input.selectionStart);
            input.selectionStart = input.selectionEnd = input.selectionStart + 1;
        } else {
            input.value = input.value.substring(0, input.selectionStart) + event.key + input.value.substring(input.selectionEnd);
            input.selectionStart = input.selectionEnd = input.selectionStart + 1;
        }
        event.preventDefault();
        return false;
    } else if (event.ctrlKey || event.altKey || event.metaKey || event.key === "Shift" || event.key === "CapsLock") {
        return true;
    }
    event.preventDefault();
    return false;
});

const initial = document.getElementById("current_operations");

initial.addEventListener("input", function(event) {
    if (input.value === "0") {
        input.value = "";
        input.selectionStart = input.selectionEnd = 0;
    }
});
var botonesNumeros = document.querySelectorAll(".numero-btn");
var entrada = document.getElementById("current_operations");

// Agrega un manejador de eventos a cada botón
botonesNumeros.forEach(function(boton) {
  boton.addEventListener("click", function() {
    var valorBoton = boton.value;
    // Si el valor del campo de entrada es "0", quítalo antes de asignar el nuevo valor
    if (entrada.value === "0") {
      entrada.value = valorBoton;
    } else {
      entrada.value += valorBoton; // Si no es "0", agrega el valor al final
    }
  });
});
// Este código seleccionará todos los botones con la clase "numero-btn" y les agregará un manejador de eventos de clic que funciona de la misma manera que el código anterior. Esto te permite tener botones individuales con IDs únicos y un enfoque más eficiente para asignar el valor de cada botón al campo de entrada.
var botonEliminar = document.getElementById("DELETE-btn");

botonEliminar.addEventListener("click", function() {
  var valorBoton = botonEliminar.value;

  // Verifica si el botón es el botón de eliminación
  if (valorBoton === "DEL") {
    var valorEntrada = entrada.value;
    
    // Verifica si el campo de entrada no está vacío antes de eliminar
    if (valorEntrada.length > 0) {
      entrada.value = valorEntrada.slice(0, -1); // Elimina el último carácter
    }
  }
});


document.addEventListener("DOMContentLoaded", function () {
  const tooltips = document.querySelectorAll(".tooltip");

  tooltips.forEach((tooltip) => {
      tooltip.style.transitionDelay = "0.5s"; // Ajusta el tiempo de retraso en segundos
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const iconos = document.querySelectorAll(".icono");

  iconos.forEach((icono) => {
      icono.addEventListener("click", () => {
          // Reiniciar todos los colores de fondo
          iconos.forEach((otroIcono) => {
              otroIcono.querySelector(".icono-color").style.backgroundColor = "transparent";
          });

          // Establecer el color de fondo del icono seleccionado en azul
          icono.querySelector(".icono-color").style.backgroundColor = "blue";
      });
  });
});













