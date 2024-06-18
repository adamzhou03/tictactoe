var turn = 0; //0 for x's, 1 for o's
const winStates = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

window.onload = function () {
    initialize();
    document.getElementById("message").innerHTML = "X's Turn";
}



function initialize() {

    // Create game board
    for (let x = 0; x < 3; x++) { //x axis
        for (let y = 0; y < 3; y++) {//y axis

            let tile = document.createElement("div");
            tile.id = x.toString() + "-" + y.toString();
            tile.xAxis = x.toString();
            tile.yAxis = y.toString();
            tile.classList = "tile";
            document.getElementById("board").appendChild(tile);
            tile.set = 0;
            tile.addEventListener("click", function () {
                clickHandler(tile.id)
            })

            switch (x) { //set borders based on x axis position
                case 0:
                    tile.style.borderBottom = "2px solid black"
                    break
                case 1:
                    tile.style.borderTop = "2px solid black"
                    tile.style.borderBottom = "2px solid black"
                    break
                case 2:
                    tile.style.borderTop = "2px solid black"
                    break
                default:
                    break
            }

            switch (y) { //set borders based on y axis position
                case 0:
                    tile.style.borderRight = "2px solid black"
                    break
                case 1:
                    tile.style.borderRight = "2px solid black"
                    tile.style.borderLeft = "2px solid black"
                    break
                case 2:
                    tile.style.borderLeft = "2px solid black"
                    break
                default:
                    break
            }

        }
    }

}

function clickHandler(id) { 
    let tile = document.getElementById(id);
    if (tile.set == 0) { //if tile is not already filled out, set box to player's symbol,
                             //mark box as checked, and change the turn variable to the other player
        if (turn == 0) {
            tile.innerHTML = "<i class='fa-solid fa-x' style='color: #ff0000'></i>";
            turn = 1;
            tile.set = 1;
            document.getElementById("message").innerHTML = "O's Turn";
        } else {
            tile.innerHTML = "<i class='fa-regular fa-circle' style='color: #0000FF'></i>";
            turn = 0;
            tile.set = 2;
            document.getElementById("message").innerHTML = "X's Turn";
        }
        
        checkGameState();

    }

    
}

function checkGameState(){
    let tiles = document.getElementsByClassName("tile");

    for( let i = 0; i < winStates.length; i++){//if board matches a win state, declare X or O the winner
        const [x,y,z] = winStates[i];
        if (tiles[x].set == 1 && tiles[y].set == 1 && tiles[z].set == 1){
            document.getElementById("message").innerHTML = "X Wins!";
            tiles[x].innerHTML = "<i class='fa-solid fa-x' style='color: #008000'></i>";
            tiles[y].innerHTML = "<i class='fa-solid fa-x' style='color: #008000'></i>";
            tiles[z].innerHTML = "<i class='fa-solid fa-x' style='color: #008000'></i>";
        }
        else if (tiles[x].set == 2 && tiles[y].set == 2 && tiles[z].set == 2){
            document.getElementById("message").innerHTML = "O Wins!";
            tiles[x].innerHTML = "<i class='fa-regular fa-circle' style='color: #008000'></i>";
            tiles[y].innerHTML = "<i class='fa-regular fa-circle' style='color: #008000'></i>";
            tiles[z].innerHTML = "<i class='fa-regular fa-cirlce' style='color: #008000'></i>";
        }

    }
}

function resetGame() { //iterate through all tiles and reset their contents, as well as their status
    let tiles = document.getElementsByClassName("tile");
    document.getElementById("message").innerHTML = "X's Turn";
    turn = 0;

    for (let i = 0; i < tiles.length; i++) {
        tiles[i].innerHTML = '';
        tiles[i].set = 0;
    }
}




