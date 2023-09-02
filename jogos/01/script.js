const player = document.getElementById('player');
const platform = document.querySelector('.platform');
let playerX = 0;
let playerY = 0;
let jumping = false;
let leftPressed = false;
let rightPressed = false;

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp' && !jumping) {
        jumping = true;
        jump();
    }
    if (event.key === 'ArrowLeft' && !leftPressed) {
        leftPressed = true;
        moveLeft();
    }
    if (event.key === 'ArrowRight' && !rightPressed) {
        rightPressed = true;
        moveRight();
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowLeft') {
        leftPressed = false;
    }
    if (event.key === 'ArrowRight') {
        rightPressed = false;
    }
});

function jump() {
    if (!jumping) {
        let jumpCount = 0;
        const jumpInterval = setInterval(() => {
            playerY += 5;
            player.style.bottom = playerY + 'px';
            jumpCount++;

            if (jumpCount === 20) {
                clearInterval(jumpInterval);
                fall();
            }
        }, 20);
    }
}

function fall() {
    const fallInterval = setInterval(() => {
        if (playerY > 0) {
            playerY -= 5;
            player.style.bottom = playerY + 'px';
        }

        if (playerY === 0) {
            clearInterval(fallInterval);
            jumping = false;
        }
    }, 20);
}

function moveLeft() {
    if (leftPressed) {
        const leftInterval = setInterval(() => {
            if (playerX > 0) {
                playerX -= 5;
                player.style.left = playerX + 'px';
            }

            if (playerX <= 0) {
                clearInterval(leftInterval);
            }
        }, 20);
    }
}

function moveRight() {
    if (rightPressed) {
        const rightInterval = setInterval(() => {
            if (playerX < window.innerWidth - player.offsetWidth) {
                playerX += 5;
                player.style.left = playerX + 'px';
            }

            if (playerX >= window.innerWidth - player.offsetWidth) {
                clearInterval(rightInterval);
            }
        }, 20);
    }
}

function checkCollision() {
    const playerRect = player.getBoundingClientRect();
    const platformRect = platform.getBoundingClientRect();

    if (
        playerRect.bottom >= platformRect.top &&
        playerRect.top <= platformRect.bottom &&
        playerRect.right >= platformRect.left &&
        playerRect.left <= platformRect.right
    ) {
        // Colisão detectada, implemente a ação desejada aqui
    }
}

// Chame a função de detecção de colisão regularmente (por exemplo, a cada quadro do jogo)
setInterval(checkCollision, 20);
