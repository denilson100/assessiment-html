
// var imgArray = new Array();
//
// imgArray[0] = new Image();
// imgArray[0].src = 'img/android.png'
//
// var memory_array;
//
// var img = new Array(16);
//
// for(var i=0; i<16; i++){
// 	img[i] = new Image();
// 	img[i].src = 'img/img' + i + '.png';
// 	memory_array += img[i].src;
//


var memory_array = ['1','1','2','2','3','3','4','4','5','5','6','6','7','7','8','8'];
var memory_values = [];
var memory_tile_ids = [];
var tiles_flipped = 0;
var jogadas = 0;
// flag para logida de mostrar cartas. true mostra e false oculta
var mostraCartas = true;

var pause = 0;
var count = 0;
var counter = setInterval(timer, 1000);
var stoped = 0

function newBoard() {
	tiles_flipped = 0;
	// embaralha o array apenas na primeira vez
	if(mostraCartas == true){
  	memory_array = _.shuffle(memory_array);
	}

  var output = '';
  _.forEach(memory_array, function(memory_array_value, index) {
		if(mostraCartas == false){
			// pega uma string com as cartas viradas
    	output += '<div id="tile_'+ index +'" onclick="memoryFlipTile(this,\''+ memory_array_value +'\')"></div>';
		} else {
			// pega uma string mostrando as cartas
			output += '<div><img src="img' + memory_array_value + '.png"></div>';
		}

  });

	document.getElementById('memory_board').innerHTML = output;
	jogadas = 0;
	document.getElementById('quantidadeJogadas').innerHTML = 'Jogadas: ' + jogadas;
	mostraBotao();
	ReStartFunction();

}

// function init() {
// 	document.getElementById("div1").style.display = 'none';
// }

function canFlipCard(tile) {
  return tile.innerHTML == "" && memory_values.length < 2;
}

function isOneCardFlipped() {
  return memory_values.length == 1
}

function areNoCardsFlipped() {
  return memory_values.length == 0;
}

function setCardAsFlipped(tile, value) {
  memory_values.push(value);
  memory_tile_ids.push(tile.id);
}

function isThereIsAMatch() {
  return memory_values[0] == memory_values[1];
}

function matchCards() {
  tiles_flipped += 2;
  // Clear both arrays
  memory_values = [];
  memory_tile_ids = [];
}

function isGameOver() {
  // Check to see if the whole board is cleared
	mostraCartas = true;
  return tiles_flipped == memory_array.length;
}

function gameIsOver() {
	// Apresenta estatus
	mostraBotao();
	PauseFunction();
	// document.getElementById('quantidadeJogadas').innerHTML = 'Jogadas: ' + jogadas;
	document.getElementById('tempo').innerHTML = 'Tempo: ' + tempo;
	document.getElementById("div").style.display = 'block';

}

function mostraBotao() {
        var display = document.getElementById("div").style.display;
        if(display == "none")
            document.getElementById("div").style.display = 'block';
        else
            document.getElementById("div").style.display = 'none';
    }

function timer() {
  count = count+1;
  document.getElementById("timer").innerHTML = count + " secs";
	document.getElementById("div").style.display = 'none';
	// logica para mostrar ou nao as cartas. Antes de 2 seg mostra. Passou de 2 seg seta variavel e
	// inicia não mostrando mais.
	if(mostraCartas == true){
		if(count == 2){
			mostraCartas = false;
			newBoard();
		}
	}
	// var div = $("#timer");
  //   div.animate({left: '50px'}, "slow");
  //   div.animate({fontSize: '3em'}, "slow");

}

function StopFunction() {
  clearInterval(counter);
  window.count = 0;
  window.pause = 0;
  document.getElementById("pause").innerHTML = "Pause"
  window.stoped=1
  document.getElementById("timer").innerHTML = count + " secs";

}

function ReStartFunction() {
  if (counter) {
    clearInterval(counter);
    window.pause = 0;
    window.count = 0;
    window.stoped = 0
    window.counter=setInterval(timer, 1000);
    count = count+1;
    document.getElementById("pause").innerHTML = "Pause"
    document.getElementById("timer").innerHTML = count + " secs";

  }
}

function PauseFunction() {
  if (stoped == 0) {
    if (pause == 0) {
      clearInterval(counter);
      document.getElementById("pause").innerHTML = "Resume"
      pause = 1;
      return;
    }

  if (pause == 1) {
      window.counter=setInterval(timer, 1000);
      document.getElementById("timer").innerHTML = count + " secs";
      document.getElementById("pause").innerHTML = "Pause"
      pause = 0;
      return;
    }
  }
  return;
}

function cardsDoNotMatch() {
  setTimeout(flipCardBack, 700);
}

// Retorna quando clica
function flipCard(tile, value) {
  tile.style.background = '#FFF';
  tile.innerHTML = '<img id="img" src="img' + value +'.png" >';

}

function mostrarTodas(){
	isOneCardFlipped();
}

function flipCardBack() {
  // Flip the 2 tiles back over
  var tile_1 = document.getElementById(memory_tile_ids[0]);
  var tile_2 = document.getElementById(memory_tile_ids[1]);
  tile_1.style.background = '#999';
  tile_1.innerHTML = "";
  tile_2.style.background = '#999';
  tile_2.innerHTML = "";

	// animação se nao acertar
	$("#" + memory_tile_ids[0]).fadeTo("slow", 0.5);
	$("#" + memory_tile_ids[0]).fadeTo("slow", 1.0);

	$("#" + memory_tile_ids[1]).fadeTo("slow", 0.5);
	$("#" + memory_tile_ids[1]).fadeTo("slow", 1.0);


  // Clear both arrays
  memory_values = [];
  memory_tile_ids = [];
}

function memoryFlipTile(tile, value) {
	jogadas += 1;
	document.getElementById('quantidadeJogadas').innerHTML = 'Jogadas: ' + jogadas;
	if (canFlipCard(tile)) {
		flipCard(tile, value);

    if (areNoCardsFlipped()) {
			setCardAsFlipped(tile, value);
		} else if(isOneCardFlipped()) {
      setCardAsFlipped(tile, value);
      if(isThereIsAMatch()) {
        matchCards();
        if (isGameOver()) {
          gameIsOver();
        }
      } else {
  			cardsDoNotMatch();
      }
    }
  }
}

function memoryFlipTile2(tile, value) {
  if (canFlipCard(tile)) {
    console.log('e1');
    flipCard(tile, value);
    setCardAsFlipped(tile, value);
    if (isOneCardFlipped()) {
      console.log('e2');
      if (isThereIsAMatch()) {
        console.log('e3');
        matchCards();
        if (isGameOver()) {
          console.log('e4');
          gameIsOver();
        }
      } else {
        cardsDoNotMatch();
      }
    }
  }
}
