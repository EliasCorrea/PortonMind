## Porton MIND

### Augmented Reality experience for viewing 3D models.
It uses *Mind.JS* and the camera of the device on which the webpage was opened.
When the target image is scanned, it will display a 3D model in *.glb*

## Requierements
Node   v24.14.0 
NGROK  3.36.1-msix-stable

## Instalation

Aframe
```
<script src="https://aframe.io/releases/1.5.0/aframe.min.js"></script>
```
MindAR
```
<script src="https://cdn.jsdelivr.net/npm/mind-ar@1.2.5/dist/mindar-image-aframe.prod.js"></script>
```

## Setup

1. Install Requierements
2. ``npx serve . ``
3. ``ngrok http 3000``
4. Check ``https://interdorsal-yachty-fawn.ngrok-free.dev/``

## Image Target
Use this tool from *Mind.JS*, the result is a [file]**.mind**

https://hiukim.github.io/mind-ar-js-doc/tools/compile

The .mind file has to be web accesible.

## 3D Files
HTML allows to read 3D objets, using the **.gltf** format
in this project the files are located in
    https://github.com/EliasCorrea/PortonMind/tree/main/models
The .gltf files has to be web accesible.