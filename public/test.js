
console.log('test.js at your service!');






//  MM      MM    MMMM    MMMMMM    MMMMMM    MMMM    MMMMMM    MM      MMMMMMMM    MMMM    
//  MM      MM  MM    MM  MM    MM    MM    MM    MM  MM    MM  MM      MM        MM    MM  
//  MM      MM  MMMMMMMM  MMMMMM      MM    MMMMMMMM  MMMMMM    MM      MMMMMMMM    MM      
//  MM      MM  MM    MM  MM    MM    MM    MM    MM  MM    MM  MM      MM            MM    
//    MM  MM    MM    MM  MM    MM    MM    MM    MM  MM    MM  MM      MM        MM    MM  
//      MM      MM    MM  MM    MM  MMMMMM  MM    MM  MMMMMM    MMMMMM  MMMMMMMM    MMMM    

const font = {};
font.EN = "'Boogaloo', cursive";
font.KR = "'Jua', sans-serif";






//  MMMMMM      MMMM    MM      MM          MMMM    MMMMMM    MMMMMM  MMMMMMMM    MMMM    MMMMMM    MMMM    
//  MM    MM  MM    MM  MMMM  MMMM        MM    MM  MM    MM      MM  MM        MM    MM    MM    MM    MM  
//  MM    MM  MM    MM  MM  MM  MM        MM    MM  MMMMMM        MM  MMMMMMMM  MM          MM      MM      
//  MM    MM  MM    MM  MM      MM        MM    MM  MM    MM      MM  MM        MM          MM        MM    
//  MM    MM  MM    MM  MM      MM        MM    MM  MM    MM      MM  MM        MM    MM    MM    MM    MM  
//  MMMMMM      MMMM    MM      MM          MMMM    MMMMMM    MMMM    MMMMMMMM    MMMM      MM      MMMM    

const wall1             = document.getElementById('wall-1');
const container         = document.getElementById('container');

const titleBox          = document.getElementById('title-box');
const title             = document.getElementById('title');
const titleConfig       = document.getElementById('title-config');

const wordlistBox       = document.getElementById('wordlist-box');
const wordlistHeader    = document.getElementById('wordlist-header');
const wordlistFrame     = document.getElementById('wordlist-frame');
const wordlistTop       = document.getElementById('wordlist-top');
const wordlistBottom    = document.getElementById('wordlist-bottom');
const Qnum              = document.getElementsByClassName('Qnum');
const ans               = document.getElementsByClassName('ans');

const diceBox           = document.getElementById('dice-box');
const dice              = document.getElementById('dice');

const timerBox          = document.getElementById('timer-box');
const timer             = document.getElementById('timer');

const resultsBox        = document.getElementById('results-box');
const results           = document.getElementById('results');

const wall2             = document.getElementById('wall-2');
const nameBox           = document.getElementById('name-box');
const nameLabel         = document.getElementById('name-label');
const name              = document.getElementById('name');

const wall3             = document.getElementById('wall-3');
const dataBox           = document.getElementById('data-box');
const dataRowScroll     = document.getElementById('data-row-scroll');
const dataRowFrame      = document.getElementById('data-row-frame');
const categoryData      = document.getElementById('category-data');
const categoryHeader    = document.getElementById('category-header');
const category          = document.getElementsByClassName('category');

const playerdata        = document.getElementsByClassName('playerdata');
const playerName        = document.getElementsByClassName('player-name');
const playerAns         = document.getElementsByClassName('player-ans');

const wall4             = document.getElementById('wall-4');
const cardBox           = document.getElementById('card-box');
const card              = document.getElementsByClassName('card');













//  MMMMMM  MM    MM  MMMMMM  MMMMMM  MMMMMM    MMMM    MM      MMMMMM  MMMMMMMMMM  MMMMMMMM  
//    MM    MMMM  MM    MM      MM      MM    MM    MM  MM        MM          MM    MM        
//    MM    MM  MMMM    MM      MM      MM    MMMMMMMM  MM        MM        MM      MMMMMMMM  
//    MM    MM    MM    MM      MM      MM    MM    MM  MM        MM      MM        MM        
//    MM    MM    MM    MM      MM      MM    MM    MM  MM        MM    MM          MM        
//  MMMMMM  MM    MM  MMMMMM    MM    MMMMMM  MM    MM  MMMMMM  MMMMMM  MMMMMMMMMM  MMMMMMMM  

showWall(wall2);
useThisUnit('vh');
resize();



















//  MMMMMMMM  MM      MM        MM      MMMMMM    MMMM    MMMMMM  MMMMMMMM  MM    MM  MMMMMMMM  MMMMMM    
//  MM        MM      MM        MM        MM    MM    MM    MM    MM        MMMM  MM  MM        MM    MM  
//  MMMMMMMM  MM      MM        MM        MM      MM        MM    MMMMMMMM  MM  MMMM  MMMMMMMM  MMMMMM    
//  MM        MM      MM        MM        MM        MM      MM    MM        MM    MM  MM        MM    MM  
//  MM          MM  MM          MM        MM    MM    MM    MM    MM        MM    MM  MM        MM    MM  
//  MMMMMMMM      MM            MMMMMM  MMMMMM    MMMM      MM    MMMMMMMM  MM    MM  MMMMMMMM  MM    MM  

window.onresize = () => { resize(); }

document.addEventListener('keydown', ev => {
    if (ev.keyCode == 38) {
        console.log('up');
        makeWordlistStraight();
        useThisUnit('vw');
    }
    if (ev.keyCode == 37) {
        console.log('left');
        makeWordlistFlat();
        useThisUnit('vh');
    }
    if (ev.keyCode == 40) {
        console.log('down');
        makeWordlistFlat();
        useThisUnit('mid');
    }
});














//  MMMMMMMM  MM    MM  MM    MM    MMMM    MMMMMM  MMMMMM    MMMM    MM    MM    MMMM    
//  MM        MM    MM  MMMM  MM  MM    MM    MM      MM    MM    MM  MMMM  MM  MM    MM  
//  MMMMMMMM  MM    MM  MM  MMMM  MM          MM      MM    MM    MM  MM  MMMM    MM      
//  MM        MM    MM  MM    MM  MM          MM      MM    MM    MM  MM    MM      MM    
//  MM        MM    MM  MM    MM  MM    MM    MM      MM    MM    MM  MM    MM  MM    MM  
//  MM          MMMM    MM    MM    MMMM      MM    MMMMMM    MMMM    MM    MM    MMMM    

function showWall(elem) {
    let walls = document.getElementsByClassName('wall-block');
    for ( i=0 ; i<walls.length ; i++ ) { $(walls[i]).fadeOut(0); }
    resize();
    $(elem).fadeIn(500);
}

function setFont(font) {
    // Either enter font.EN or font.KR
    // Only the relevant elements will be modified to have this font.
    for ( i=0 ; i<ans.length ; i++ ) { 
        ans[i].style.fontFamily = font; 
        category[i].style.fontFamily = font;
        playerAns[i].style.fontFamily = font;
    }
    dice.style.fontFamily = font;
    
}







function resize() {
    let ratio = Number.parseFloat(window.innerHeight / window.innerWidth).toPrecision(3);
    
    if ( ratio < 0.5 ) {
        // console.log('left');
        makeWordlistFlat();
        useThisUnit('vh');
        console.log(ratio, 'vh');
    } else if ( ratio > 1.34 ) {
        // console.log('up');
        makeWordlistStraight();
        useThisUnit('vw');
        console.log(ratio, 'vw');
    } else {
        // console.log('down');
        makeWordlistFlat();
        useThisUnit('mid');
        console.log(ratio, 'mid');
    }
}




function useThisUnit(text) {
    let arr = ['vh','vw','mid'];
    if (!arr.includes(text)) return;

    function removeAdd(elem) {
        arr.forEach( unit => {
            elem.classList.remove(unit);
        });;
        elem.classList.add(text);
    }

    for ( i=0 ; i<12 ; i++ ) { 
        removeAdd(ans[i]);
        removeAdd(Qnum[i]);
    }

    removeAdd(container);
    removeAdd(titleBox);
    removeAdd(title);
    removeAdd(titleConfig);
    removeAdd(diceBox);
    removeAdd(dice);
    removeAdd(timerBox);
    removeAdd(timer);
    removeAdd(resultsBox);
    removeAdd(results);
    removeAdd(wordlistBox);
    removeAdd(wordlistHeader);

}




function makeWordlistFlat() {
    wordlistFrame.style.flexFlow = 'row';
    wordlistBottom.style.marginLeft = '2vh';
}

function makeWordlistStraight() {
    wordlistFrame.style.flexFlow = 'column';
    wordlistBottom.style.marginLeft = '0vw';
}
