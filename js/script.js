let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let tailSize = 1;

let impar = 3;
let par = 2;

let appleBiteSound = document.getElementById("appleBiteSound");
let beatCaudaVorazSound = document.getElementById("beatCaudaVorazSound");
let vozCaudavorazSound = document.getElementById("vozCaudavorazSound");

let snake = [];
snake[0] = {
	x: 8 * box,
	y: 8 * box
}
let direction = "right";

let apple = {
	x: Math.floor(Math.random() * 15 + 1) * box,
	y: Math.floor(Math.random() * 15 + 1) * box
}

let orange = {
	x: Math.floor(Math.random() * 15 + 1) * box,
	y: Math.floor(Math.random() * 15 + 1) * box
}

let banana = {
	x: Math.floor(Math.random() * 15 + 1) * box,
	y: Math.floor(Math.random() * 15 + 1) * box
}

function backgroundCreate() {
	context.fillStyle = "lightgreen";
	context.fillRect(0, 0, 16 * box, 16 * box);
}

function createHead() {
	for (i = 0; i < snake.length; i++) {
		context.fillStyle = "green";
		context.fillRect(snake[i].x, snake[i].y, box, box);
	}
}

function drawApple() {
	context.fillStyle = "red";
	context.fillRect(apple.x, apple.y, box, box);
}

function drawOrange() {
	context.fillStyle = "orange";
	context.fillRect(orange.x, orange.y, box, box);
}

function drawBanana() {
	context.fillStyle = "yellow";
	context.fillRect(banana.x, banana.y, box, box);
}

document.addEventListener('keydown', update);

function update(event) {
	if (event.keyCode == 37 && direction != "right") direction = "left";
	if (event.keyCode == 38 && direction != "down") direction = "up";
	if (event.keyCode == 39 && direction != "left") direction = "right";
	if (event.keyCode == 40 && direction != "up") direction = "down";

	if (event.keyCode == 65 && direction != "right") direction = "left";
	if (event.keyCode == 87 && direction != "down") direction = "up";
	if (event.keyCode == 68 && direction != "left") direction = "right";
	if (event.keyCode == 83 && direction != "up") direction = "down";
}

function playBeatSound() {
	if (!beatCaudaVorazSound.playing) {
		beatCaudaVorazSound.volume = 0.2; // Ajustar o volume para ser mais baixo
		beatCaudaVorazSound.loop = true;
		beatCaudaVorazSound.play();
	}
}

function startGame() {
	playBeatSound();

	if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
	if (snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
	if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
	if (snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

	for (i = 1; i < snake.length; i++) {
		if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
			clearInterval(jogo);
			gameOver();
			return;
		}
	}

	for (i = 0; i < snake.length; i++) {
		if (tailSize <= 0) {
			clearInterval(jogo);
			gameOverOrange();
			return;
		}
	}

	backgroundCreate();
	createHead();
	drawApple();
	drawOrange();
	drawBanana();

	let snakeX = snake[0].x;
	let snakeY = snake[0].y;

	if (direction == "right") snakeX += box;
	if (direction == "left") snakeX -= box;
	if (direction == "up") snakeY -= box;
	if (direction == "down") snakeY += box;

	if (snakeX != apple.x || snakeY != apple.y) {
		snake.pop();
		if (snakeX != orange.x || snakeY != orange.y) {
			if (snakeX != banana.x || snakeY != banana.y) {
			} else {
				banana.x = Math.floor(Math.random() * 15 + 1) * box;
				banana.y = Math.floor(Math.random() * 15 + 1) * box;
				snake.push(8);
				tailSize++;
				snake.push(8);
				tailSize++;
				document.getElementById("tailSize").innerHTML = "Size: " + tailSize;
			}
		} else {
			orange.x = Math.floor(Math.random() * 15 + 1) * box;
			orange.y = Math.floor(Math.random() * 15 + 1) * box;
			snake.pop();
			tailSize--;
			document.getElementById("tailSize").innerHTML = "Size: " + tailSize;
			par = par - 1;
		}
	} else {
		appleBiteSound.play();
		apple.x = Math.floor(Math.random() * 15 + 1) * box;
		apple.y = Math.floor(Math.random() * 15 + 1) * box;
		tailSize++;
		document.getElementById("tailSize").innerHTML = "Size: " + tailSize;
	}

	if (tailSize == par) {
		banana.x = Math.floor(Math.random() * 15 + 1) * box;
		banana.y = Math.floor(Math.random() * 15 + 1) * box;
		par = par + 2;
		impar = impar + 2;
	}

	if (tailSize == impar) {
		orange.x = Math.floor(Math.random() * 15 + 1) * box;
		orange.y = Math.floor(Math.random() * 15 + 1) * box;
		impar = impar + 2;
	}

	let newHead = {
		x: snakeX,
		y: snakeY
	}

	snake.unshift(newHead);
}

function gameOver() {
    beatCaudaVorazSound.pause(); 
    vozCaudavorazSound.play();
    vozCaudavorazSound.onended = function () {
        alert('Você se mordeu e acabou morto com o próprio veneno X_X');
        beatCaudaVorazSound.play(); 
        location.reload(); // recarrega a página
    };
}

function gameOverOrange() {
    beatCaudaVorazSound.pause(); 
    vozCaudavorazSound.play();
    vozCaudavorazSound.onended = function () {
        alert('Laranjas fazem sua cobrinha ficar menor, você chegou no seu limite e morreu de desnutrição X_X');
        beatCaudaVorazSound.play(); 
        location.reload(); // recarrega a página
    };
}
document.getElementById('restart').addEventListener('click', function () {
	clearInterval(jogo);
	tailSize = 1; // Resetar o tamanho da cauda
	direction = "right"; // Resetar a direção
	snake = [{ x: 8 * box, y: 8 * box }]; // Resetar a posição da cobra
	apple = { x: Math.floor(Math.random() * 15 + 1) * box, y: Math.floor(Math.random() * 15 + 1) * box };
	orange = { x: Math.floor(Math.random() * 15 + 1) * box, y: Math.floor(Math.random() * 15 + 1) * box };
	banana = { x: Math.floor(Math.random() * 15 + 1) * box, y: Math.floor(Math.random() * 15 + 1) * box };
	document.getElementById("tailSize").innerHTML = "Size: " + tailSize;
	jogo = setInterval(startGame, 100);
	startGame();
});

let jogo = setInterval(startGame, 100);
