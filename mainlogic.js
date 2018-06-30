var canvas;
var context;
var winner;
var height=0;
var width=0;
var speed = 0;
var node = {
			x:0,
			y:0,
			l:15,
			w:15,
			color:'#6bf2f9',
			next:null
};
var head = null;
var tail = null;

var apple = {
			x:0,
			y:0,
			l:15,
			w:15,
			color:'#c9041e'
};
var button = {
    x:0,
    y:0,
    width:220,
    height:50	
};
var changeDirection = {x:0,y:0};
var direction = 1;
var snakeLenght = 0;
window.onload = start

var keyDownTime = 0;
var keyUpTime = 0;
var lock = {
		key:0,
		status:false
}
var pause = false;
var gameOver = false;


function start() // start function which is called as soon as the window is loaded used to initlize variables and calls the main function
{
	canvas = document.getElementById('game');
	context = canvas.getContext('2d');
	height = canvas.height;
	width = canvas.width;
	head = copyNode(node);
	snakeLenght +=1;
	rear = head;
	tempHead = copyNode(head);
	temp = head.next;
	addNode(head);
	findLength(head);
	apple.x = Math.floor(getRandomInt(10,width-10)/15)*15;
	apple.y = Math.floor(getRandomInt(10,height-10)/15)*15;
	button.x = height/2+10;
	button.y = height/2+25;
	// console.log('position of head-x:'+head.x+'y: '+head.y);
	// console.log('position of next node x'+head.next.x+'y: '+head.next.y);
	
	 	setInterval(main,1000/60);
	//setInterval(main,3000);	
}
function main() // main function where all the games mechanics work
{	

	document.addEventListener("keydown",controller);

	//document.addEventListener("keyup",keyUp);
	if(!gameOver)
	{
		drawRect(0,0,height,width,'#8497a8');
		//drawGrid();
		drawRect(apple.x,apple.y,apple.l,apple.w,apple.color); // DRAWING APPLE ON THE CANVAS
		temp = copyNode(head);
		temp.color = 'black'; // GIVING HE HEAD OF THE SNAKE COLOR BLACK
		while(temp !=null) // DRAWING THE BODY OF THE SNAKE
		{	
			drawNode(temp.x,temp.y,temp.l,temp.w,temp.color);
			temp = temp.next;
		}
		speed++;
		eatApple(); // COLLSISION DETECTION CODE
		if(speed%4==0){
			moveSnake(head);	
		}
	}
	else
	{
		endGame();
	}
}
function drawGrid()
{
	for(i=0;i<=width;i+=15) // DRAWING GRID
	{
		for(j=0;j<=height;j+=15)
		{
			drawNode(i,j,15,15,'#8497a8')
		}
	}
}
function copyNode(temp) // function to copy one node to another
{
	if(temp ==null)
		return null;
	returnNode = new Object();
	returnNode.x = temp.x;
	returnNode.y = temp.y;
	returnNode.color = temp.color;
	returnNode.l = temp.l;
	returnNode.w = temp.w;
	returnNode.next = temp.next;

	return returnNode;
}

function drawRect(x,y,h,w,color) // Function to draw rectangle
{
	context.beginPath();
	context.style = color;
	context.fillStyle = color;
	context.rect(x,y,w,h);
	context.fill();
	context.closePath();
}

function drawNode(x,y,h,w,color) // Function to draw the body of  the snake
{
	context.beginPath();
	context.style = color;
	context.fillStyle = color;
	context.rect(x,y,w,h);
	context.strokeStyle = 'black';
	context.lineWidth=1;
	context.fill();
	context.stroke();

	context.closePath();
}
function drawCircle(x,y,radius,color)
{
	context.beginPath();
	context.fillStyle = color;
	context.arc(x,y,radius,0,2*Math.PI);
	context.fill();
	context.closePath();
}
function moveSnake() // Incrementing the value of X and Y of the all the nodes present in the snake
{

	var tempHead = copyNode(head);
	if(direction ==1) // is tail is going right
	{
		head.x +=node.w;
	}
	if (direction ==2) // if tail is going left
	{	
		head.x -=node.w;
	}
	if (direction ==3) // if tail is going UP
	{
		head.y -=node.w;
	}
	if (direction ==4) // if tail is going DOWN
	{
		head.y +=node.w;
	}
	if(direction ==5)
	{
		head.x -= node.w;
		head.y -=node.w;
	}
	if(direction ==6)
	{
		head.x += node.w;
		head.y -= node.w;
	}
	temp = head.next;
	while(temp !=null) // SNAKE'S BODY FOLLOWING THE HEAD POSITION
	{	
		//console.log(temp);
		var previous = copyNode(temp);
		temp.x = tempHead.x
		temp.y = tempHead.y;
		tempHead = previous; 
		temp = temp.next;
		
	}
	if(head.x<0) // LEFT BOUNDARY CONDITION
	{
		head.x = width-node.l;
	}
	if(head.y+node.l >height) // BOTTOM BOUNDARY CONNDITION
	{
		head.y =0+node.l;
	}
	if(head.y<0) // TOP BOUNDARY CONDITION
	{
		head.y = height;
	}
	if(head.x + node.l> width) // RIGHT BOUNDAY CONDITION
	{
		head.x  =0-node.l;
	}
	temp = head.next;
	while(temp !=null)
	{
		var hX = head.x/15;
		var hY = head.y/15;
		var tY = temp.y/15;
		var tX = temp.x/15;
		if(hX==tX&&hY==tY)
		{
			gameOver = true;
			break;
		}
		temp = temp.next;
	}

}
function addNode(temp) // FUNCTIN TO ADD A NEW NODE INTO SNAKE'S BODY
{
	previous = null;
	while(temp !=null)
	{
		previous = temp;
		temp = temp.next;
	}
	tt = copyNode(previous);
	tt.x -=node.w;
	previous.next = tt;
}
function findLength(temp) // FUNCTION TO FIND THE LENGTH OF THE SNAKE
{
	counter = 0;
	while(temp !=null)
	{
		temp = temp.next;
		counter +=1;
	}
	console.log(counter);
}
function some(event)
{
	console.log('hello world');
}
// function keyDown(event)
// {
// 	if(lock.key ==0)
// 	{
// 	var key = event.keyCode;
// 	lock.key = key;
// 	lock.status = true;
// 	controller(event);
// 	}
// 	if(lock.key==event.keyCode)
// 	{
// 		controller(event);	
// 	}
// }
// function keyUp(event)
// {
// 	if(lock.key == event.keyCode)
// 		lock.key=0;
// 	//controller(event);
// }

function controller(event) // CONTROLLER FUNCTION
{

	//console.log(lock.status);
	// if(lock.key != event.keyCode)
	// 	return 0;
	 var key = event.keyCode;

	console.log(key);

	switch(key)
	{
		case 38:
				if(direction !=4)
					direction = 3; // DOWN KEY PRESSED
				break;
		case 40: 
				if(direction !=3)
					direction  = 4; //UP KEY PRESSED
				break;
		case 37:
				if(direction !=1)
					direction = 2; // LEFT KEY PRESSED
				break;
		case 39:
				if(direction !=2)
						direction= 1; // RIGHT KEY PRESSED
				break;
		case 103:
				direction = 5; // 	LEFT TOP DIAGNAL
				break;
		case 105:
					if(direction !=7)
					direction =6; // RIGHT TOP DIAG
				break;
		case 97:
				direction = 7; // LEFT BOTTOM DIAG
				break;
		case 80:
				pause = !pause;
				console.log(pause);

	}
}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function eatApple()
{
	var aX = apple.x/15;
	var aY = apple.y/15;
	var hX = head.x/15;
	var hY = head.y/15;
	if(aX == hX && aY ==hY)
	{
	
		apple.x = Math.floor(getRandomInt(10,width-10)/15)*15;
		apple.y = Math.floor(getRandomInt(10,height-10)/15)*15;
		addNode(head);
		winner +=1;
	}
}
function endGame()
{
	drawRect(0,0,height,width,'#000000');
	context.font = "30px Comic Sans MS";
	context.textAlign = "center";
	context.fillStyle = "white";
	context.fillText("Game Over",width/2,height/2);
	drawRect(button.x,button.y,button.height,button.width,'grey');
	context.font = "15px Comic Sans MS";
	context.textAlign = "center";
	context.fillStyle = "white";
	context.fillText("PRESS F5 to play again",(button.x+button.width/2),(button.y+button.height/2));
	canvas.addEventListener('click', function(evt) {
    var mousePos = getMousePos(canvas, evt);

    if (isInside(mousePos,button)) {
    	if(counter ==0)
        	gameOver=false;
        	start();
        	counter =1;
    }else{
        
    }   
}, false);

}


function getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

function isInside(pos, rect){
    return pos.x > rect.x && pos.x < rect.x+rect.width && pos.y < rect.y+rect.height && pos.y > rect.y
}