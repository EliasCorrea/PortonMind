// ==========================
// ESTADO DE VISIBILIDAD
// ==========================
const visibilidad = {
    encendido: false,
    bateria: false,
    info: false,
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
    const el = document.querySelector("#text-apagado");
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

// ==========================
// SETUP DE EVENTOS
// ==========================

function setupButtons() {
    const btnRotate  = document.querySelector("#btn-rotate");
    const btnBateria = document.querySelector("#btn-bateria");
    const btnInfo    = document.querySelector("#btn-info");

    if (btnRotate)  btnRotate.addEventListener("click",  toggleEncendido);
    if (btnBateria) btnBateria.addEventListener("click", toggleBateria);
    if (btnInfo)    btnInfo.addEventListener("click",    toggleInfo);
}

// ==========================
// INICIALIZACIÓN
// ==========================

document.addEventListener("DOMContentLoaded", function () {
    const sceneEl = document.querySelector("a-scene");
    if (!sceneEl) return;

    sceneEl.addEventListener("loaded", function () {
        console.log("Escena cargada");
        setupButtons();

        // Todos los textos ocultos al inicio
        const ids = ["#text-encendido", "#text-apagado", "#text-nombre", "#text-bateria-label", "#text-lidar"];
        ids.forEach(function (id) {
            const el = document.querySelector(id);
            if (el) el.setAttribute("visible", "false");
        });
    });
});