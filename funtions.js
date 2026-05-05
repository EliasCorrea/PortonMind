// ==========================
// ESTADO DE VISIBILIDAD
// ==========================
const visibilidad = {
    encendido: false,
    bateria: false,
    info: false,
    animando: false,
};

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
    const ids = ["#text-nombre", "#text-bateria-label", "#text-lidar"];
    ids.forEach(function (id) {
        const el = document.querySelector(id);
        if (el) el.setAttribute("visible", visibilidad.info ? "true" : "false");
    });
    console.log("Info visible:", visibilidad.info);
}

function toggleAnimacion() {
    const go2 = document.querySelector("#go2-entity");
    if (!go2) return;

    // Evitar múltiples disparos
    if (go2.getAttribute("data-animando") === "true") return;

    go2.setAttribute("data-animando", "true");

    // Reproducir UNA vez
    go2.setAttribute("animation-mixer", {
        clip: "*",
        loop: "once",
        clampWhenFinished: true,
        timeScale: 1
    });

    console.log("Animación ejecutándose una vez");

    // Cuando termina, liberar el bloqueo
    go2.addEventListener("animation-finished", function handler() {
        console.log("Animación terminada");

        go2.setAttribute("data-animando", "false");
        go2.removeEventListener("animation-finished", handler);
    });
}

// ==========================
// SETUP DE EVENTOS
// ==========================

function setupButtons() {
    const btnRotate   = document.querySelector("#btn-rotate");
    const btnBateria  = document.querySelector("#btn-bateria");
    const btnInfo     = document.querySelector("#btn-info");
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