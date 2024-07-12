<?php
session_start();

$_SESSION["winstates"] = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

$tileIds = [
    0 => "0-0",
    1 => "0-1",
    2 => "0-2",
    3 => "1-0",
    4 => "1-1",
    5 => "1-2",
    6 => "2-0",
    7 => "2-1",
    8 => "2-2"
];

$q = $_REQUEST["q"];

if(strlen($q) > 3){//if initializing set of tiles then save empty states
    $_SESSION["tiles"] = json_decode($q, true);
    $_SESSION["turn"] = 0;
    echo "working";
}

else if(strlen($q) === 0){
    checkWin();
}

else{//gets tile id(0 to 8)
    for ($x = 0; $x <= 8; $x++){
        if ($tileIds[$x] === $q){
            fillTile($x);
        }
    } 
}

function fillTile($id){//if tile is empty then fill tile with X or O
    $tile = $_SESSION["tiles"][$id];
    if ($tile["set"] === 0) {

        if ($_SESSION["turn"] === 0){
            $_SESSION["tiles"][$id]["set"] = 1;
            $_SESSION["turn"] = 1;
            echo "O's Turn";
        } 
        else if ($_SESSION["turn"] === 1) {
            $_SESSION["tiles"][$id]["set"] = 2;
            $_SESSION["turn"] = 0;
            echo "X's Turn";
        }
    }
}

function checkWin(){
    for($i = 0; $i < count($_SESSION["winstates"]); $i++){
        $win = $_SESSION["winstates"][$i];
        $x = $_SESSION["tiles"][$win[0]]["set"];
        $y = $_SESSION["tiles"][$win[1]]["set"];
        $z = $_SESSION["tiles"][$win[2]]["set"];
        if ($x == 1 && $y == 1 && $z == 1){
            $response = [
                "X Wins!",
                $win[0],
                $win[1],
                $win[2]
            ];
            for ($w = 0; $w < count($_SESSION["tiles"]); $w++){
                $_SESSION["tiles"][$w]["set"] = 4;
            }
            $_SESSION["turn"] = 0;
            echo json_encode($response);
        }
        else if ($x == 2 && $y == 2 && $z == 2){
            $response = [
                "O Wins!",
                $win[0],
                $win[1],
                $win[2]
            ];
            for ($w = 0; $w < count($_SESSION["tiles"]); $w++){
                $_SESSION["tiles"][$w]["set"] = 4;
            }
            $_SESSION["turn"] = 0;
            echo json_encode($response);
        }
        
    }
}


?>
