var turn = 0; //0 for x's, 1 for o's

window.onload = function () {
    initialize();
}



function initialize() {

    // Create game board

    

    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
            let tile = document.createElement("div");
            tile.id = x.toString() + "-" + y.toString();
            tile.xAxis = x.toString();
            tile.yAxis = y.toString();
            tile.classList = "tile";
            document.getElementById("board").appendChild(tile);
            tile.set = false;
            tile.addEventListener("click", function () {
                clickHandler(tile.id)
            })

            switch (x) {
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

            switch (y) {
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
    if (tile.set == false) {
        if (turn == 0) {
            tile.innerHTML = "<i class='fa-solid fa-x'></i>";
            turn = 1;
        } else {
            tile.innerHTML = "<i class='fa-regular fa-circle'></i>";
            turn = 0;
        }
        tile.set = true;
    }

}

function resetGame() {
    let tiles = document.getElementsByClassName("tile");

    for (let i = 0; i < tiles.length; i++) {
        tiles[i].innerHTML = '';
        tiles[i].set = false;
    }
}




