<?php include 'gamelogic.php' ?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="styles.css">
  <script src="tictactoe.js"></script>
  <script src="https://kit.fontawesome.com/6196ed5ba2.js" crossorigin="anonymous"></script>
</head>

  <body>
    <h1>
      Tic Tac Toe
    </h1>
    <div id="board">

    </div>
    <h2>
      <span id="message"></span>
    </h2>
    <button onclick="resetGame()">
      Reset
    </button>
  </body>


</html>