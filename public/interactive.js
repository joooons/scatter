

console.log('interactive.js at your service!');






//  MM      MM    MMMM    MMMMMM    MMMMMM    MMMM    MMMMMM    MM      MMMMMMMM    MMMM    
//  MM      MM  MM    MM  MM    MM    MM    MM    MM  MM    MM  MM      MM        MM    MM  
//  MM      MM  MMMMMMMM  MMMMMM      MM    MMMMMMMM  MMMMMM    MM      MMMMMMMM    MM      
//  MM      MM  MM    MM  MM    MM    MM    MM    MM  MM    MM  MM      MM            MM    
//    MM  MM    MM    MM  MM    MM    MM    MM    MM  MM    MM  MM      MM        MM    MM  
//      MM      MM    MM  MM    MM  MMMMMM  MM    MM  MMMMMM    MMMMMM  MMMMMMMM    MMMM    

var playerName = '';
var isAuthorized = false;

var greenish = "#4FA";
var redish = "#F35";

var timeLimit = 40;
var nowTime = nowInSeconds();
var endTime = 0;
var stopLoop = false;           // This will never be used.
var isClockTicking = false;

var wordListIndex = 0;
var letterList = {
    index : 'EN',
    EN : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    KR : 'ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎ'  }

var categories = [];
var playerRoster = [];
var resultMap = new Map();    // WHAT IS THIS???










//    MMMM      MMMM    MM    MM  MM    MM  MMMMMM    
//  MM    MM  MM    MM  MM    MM  MMMM  MM  MM    MM  
//    MM      MM    MM  MM    MM  MM  MMMM  MM    MM  
//      MM    MM    MM  MM    MM  MM    MM  MM    MM  
//  MM    MM  MM    MM  MM    MM  MM    MM  MM    MM  
//    MMMM      MMMM      MMMM    MM    MM  MMMMMM    

const soundFile = {
    file_1 : './sounds/confirmation_001.ogg',
    file_6 : './sounds/click_003.mp3',  };
const soundButtonClick = new defineSound(soundFile.file_6, 'auto', 'none');
const soundTimerEnd = new defineSound(soundFile.file_1, 'auto', 'none');









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

db.collection('dice').limit(1).get()
.then( snap => { diceID = snap.docs[0].id });

db.collection('timer').limit(1).get()
.then( snap => { timerID = snap.docs[0].id });

db.collection('wordlist').where('set', '==', 'index').limit(1).get()
.then( snap => { wordlistID = snap.docs[0].id });

db.collection('game').limit(1).get()
.then( snap => { gameID = snap.docs[0].id });









//    MMMM    MM    MM    MMMM    MM    MM    MMMM    MMMMMM      MMMM    MM    MM    MMMM    MMMMMM  
//  MM    MM  MMMM  MM  MM    MM  MMMM  MM  MM    MM  MM    MM  MM    MM  MM    MM  MM    MM    MM    
//  MM    MM  MM  MMMM    MM      MM  MMMM  MMMMMMMM  MM    MM    MM      MMMMMMMM  MM    MM    MM    
//  MM    MM  MM    MM      MM    MM    MM  MM    MM  MMMMMM        MM    MM    MM  MM    MM    MM    
//  MM    MM  MM    MM  MM    MM  MM    MM  MM    MM  MM        MM    MM  MM    MM  MM    MM    MM    
//    MMMM    MM    MM    MMMM    MM    MM  MM    MM  MM          MMMM    MM    MM    MMMM      MM    

db.collection('dice').onSnapshot( snap => { 
    $(dice).html(snap.docs[0].data().letter); 
    blinkOnce('dice');
});

db.collection('timer').onSnapshot( snap => { 
    endTime = snap.docs[0].data().endTime;
    $(timer).text(secondsToStr(timeLimit));
    blinkOnce('timer');
});

db.collection('wordlist').onSnapshot( snap => { 
    db.collection('wordlist').where('set', '==', 'index').limit(1).get()
    .then( snap => { 
        categories = [];
        let num = snap.docs[0].data().number;
        let lang = snap.docs[0].data().language;
        letterList.index = lang;
        $(titleConfig).html(letterList.index);
        setFont(font[letterList.index]);
        db.collection('dice').doc(diceID).update({ letter : '?' });
        wordlistHeader.innerText = `Word List #${num}`;
        let set = `${letterList.index}${num}`;
        db.collection('wordlist').where( 'set', '==', set).get().then( snap => {
            snap.docs.forEach( (doc, i) => { 
                $('.ans').eq(i).attr("placeholder", `${doc.data().phrase}`); 
                $('.ans').eq(i).val(''); 
                categories.push(doc.data().phrase);
            });
        });
    });
});

db.collection('game').onSnapshot( snap => {
    if (playerName == '') return;
    if (snap.docs[0].data().started) {

        removePlayerData();
        for ( i=0 ; i<12 ; i++ ) { $('.ans').eq(i).val(''); }

        db.collection('players').add({
            player : playerName,
            status : "ready"
        })
        .then( () => {
            db.collection('players').where('player', '==', playerName).get()
            .then( res => {
                playerID = res.docs[0].id;
                console.log(playerID);
            });
        });
    }
});

db.collection('players').onSnapshot( snap => {
    if (playerName == '') return;
    let num = 1;
    let allDone = false;
    snap.docs.forEach( doc => {
        if (doc.data().status == 'done') { num *= 1; } 
        else { num *= 0; }
    });
    allDone = (num == 0) ? false : true;
    
    console.log('is everyone done? ', allDone);

    if (allDone) {
        playerRoster = [];
        snap.docs.forEach( doc => {
            let arr = [];
            playerRoster.push( doc.data().player);
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
            resultMap.set( doc.data().player, arr );
        });
        fillResultBoard();
    } 
});













//  MMMMMMMM  MM      MM        MM    MM    MMMM    MM    MM  MMMMMM    MM      MMMMMMMM  MMMMMM    
//  MM        MM      MM        MM    MM  MM    MM  MMMM  MM  MM    MM  MM      MM        MM    MM  
//  MMMMMMMM  MM      MM        MMMMMMMM  MMMMMMMM  MM  MMMM  MM    MM  MM      MMMMMMMM  MMMMMM    
//  MM        MM      MM        MM    MM  MM    MM  MM    MM  MM    MM  MM      MM        MM    MM  
//  MM          MM  MM          MM    MM  MM    MM  MM    MM  MM    MM  MM      MM        MM    MM  
//  MMMMMMMM      MM            MM    MM  MM    MM  MM    MM  MMMMMM    MMMMMM  MMMMMMMM  MM    MM  



nameText.onchange = () => {
    playerName = nameText.value;
    nameText.value = '';
    console.log(playerName);
    showWall(wall1);
}

title.onclick = () => {
    isAuthorized = (isAuthorized) ? false : true;
    if (isAuthorized) {
        title.innerText = 'ADMIN MODE';
        titleBox.classList.add('admin');
    } else {
        title.innerText = 'SCATTERGORIES!';
        titleBox.classList.remove('admin');
    }
}

titleConfig.onclick = () => {
    if (!isAuthorized) return;
    if (isClockTicking) return;
    soundButtonClick.play();
    letterList.index = { EN : 'KR', KR : 'EN' }[letterList.index];
    db.collection('wordlist').doc(wordlistID).update({ language : letterList.index });
}

wordlistHeader.onclick = () => {    
    if (isClockTicking) return;
    if (!isAuthorized) return;
    soundButtonClick.play();
    showWall(wall4);
}

timer.onclick = () => {
    if (!isAuthorized) return;
    soundButtonClick.play();
    if (endTime > nowTime) {
        // If the timer is counting down already, and then you click on it...
        // ...the game will STOP. That's what you just did.
        endTime = 0;
        isClockTicking = false;
        console.log('clicked on timer');
        db.collection('game').doc(gameID).update({ started : false });
    } else {
        // If the timer just says START and then you click on it...
        // ...the timer will start counting down. That's what you just did.
        isClockTicking = true;
        resetGameAndPlayers();
        console.log('clicked on timer');
        let letter = randomLetter();
        db.collection('dice').doc(diceID).update({ letter : letter });
        db.collection('game').doc(gameID).update({ started : true });
        endTime = futureInSeconds(timeLimit);
        $(timer).text(secondsToStr(timeLimit));
    }
    db.collection('timer').doc(timerID).update({ endTime : endTime });
}

results.onclick = () => { showWall(wall3); }

dataBox.onclick = () => { showWall(wall1); }

$('.card').on('click', ev => {
    let str = ev.target.innerText;
    let char = str.slice(5,6);
    let num = parseInt(char);
    db.collection('wordlist').doc(wordlistID).update({ number : num });
    showWall(wall1);
});









//  MMMMMMMM  MM    MM  MM    MM    MMMM    MMMMMM  MMMMMM    MMMM    MM    MM    MMMM    
//  MM        MM    MM  MMMM  MM  MM    MM    MM      MM    MM    MM  MMMM  MM  MM    MM  
//  MMMMMMMM  MM    MM  MM  MMMM  MM          MM      MM    MM    MM  MM  MMMM    MM      
//  MM        MM    MM  MM    MM  MM          MM      MM    MM    MM  MM    MM      MM    
//  MM        MM    MM  MM    MM  MM    MM    MM      MM    MM    MM  MM    MM  MM    MM  
//  MM          MMMM    MM    MM    MMMM      MM    MMMMMM    MMMM    MM    MM    MMMM    


function randomLetter() {
    let arr = letterList[letterList.index];
    let rand = Math.floor( Math.random() * Math.floor(arr.length) );
    return arr[rand];
}

function resetGameAndPlayers() {
    db.collection('players').get().then( snap => {
        snap.docs.forEach( doc => { db.collection('players').doc(doc.id).delete(); });
    });
        // remove all players data from database
    removePlayerData();
        // remove player answer columns in wall4
    for ( i=0 ; i<12 ; i++ ) { $('.ans').eq(i).val(''); }
        // remove all answers on wall1.
}

function fillResultBoard() {
    removePlayerData();
    categoryHeader.innerText = wordlistHeader.innerText;
    for ( i=0 ; i<12 ; i++ ) {
        $('.category').eq(i).html( $('.ans').eq(i).attr('placeholder') );
    }
    playerRoster.forEach( player => {
        let arr = resultMap.get(player); 
        addPlayerData( player , arr);
    });
}








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
        let arr = [];
        endTime = nowTime  - 1;
        soundTimerEnd.play();
        isClockTicking = false;
        blinkOnce('timer');
        for ( i=0 ; i<12 ; i++ ) {
            if ( $('.ans').eq(i).val() == '' ) { arr.push('-'); }
            else { arr.push( $('.ans').eq(i).val() ); }
        }
        db.collection('players').doc(playerID).update({
            "word01" : arr[0],
            "word02" : arr[1],
            "word03" : arr[2],
            "word04" : arr[3],
            "word05" : arr[4],
            "word06" : arr[5],
            "word07" : arr[6],
            "word08" : arr[7],
            "word09" : arr[8],
            "word10" : arr[9],
            "word11" : arr[10],
            "word12" : arr[11],
            "player" : playerName,
            "status" : "done"
        });
        db.collection('game').doc(gameID).update({ started : false });
    }
    if (stopLoop) clearInterval(timeLoop);
}, 50 );










