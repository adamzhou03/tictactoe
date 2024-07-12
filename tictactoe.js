
window.onload = function () {
    initialize();
    document.getElementById("message").innerHTML = "X's Turn";

    //send array of tiles to server
    let tiles = document.getElementsByClassName("tile");
    tiles = JSON.stringify(tiles);
    
    var req = new XMLHttpRequest();

    req.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            console.log(this.responseText);
        }
    }

    req.open("GET", "index.php?q=" + tiles, true);
    req.send();
    
}

function tile_request_handler(tiles){
    let tile = document.getElementById(tiles);
    var req = new XMLHttpRequest();

    req.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            if (this.responseText === "O's Turn"){
                document.getElementById("message").innerHTML = this.responseText;
                tile.innerHTML = "<i class='fa-solid fa-x' style='color: #ff0000'></i>";
            }
            else if (this.responseText === "X's Turn"){
                document.getElementById("message").innerHTML = this.responseText;
                tile.innerHTML = "<i class='fa-regular fa-circle' style='color: #0000FF'></i>";
            }
        }
    }

    req.open("GET", "index.php?q=" + tiles, true);
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
    tile_request_handler(id);
    checkGameState();
    // document.getElementById("message").innerHTML = fill[0];
    // tile.innerHTML = fill[1];

    // let tile = document.getElementById(id);
    // if (tile.set == 0) { //if tile is not already filled out, set box to player's symbol,
    //                          //mark box as checked, and change the turn variable to the other player
    //     if (turn == 0) {
    //         tile.innerHTML = "<i class='fa-solid fa-x' style='color: #ff0000'></i>";
    //         turn = 1;
    //         tile.set = 1;
    //         document.getElementById("message").innerHTML = "O's Turn";
    //     } else {
    //         tile.innerHTML = "<i class='fa-regular fa-circle' style='color: #0000FF'></i>";
    //         turn = 0;
    //         tile.set = 2;
    //         document.getElementById("message").innerHTML = "X's Turn";
    //     }
        
  

    // }

    
}

function checkGameState(){
    var req = new XMLHttpRequest();

    req.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            var winMsg = JSON.parse(this.responseText);
            document.getElementById("message").innerHTML = winMsg[0];
            let tiles = document.getElementsByClassName("tile");
            if (winMsg[0] == "X Wins!"){
                tiles[winMsg[1]].innerHTML = "<i class='fa-solid fa-x' style='color: #008000'></i>";
                tiles[winMsg[2]].innerHTML = "<i class='fa-solid fa-x' style='color: #008000'></i>";
                tiles[winMsg[3]].innerHTML = "<i class='fa-solid fa-x' style='color: #008000'></i>";
            }
            else if (winMsg[0] == "O Wins!"){
                tiles[winMsg[1]].innerHTML = "<i class='fa-regular fa-circle' style='color: #008000'></i>";
                tiles[winMsg[2]].innerHTML = "<i class='fa-regular fa-circle' style='color: #008000'></i>";
                tiles[winMsg[3]].innerHTML = "<i class='fa-regular fa-circle' style='color: #008000'></i>";
            }
        }
    }

    req.open("GET", "index.php?q=" + "", true);
    req.send();
    // let tiles = document.getElementsByClassName("tile");

//     for( let i = 0; i < winStates.length; i++){//if board matches a win state, declare X or O the winner
//         const [x,y,z] = winStates[i];
//         if (tiles[x].set == 1 && tiles[y].set == 1 && tiles[z].set == 1){
//             document.getElementById("message").innerHTML = "X Wins!";
//             tiles[x].innerHTML = "<i class='fa-solid fa-x' style='color: #008000'></i>";
//             tiles[y].innerHTML = "<i class='fa-solid fa-x' style='color: #008000'></i>";
//             tiles[z].innerHTML = "<i class='fa-solid fa-x' style='color: #008000'></i>";
//             for (let i = 0; i < tiles.length; i++) {
//                 tiles[i].set = 4;
//             }
//             return;
//         }
//         else if (tiles[x].set == 2 && tiles[y].set == 2 && tiles[z].set == 2){
//             document.getElementById("message").innerHTML = "O Wins!";
//             tiles[x].innerHTML = "<i class='fa-regular fa-circle' style='color: #008000'></i>";
//             tiles[y].innerHTML = "<i class='fa-regular fa-circle' style='color: #008000'></i>";
//             tiles[z].innerHTML = "<i class='fa-regular fa-circle' style='color: #008000'></i>";
//             for (let i = 0; i < tiles.length; i++) {
//                 tiles[i].set = 4;
//             }
//             return;
//         }
//         else{
//             checkTie();
//         }

//     }
}

// function checkTie(){
//     let tiles = document.getElementsByClassName("tile");

//     for (let i = 0; i < tiles.length; i++) {
//         if(tiles[i].set == 0){
//             return;
//         }
//     }
//     document.getElementById("message").innerHTML = "Tie";

// }

// function resetGame() { //iterate through all tiles and reset their contents, as well as their status
//     let tiles = document.getElementsByClassName("tile");
//     document.getElementById("message").innerHTML = "X's Turn";
//     turn = 0;

//     for (let i = 0; i < tiles.length; i++) {
//         tiles[i].innerHTML = '';
//         tiles[i].set = 0;
//     }
// }




