import { tokenReference } from '@angular/compiler';
import { Component, HostListener, Input, OnInit } from '@angular/core';

// export enum KEY_CODE {
//   RIGHT_ARROW = 39,
//   LEFT_ARROW = 37
// }

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})


export class TestComponent implements OnInit {

  constructor() { }

  head!:string;
  tail!:string;
  score:number=0;
  xcord:number=0;
  ycord:number=0;
  foodx:number=12;
  foody:number=9;
  foodflag:number=0;
  food!:string;
  dir:number=0;
  gameOverFlag:number=0;


  snake = [
      {x: 4, y: 3},
      {x: 4, y: 4},
      {x: 4, y: 5},
      {x: 4, y: 6},
      {x: 4, y: 7}
    ]

  numb:number=1;
  num1:number=0;

  


  ngOnInit(): void {
    this.paintSnake();
    this.food=String((this.foodx)+','+(this.foody));
    let foodpixel=document.getElementById(this.food);
    foodpixel!.classList.add("snake");
    setInterval(()=> { this.paintSnake() }, 0.5 * 300);
  } 




  paintSnake(){
    for(var i =0; i<this.snake.length;i++){
      if((this.snake[this.snake.length-1].x+this.xcord)==this.snake[i].x&&(this.snake[this.snake.length-1].y+this.ycord)==this.snake[i].y&&this.score>1){
        console.log("gameeeeeeeeeeeeeeeeeeeeeeeeee");
        this.gameOverFlag=1;
        this.score=0;
      }
    }

    //snake hit wall
    if((this.snake[this.snake.length-1].x+this.xcord)>33||(this.snake[this.snake.length-1].x+this.xcord)<0||(this.snake[this.snake.length-1].y+this.ycord)>33||(this.snake[this.snake.length-1].y+this.ycord)<0)
    {
      console.log("game over!")
      this.score=0;
    }
    //snake bite snake
    else if(this.gameOverFlag){
      console.log("game over")
    }
    else{
      this.tail=String((this.snake[0].x)+','+(this.snake[0].y));
      this.head=String((this.snake[this.snake.length-1].x+this.xcord)+','+(this.snake[this.snake.length-1].y+this.ycord))
      if(this.ycord==-1)
        this.dir=2;
      else if(this.ycord==1)
        this.dir=1;
      else if(this.xcord==-1)
        this.dir=3;
      else if(this.xcord==1)
        this.dir=4;
      if(this.head==this.food)
      {
        this.foodpaint();
        this.score++;
        console.log(this.score)
      }
      else{
        let tailpixel=document.getElementById(this.tail);
        tailpixel!.classList.remove("snake");
        this.snake.shift();
      }
      let headpixel=document.getElementById(this.head);
      headpixel!.classList.add("snake");
      
      this.snake.push({x:this.snake[this.snake.length-1].x+this.xcord,y:this.snake[this.snake.length-1].y+this.ycord})
    // for(var i =0; i<this.snake.length;i++){
      
    // }
    }
  }

  foodpaint(){
     this.foodx=this.getRandomInt();
     this.foody=this.getRandomInt();
     for(var i =0; i<this.snake.length;i++){
        if((this.foodx==this.snake[i].x) && (this.foody==this.snake[i].y)){
          this.foodpaint();
        }
     }
    this.food=String((this.foodx)+','+(this.foody));
    let foodpixel=document.getElementById(this.food);
    foodpixel!.classList.add("snake");
  }
  
  
    
//Keyboard navigations
@HostListener('window:keydown',['$event'])
onKeypressEvent(event: any){
  if(this.score>=1)
  event.preventDefault();
  console.log(event.target.value);

}
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {

    // console.log(event);
//down dir 4
    if (event.key === 'ArrowDown') {
      console.log("down");
      event.preventDefault();
      if(this.dir!=3)
      {
        this.xcord=1;
        this.ycord=0;
      }
      
    }
//up dir 3
    if (event.key === 'ArrowUp') {
       console.log("Up");
       event.preventDefault();
      if(this.dir!=4)
      {
        this.xcord=-1;
        this.ycord=0;
      }
      
    }
//right dir 1
    if (event.key === 'ArrowRight') {
     console.log("Right");
     event.preventDefault();
      if(this.dir!=2)
      {
        this.xcord=0;
        this.ycord=1;
      }
      
    }
//left dir 2
    if (event.key === 'ArrowLeft') {
     console.log("Left");
     event.preventDefault();
      if(this.dir!=1)
      {
        this.xcord=0;
        this.ycord=-1;
      }
    }
  }



//touch events and input
  defaultTouch = { x: 0, y: 0, time: 0 };

    @HostListener('touchstart', ['$event'])
    //@HostListener('touchmove', ['$event'])
    @HostListener('touchend', ['$event'])
    @HostListener('touchcancel', ['$event'])
    handleTouch(event:TouchEvent) {
        let touch = event.touches[0] || event.changedTouches[0];

        // check the events
        if (event.type === 'touchstart') {
            this.defaultTouch.x = touch.pageX;
            this.defaultTouch.y = touch.pageY;
            this.defaultTouch.time = event.timeStamp;
        } else if (event.type === 'touchend') {
            let deltaX = touch.pageX - this.defaultTouch.x;
            let deltaY = touch.pageY - this.defaultTouch.y;
            let deltaTime = event.timeStamp - this.defaultTouch.time;

            // simulte a swipe -> less than 500 ms and more than 60 px
            if (deltaTime < 500) {
                // touch movement lasted less than 500 ms
                if (Math.abs(deltaX) > 60) {
                    // delta x is at least 60 pixels
                    if (deltaX > 0) {
                        this.doSwipeRight(event);
                    } else {
                        this.doSwipeLeft(event);
                    }
                }

                if (Math.abs(deltaY) > 60) {
                    // delta y is at least 60 pixels
                    if (deltaY > 0) {
                        this.doSwipeDown(event);
                    } else {
                        this.doSwipeUp(event);
                    }
                }
            }
        }
    }

    doSwipeLeft(event:TouchEvent) {
        console.log('swipe left', event);
        if(this.dir!=1)
        {
          this.xcord=0;
          this.ycord=-1;
        }
    }

    doSwipeRight(event:TouchEvent) {
        console.log('swipe right', event);
        if(this.dir!=2)
        {
          this.xcord=0;
          this.ycord=1;
        }
    }

    doSwipeUp(event:TouchEvent) {
        console.log('swipe up', event);
        if(this.dir!=4)
        {
          this.xcord=-1;
          this.ycord=0;
        }
    }

    doSwipeDown(event:TouchEvent) {
        console.log('swipe down', event);
        if(this.dir!=3)
        {
          this.xcord=1;
          this.ycord=0;
        }
    }

//sleep/wait function
 sleep() {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < 100);
  }

   getRandomInt(max=33) {
  return Math.floor(Math.random() * max);
}
  
}
