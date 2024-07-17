window.onload = function () {
    initialize();
    document.getElementById("message").innerHTML = "X's Turn";
    var req = new XMLHttpRequest();
    req.open("GET", "gamelogic.php?q=" + "loaded", true); // set values for tiles after load.
    req.send();
}

function tile_request_handler(tiles) { // fill tile if empty, and change turn.
    let tile = document.getElementById(tiles);
    var req = new XMLHttpRequest();

    req.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) { // once request is processed, change turn.
            if (this.responseText === "O's Turn") {
                document.getElementById("message").innerHTML = this.responseText;
                tile.innerHTML = "<i class='fa-solid fa-x' style='color: #ff0000'></i>";
            }
            else if (this.responseText === "X's Turn") {
                document.getElementById("message").innerHTML = this.responseText;
                tile.innerHTML = "<i class='fa-regular fa-circle' style='color: #0000FF'></i>";
            }
            checkGameState(); // check for win or tie.
        }
    }

    req.open("GET", "gamelogic.php?q=" + tiles, true);
    req.send();
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
    tile_request_handler(id);
}

function checkGameState() { // checks for win or tie.
    var req = new XMLHttpRequest();

    req.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText == "tie") {
                document.getElementById("message").innerHTML = "Tie!";
            }
            else if (this.responseText != "") { // if not tie or no win, parse win message. Contains 
                // winner and winning marks.
                var winMsg = JSON.parse(this.responseText);
                document.getElementById("message").innerHTML = winMsg[0];
                let tiles = document.getElementsByClassName("tile");
                if (winMsg[0] == "X Wins!") { // make winning marks green.
                    tiles[winMsg[1]].innerHTML = "<i class='fa-solid fa-x' style='color: #008000'></i>";
                    tiles[winMsg[2]].innerHTML = "<i class='fa-solid fa-x' style='color: #008000'></i>";
                    tiles[winMsg[3]].innerHTML = "<i class='fa-solid fa-x' style='color: #008000'></i>";
                }
                else if (winMsg[0] == "O Wins!") { // make winning marks green.
                    tiles[winMsg[1]].innerHTML = "<i class='fa-regular fa-circle' style='color: #008000'></i>";
                    tiles[winMsg[2]].innerHTML = "<i class='fa-regular fa-circle' style='color: #008000'></i>";
                    tiles[winMsg[3]].innerHTML = "<i class='fa-regular fa-circle' style='color: #008000'></i>";
                }
            }

        }
    }

    req.open("GET", "gamelogic.php?q=" + "", true);
    req.send();

}

function resetGame() { // reset game.
    document.getElementById("message").innerHTML = "X's Turn";

    let tiles = document.getElementsByClassName("tile");
    for (let i = 0; i < tiles.length; i++) {
        tiles[i].innerHTML = "";
        tiles[i].set = 0;
    }

    var req = new XMLHttpRequest();
    req.open("GET", "gamelogic.php?q=" + "reset", true);
    req.send();
}



