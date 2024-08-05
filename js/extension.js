const cuadroJuego = document.querySelector(".game_cuadro");
const mensajeTurno = document.querySelector(".game_turno");
const finJuego = document.querySelector(".endgame");
const resultado = document.querySelector(".endgame_resultado");
const reiniciar = document.querySelector(".reinicia_juego");


let turnoX = true;
let turno = 0;
let maxTurno = 9;
let players = {
    x:"cross",
    o:"circle",
};

const ganadorPosiciones = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,5,7],[2,5,8],
    [0,4,8],[2,4,6],
];

iniciarJuego();
function iniciarJuego() {
    crearCuadro(); 
    mensajeTurno.textContent = turnoX ? "X":"O";
    turnoX = true;
    turno = 0;
    finJuego.classList.remove("show");
};

function crearCuadro( ){
    const celdas = 9;

    while(cuadroJuego.firstElementChild){
        cuadroJuego.firstElementChild.remove();
    };
    for (let i = 0; i < celdas; i++){
        const div = document.createElement("div");
        div.classList.add ("cell");
        div.addEventListener("click" , turnoGame , {once:true});
        
        cuadroJuego.append(div);
    };
};

function turnoGame(e){
    const currentCeldas = e.currentTarget;
    const currentTurno = turnoX ? players.x : players.o;
    
    turno++;
    drawShape(currentCeldas, currentTurno);

    if(checkWinner(currentTurno)){
        return;
    };

    if(turno === maxTurno){
        showEndGame(false);
    };

    changeTurn();
};


function drawShape(element, newClass){
    element.classList.add(newClass);
}

function changeTurn(){
    turnoX = !turnoX;
    mensajeTurno.textContent = turnoX ? "X" : "O";
}

function checkWinner(currentPlayer){
    const celdas = document.querySelectorAll(".cell");

    const winner = ganadorPosiciones.some(array =>{
        
        return array.every((position) =>{
            
            return celdas[position].classList.contains(currentPlayer);

        });

    });

    if(!winner){
        return;
    }

    showEndGame(true);
    return true;
}

function showEndGame(winner){
    finJuego.classList.add("show");

    if(winner){
       swal( resultado.textContent = `¡${turnoX ? "X" : "O"} ha ganado el juego!`);
    }else{
       swal( resultado.textContent = `¡El juego se ha empatado!`);
    }
}

reiniciar.addEventListener("click", iniciarJuego);


