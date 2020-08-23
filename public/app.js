

















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
        $('#cover').fadeOut(1000, () => {
            $('#cover').remove();
        });
        this.done = true;
    }
}






db.collection('wordlist').onSnapshot( snap => { 
    db.collection('wordlist').where('set', '==', 'index').limit(1).get()
    .then( snap => { 
        categories = [];
        let num = snap.docs[0].data().number;
        let lang = snap.docs[0].data().language;
        letterList.index = lang;
        $(setting).html(letterList.index);
        // $(dice).css('fontFamily', font[letterList.index]);
        // $(wordlist).css('fontFamily', font[letterList.index]);
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
        });
    } 
});













//  MMMMMMMM  MM      MM  MMMMMMMM  MM    MM  MMMMMM        MM    MM    MMMM    MM    MM  MMMMMM    MM      MMMMMMMM  MMMMMM      MMMM    
//  MM        MM      MM  MM        MMMM  MM    MM          MM    MM  MM    MM  MMMM  MM  MM    MM  MM      MM        MM    MM  MM    MM  
//  MMMMMMMM  MM      MM  MMMMMMMM  MM  MMMM    MM          MMMMMMMM  MMMMMMMM  MM  MMMM  MM    MM  MM      MMMMMMMM  MMMMMM      MM      
//  MM        MM      MM  MM        MM    MM    MM          MM    MM  MM    MM  MM    MM  MM    MM  MM      MM        MM    MM      MM    
//  MM          MM  MM    MM        MM    MM    MM          MM    MM  MM    MM  MM    MM  MM    MM  MM      MM        MM    MM  MM    MM  
//  MMMMMMMM      MM      MMMMMMMM  MM    MM    MM          MM    MM  MM    MM  MM    MM  MMMMMM    MMMMMM  MMMMMMMM  MM    MM    MMMM    

// EVENT HANDLERS ______________________________________________









$(results).on('click', function() {
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





























//  MMMMMM      MMMM    MM      MM          MMMM    MMMMMM    MMMMMMMM    MMMM    MMMMMM  MMMMMM    MMMM    MM    MM  
//  MM    MM  MM    MM  MMMM  MMMM        MM    MM  MM    MM  MM        MM    MM    MM      MM    MM    MM  MMMM  MM  
//  MM    MM  MM    MM  MM  MM  MM        MM        MMMMMM    MMMMMMMM  MMMMMMMM    MM      MM    MM    MM  MM  MMMM  
//  MM    MM  MM    MM  MM      MM        MM        MM    MM  MM        MM    MM    MM      MM    MM    MM  MM    MM  
//  MM    MM  MM    MM  MM      MM        MM    MM  MM    MM  MM        MM    MM    MM      MM    MM    MM  MM    MM  
//  MMMMMM      MMMM    MM      MM          MMMM    MM    MM  MMMMMMMM  MM    MM    MM    MMMMMM    MMMM    MM    MM  








function addResultTable(elem) {
    let num = playerRoster.length + 1;
    let newElem = document.createElement('div');

    // applyCSS(newElem, style.table);
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




