document.addEventListener("DOMContentLoaded", function() {
    const fullscreenMessage = document.getElementById("fullscreen-message");

    // Mostrar el mensaje en pantalla completa al cargar la página
    fullscreenMessage.style.display = "block";

    // Escuchar el evento de cambio de pantalla completa
    document.addEventListener("fullscreenchange", function() {
        if (document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
            // Ocultar el mensaje cuando el usuario entra en modo de pantalla completa
            fullscreenMessage.style.display = "none";
        } else {
            // Mostrar el mensaje cuando el usuario sale del modo de pantalla completa
            fullscreenMessage.style.display = "block";
        }
    });

    // Función para solicitar el modo de pantalla completa
    fullscreenMessage.addEventListener("click", function() {
        const docEl = document.documentElement;
        if (docEl.requestFullscreen) {
            docEl.requestFullscreen();
        } else if (docEl.mozRequestFullScreen) {
            docEl.mozRequestFullScreen();
        } else if (docEl.webkitRequestFullscreen) {
            docEl.webkitRequestFullscreen();
        } else if (docEl.msRequestFullscreen) {
            docEl.msRequestFullscreen();
        }
    });
});
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

const seleccion = document.getElementById("seleccion");
        let seleccionando = false;
        let startX, startY, endX, endY;

        function ocultarSeleccion() {
            seleccion.style.display = "none";
        }

        function mostrarSeleccion() {
            seleccion.style.display = "block";
        }

        document.addEventListener("mousedown", (e) => {
            seleccionando = true;
            startX = e.clientX;
            startY = e.clientY;
            if (e.target.id === "calculadora" || e.target.closest("#calculadora") ){
                return;
            }
            if (e.target.id === "bar-task" || e.target.closest("#bar-task") ){
                return;
            }
            
            seleccion.style.left = startX + "px";
            seleccion.style.top = startY + "px";
            seleccion.style.width = "0";
            seleccion.style.height = "0";

            mostrarSeleccion();
        });

        document.addEventListener("mousemove", (e) => {
            if (!seleccionando) return;

            endX = e.clientX;
            endY = e.clientY;

            const width = Math.abs(endX - startX);
            const height = Math.abs(endY - startY);

            seleccion.style.width = width + "px";
            seleccion.style.height = height + "px";

            seleccion.style.left = (endX > startX) ? startX + "px" : endX + "px";
            seleccion.style.top = (endY > startY) ? startY + "px" : endY + "px";
        });

        document.addEventListener("mouseup", () => {
            seleccionando = false;
            ocultarSeleccion();
        });

        // Excluir el elemento cuando el mouse entre en él
        const elementoExcluido = document.getElementById("calculadora");
        elementoExcluido.addEventListener("mouseenter", () => {
            seleccionando = false;
            ocultarSeleccion();
        });

        // Reactivar la selección cuando el mouse salga del elemento excluido
        elementoExcluido.addEventListener("mouseleave", () => {
            if (seleccionando) {
                mostrarSeleccion();
            }
        });

        













