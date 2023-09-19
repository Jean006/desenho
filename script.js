let canvas = document.getElementById("canvas");
let contexto = canvas.getContext("2d");
let desenhando = false;
let preenchendo = false;
let corAtual = "#000000";
let pontoInicial = { x: 0, y: 0 }; // Variável para armazenar o ponto inicial do desenho

// Defina a largura da linha
contexto.lineWidth = 1;

canvas.addEventListener("mousedown", function(event){
    if (event.shiftKey) {
        preenchendo = true;
        contexto.fillStyle = corAtual;
        
        // Verifique se o ponto inicial do preenchimento está dentro de um desenho existente
        if (contexto.isPointInPath(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop)) {
            contexto.fill(); // Preencha a área delimitada pelo desenho
        }
        
        preenchendo = false;
    } else {
        desenhando = true;
        contexto.beginPath();
        contexto.strokeStyle = corAtual;
        contexto.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
    }
});

canvas.addEventListener("mousemove", function(event){
    if(desenhando){
        contexto.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
        contexto.stroke();
    }
});

canvas.addEventListener("mouseup", function(event){
    desenhando = false;
});

let colorButtons = document.querySelectorAll(".colorButton");
colorButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        corAtual = button.getAttribute("data-color");
        contexto.strokeStyle = corAtual; // Atualize a cor da linha
    });
});

let colorPicker = document.getElementById("colorPicker");
colorPicker.addEventListener("input", function() {
    corAtual = colorPicker.value;
    contexto.strokeStyle = corAtual; // Atualize a cor da linha
});

