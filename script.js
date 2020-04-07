// button click
const startButton = document.querySelector('a')

let difficulty = 0
startButton.addEventListener('click', (e) => {
    // difficulty
    if (document.querySelector('#easy').checked) {
        difficulty = 1
    } else if (document.querySelector('#medium').checked) {
        difficulty = 2
    } else {
        difficulty = 3
    }

    let x = e.clientX - e.target.offsetLeft
    let y = e.clientY - e.target.offsetTop

    let ripples = document.createElement('span')
    ripples.style.left = x + 'px'
    ripples.style.top = y + 'px'
    startButton.appendChild(ripples)

    console.log(x)
    console.log(y)
    
    setTimeout(() => {
        ripples.remove()
    },1000)
})

// select canvas
const canvas = document.querySelector('#canvas')
const context = canvas.getContext('2d')

// create the user paddle
const user = {
    x : 0,
    y : canvas.clientHeight/2 - 100/2,
    width : 10,
    height : 100,
    color : 'WHITE',
    score : 0
}

// create the computer paddle
const com = {
    x : canvas.clientWidth - 10,
    y : canvas.clientHeight/2 - 100/2,
    width : 10,
    height : 100,
    color : 'WHITE',
    score : 0
}

// create the ball
const ball = {
    x : canvas.width / 2,
    y : canvas.height / 2,
    radius : 10,
    speed : 5,
    velocityX : 5,
    velocityY : 5,
    color : 'WHITE'
}

// draw rect function
function drawRect(x, y, w, h, color)
{
    context.fillStyle = color
    context.fillRect(x, y, w, h)
}

// create the net
const net = {
    x : canvas.width/2,
    y : 0,
    width : 2,
    height : 10,
    color : 'WHITE'
}

// draw net
function drawNet() {
    for (let i = 0; i < canvas.height; i+=15) {
        drawRect(net.x, net.y + i, net.width, net.height, net.color)
    }
}

drawRect(0, 0, canvas.clientWidth, canvas.clientHeight, 'BLACK')

// draw Cirlce
function drawCircle(x, y, r, color)
{
    context.fillStyle = color
    context.beginPath()
    context.arc(x, y, r, 0, Math.PI*2, false)
    context.closePath()
    context.fill()
}

// draw Text
function drawText(text, x, y, color)
{
    context.fillStyle = color
    context.font = '30px Arial'
    context.fillText(text, x, y)
}

// render

function render()
{
    // clear the canvas
    drawRect(0, 0, canvas.clientWidth, canvas.clientHeight, 'BLACK')

    // draw the net
    drawNet()

    // draw score
    drawText(user.score, canvas.width/4, canvas.height/5, 'WHITE')
    drawText(com.score, 3*canvas.width/4, canvas.height/5, 'WHITE')

    // draw user and com paddles
    drawRect(user.x, user.y, user.width, user.height, user.color)
    drawRect(com.x, com.y, com.width, com.height, com.color)

    // draw the ball
    drawCircle(ball.x, ball.y, ball.radius, ball.color)
}

// user control
canvas.addEventListener('mousemove', movePaddle)

function movePaddle(e)
{
    let rect = canvas.getBoundingClientRect()
    user.y = e.clientY - rect.top - user.height/2
}

// collision detection
function collision(b, p) {
    b.top = b.y - b.radius
    b.bottom = b.y + b.radius
    b.left = b.x - b.radius
    b.right = b.x + b.radius

    p.top = p.y
    p.bottom = p.y + p.height
    p.left = p.x
    p.right = p.x + p.width

    return b.right > p.left && b.bottom > p.top && b.left < p.right && b.top < p.bottom
}

// reset ball
function resetBall()
{
    ball.x = canvas.width/2
    ball.y = canvas.height/2

    ball.speed = 5
    ball.velocityX = -ball.velocityX
}

// update
function update() {
    ball.x += ball.velocityX
    ball.y += ball.velocityY

    // computer paddle
    let computerLevel = 0.1
    com.y += (ball.y - (com.y + com.height/2)) * computerLevel

    if(ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0)
    {
        ball.velocityY = -ball.velocityY
    }

    let player = (ball.x < canvas.width/2) ? user : com
    if(collision(ball,player)) {
        // where the ball hit the player
        let collidePoint = ball.y - (player.y + player.height/2)

        collidePoint = collidePoint/(player.height/2)

        let radianAngle = collidePoint * Math.PI/4

        // return ball from computer paddle
        let direction = (ball.x < canvas.width/2) ? 1 : -1

        ball.velocityX = direction * ball.speed * Math.cos(radianAngle)
        ball.velocityY = ball.speed * Math.sin(radianAngle)

        if (difficulty == 1) {
            ball.speed += 0.1
        } else if (difficulty == 2) {
            ball.speed += 0.5
        } else {
            ball.speed += 1.2
        }
    }

    // update the score
    if(ball.x - ball.radius < 0)
    {
        // means com scores
        com.score++
        resetBall()
    }
    else if(ball.x + ball.radius > canvas.width)
    {
        // means the user scored
        user.score++
        resetBall()
    }
}

// game init
function game() {
    update()
    render()
}

const hud = document.querySelector('.hud')
startButton.addEventListener('click', () => {
    // loop
    const framePerSecond = 50
    setInterval(game, 1000/framePerSecond)
    hud.remove()
})