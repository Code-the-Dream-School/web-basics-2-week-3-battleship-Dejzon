const battleship = () => {

  let currentPlayer, otherPlayer;


  let shipNumber = 4;           //declare number of battlesip on field

  const player_1 = {
    name: prompt(`Enter player 1 name:`),         //create players
    shipCount: 0,
    gameBoard: [[0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]]
  };

  const player_2 = {
    name: prompt(`Enter player 2 name:`),
    shipCount: 0,
    gameBoard: [[0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]]
  };

 

  generateBattlefield = (player) => {           
    while (player.shipCount < shipNumber) {     //shipCount will start from 0
      let x = Math.floor(Math.random() * 4);
      let y = Math.floor(Math.random() * 4);

      while (player.gameBoard[x][y] === 1) {    //preventing two or more ships on same coordinates;
        x = Math.floor(Math.random() * 4);
        y = Math.floor(Math.random() * 4);
      }
      player.gameBoard[x][y] = 1;
      player.shipCount++;                       //shipCount increased

    }
  }

  generateBattlefield(player_1);            //generate fields for players
  generateBattlefield(player_2);


  coinFlip = () => {                        //decide who is going to play first
    if(Math.random() < 0.50) {
      currentPlayer = player_1;             
      otherPlayer = player_2;
  } 
    else {
      currentPlayer = player_2;             
      otherPlayer = player_1;
    }
  }

  coinFlip();

  switchPlayers = () => {                   //switch players
    if (currentPlayer === player_1) {
      currentPlayer = player_2;
      otherPlayer = player_1;
    } else {
      currentPlayer = player_1;
      otherPlayer = player_2
    }
  }


  while (currentPlayer.shipCount > 0) {           //while there are ships left of currentPlayer
    let xCoord = parseInt(prompt(`${currentPlayer.name}, please enter X Coordinate:`));     //pick coord.
    let yCoord = parseInt(prompt(`${currentPlayer.name}, please enter Y Coordinate:`));
    if (!isNaN(xCoord) && !isNaN(yCoord) && xCoord < 4 && yCoord < 4 && xCoord > -1 && yCoord >-1) {
      //coordinates must be numbers and must be between 0 and 3
      if (otherPlayer.gameBoard[xCoord][yCoord] === 1) {        //if hit:
        otherPlayer.shipCount--;                                //reduce number of ships
        otherPlayer.gameBoard[xCoord][yCoord] = 0;              //null that field
        if (otherPlayer.shipCount > 0) {                        //check how many ships are left
          alert(`${currentPlayer.name}, You Hit it! ${otherPlayer.name} got ${otherPlayer.shipCount} ships left!`)
        }
        else {          //if none break the loop and congrats!!!
          alert(`${currentPlayer.name}, You Did it! You sunk all ${otherPlayer.name}'s ships!!!`)
          break;
        }
        switchPlayers();        //switch player after try 
      } else {
        alert(`Miss, better luck next time!`)
        switchPlayers();
      }
    }
    else {
      alert(`Input value must be number and must be between 0 and 3! Please try again!`)
      //input field condition....
    }

  }

  return `The Winner is ${currentPlayer.name}! CONGRATS!!!!?`
}


const gameResult = battleship();

const htmlTarget = document.getElementById('result')
htmlTarget.innerHTML = gameResult
