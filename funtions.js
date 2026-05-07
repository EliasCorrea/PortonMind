// ==========================
// ESTADO DE VISIBILIDAD
// ==========================
const visibilidad = {
    encendido: false,
    bateria: false,
    info: false,
};

// ==========================
// ESTADO DE ANIMACIÓN
// ==========================
// true = adelante, false = inversa
let animDireccionAdelante = true;

// ==========================
// FUNCIONES TOGGLE
// ==========================

function toggleEncendido() {
    visibilidad.encendido = !visibilidad.encendido;
    const el = document.querySelector("#text-encendido");
    if (el) el.setAttribute("visible", visibilidad.encendido ? "true" : "false");
    console.log("Encendido visible:", visibilidad.encendido);
}

function toggleBateria() {
    visibilidad.bateria = !visibilidad.bateria;
    const el = document.querySelector("#text-bateria");
    if (el) el.setAttribute("visible", visibilidad.bateria ? "true" : "false");
    console.log("Bateria visible:", visibilidad.bateria);
}

function toggleInfo() {
    visibilidad.info = !visibilidad.info;
    const ids = ["#text-info-0", "#text-info-1", "#text-info-2"];
    ids.forEach(function (id) {
        const el = document.querySelector(id);
        if (el) el.setAttribute("visible", visibilidad.info ? "true" : "false");
    });
    console.log("Info visible:", visibilidad.info);
}

function toggleAnimacion() {
    const go2 = document.querySelector("#go2-entity");
    if (!go2) return;

    // Evitar múltiples disparos mientras está animando
    if (go2.getAttribute("data-animando") === "true") return;

    go2.setAttribute("data-animando", "true");

    const adelante = animDireccionAdelante;
    animDireccionAdelante = !animDireccionAdelante;

    console.log("Animación ejecutándose una vez,", adelante ? "adelante" : "inversa");

    // Remover el componente para destruir el mixer anterior
    go2.removeAttribute("animation-mixer");

    // Reasignar en el siguiente tick
    setTimeout(function () {

        if (adelante) {
            // ── ADELANTE: dejar que animation-mixer arranque solo desde time=0
            go2.setAttribute("animation-mixer", {
                clip: "*",
                loop: "once",
                clampWhenFinished: true,
                timeScale: 3
            });

        } else {
            // ── INVERSA: primero pausado para poder posicionar el tiempo
            go2.setAttribute("animation-mixer", {
                clip: "*",
                loop: "once",
                clampWhenFinished: true,
                timeScale: -3
            });

            // Acceder al mixer recién creado y posicionarlo al final ANTES de renderizar
            const mixerComp = go2.components["animation-mixer"];
            if (mixerComp && mixerComp.mixer) {
                mixerComp.mixer._actions.forEach(function (action) {
                    // Detener, posicionar al final y luego reproducir — todo en el mismo tick
                    action.stop();
                    action.timeScale = -3;
                    action.time = action.getClip().duration;
                    action.play();
                });
            }
        }

        go2.addEventListener("animation-finished", function handler() {
            console.log("Animación terminada");
            go2.setAttribute("data-animando", "false");
            go2.removeEventListener("animation-finished", handler);
        });

    }, 0);
}

// ==========================
// SETUP DE EVENTOS
// ==========================

function setupButtons() {
    const btnRotate    = document.querySelector("#btn-rotate");
    const btnBateria   = document.querySelector("#btn-bateria");
    const btnInfo      = document.querySelector("#btn-info");
    const btnAnimacion = document.querySelector("#btn-animacion");

    if (btnRotate)    btnRotate.addEventListener("click",    toggleEncendido);
    if (btnBateria)   btnBateria.addEventListener("click",   toggleBateria);
    if (btnInfo)      btnInfo.addEventListener("click",      toggleInfo);
    if (btnAnimacion) btnAnimacion.addEventListener("click", toggleAnimacion);
}

// ==========================
// INICIALIZACIÓN
// ==========================

document.addEventListener("DOMContentLoaded", function () {
    const sceneEl = document.querySelector("a-scene");
    if (!sceneEl) return;

    sceneEl.addEventListener("loaded", function () {
        setupButtons();

        // Ocultar textos al inicio
        const ids = [
            "#text-info-0",
            "#text-info-1",
            "#text-info-2",
            "#text-bateria"
        ];

        ids.forEach(function (id) {
            const el = document.querySelector(id);
            if (el) el.setAttribute("visible", "false");
        });

        // Animación detenida al inicio
        const go2 = document.querySelector("#go2-entity");
        if (go2) {
            go2.setAttribute("animation-mixer", {
                clip: "*",
                loop: "repeat",
                timeScale: 0
            });
        }
    });
});