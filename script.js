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
    x : canvas.width - 1,
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

