<?php
session_start();
$_SESSION[ 'winstates' ] = [
    [ 0, 1, 2 ],
    [ 3, 4, 5 ],
    [ 6, 7, 8 ],
    [ 0, 3, 6 ],
    [ 1, 4, 7 ],
    [ 2, 5, 8 ],
    [ 0, 4, 8 ],
    [ 2, 4, 6 ]
];

$tileIds = [
    0 => '0-0',
    1 => '0-1',
    2 => '0-2',
    3 => '1-0',
    4 => '1-1',
    5 => '1-2',
    6 => '2-0',
    7 => '2-1',
    8 => '2-2'
];

if ( isset( $_REQUEST[ 'q' ] ) ) {
    $q = $_REQUEST[ 'q' ];

    if ( $q == 'loaded' ) {
        // initalize tiles and leaderboard on load.
        $_SESSION[ 'turn' ] = 0;
        $_SESSION[ 'tiles' ] = [
            array( 'xAxis' => 0, 'yAxis' => 0, 'set' => 0 ),
            array( 'xAxis' => 0, 'yAxis' => 1, 'set' => 0 ),
            array( 'xAxis' => 0, 'yAxis' => 2, 'set' => 0 ),
            array( 'xAxis' => 1, 'yAxis' => 0, 'set' => 0 ),
            array( 'xAxis' => 1, 'yAxis' => 1, 'set' => 0 ),
            array( 'xAxis' => 1, 'yAxis' => 2, 'set' => 0 ),
            array( 'xAxis' => 2, 'yAxis' => 0, 'set' => 0 ),
            array( 'xAxis' => 2, 'yAxis' => 1, 'set' => 0 ),
            array( 'xAxis' => 2, 'yAxis' => 2, 'set' => 0 )
        ];

        $_SESSION['leaderboard'] = [
            "Ties" => 0,
            "X Wins" => 0,
            "O Wins" => 0
        ];

    } else if ( strlen( $q ) === 0 ) {
        checkEndGame();

    } else if ( $q == 'reset' ) {
        resetGame();
    } else if ( $q == 'leaderboard') {
        getLeaderboard();
    } else {
        //gets tile id( 0 to 8 )
        for ( $x = 0; $x <= 8; $x++ ) {
            if ( $tileIds[ $x ] === $q ) {
                fillTile( $x );
            }
        }

    }
}

function fillTile( $id ) {
    //if tile is empty then fill tile with X or O

    $tile = $_SESSION[ 'tiles' ][ $id ];
    if ( $tile[ 'set' ] === 0 ) {
        if ( $_SESSION[ 'turn' ] === 0 ) {
            $_SESSION[ 'tiles' ][ $id ][ 'set' ] = 1;
            $_SESSION[ 'turn' ] = 1;
            echo "O's Turn";
            exit;
        } else if ( $_SESSION[ 'turn' ] === 1 ) {
            $_SESSION[ 'tiles' ][ $id ][ 'set' ] = 2;
            $_SESSION[ 'turn' ] = 0;
            echo "X's Turn";
            exit;
        }
    } else {
        echo '';
        exit;
    }

}

function checkEndGame() {
    if ( $_SESSION[ 'turn' ] < 2 ) {
        for ( $i = 0; $i < count( $_SESSION[ 'winstates' ] );
        // check if any winstates are filled by one kind of mark.
        $i++ ) {
            $win = $_SESSION[ 'winstates' ][ $i ];
            $x = $_SESSION[ 'tiles' ][ $win[ 0 ] ][ 'set' ];
            $y = $_SESSION[ 'tiles' ][ $win[ 1 ] ][ 'set' ];
            $z = $_SESSION[ 'tiles' ][ $win[ 2 ] ][ 'set' ];
            if ( $x == 1 && $y == 1 && $z == 1 ) {
                $response = [
                    'X Wins!',
                    $win[ 0 ],
                    $win[ 1 ],
                    $win[ 2 ]
                ];
                $_SESSION['leaderboard']["X Wins"] += 1;

                for ( $w = 0; $w < count( $_SESSION[ 'tiles' ] );
                $w++ ) {
                    $_SESSION[ 'tiles' ][ $w ][ 'set' ] = 4;
                }
                $_SESSION[ 'turn' ] = 0;
                echo json_encode( $response );
                $_SESSION[ 'turn' ] = 3;
                // make turn 3 so no more moves can be made.
                exit;
            } else if ( $x == 2 && $y == 2 && $z == 2 ) {
                $response = [
                    'O Wins!',
                    $win[ 0 ],
                    $win[ 1 ],
                    $win[ 2 ]
                ];
                $_SESSION['leaderboard']["O Wins"] += 1;
                for ( $w = 0; $w < count( $_SESSION[ 'tiles' ] );
                $w++ ) {
                    $_SESSION[ 'tiles' ][ $w ][ 'set' ] = 4;
                }
                $_SESSION[ 'turn' ] = 0;
                echo json_encode( $response );
                $_SESSION[ 'turn' ] = 3;
                // make turn 3 so no more moves can be made.
                exit;
            }

        }

        if (
            // if all tiles are set and no win, then there is a tie.
            $_SESSION[ 'tiles' ][ 0 ][ 'set' ] != 0 &&
            $_SESSION[ 'tiles' ][ 1 ][ 'set' ] != 0 &&
            $_SESSION[ 'tiles' ][ 2 ][ 'set' ] != 0 &&
            $_SESSION[ 'tiles' ][ 3 ][ 'set' ] != 0 &&
            $_SESSION[ 'tiles' ][ 4 ][ 'set' ] != 0 &&
            $_SESSION[ 'tiles' ][ 5 ][ 'set' ] != 0 &&
            $_SESSION[ 'tiles' ][ 6 ][ 'set' ] != 0 &&
            $_SESSION[ 'tiles' ][ 7 ][ 'set' ] != 0 &&
            $_SESSION[ 'tiles' ][ 8 ][ 'set' ]
        ) {
            echo 'tie';
            $_SESSION[ 'turn' ] = 3;
            $_SESSION['leaderboard']["Ties"] += 1;
            exit;
        } else {
            echo '';
        }
    }

}

function resetGame() { // reset game.
    for ( $w = 0; $w < count( $_SESSION[ 'tiles' ] );
    $w++ ) {
        $_SESSION[ 'tiles' ][ $w ][ 'set' ] = 0;
    }
    $_SESSION[ 'turn' ] = 0;
}

function getLeaderboard() {
    $response = json_encode($_SESSION['leaderboard']);
    echo $response;
}
?>
