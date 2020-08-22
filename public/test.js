
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
const categoryColumn    = document.getElementById('category-column');
const categoryHeader    = document.getElementById('category-header');
const category          = document.getElementsByClassName('category');

const playerdataColumn  = document.getElementsByClassName('playerdata-column');
const playerName        = document.getElementsByClassName('player-name');
const playerdata        = document.getElementsByClassName('playerdata');

const wall4             = document.getElementById('wall-4');
const cardBox           = document.getElementById('card-box');
const card              = document.getElementsByClassName('card');




showElem(wall1);

function showElem(elem) { $(elem).fadeIn(500); }

function hideElem(elem) { $(elem).fadeOut(500); }

function showWall(elem) {
    let walls = document.getElementsByClassName('wall-block');
    for ( i=0 ; i<walls.length ; i++ ) { $(walls[i]).fadeOut(0); }
    $(elem).fadeIn(500);
}


function setFont(font) {
    for ( i=0 ; i<ans.length ; i++ ) { ans[i].style.fontFamily = font; }
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