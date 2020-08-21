


//  MMMMMMMM  MMMMMM            MMMM    MMMMMM    MMMMMM  
//  MM        MM    MM        MM    MM  MM    MM      MM  
//  MMMMMMMM  MMMMMM          MM    MM  MMMMMM        MM  
//  MM        MM    MM        MM    MM  MM    MM      MM  
//  MM        MM    MM        MM    MM  MM    MM      MM  
//  MM        MMMMMM            MMMM    MMMMMM    MMMM    

// FIREBASE objects ____________________________________
const db = firebase.firestore();
var diceID;
var timerID;
var wordlistID;
var gameID;
var playerID;









//  MMMMMMMM  MMMMMM            MMMM    MMMMMM    MMMMMM        MMMMMM  MM    MM  MMMMMM  MMMMMM  
//  MM        MM    MM        MM    MM  MM    MM      MM          MM    MMMM  MM    MM      MM    
//  MMMMMMMM  MMMMMM          MM    MM  MMMMMM        MM          MM    MM  MMMM    MM      MM    
//  MM        MM    MM        MM    MM  MM    MM      MM          MM    MM    MM    MM      MM    
//  MM        MM    MM        MM    MM  MM    MM      MM          MM    MM    MM    MM      MM    
//  MM        MMMMMM            MMMM    MMMMMM    MMMM          MMMMMM  MM    MM  MMMMMM    MM    

db.collection('dice').limit(1).get().then( snap => { diceID = snap.docs[0].id });
db.collection('timer').limit(1).get().then( snap => { timerID = snap.docs[0].id });
db.collection('wordlist').where('set', '==', 'index').limit(1).get().then( snap => { wordlistID = snap.docs[0].id });
db.collection('game').limit(1).get().then( snap => { gameID = snap.docs[0].id });











//  MM      MM  MMMMMMMM  MMMMMM    MMMMMM    MMMM          MMMMMM    MMMMMMMM    MMMM    MM        MMMM    MMMMMM      MMMM    MMMMMM  MMMMMM    MMMM    MM    MM    MMMM    
//  MMMM  MMMM  MM        MM    MM    MM    MM    MM        MM    MM  MM        MM    MM  MM      MM    MM  MM    MM  MM    MM    MM      MM    MM    MM  MMMM  MM  MM    MM  
//  MM  MM  MM  MMMMMMMM  MM    MM    MM    MMMMMMMM        MM    MM  MMMMMMMM  MM        MM      MMMMMMMM  MMMMMM    MMMMMMMM    MM      MM    MM    MM  MM  MMMM    MM      
//  MM      MM  MM        MM    MM    MM    MM    MM        MM    MM  MM        MM        MM      MM    MM  MM    MM  MM    MM    MM      MM    MM    MM  MM    MM      MM    
//  MM      MM  MM        MM    MM    MM    MM    MM        MM    MM  MM        MM    MM  MM      MM    MM  MM    MM  MM    MM    MM      MM    MM    MM  MM    MM  MM    MM  
//  MM      MM  MMMMMMMM  MMMMMM    MMMMMM  MM    MM        MMMMMM    MMMMMMMM    MMMM    MMMMMM  MM    MM  MM    MM  MM    MM    MM    MMMMMM    MMMM    MM    MM    MMMM    

// MEDIA declarations ____________________________________
const mediaSmall = window.matchMedia( "(max-width:500px)");
const mediaLarge = window.matchMedia( "(max-width:1020px)");
const soundFile = {
    file_1 : './sounds/confirmation_001.ogg',
    file_2 : './sounds/minimize_006.ogg',
    file_3 : './sounds/question_002.ogg',
    file_4 : './sounds/select_005.ogg',
    file_5 : './sounds/scroll_005.ogg',
    file_6 : './sounds/click_003.mp3',  };
const soundButtonClick = new defineSound(soundFile.file_6, 'auto', 'none');
const soundTimerEnd = new defineSound(soundFile.file_1, 'auto', 'none');
const font = {
    // EN : " 'Bubblegum Sans', cursive",
    // EN : " 'Luckiest Guy', cursive",
    // EN : " 'Noto Serif KR', serif",
    EN : " 'Boogaloo', cursive",
    // KR : " 'Noto Serif KR', serif"
    KR : " 'Jua', sans-serif" };
const colorSet = {
    redish : "#F35",
    greenish : "#4FA",
    whiteShade : "rgba(255,255,255,0.3)",
    blackShade : "rgb(0, 0, 0, 0.5)",
    blueGradient : "linear-gradient(-20deg, #6e45e2 0%, #88d3ce 100%)",
    yellowGradient : "linear-gradient(27deg, rgb(239, 190, 0), rgb(236, 221, 15))",
    redGradient : "linear-gradient(120deg, #f093fb 0%, #f5576c 100%)" }









//  MM      MM    MMMM    MMMMMM    MMMMMM    MMMM    MMMMMM    MM      MMMMMMMM    MMMM    
//  MM      MM  MM    MM  MM    MM    MM    MM    MM  MM    MM  MM      MM        MM    MM  
//  MM      MM  MMMMMMMM  MMMMMM      MM    MMMMMMMM  MMMMMM    MM      MMMMMMMM    MM      
//  MM      MM  MM    MM  MM    MM    MM    MM    MM  MM    MM  MM      MM            MM    
//    MM  MM    MM    MM  MM    MM    MM    MM    MM  MM    MM  MM      MM        MM    MM  
//      MM      MM    MM  MM    MM  MMMMMM  MM    MM  MMMMMM    MMMMMM  MMMMMMMM    MMMM    


// REGULAR VARIABLES __________________________________
var timeLimit = 180;
var nowTime = nowInSeconds();
var endTime = 0;
var wordListIndex = 0;
var stopLoop = false;
var isAuthorized = false;
var isClockTicking = false;
var letterList = {
    index : 'EN',
    EN : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    KR : 'ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎ'  }
var playerName = '';
var categories = [];
var playerRoster = [];
var resultMap = new Map();








//  MMMMMM      MMMM    MM      MM          MMMM    MMMMMM    MMMMMM  
//  MM    MM  MM    MM  MMMM  MMMM        MM    MM  MM    MM      MM  
//  MM    MM  MM    MM  MM  MM  MM        MM    MM  MMMMMM        MM  
//  MM    MM  MM    MM  MM      MM        MM    MM  MM    MM      MM  
//  MM    MM  MM    MM  MM      MM        MM    MM  MM    MM      MM  
//  MMMMMM      MMMM    MM      MM          MMMM    MMMMMM    MMMM    

// DOM objects ________________________________
const wall          = document.getElementById('wall');
const container     = document.getElementById('container');
const title         = document.getElementById('title');
const setting       = document.getElementById('setting');
const wordlist      = document.getElementById('wordlist');
const diceJacket    = document.getElementById('diceJacket');
const dice          = document.getElementById('dice');
const timer         = document.getElementById('timer');













//    MMMM      MMMM      MMMM            MMMM      MMMM    MM    MM    MMMM    MMMMMM    MMMM    MM    MM  MMMMMM    MMMM    
//  MM    MM  MM    MM  MM    MM        MM    MM  MM    MM  MMMM  MM  MM    MM    MM    MM    MM  MMMM  MM    MM    MM    MM  
//  MM          MM        MM            MM        MM    MM  MM  MMMM    MM        MM    MMMMMMMM  MM  MMMM    MM      MM      
//  MM            MM        MM          MM        MM    MM  MM    MM      MM      MM    MM    MM  MM    MM    MM        MM    
//  MM    MM  MM    MM  MM    MM        MM    MM  MM    MM  MM    MM  MM    MM    MM    MM    MM  MM    MM    MM    MM    MM  
//    MMMM      MMMM      MMMM            MMMM      MMMM    MM    MM    MMMM      MM    MM    MM  MM    MM    MM      MMMM    

// CSS constants ___________________________________________________________

const style = {
    body : {
        "background\-image" : colorSet.blueGradient,
        },
    wall : {
        "user\-select" : "none",
        "position" : "absolute",
        "top" : "0px",
        "bottom" : "0px",
        "left" : "0px",
        "right" : "0px",
        // "background\-image" : colorSet.blueGradient,
        "display" : "flex",
        "justify\-content" : "center",
        "align\-items" : "center",
        "font\-family" : font.EN },
    container : {
        "padding" : "2vh",
        "border\-radius" : "4vh",
        // "border\-radius" : `4vh`,
        "background\-color" : colorSet.whiteShade,
        "display" : "grid",
        "grid\-template\-columns" : "auto auto",
        "grid\-template\-rows" : "auto auto auto auto" },
    box : {
        "cursor" : "pointer",
        "position" : "relative",
        "margin" : "1vh",
        "padding" : "1vh",
        "border\-radius" : "2vh",
        "box\-shadow" : "1vh 1vh 3vh rgba(0,0,0,0.5)",
        "background" : colorSet.yellowGradient,
        "overflow\-x" : "hidden",
        "overflow\-y" : "hidden",
        "display" : "flex",
        "flex\-flow" : "column" },
    title : {
        "padding" : "2vh 5vh 2vh 5vh",
        "grid\-row" : "1/2",
        "grid\-column" : "1/3",
        "justify\-content" : "center",
        "align\-items" : "center",
        "font\-size" : "12vh",
        "font\-family" : font.EN },
    corner : {
        "position" : "absolute",
        "top" : "0px",
        "right" : "0px",
        "width" : "8vh",
        "height" : "7vh",
        "border\-radius" : "0vh 0vh 0vh 2vh",
        "background\-color" : colorSet.whiteShade,
        "text\-align" : "center",
        "font\-size" : "5.5vh",
        "color" : colorSet.blackShade },
    dice : {
        "grid\-row" : "2/3",
        "grid\-column" : "2/3",
        "justify\-content" : "center",
        "align\-items" : "center",
        "font\-size" : "12vh",
        "font\-family" : font.EN },
    timer : {
        "grid\-row" : "3/4",
        "grid\-column" : "2/3",
        "justify\-content" : "center",
        "align\-items" : "flex-start",
        "font\-size" : "8vh",
        "font\-family" : font.EN },
    wordlist : {
        "grid\-row" : "2/5",
        "grid\-column" : "1/2",
        "justify\-content" : "flex-start",
        "align\-items" : "flex-start",
        "font\-family" : font.EN },
    wordfirst : {
        "margin" : "2vh",
        "width" : "100%",
        "text\-align" : "center",
        "font\-size" : "6vh",
        "text\-decoration" : "underline" },
    wordframe : {
        "margin" : "2vh",
        "display" : "flex",
        "flex\-flow" : "row",
        "font\-size" : "6vh" },
    wordpack : {
        "margin" : "0vh 3vh 0vh 3vh" },

    span : {
        // "margin" : "0vh",
        "margin\-bottom" : "2vh",
        // "padding\-left" : "1em",
        "text\-indent" : "-1em"
        // "background" : "green"
        },

    input : {
        // "margin" : "0vh",
        "background" : "transparent",
        "font\-family" : font.EN,
        "font\-size" : "4vh",
        "color" : colorSet.blueGradient,
        "border" : "none"
        },

    popup : {
        "position" : "absolute",
        "left" : "0px",
        "right" : "0px",
        "top" : "0px",
        "bottom" : "0px",
        "padding" : "7vh",
        "display" : "flex",
        "flexFlow" : "row wrap",
        "justifyContent" : "center",
        "alignContent" : "center",
        "background" : colorSet.blackShade },
    
    nameprompt : {
        "position" : "absolute",
        "left" : "0px",
        "right" : "0px",
        "top" : "0px",
        "bottom" : "0px",
        "padding" : "0 20vw 0 20vw",
        "display" : "flex",
        "flexFlow" : "column",
        "justifyContent" : "center",
        "alignContent" : "center",
        "background" : colorSet.blackShade },

    wordcard : {
        "background" : colorSet.yellowGradient,
        "width" : "10vh",
        "height" : "15vh",
        "margin" : "1vh",
        "padding" : "1vh",
        "display" : "block",
        "borderRadius" : "1vh",
        "boxShadow" : "2px 4px 2px rgba(0,0,0,0.5)",
        "display" : "flex",
        "justifyContent" : "center",
        "fontSize" : "1em",
        "cursor" : "pointer" },
    cover : {
        "position" : "absolute",
        "left" : "0px",
        "right" : "0px",
        "top" : "0px",
        "bottom" : "0px",
        "padding" : "7vh",
        "display" : "flex",
        "flexFlow" : "row wrap",
        "justifyContent" : "center",
        "alignContent" : "center",
        "background" : colorSet.blueGradient },

    table : {
        "position" : "absolute",
        "left" : "0px",
        "right" : "0px",
        "top" : "0px",
        "bottom" : "0px",
        "padding" : "10vh",
        "display" : "grid",
        "grid\-template\-columns" : "auto auto auto auto",
        // "flexFlow" : "column",
        // "justifyContent" : "center",
        // "alignContent" : "center",
        "background" : "rgba(255, 255, 255, 0.9)"
    }

    }











//  MMMMMMMM  MM      MM  MMMMMMMM  MM    MM  MMMMMM        MM      MMMMMM    MMMM    MMMMMM  MMMMMMMM  MM    MM  MMMMMMMM  MMMMMM      MMMM    
//  MM        MM      MM  MM        MMMM  MM    MM          MM        MM    MM    MM    MM    MM        MMMM  MM  MM        MM    MM  MM    MM  
//  MMMMMMMM  MM      MM  MMMMMMMM  MM  MMMM    MM          MM        MM      MM        MM    MMMMMMMM  MM  MMMM  MMMMMMMM  MMMMMM      MM      
//  MM        MM      MM  MM        MM    MM    MM          MM        MM        MM      MM    MM        MM    MM  MM        MM    MM      MM    
//  MM          MM  MM    MM        MM    MM    MM          MM        MM    MM    MM    MM    MM        MM    MM  MM        MM    MM  MM    MM  
//  MMMMMMMM      MM      MMMMMMMM  MM    MM    MM          MMMMMM  MMMMMM    MMMM      MM    MMMMMMMM  MM    MM  MMMMMMMM  MM    MM    MMMM    

// EVENT LISTENERS _______________________________________________________

const listen = {
    list : new Array(14).fill(0),
    done : false,
    tick : function(x) {
        if (this.done) return;
        this.list[x] = 1;
        if (this.list.reduce( (t,n) => {return t+n} ) < this.list.length) return;
        adoptToScreen(Number.parseFloat(window.innerWidth / window.innerHeight).toPrecision(3));
        $('#cover').fadeOut(1000, () => {
            $('#cover').remove();
            addNamePrompt(container);
        });
        this.done = true;
    }
}

db.collection('dice').onSnapshot( snap => { 
    $(dice).html(snap.docs[0].data().letter); 
    addFlashLayer(dice, colorSet.greenish);
    listen.tick(12);
});

db.collection('timer').onSnapshot( snap => { 
    endTime = snap.docs[0].data().endTime;
    $(timer).text(secondsToStr(timeLimit));
    addFlashLayer(timer, colorSet.greenish);
    listen.tick(13);
});

db.collection('wordlist').onSnapshot( snap => { 
    db.collection('wordlist').where('set', '==', 'index').limit(1).get()
    .then( snap => { 
        categories = [];
        let num = snap.docs[0].data().number;
        let lang = snap.docs[0].data().language;
        letterList.index = lang;
        $(setting).html(letterList.index);
        $(dice).css('fontFamily', font[letterList.index]);
        $(wordlist).css('fontFamily', font[letterList.index]);
        db.collection('dice').doc(diceID).update({ letter : '?' });
        $(wordlist).children().eq(0).html(`Word List #${num}`);
        let set = `${letterList.index}${num}`;
        db.collection('wordlist').where( 'set', '==', set).get().then( snap => {
            addFlashLayer(wordlist, colorSet.greenish);
            snap.docs.forEach( (doc, i) => { 
                $(`#num-${i+1}`).html(`${i+1}. `); 
                $(`#input-${i+1}`).attr("placeholder", `${doc.data().phrase}`); 
                $(`#input-${i+1}`).val('');
                categories.push(doc.data().phrase);
                listen.tick(i);
            });
        });
    });
});

db.collection('game').onSnapshot( snap => {
    if (playerName == '') return;
    if (snap.docs[0].data().started) {
        console.log('detected that game started');
        console.log(playerName, ' is in the game.');
        db.collection('players').add({
            player : playerName,
            status : "ready"
        })
        .then( () => {
            console.log('document was added');
            db.collection('players').where('player', '==', playerName).get()
            .then( res => {
                playerID = res.docs[0].id;
                console.log(playerID);
            })
        });
    }
})

db.collection('players').onSnapshot( snap => {
    if (playerName == '') return;
    
    let allDone = 4;

    snap.docs.forEach( doc => {
        if (doc.data().status == 'done') {
            allDone *= 0;
        } else {
            allDone *= 2;
        }
    });

    console.log('all done? ', allDone);

    if (allDone == 0) {
        playerRoster = [];
        snap.docs.forEach( doc => {
            playerRoster.push( doc.data().player);
            let arr = [];
            arr.push(doc.data().word01);
            arr.push(doc.data().word02);
            arr.push(doc.data().word03);
            arr.push(doc.data().word04);
            arr.push(doc.data().word05);
            arr.push(doc.data().word06);
            arr.push(doc.data().word07);
            arr.push(doc.data().word08);
            arr.push(doc.data().word09);
            arr.push(doc.data().word10);
            arr.push(doc.data().word11);
            arr.push(doc.data().word12);
            resultMap[doc.data().player] = arr;
        })
        // addResultTable(container);
    }
    
    
})

window.onresize = () => { 
    adoptToScreen(Number.parseFloat(window.innerWidth / window.innerHeight).toPrecision(3)); 
}












//  MMMMMMMM  MM      MM  MMMMMMMM  MM    MM  MMMMMM        MM    MM    MMMM    MM    MM  MMMMMM    MM      MMMMMMMM  MMMMMM      MMMM    
//  MM        MM      MM  MM        MMMM  MM    MM          MM    MM  MM    MM  MMMM  MM  MM    MM  MM      MM        MM    MM  MM    MM  
//  MMMMMMMM  MM      MM  MMMMMMMM  MM  MMMM    MM          MMMMMMMM  MMMMMMMM  MM  MMMM  MM    MM  MM      MMMMMMMM  MMMMMM      MM      
//  MM        MM      MM  MM        MM    MM    MM          MM    MM  MM    MM  MM    MM  MM    MM  MM      MM        MM    MM      MM    
//  MM          MM  MM    MM        MM    MM    MM          MM    MM  MM    MM  MM    MM  MM    MM  MM      MM        MM    MM  MM    MM  
//  MMMMMMMM      MM      MMMMMMMM  MM    MM    MM          MM    MM  MM    MM  MM    MM  MMMMMM    MMMMMM  MMMMMMMM  MM    MM    MMMM    

// EVENT HANDLERS ______________________________________________

$(title).on('click', function() {
    if (isAuthorized) {
        soundButtonClick.play();
        isAuthorized = false;
        $(title).css("background",colorSet.yellowGradient);
    } else {
        isAuthorized = true;
        $(title).css("background",colorSet.redGradient);
    } 
});

$(setting).on('click', function(ev) {
    ev.stopPropagation();
    if (!isAuthorized) return;
    if (isClockTicking) return;
    soundButtonClick.play();
    letterList.index = { EN : 'KR', KR : 'EN' }[letterList.index];
    db.collection('wordlist').doc(wordlistID).update({
        language : letterList.index
    });
});

$(wordlist).on('click', function() {
    if (isClockTicking) return;
    if (!isAuthorized) return;
    soundButtonClick.play();
    addPopupWindow(container);
    new Array(8).fill(0).forEach( (val,i) => {
        let str = `List #${i+1}`;
        addWordCard(container.lastElementChild, str);
        container.lastElementChild.children[i].onclick = () => {
            container.lastElementChild.remove();
            db.collection('wordlist').doc(wordlistID).update({
                number : i+1
            });
        }
    });
});

$(dice).on('click', function() {
    // if (!isAuthorized) return;
    addResultTable(container);
    // resetGameAndPlayers();
})

$(timer).on('click', function() {
    if (!isAuthorized) return;
    soundButtonClick.play();
    if (endTime > nowTime) {
        // THE GAME ENDED
        endTime = 0;
        $(timer).text("00:00");
        isClockTicking = false;
    } else {
        // YOU STARTED THE GAME
        isClockTicking = true;
        resetGameAndPlayers();
        let arr = letterList[letterList.index];
        let rand = Math.floor( Math.random() * Math.floor(arr.length) );
        let letter = arr[rand];
        db.collection('dice').doc(diceID).update({
            letter : letter
        });
        db.collection('game').doc(gameID).update({
            started : true
        })
        endTime = futureInSeconds(timeLimit);
        $(timer).text(secondsToStr(timeLimit));
    }
    db.collection('timer').doc(timerID).update({
        endTime : endTime
    });
});














//    MMMM    MMMMMMMM  MMMMMM  MMMMMM  MM    MM  MMMMMM  MMMMMMMM  MMMMMM    MM      MM    MMMM    MM      
//  MM    MM  MM          MM      MM    MMMM  MM    MM    MM        MM    MM  MM      MM  MM    MM  MM      
//    MM      MMMMMMMM    MM      MM    MM  MMMM    MM    MMMMMMMM  MMMMMM    MM      MM  MMMMMMMM  MM      
//      MM    MM          MM      MM    MM    MM    MM    MM        MM    MM  MM      MM  MM    MM  MM      
//  MM    MM  MM          MM      MM    MM    MM    MM    MM        MM    MM    MM  MM    MM    MM  MM      
//    MMMM    MMMMMMMM    MM    MMMMMM  MM    MM    MM    MMMMMMMM  MM    MM      MM      MM    MM  MMMMMM  

// SETINTERVAL CONTINUOUS _________________________________________

let timeLoop = setInterval( () => {
    nowTime = nowInSeconds();
    let str = (endTime > nowTime) ? secondsToStr(endTime - nowTime) : "START";
    $(timer).text(str);
    if (endTime == nowTime) {
        endTime -= 1;
        soundTimerEnd.play();
        addFlashLayer(timer, colorSet.redish);
        db.collection('players').doc(playerID).update({
            "word01" : $('#input-1').val(),
            "word02" : $('#input-2').val(),
            "word03" : $('#input-3').val(),
            "word04" : $('#input-4').val(),
            "word05" : $('#input-5').val(),
            "word06" : $('#input-6').val(),
            "word07" : $('#input-7').val(),
            "word08" : $('#input-8').val(),
            "word09" : $('#input-9').val(),
            "word10" : $('#input-10').val(),
            "word11" : $('#input-11').val(),
            "word12" : $('#input-12').val(),
            "player" : playerName,
            "status" : "done"
        })
    }
    if (stopLoop) clearInterval(timeLoop);
}, 50 );
















//  MMMMMM      MMMM    MM      MM        MMMMMMMM  MM      MMMMMMMM  MM      MM          MMMM    MMMMMM    MMMMMMMM    MMMM    MMMMMM  MMMMMM    MMMM    MM    MM  
//  MM    MM  MM    MM  MMMM  MMMM        MM        MM      MM        MMMM  MMMM        MM    MM  MM    MM  MM        MM    MM    MM      MM    MM    MM  MMMM  MM  
//  MM    MM  MM    MM  MM  MM  MM        MMMMMMMM  MM      MMMMMMMM  MM  MM  MM        MM        MMMMMM    MMMMMMMM  MMMMMMMM    MM      MM    MM    MM  MM  MMMM  
//  MM    MM  MM    MM  MM      MM        MM        MM      MM        MM      MM        MM        MM    MM  MM        MM    MM    MM      MM    MM    MM  MM    MM  
//  MM    MM  MM    MM  MM      MM        MM        MM      MM        MM      MM        MM    MM  MM    MM  MM        MM    MM    MM      MM    MM    MM  MM    MM  
//  MMMMMM      MMMM    MM      MM        MMMMMMMM  MMMMMM  MMMMMMMM  MM      MM          MMMM    MM    MM  MMMMMMMM  MM    MM    MM    MMMMMM    MMMM    MM    MM  

// DOM ELEMENT CREATION ________________________________________________
function addCover(elem) {
    let newElem = document.createElement('div');
        newElem.id = 'cover';
    applyCSS(newElem, style.cover);
    // newElem.onclick = () => { newElem.remove(); }
    $(elem).append(newElem);
}

function addNamePrompt(elem) {
    let newElem = document.createElement('div');
    let label = document.createElement('h1');
    let name = document.createElement('input');

    applyCSS(newElem, style.nameprompt);
    label.innerHTML = "Name: ";
    label.style.color = "white";
    $(name).attr("type", "text");
    name.style.fontSize = "4vh";
    name.style.color = "black";

    name.addEventListener("keyup", (ev) => {
        if (ev.keyCode ===13) { 
            playerName = name.value;
            if (playerName != '' ) newElem.remove(); 
            console.log('player name is ', playerName);
        }
    });
    $(newElem).append(label);
    $(newElem).append(name);
    $(elem).append(newElem);
}

function addPopupWindow(elem) {
    let newElem = document.createElement('div');
        newElem.id = 'popup';
    applyCSS(newElem, style.popup);
    newElem.onclick = () => {
        newElem.remove();
    }
    $(elem).append(newElem);
}

function addWordCard(elem, text) {
    let newElem = document.createElement('div');
    applyCSS(newElem, style.wordcard, text);
    elem.append(newElem);
}

function addResultTable(elem) {
    let num = playerRoster.length + 1;
    let newElem = document.createElement('div');

    applyCSS(newElem, style.table);
    newElem.style.gridTemplateColumns = `repeat(${num}, auto)`;
    newElem.onclick = () => {newElem.remove(); }

    let sub = document.createElement('div');
    $(newElem).append(sub);

    for (i=0 ; i<num-1 ; i++) {
        let a = document.createElement('div');
        a.innerHTML = playerRoster[i];
        $(newElem).append(a);
    }
    
    for (i=1; i<=12; i++) {
        let a = document.createElement('div');
        a.innerHTML = categories[i-1];
        $(newElem).append(a);

        playerRoster.forEach( (val) => {
            let b = document.createElement('div');
            let arr = resultMap[val];
            b.innerHTML = arr[i-1];
            $(newElem).append(b);
        })

    }
    

    $(elem).append(newElem);
}













//    MMMM      MMMM      MMMM            MMMM    MMMMMMMM  MMMMMM  MM    MM  MMMMMM    
//  MM    MM  MM    MM  MM    MM        MM    MM  MM          MM    MM    MM  MM    MM  
//  MM          MM        MM              MM      MMMMMMMM    MM    MM    MM  MM    MM  
//  MM            MM        MM              MM    MM          MM    MM    MM  MMMMMM    
//  MM    MM  MM    MM  MM    MM        MM    MM  MM          MM    MM    MM  MM        
//    MMMM      MMMM      MMMM            MMMM    MMMMMMMM    MM      MMMM    MM        

// CSS setup ___________________________________________

addCover(container);
// applyCSS(document.querySelector("::placeholder"), style.placeholder);
applyCSS(document.body, style.body );

applyCSS(wall, style.wall );
applyCSS(container, style.container );
applyCSS(title, style.box );
applyCSS(title, style.title, );
applyCSS(title.children[0], 0, 'SCATTERGORIES!');
applyCSS(wordlist, style.box );
applyCSS(wordlist, style.wordlist );
applyCSS(diceJacket, style.box );
applyCSS(diceJacket, style.dice );
applyCSS(timer, style.box );
applyCSS(timer, style.timer );
applyCSS(setting, style.corner );
applyCSS(wordlist.children[0], style.wordfirst );
applyCSS(wordlist.children[1], style.wordframe );
applyCSS(wordlist.children[1].children[0], style.wordpack );
applyCSS(wordlist.children[1].children[1], style.wordpack );

// for ( i=1 ; i <= 12 ; i++ ) { applyCSS( $(`#word\-${i}`) , style.wordrest ); }
for ( i=1 ; i <= 12 ; i++ ) { applyCSS( $(`#num\-${i}`) , style.span ); }
for ( i=1 ; i <= 12 ; i++ ) { applyCSS( $(`#input\-${i}`) , style.input ); }

// adoptToScreen(Number.parseFloat(window.innerWidth / window.innerHeight).toPrecision(3));













//    MMMM      MMMM      MMMM          MMMMMMMM  MM    MM  MM    MM    MMMM    MMMMMM  MMMMMM    MMMM    MM    MM    MMMM    
//  MM    MM  MM    MM  MM    MM        MM        MM    MM  MMMM  MM  MM    MM    MM      MM    MM    MM  MMMM  MM  MM    MM  
//  MM          MM        MM            MMMMMMMM  MM    MM  MM  MMMM  MM          MM      MM    MM    MM  MM  MMMM    MM      
//  MM            MM        MM          MM        MM    MM  MM    MM  MM          MM      MM    MM    MM  MM    MM      MM    
//  MM    MM  MM    MM  MM    MM        MM        MM    MM  MM    MM  MM    MM    MM      MM    MM    MM  MM    MM  MM    MM  
//    MMMM      MMMM      MMMM          MM          MMMM    MM    MM    MMMM      MM    MMMMMM    MMMM    MM    MM    MMMM    

// CSS FUNCTIONS ___________________________________________________

function applyCSS(elem, obj, text) {
    for ( let prop in obj) { $(elem).css(prop, obj[prop]); }
    if (text) elem.innerText = text;
}

function adoptToScreen(ratio) {
    showDim(container);

    if (ratio < 0.70) { fillCSS(0.8, 0.8, 'vw', "column"); 
    } else if (ratio < 1.75) { fillCSS(0.6, 0.8, 'vh', "column"); 
    } else { fillCSS(0.9, 0.9, 'vh', "row"); }

    if (ratio < 1) { fillPopupCSS(1, 'vw' ); 
    } else { fillPopupCSS(1, 'vh' ); }

    function fillCSS(k, b, u, flow) {
        container.style.margin = (b) + u;
        container.style.borderRadius = (2*b) + u;
        
        title.style.padding = `${2*k}${u} ${5*k}${u} ${2*k}${u} ${5*k}${u}`;
        title.style.fontSize = (12*k) + u;
        title.style.margin = (b) + u;
        title.style.borderRadius = (2*b) + u;

        setting.style.width = (8*k) +u;
        setting.style.height = (7*k) +u;
        setting.style.borderRadius = `0vh 0vh 0vh ${2*b}${u}`;
        setting.style.fontSize = (5.5*k) + u;

        diceJacket.style.margin = (b) + u;
        diceJacket.style.borderRadius = (2*b) + u;
        dice.style.fontSize = (8*k) + u;

        timer.style.margin = (b) + u;
        timer.style.borderRadius = (2*b) + u;
        timer.style.fontSize = (8*k) + u;

        wordlist.style.margin = (b) + u;
        wordlist.style.borderRadius = (2*b) + u;
        wordlist.children[0].style.margin = (2*k) + u;
        wordlist.children[0].style.fontSize = (6*k) + u;
        wordlist.children[1].style.margin = (2*k) + u;
        wordlist.children[1].style.fontSize = (6*k) + u;

        wordlist.children[1].style.flexFlow = flow;
        wordlist.children[1].children[0].style.margin = `0${u} ${3*k}${u} 0${u} ${3*k}${u}`;
        wordlist.children[1].children[1].style.margin = `0${u} ${3*k}${u} 0${u} ${3*k}${u}`;
        
        // $("div [ id^='word\-'] ").css( "margin\-bottom" , `${2*k}${u}` );        
        $("div [ id^='num\-'] ").css( "margin\-bottom" , `${2*k}${u}` );
        $("div [ id^='input\-'] ").css( "font\-size" , `${6*k}${u}` );


    }

    function fillPopupCSS(k, u ) {
        style.popup.padding = (5*k) + u;
        style.wordcard.width = (20*k) + u;
        style.wordcard.height = (24*k) + u;
        style.wordcard.margin = (2*k) + u;
        style.wordcard.padding = (2*k) + u;
        style.wordcard.borderRadius = (1*k) + u;
        style.wordcard.fontSize = (5*k) + u;
    }
}

function showDim(elem ) {
    // let x = elem.offsetWidth;
    // let y = elem.offsetHeight;
    // let screenRatio = Number.parseFloat(window.innerWidth / window.innerHeight).toPrecision(3);
    // console.clear();
    // console.log(`screen ratio: ${screenRatio}  ( ${window.innerWidth} / ${window.innerHeight} )`);
}










//  MMMMMMMM  MMMMMM          MMMMMMMM  MM    MM  MM    MM    MMMM    MMMMMM  MMMMMM    MMMM    MM    MM    MMMM    
//  MM        MM    MM        MM        MM    MM  MMMM  MM  MM    MM    MM      MM    MM    MM  MMMM  MM  MM    MM  
//  MMMMMMMM  MMMMMM          MMMMMMMM  MM    MM  MM  MMMM  MM          MM      MM    MM    MM  MM  MMMM    MM      
//  MM        MM    MM        MM        MM    MM  MM    MM  MM          MM      MM    MM    MM  MM    MM      MM    
//  MM        MM    MM        MM        MM    MM  MM    MM  MM    MM    MM      MM    MM    MM  MM    MM  MM    MM  
//  MM        MMMMMM          MM          MMMM    MM    MM    MMMM      MM    MMMMMM    MMMM    MM    MM    MMMM    

// OTHER FIREBASE FUNCTIONS _______________________________________

function resetGameAndPlayers() {
    db.collection('game').doc(gameID).update({
        started : false
    });
    db.collection('players').get().then( snap => {
        snap.docs.forEach( doc => {
            // console.log(doc.id, doc.data().player, doc.data().status);
            db.collection('players').doc(doc.id).delete();
        })
    })

    for (i=1 ; i<=12 ; i++) {
        $(`#input-${i}`).val('');
    }
    
}




