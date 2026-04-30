// ==========================
// FUNCIONES
// ==========================

function rotarGo2() {
    const go2Model = document.querySelector("#go2-entity");

    if (!go2Model) return;

    go2Model.setAttribute("animation", {
        property: "rotation",
        to: "90 360 0",
        dur: 2000,
        loop: true,
        easing: "linear"
    });
}

function mostrarBateria() {
    console.log("Nivel de batería (ejemplo)");
}

function detenerGo2() {
    const go2Model = document.querySelector("#go2-entity");
    if (!go2Model) return;

    // elimina la animación
    go2Model.removeAttribute("animation");
}

let infoVisible = true;

function toggleInfo() {
    // Selección directa de los 3 a-entity de texto informativo
    // (los que NO están dentro de un a-box)
    const target = document.querySelector(
        "[mindar-image-target='targetIndex: 0']"
    );
    if (!target) return;

    // Obtiene todos los a-entity hijos DIRECTOS del target
    // y filtra solo los que tienen el atributo "text" (sean hijos directos)
    const todosLosEntity = target.querySelectorAll(":scope > a-entity[text]");

    todosLosEntity.forEach(function (el) {
        el.setAttribute("visible", infoVisible ? "false" : "true");
    });

    infoVisible = !infoVisible;
    console.log("Info visible:", infoVisible);
}



// ==========================
// SETUP DE EVENTOS
// ==========================

function setupButtons() {
    const btnRotate = document.querySelector("#btn-rotate");
    const btnBateria = document.querySelector("#btn-bateria");
    const btnToggleInfo = document.querySelector("#btn-info");

    if (btnRotate) {
        btnRotate.addEventListener("click", function () {
            console.log("Click en ROTATE");
            rotarGo2();
        });
    }

    if (btnBateria) {
        btnBateria.addEventListener("click", function () {
            console.log("Click en BATERÍA");
            detenerGo2();
        });
    }

    if(btnToggleInfo){
        btnToggleInfo.addEventListener("click", function(){
            console.log("TOGGLE INFO" + infoVisible);
            toggleInfo();
        })
    }
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
        
        const target = document.querySelector("[mindar-image-target='targetIndex: 0']");
        if (target) {
            target.querySelectorAll(":scope > a-entity[text]").forEach(function (el) {
                el.setAttribute("visible", "false");
            });
        }
    });
});