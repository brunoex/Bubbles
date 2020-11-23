var img = new Image();
img.src = "img/bubble.png";
	
img.onload = function(){	
	var allBubbles = {};
	var bubbleIndex = 0;		
	var canvasElement = document.getElementById('canvas').getContext('2d');
	var cursorPosition = [];
	
	function getMousePosition(e){
		var posx = e.clientX  - document.getElementById('canvas').offsetLeft;
		var posy = e.clientY  - document.getElementById('canvas').offsetTop;
		cursorPosition = [posx,posy];
	};
	
	var bubble = {
		w		: img.width / 4,
		h		: img.height / 4,
		x		: 0,
		y		: 0,
		id		: 0,
		index	: 0,
		speed	: 5,
		posx	: [],
		posy	: [],
		xx		: 0,
		yy		: 0,

		make	:(function(mouseWasPressed){
			this.speed = Math.ceil(Math.random()*4);

			if (mouseWasPressed === false) {
				this.x = cursorPosition[0] - this.w/2 ; // Mouse postion adjusted
				this.y = cursorPosition[1]  - this.h/2;
			} else {
				this.x = 500;
				this.y = 800
			}
			
			this.id = bubbleIndex;
			
			this.posx = [];
			this.posy = [];
			// cut the sprite
			for (var i = 0; i < (4*4); i++){
				if (i > 2 && i % 4 == 0){
					console.log(1);
					this.yy += this.h;
					this.xx = 0;
				}
					
			this.posx.push(this.xx);	
			this.posy.push(this.yy);	
			this.xx += this.w;	
			}
			
			allBubbles[bubbleIndex] = this;
			bubbleIndex ++;
			}),
			move	:(function(){
				canvasElement.drawImage(
					img,
					this.posx[this.index],
					this.posy[this.index],
					this.w,
					this.h,
					this.x,
					this.y,
					this.w,
					this.h
				 );
			
			this.y -= this.speed;

			if(this.y < 100){
				delete allBubbles[this.id];
			}
			
			this.index ++;
			if(this.index == this.posx.length){
				this.index = 0;
			}
			})					
		};

	function cloneFactory(){
		var clone = Object.create(bubble);
		clone.make(false);
	};
		
	function render(){
		canvasElement.clearRect(0,0,1000,800);
		for (var i in allBubbles){
			allBubbles[i].move();
		}
		requestAnimationFrame(render);
	};
		
	document.getElementById('canvas').addEventListener('mouseup',cloneFactory);
	document.getElementById('canvas').addEventListener('mousedown',getMousePosition);
	document.addEventListener('keydown',function(event){
		if (event.key === ' '){
			var clone = Object.create(bubble);
			clone.make(true);
		}
	});
	
	render();
}