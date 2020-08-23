

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


// var timeLimit = 180;
var timeLimit = 10;
var nowTime = nowInSeconds();
var endTime = 0;
var wordListIndex = 0;
var stopLoop = false;

var isClockTicking = false;

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
    // listen.tick(12);
});

db.collection('timer').onSnapshot( snap => { 
    endTime = snap.docs[0].data().endTime;
    $(timer).text(secondsToStr(timeLimit));
    blinkOnce('timer');
    // listen.tick(13);
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
        categoryHeader.innerText = `Word List #${num}`;

        let set = `${letterList.index}${num}`;
        db.collection('wordlist').where( 'set', '==', set).get().then( snap => {
            snap.docs.forEach( (doc, i) => { 
                $('.ans').eq(i).attr("placeholder", `${doc.data().phrase}`); 
                $('.ans').eq(i).val(''); 
                $('.category').eq(i).html(`${doc.data().phrase}`);
                categories.push(doc.data().phrase);
                // listen.tick(i);
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
});




db.collection('players').onSnapshot( snap => {
    if (playerName == '') return;
    
    let allDone = 4;

    snap.docs.forEach( doc => {
        if (doc.data().status == 'done') { allDone *= 2; } 
        else { allDone *= 0; }
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

        });
    } 
});













//  MMMMMMMM  MM      MM        MM    MM    MMMM    MM    MM  MMMMMM    MM      MMMMMMMM  MMMMMM    
//  MM        MM      MM        MM    MM  MM    MM  MMMM  MM  MM    MM  MM      MM        MM    MM  
//  MMMMMMMM  MM      MM        MMMMMMMM  MMMMMMMM  MM  MMMM  MM    MM  MM      MMMMMMMM  MMMMMM    
//  MM        MM      MM        MM    MM  MM    MM  MM    MM  MM    MM  MM      MM        MM    MM  
//  MM          MM  MM          MM    MM  MM    MM  MM    MM  MM    MM  MM      MM        MM    MM  
//  MMMMMMMM      MM            MM    MM  MM    MM  MM    MM  MMMMMM    MMMMMM  MMMMMMMM  MM    MM  


// $('#name').on('change', () => {

// });

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
    // ev.stopPropagation();
    if (!isAuthorized) return;
    if (isClockTicking) return;


    soundButtonClick.play();
    letterList.index = { EN : 'KR', KR : 'EN' }[letterList.index];
    db.collection('wordlist').doc(wordlistID).update({
        language : letterList.index
    });
}

wordlistHeader.onclick = () => {    
    if (isClockTicking) return;
    if (!isAuthorized) return;
    soundButtonClick.play();

    showWall(wall4);

}

results.onclick = () => {
    // if (!isAuthorized) return;
    console.log('clidk');
    showWall(wall3);
}

dataBox.onclick = () => {
    showWall(wall1);
}



$('.card').on('click', ev => {
    let str = ev.target.innerText;
    let char = str.slice(5,6);
    let num = parseInt(char);
    console.log(char);
    db.collection('wordlist').doc(wordlistID).update({
        number : num
    });
    showWall(wall1);
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
        
        // db.collection('players').doc(playerID).update({
        //     "word01" : $('#input-1').val(),
        //     "word02" : $('#input-2').val(),
        //     "word03" : $('#input-3').val(),
        //     "word04" : $('#input-4').val(),
        //     "word05" : $('#input-5').val(),
        //     "word06" : $('#input-6').val(),
        //     "word07" : $('#input-7').val(),
        //     "word08" : $('#input-8').val(),
        //     "word09" : $('#input-9').val(),
        //     "word10" : $('#input-10').val(),
        //     "word11" : $('#input-11').val(),
        //     "word12" : $('#input-12').val(),
        //     "player" : playerName,
        //     "status" : "done"
        // });

    }
    if (stopLoop) clearInterval(timeLoop);
}, 50 );










