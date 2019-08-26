
'use strict'

const ud= require('./urban-dictionary');

function getWord() {  
    return ud.random().then(function(result){
        
        let definitionParsed= result.definition.toLowerCase();
        let wordListParsed= result.word.toLowerCase().split(' ');

        let truthValue= true;
        wordListParsed.forEach(function(wordParsed){
            
            if(definitionParsed.includes(wordParsed)){
                truthValue=false;
            }
            
        })
        if(!truthValue) {
            console.log('word is in definition. getting a new word')
            return getWord();
        }else{
            // note here that it seems that you are passing unparsed result.word and result.definition
            console.log(result.word)
            play(result.word,result.definition )
        }
    }).catch((error) => {
        console.error(error.message)
    })
}


getWord()


let play =function(result_word,result_definition){
    
    //INITIALISE OBJECTS
    
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
    
    // keep track of true and false guessed
    game.correctList=[]
    for (var i=0; i<game.word.name.length; i++) {
        game.correctList.push( false);
    }
    
    
    //set up drawing
    let drawing = document.getElementById("drawing");
    let context = drawing.getContext('2d');
    context.strokeStyle = "blue";
    context.lineWidth = 1;
    context.beginPath();
    
    //HELPER FUNCTIONS
    
    //method to change a string into list (accounting for spaces)
    let stringToList= function(str){
        
        let list= str.split("")
        return list
    }
    
    //draw function
    let drawLine = function($pathFromx, $pathFromy, $pathTox, $pathToy) {
        
        context.moveTo($pathFromx, $pathFromy);
        context.lineTo($pathTox, $pathToy);
        context.stroke(); 
    }
    
    //MAIN METHODS
    
    
    //check whether guessed letter is correct and enter into blanks
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
                indexList.forEach(function(index){
                    game.correctList[index]=true; 
                    blanks.childNodes[index].innerHTML= letter;
                })
                
                if(game.correctList.every(function(currentValue){
                    return currentValue==true;
                })){
                    
                    // if you win, then reload the page
                    if (confirm("Congratulations you have won. Do you want to play again?")) {
                        location.reload();
                    } 
                    // document.getElementById("demo").innerHTML = txt;
                    // alert("You Win!")
                }

                return true;
                
                
            }else{
                
                // if wrong
                console.log(`Wrong! ${letter} is not in ${game.word.name}`);
                player.lives--
                console.log(`You have ${player.lives} lives left`)
                showLives();
                draw();
                
                if(player.lives==0){
                    alert(`Game Over! The correct answer was ${game.word.name}`)
                }

                return false;
            }
            
        }
        
        // create buttons
        let showButtons = function () {
            let keyboard = document.getElementById('keyboard');
            let letters = document.createElement('ul');
            letters.id = 'letters';
            keyboard.appendChild(letters);
            for (let i = 0; i < game.alphabets.length; i++) {
                let letter = document.createElement('li');
                letter.id= 'letter'
                let buttonLetter= document.createElement('button')
                buttonLetter.setAttribute('id','buttonLetter');
                buttonLetter.innerHTML = game.alphabets[i];
                buttonLetter.addEventListener('click',function(id){
                    console.log(`you just clicked ${this.innerHTML}`)
                    if(checkLetter(this.innerHTML)){
                        this.style.backgroundColor="#33cc00"
                        this.disabled=true
                    }else{
                        this.style.backgroundColor="red";
                        this.disabled=true;
                    }
            
                   
                })
                letters.appendChild(letter);
                letter.appendChild(buttonLetter);
            }
        }
        
        // display all blanks 
        // expose spaces and special characters
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
                    // make filled blank with space or special character correct
                    game.correctList[i]=true;
                    
                }else{
                    blank.innerHTML = "__";
                }
                
                
                blanks.appendChild(blank);
            }
            
            
            
        }
        
        //show hint (do not need to click button)
        let showHint= function(){
            let hint= document.getElementById('hint');
            hint.innerHTML = game.word.definition;
        }
        
        // show lives based on player object
        let showLives= function(){
            let lives= document.getElementById('lives');
            
            lives.innerHTML= `You have ${player.lives} lives left`;
        }
        
        // add limb to player based on player.lives
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
        
        
        //RUN MAIN METHODS
        showButtons();
        showBlanks();
        showHint();
        showLives();
        
    }
   
    
module.exports={
    getWord
}
    

    
    