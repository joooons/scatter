

console.log('interactive.js at your service!');






//  MM      MM    MMMM    MMMMMM    MMMMMM    MMMM    MMMMMM    MM      MMMMMMMM    MMMM    
//  MM      MM  MM    MM  MM    MM    MM    MM    MM  MM    MM  MM      MM        MM    MM  
//  MM      MM  MMMMMMMM  MMMMMM      MM    MMMMMMMM  MMMMMM    MM      MMMMMMMM    MM      
//  MM      MM  MM    MM  MM    MM    MM    MM    MM  MM    MM  MM      MM            MM    
//    MM  MM    MM    MM  MM    MM    MM    MM    MM  MM    MM  MM      MM        MM    MM  
//      MM      MM    MM  MM    MM  MMMMMM  MM    MM  MMMMMM    MMMMMM  MMMMMMMM    MMMM    

var playerName = '';
    // Until you have a playerName, you will not see changes to...
    // ...the 'game' and 'players' collections.
var isAuthorized = false;

var help = {};
help.count = 0;
help.freeze = false;

var timeLimit = 180;
var nowTime = nowInSeconds();
var endTime = 0;
var stopLoop = false;           // This will never be used.
var isClockTicking = false;

var letterList = {
    index : 'EN',
    EN : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    KR : 'ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎ'  }











//    MMMM      MMMM    MM    MM  MM    MM  MMMMMM          MM      MM    MMMM    MMMMMM    MMMMMM    MMMM    MMMMMM    MM      MMMMMMMM    MMMM    
//  MM    MM  MM    MM  MM    MM  MMMM  MM  MM    MM        MM      MM  MM    MM  MM    MM    MM    MM    MM  MM    MM  MM      MM        MM    MM  
//    MM      MM    MM  MM    MM  MM  MMMM  MM    MM        MM      MM  MMMMMMMM  MMMMMM      MM    MMMMMMMM  MMMMMM    MM      MMMMMMMM    MM      
//      MM    MM    MM  MM    MM  MM    MM  MM    MM        MM      MM  MM    MM  MM    MM    MM    MM    MM  MM    MM  MM      MM            MM    
//  MM    MM  MM    MM  MM    MM  MM    MM  MM    MM          MM  MM    MM    MM  MM    MM    MM    MM    MM  MM    MM  MM      MM        MM    MM  
//    MMMM      MMMM      MMMM    MM    MM  MMMMMM              MM      MM    MM  MM    MM  MMMMMM  MM    MM  MMMMMM    MMMMMM  MMMMMMMM    MMMM    

const soundFile = {
    file_1 : './sounds/confirmation_001.ogg',
    file_6 : './sounds/click_003.mp3',  };
const soundButtonClick = new defineSound(soundFile.file_6, 'auto', 'none');
const soundTimerEnd = new defineSound(soundFile.file_1, 'auto', 'none');









//  MMMMMMMM  MMMMMM  MMMMMM    MMMMMMMM  MMMMMM      MMMM      MMMM    MMMMMMMM        MM      MM    MMMM    MMMMMM    MMMMMM    MMMM    MMMMMM    MM      MMMMMMMM    MMMM    
//  MM          MM    MM    MM  MM        MM    MM  MM    MM  MM    MM  MM              MM      MM  MM    MM  MM    MM    MM    MM    MM  MM    MM  MM      MM        MM    MM  
//  MMMMMMMM    MM    MMMMMM    MMMMMMMM  MMMMMM    MMMMMMMM    MM      MMMMMMMM        MM      MM  MMMMMMMM  MMMMMM      MM    MMMMMMMM  MMMMMM    MM      MMMMMMMM    MM      
//  MM          MM    MM    MM  MM        MM    MM  MM    MM      MM    MM              MM      MM  MM    MM  MM    MM    MM    MM    MM  MM    MM  MM      MM            MM    
//  MM          MM    MM    MM  MM        MM    MM  MM    MM  MM    MM  MM                MM  MM    MM    MM  MM    MM    MM    MM    MM  MM    MM  MM      MM        MM    MM  
//  MM        MMMMMM  MM    MM  MMMMMMMM  MMMMMM    MM    MM    MMMM    MMMMMMMM            MM      MM    MM  MM    MM  MMMMMM  MM    MM  MMMMMM    MMMMMM  MMMMMMMM    MMMM    

// FIREBASE objects ____________________________________
const db = firebase.firestore();
var diceID;
var timerID;
var wordlistID;
var gameID;
var playerID = 'none';









//  MMMMMMMM  MMMMMM  MMMMMM    MMMMMMMM  MMMMMM      MMMM      MMMM    MMMMMMMM        MMMMMM  MM    MM  MMMMMM  MMMMMM  MMMMMM    MMMM    MMMMMM  MMMMMM    MMMM    MM    MM  
//  MM          MM    MM    MM  MM        MM    MM  MM    MM  MM    MM  MM                MM    MMMM  MM    MM      MM      MM    MM    MM    MM      MM    MM    MM  MMMM  MM  
//  MMMMMMMM    MM    MMMMMM    MMMMMMMM  MMMMMM    MMMMMMMM    MM      MMMMMMMM          MM    MM  MMMM    MM      MM      MM    MMMMMMMM    MM      MM    MM    MM  MM  MMMM  
//  MM          MM    MM    MM  MM        MM    MM  MM    MM      MM    MM                MM    MM    MM    MM      MM      MM    MM    MM    MM      MM    MM    MM  MM    MM  
//  MM          MM    MM    MM  MM        MM    MM  MM    MM  MM    MM  MM                MM    MM    MM    MM      MM      MM    MM    MM    MM      MM    MM    MM  MM    MM  
//  MM        MMMMMM  MM    MM  MMMMMMMM  MMMMMM    MM    MM    MMMM    MMMMMMMM        MMMMMM  MM    MM  MMMMMM    MM    MMMMMM  MM    MM    MM    MMMMMM    MMMM    MM    MM  

diceID = "78URdKxROHcrSEZmQvBs";
gameID = "Xi3hQ1fLeyTh38N8VEM6";
timerID = "Nw1BT0CUPUTQJwRpQwN8";
wordindexID = "vJq15L5GkZv6cUN7a0xG";
    // These are IDs of the documents as they are in the database right now.
    // If I remove and add a document, these values could change.

// DO NOT DELETE THESE QUITE YET.
// I MAY NEED THESE TO GET THE DOCUMENT ID'S LATER.
    // db.collection('dice').limit(1).get()
    // .then( snap => { diceID = snap.docs[0].id });

    // db.collection('timer').limit(1).get()
    // .then( snap => { timerID = snap.docs[0].id });

    // db.collection('wordlist').where('set', '==', 'index').limit(1).get()
    // .then( snap => { wordlistID = snap.docs[0].id });

    // db.collection('game').limit(1).get()
    // .then( snap => { gameID = snap.docs[0].id });












//  MMMMMM  MM    MM  MMMMMM  MMMMMM  MMMMMM    MMMM    MM      MMMMMM  MMMMMMMMMM  MMMMMMMM  
//    MM    MMMM  MM    MM      MM      MM    MM    MM  MM        MM          MM    MM        
//    MM    MM  MMMM    MM      MM      MM    MMMMMMMM  MM        MM        MM      MMMMMMMM  
//    MM    MM    MM    MM      MM      MM    MM    MM  MM        MM      MM        MM        
//    MM    MM    MM    MM      MM      MM    MM    MM  MM        MM    MM          MM        
//  MMMMMM  MM    MM  MMMMMM    MM    MMMMMM  MM    MM  MMMMMM  MMMMMM  MMMMMMMMMM  MMMMMMMM  

( function() {
    // Add onchange event listener to each of the "input.ans"
    for ( i=0 ; i<12 ; i++ ) {
        let index = i;
        ans[i].onchange = () => { whenYouChangeAnswer(index); }
    }
})();















//    MMMM    MM    MM    MMMM    MM    MM    MMMM    MMMMMM      MMMM    MM    MM    MMMM    MMMMMM  
//  MM    MM  MMMM  MM  MM    MM  MMMM  MM  MM    MM  MM    MM  MM    MM  MM    MM  MM    MM    MM    
//  MM    MM  MM  MMMM    MM      MM  MMMM  MMMMMMMM  MM    MM    MM      MMMMMMMM  MM    MM    MM    
//  MM    MM  MM    MM      MM    MM    MM  MM    MM  MMMMMM        MM    MM    MM  MM    MM    MM    
//  MM    MM  MM    MM  MM    MM  MM    MM  MM    MM  MM        MM    MM  MM    MM  MM    MM    MM    
//    MMMM    MM    MM    MMMM    MM    MM  MM    MM  MM          MMMM    MM    MM    MMMM      MM    

// ( function() {
//     return;

db.collection('dice').onSnapshot( snap => {
    // Whenever any player changes the letter, everyone sees the new letter.
    $(dice).html(snap.docs[0].data().letter); 
    blinkOnce('dice');
});

db.collection('timer').onSnapshot( snap => { 
    // Whenever any player starts the countdown, everyone sees the countdown.
    endTime = snap.docs[0].data().endTime;
    blinkOnce('timer');
});

db.collection('wordindex').onSnapshot( snapshot => { 
    let num = snapshot.docs[0].data().number;
    let lang = snapshot.docs[0].data().language;
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
        });
    });

});

db.collection('game').onSnapshot( snap => {
    if (playerName == '') return;
    if (!snap.docs[0].data().started) return;
        // Do something ONLY if the game started...
    isClockTicking = true;
    removePlayerData();
    resetAnswers();
    synchResultsQuestions();
});

db.collection('players').onSnapshot( snap => {
    if (playerName == '') return;
    let changes = snap.docChanges();
    changes.forEach( change => {
        let obj = change.doc.data();
        switch (change.type) {
            case 'removed':
                playerID = 'none';
                break;
            case 'added':
                Object.keys(obj).forEach( key => {
                    if (key == 'player') { addPlayerData( obj.player );
                    } else { enterPlayerData( obj.player, key, obj[key] ); }
                });
                break;
            case 'modified':
                Object.keys(obj).forEach( key => {
                    if ( key != 'player' ) { enterPlayerData( obj.player, key, obj[key] ); }
                });
                break;
            default:
                break;
        }

    });

});

// })();










//  MMMMMMMM  MM      MM        MM    MM    MMMM    MM    MM  MMMMMM    MM      MMMMMMMM  MMMMMM    
//  MM        MM      MM        MM    MM  MM    MM  MMMM  MM  MM    MM  MM      MM        MM    MM  
//  MMMMMMMM  MM      MM        MMMMMMMM  MMMMMMMM  MM  MMMM  MM    MM  MM      MMMMMMMM  MMMMMM    
//  MM        MM      MM        MM    MM  MM    MM  MM    MM  MM    MM  MM      MM        MM    MM  
//  MM          MM  MM          MM    MM  MM    MM  MM    MM  MM    MM  MM      MM        MM    MM  
//  MMMMMMMM      MM            MM    MM  MM    MM  MM    MM  MMMMMM    MMMMMM  MMMMMMMM  MM    MM  

nameText.onfocus = () => {
    nameText.placeholder = '';
}

nameText.onblur = () => {
    nameText.placeholder = 'george washington';
}

nameText.onchange = () => {
    playerName = nameText.value;
    showWall(wall1);
}

wall5.onclick = () => {
    if (help.freeze) return;
    help.freeze = true;
    $('.gray-box-abs').eq(help.count).fadeOut(200, function(){
        help.count++;
        stageStalkers();
        if ( help.count < 5 ) { 
            $('.gray-box-abs').eq(help.count).fadeIn(200, function() {
                help.freeze = false;
            });
        } else { 
            toggleWall(wall5); 
            help.freeze = false;
        }
    });
}

title.onclick = () => {
    titleHelp.classList.remove('blink');
    isAuthorized = (isAuthorized) ? false : true;
    if (isAuthorized) {
        title.innerText = 'UNLOCKED';
        titleBox.classList.add('admin');
    } else {
        title.innerText = 'SCATTERGORIES!';
        titleBox.classList.remove('admin');
    }
}

titleHelp.onclick = () => {
    titleHelp.classList.remove('blink');
    titleHelp.classList.remove('blink');
    stageStalkers();
    toggleWall(wall5);
    $('.gray-box-abs').eq(0).fadeIn(400);
    help.count = 0;
}

titleConfig.onclick = () => {
    if (!isAuthorized) return;
    if (isClockTicking) return;
    soundButtonClick.play();
    letterList.index = { EN : 'KR', KR : 'EN' }[letterList.index];
    db.collection('wordindex').doc(wordindexID).update({ language : letterList.index });
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
        db.collection('game').doc(gameID).update({ started : false });
    } else {
        // If the timer just says START and then you click on it...
        // ...the timer will start counting down. That's what you just did.
        // isClockTicking = true;
        resetGameAndPlayers();
        endTime = futureInSeconds(timeLimit);
        let letter = randomLetter();
        db.collection('dice').doc(diceID).update({ letter : letter });
        db.collection('game').doc(gameID).update({ started : true });
        
    }
    db.collection('timer').doc(timerID).update({ endTime : endTime });
}

results.onclick = () => {
    if (isClockTicking) return;
    titleHelp.classList.remove('blink');
    showWall(wall3); 
}

dataBox.onclick = () => { showWall(wall1); }

$('.card').on('click', ev => {
    let str = ev.target.innerText;
    let char = str.slice(5,6);
    let num = parseInt(char);
    db.collection('wordindex').doc(wordindexID).update({ number : num });
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
    // Deletes all players on the 'players' collection.
    // Removes all columns in Results page except the first column.
    // Resets all .ans to blank.
    // At this time, this function is used 
    db.collection('players').get().then( snap => {
        snap.docs.forEach( doc => { db.collection('players').doc(doc.id).delete(); });
    });
}

function resetAnswers() { for ( i=0 ; i<12 ; i++ ) { $('.ans').eq(i).val(''); } }

function synchResultsQuestions() {
    // This sets up the first column of the Results page.
    // set Header with "wordcard- ??? "
    // Fill all the questions with the same questions on wall-1.
    categoryHeader.innerText = wordlistHeader.innerText;
    for ( i=0 ; i<12 ; i++ ) { $('.category').eq(i).html( $('.ans').eq(i).attr('placeholder') ); }
}

function getPlayerID() {
    // Assuming that this player already made a document in 'players' collection...
    db.collection('players').where('player', '==', playerName).get()
    .then( snap => { playerID = snap.docs[0].id; });
}

function makeFirstMove(index) {
    // This assumes that the player document for this player does not yet exist.
    // This creates a new document with only two pieces of information:
    // The playerName, and the first answer entry.
    let obj = {};
    obj.player = playerName;
    obj[Key(index)] = $('.ans').eq(index).val();
    db.collection('players').add(obj);
}

function makeNextMove(index) {
    // Just like makeFirstMove()... except that this time you UPDATE, not ADD.
    // In order for this to work, playerID needs to be not 'none'.
    let obj = {};
    obj.player = playerName;
    obj[Key(index)] = $('.ans').eq(index).val();
    db.collection('players').doc(playerID).update( obj );
}

function whenYouChangeAnswer(index) {
    if (!isClockTicking) return;
    if (playerID == 'none') {
        makeFirstMove(index);
        getPlayerID();
    } else { makeNextMove(index); }
}

function Key(index) {
    // Takes a number and converts it to a string that follows...
    // ...this format:  "word00".
    let number = 101 + index;
    return "word" + number.toString().slice(1,3);
}









//    MMMM    MMMMMMMM  MMMMMM  MMMMMM  MM    MM  MMMMMM  MMMMMMMM  MMMMMM    MM      MM    MMMM    MM      
//  MM    MM  MM          MM      MM    MMMM  MM    MM    MM        MM    MM  MM      MM  MM    MM  MM      
//    MM      MMMMMMMM    MM      MM    MM  MMMM    MM    MMMMMMMM  MMMMMM    MM      MM  MMMMMMMM  MM      
//      MM    MM          MM      MM    MM    MM    MM    MM        MM    MM  MM      MM  MM    MM  MM      
//  MM    MM  MM          MM      MM    MM    MM    MM    MM        MM    MM    MM  MM    MM    MM  MM      
//    MMMM    MMMMMMMM    MM    MMMMMM  MM    MM    MM    MMMMMMMM  MM    MM      MM      MM    MM  MMMMMM  

// SETINTERVAL CONTINUOUS _________________________________________

let timeLoop = setInterval( () => {
    // This loop is always running. Every 50ms.
    // There is a way to stop it using "stopLoop", but I never use it.
    nowTime = nowInSeconds();
    let str = (endTime > nowTime) ? secondsToStr(endTime - nowTime) : "START";
    $(timer).text(str);
    if (endTime == nowTime) {
        endTime = nowTime  - 1;
        soundTimerEnd.play();
        isClockTicking = false;
        blinkOnce('timer');
        db.collection('game').doc(gameID).update({ started : false });
    }
    if (stopLoop) clearInterval(timeLoop);
}, 50 );










