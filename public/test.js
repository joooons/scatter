
console.log('test.js at your service!');


// VARIABLES


// --fontEN :  'Boogaloo', cursive;
// --fontKR :  'Jua', sans-serif;

const font = {};
font.EN = "'Boogaloo', cursive";
font.KR = "'Jua', sans-serif";






// DOM objects ________________________________
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




showWall(wall1);

function showWall(elem) {
    let walls = document.getElementsByClassName('wall-block');
    for ( i=0 ; i<walls.length ; i++ ) { $(walls[i]).fadeOut(0); }
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

function flattenWordlistFrame() {
    wordlistFrame.style.flexFlow = 'row';
    wordlistBottom.style.marginLeft = '1vh';
}

function straightenWordlistFrame() {
    wordlistFrame.style.flexFlow = 'column';
    wordlistBottom.style.marginLeft = '0vh';
}