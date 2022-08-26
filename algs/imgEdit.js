"use strict";
exports.__esModule = true;
var main = document.getElementById("main");
var img = new Image();
img.src =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsBAMAAACLU5NGAAAAG1BMVEXMzMyWlpa3t7eqqqqcnJyjo6PFxcWxsbG+vr6NAD6nAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVR4nO3XO2/bMBDA8fNTGn2OlGS00S8QAWnnaKi7xnBQdJSBFl3joY/RRpHv3SNFykYtdKOm/w8BHOkOIM3HkRYBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/uddvWvsI38sj+7xT/2lJ2n8WH64iMbkdCaqurTPteqda98eX6+zKnu9OkdDckIH3W21kbmWlR5F9rrT+6ukTMv3ettFY3JC9UZyfZBJ0czrZxuWjXwtr5KmRSOnmy4ak9PJ3bc+PMveJvJ0a+OwslfNv1knG6Ks7KIhOaGxulYXsl7YmNy1j/XV4nLRXLtoSE4oczN2epLK5mRSuj/x/7tuPImfOfHDKXnRRUNyaq6l17bhu7aX/q1N1fY8Va7TIRqSE/tuS2a78i3Nludu7QsbsW4+54dlFw3JadVqM1Uf3b6XqSsO+4V/n+nrtGt7qrZdYzQkp6WuFLUtNW3DYebqzXoZk0ZqWzZGQ3LqblmLvhFtRq5Ho9Ct9c25OI1c52M0JKftlrzpc+9ozfSilOfbctjRsv226FtbtuBvLpJmOuza8hW7Zyfa4lpeJFl5H24nZr/Fz4srReNQt9ahW5nGpn8d/azFaEhOyJ8hNi+HtnBn5yrvClcsW+44slmL0UPyKj8Jh0/fmVjd12HxV+3hM+CZ6DZUFW4Q9+GOcPShuT6sw5o/3PovEKMhOaG5frZBWPXdt2a2xkMV2JeNuNI62H1LqmJXF9J3O7XbQ65t4xP9+OguFMPdTr9Zkd9I313eLaxt28X5VtUuqAPe5eVH/ckalPyl/THzFn/5jF0H9qEMZC/Fz4toTAYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEjpL514clJrNSt2AAAAAElFTkSuQmCC";
var canvas = document.createElement("canvas");
var canvasCtx = canvas.getContext("2d");
var width = img.width;
var height = img.height;
canvas.width = width;
canvas.height = height;
canvasCtx.drawImage(img, 0, 0);
var imgData = canvasCtx.getImageData(0, 0, width, height);
var newImgData = canvasCtx.createImageData(width, height);
//alter image
var data = newImgData.data;
for (var rowIdx = 0; rowIdx < height; rowIdx++) {
    for (var colIdx = 0; colIdx < width; colIdx++) {
        //checkerboard
        if (((Math.floor(rowIdx / 20) % 2) + (Math.floor(colIdx / 20) % 2)) % 2)
            continue;
        var pixelIdx = rowIdx * width + colIdx;
        var pixelDataIdx = pixelIdx * 4;
        var pixelData = data.slice(pixelDataIdx, pixelDataIdx + 4);
        var red = pixelData[0];
        var green = pixelData[1];
        var blue = pixelData[2];
        var alpha = pixelData[3];
        var newRed = 255;
        var newBlue = 0;
        var newGreen = 0;
        var newAlpha = 0.5 * 255;
        data[pixelDataIdx] = newRed;
        data[pixelDataIdx + 1] = newBlue;
        data[pixelDataIdx + 2] = newGreen;
        data[pixelDataIdx + 3] = newAlpha;
    }
}
canvasCtx.putImageData(newImgData, 0, 0);
var base64URI = canvas.toDataURL();
var newImg = new Image();
newImg.src = base64URI;
main.appendChild(newImg);
