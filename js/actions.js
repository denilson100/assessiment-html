
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
// }

var memory_array = ['1','1','2','2','3','3','4','4','5','5','6','6','7','7','8','8'];
var memory_values = [];
var memory_tile_ids = [];
var tiles_flipped = 0;

function newBoard() {
	tiles_flipped = 0;
  memory_array = _.shuffle(memory_array);

  var output = '';
  _.forEach(memory_array, function(memory_array_value, index) {
    // output += '<div id="tile_'+ index +'" onclick="memoryFlipTile(this,\''+ memory_array_value +'\')"></div>';
		output += '<div id="tile_'+ index +'" onclick="memoryFlipTile(this,\''+ memory_array_value +'\')"><img src="img/img' + memory_array_value +'.png"></div>';
  });

	document.getElementById('memory_board').innerHTML = output;
}

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
  return tiles_flipped == memory_array.length;
}

function gameIsOver() {
  alert("Board cleared... generating new board");
  document.getElementById('memory_board').innerHTML = "";
  newBoard();
}

function cardsDoNotMatch() {
  setTimeout(flipCardBack, 700);
}

function flipCard(tile, value) {
  tile.style.background = '#FFF';
  tile.innerHTML = value;
}

function flipCardBack() {
  // Flip the 2 tiles back over
  var tile_1 = document.getElementById(memory_tile_ids[0]);
  var tile_2 = document.getElementById(memory_tile_ids[1]);
  tile_1.style.background = '#FF3399';
  tile_1.innerHTML = "";
  tile_2.style.background = '#FF3399';
  tile_2.innerHTML = "";

  // Clear both arrays
  memory_values = [];
  memory_tile_ids = [];
}

function memoryFlipTile(tile, value) {
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
