
'use strict'

var ud= require('urban-dictionary');

//promise object returned by ud directory
ud.random().then((result) => {
    // console.log(result.word)
    // console.log(result.definition)
    // console.log(result.example)
    
    play(result.word,result.definition)
  
    
}).catch((error) => {
    console.error(error.message)
})


let play =function(result_word,result_definition){
    let stringToList= function(str){
        
        let list= str.split("")
        return list
    }
    
    
    let player = {
        name:'justin',
        lives: 10,
        guesses:[],
    }
    
    let game = {
        alphabets: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z'],
        word: {
            name:result_word.toLowerCase(),
            definition:result_definition,
            get wordLetters(){
                return stringToList(this.name)
            }
            
            
        }
    }
    
    game.correctList=[]
    for (var i=0; i<game.word.name.length; i++) {
        game.correctList.push( false);
    }
    //decided not to use a getter
    
    
    
    //set up drawing
    let drawing = document.getElementById("drawing");
    let context = drawing.getContext('2d');
    context.strokeStyle = "blue";
    context.lineWidth = 1;
    context.beginPath();
    
    
    let checkLetter= function(letter){
        
        
        
        if(game.word.wordLetters.includes(letter)){
            //if correct
            
            console.log(`Correct! ${letter} is inside ${game.word.name}`)
            
            //collect indexes in list
            let indexList=[]
            game.word.wordLetters.filter(
                function(currentValue,index){
                    if(currentValue==letter){
                        indexList.push(index)
                    }
                }
                )
                
                let blanks = document.getElementById('blanks');
                //insert 
                indexList.forEach(function(index){
                    game.correctList[index]=true; 
                    blanks.childNodes[index].innerHTML= letter;
                })
                
                if(game.correctList.every(function(currentValue){
                    return currentValue==true;
                })){
                    alert("You Win!")
                }
                
                
            }else{
                // if wrong
                
                console.log(`Wrong! ${letter} is not in ${game.word.name}`);
                player.lives--
                console.log(`You have ${player.lives} left`)
                draw();
                
                if(player.lives==0){
                    alert("Game Over!")
                }
            }
            
        }
        
        
        
        // create alphabet ul
        let showButtons = function () {
            let keyboard = document.getElementById('keyboard');
            let letters = document.createElement('ul');
            letters.id = 'letters';
            // console.log(letters);
            keyboard.appendChild(letters);
            for (let i = 0; i < game.alphabets.length; i++) {
                let letter = document.createElement('li');
                letter.id= 'letter'
                let buttonLetter= document.createElement('button')
                buttonLetter.setAttribute('id','buttonLetter');
                buttonLetter.innerHTML = game.alphabets[i];
                buttonLetter.addEventListener('click',function(id){
                    console.log(`you just clicked ${this.innerHTML}`)
                    checkLetter(this.innerHTML)
                    this.parentNode.removeChild(this);
                })
                letters.appendChild(letter);
                letter.appendChild(buttonLetter);
            }
        }
        
        let showBlanks = function(){
            let blanksFrame = document.getElementById('blanksFrame');
            let blanks = document.createElement('ul');
            blanks.setAttribute('id','blanks')
            blanksFrame.appendChild(blanks);
            for (let i=0; i<game.word.wordLetters.length; i++) {
                let blank = document.createElement('li');
                blank.setAttribute('id','blank')
                
                // if not alphabet then put special character
                if(!game.alphabets.includes(game.word.wordLetters[i])){

                    if(game.word.wordLetters[i]==" "){
                        blank.innerHTML = "&nbsp&nbsp&nbsp";
                    }else{
                        blank.innerHTML = game.word.wordLetters[i];

                    }
                    
                    // `${game.word.wordLetters[i]} `;
                }else{
                    blank.innerHTML = "__";
                }
                
                
                // blank.style.borderBottom = "1px solid black";
                blanks.appendChild(blank);
            }
            // console.log(blanksFrame);
            
            // blanks.style.display= "inline"
            
            
        }
        
        //show hint by clicking button
        let showHint= function(){
            let hint= document.getElementById('hint');
            hint.innerHTML = game.word.definition;
        }
        
        let showLives= function(){
            let lives= document.getElementById('lives');
            lives.innerHTML= `You have ${player.lives} left`;
        }
        
        
        
        //draw function
        let drawLine = function($pathFromx, $pathFromy, $pathTox, $pathToy) {
            
            context.moveTo($pathFromx, $pathFromy);
            context.lineTo($pathTox, $pathToy);
            context.stroke(); 
        }
        
        let draw =function(){
            
            switch(player.lives){
                case 9:
                
                drawLine(5, 130, 30, 130)
                
                break;
                
                case 8:
                drawLine(10, 20, 10, 130)
                
                
                break;
                
                case 7:
                drawLine(10, 20, 50, 20) 
                break; 
                
                case 6:
                drawLine(50,20,50,30)
                break; 
                
                case 5:
                
                //drawing head
                context.beginPath();
                context.arc(50, 40, 10, 0, Math.PI*2, true);
                context.stroke();
                break;
                
                case 4:
                
                drawLine(50,50,50,90)
                
                break;
                
                case 3:
                drawLine(50,90,30,110)
                break; 
                
                case 2:
                drawLine(50,90,70,110)
                break;
                
                case 1:
                drawLine(50,60,30,80)
                break;
                
                case 0:
                
                drawLine(50,60,70,80)
                break;
                
            }
            
            
        }
        
        
        
        //display ui
        showButtons();
        showBlanks();
        showHint();
        showLives();
        
        // draw();
        
        
        
        
        
        
        //testing below
        // checkAnswer("a")
        
        
        
        
    }
    
    