"use strict";




// _________________________________________________________________
// _______________________ SOUNDS __________________________________
// _________________________________________________________________

function defineSound( src, preload = 'auto', controls = 'none' ) {
    let elem = document.createElement('audio');
        elem.src = src;
        elem.type = 'audio/ogg';
        elem.autoplay = false;
        elem.loop = false;
        elem.setAttribute('preload', preload);
        elem.setAttribute('controls', controls);
        elem.style.display = 'none';
    this.play = () => {
        elem.play();
    }
}








// _________________________________________________________________
// _______________________ TIME ____________________________________
// _________________________________________________________________


function nowInSeconds() { return Math.floor(Date.now()/1000); }

function futureInSeconds( sec ) { return nowInSeconds() + sec; }

function secondsToStr( sec ) {
    let time = new Date(0, 0, 0, 0, Math.floor(sec/60), sec%60 );
    return time.toTimeString().substr(3, 5);
}








// _________________________________________________________________
// _______________________ EFFECTS _________________________________
// _________________________________________________________________

function addFlashLayer( elem, color = 'red') {
    let position = $(elem).css('position');
    let overflow = $(elem).css('overflow');    
    $(elem).css('position', 'relative');
    $(elem).css('overflow', 'hidden');
    let newElem = document.createElement('div');
        newElem.style.position = 'absolute';
        newElem.style.background = color;
        newElem.style.left = '0%';
        newElem.style.top = '0%';
        newElem.style.width = '100%';
        newElem.style.height = '100%';
        newElem.style.opacity = 0.8;
        $(newElem).animate({opacity: 0}, 400 );
    $(elem).append(newElem);
    setTimeout( () => {
        newElem.remove();
    }, 1000);
    $(elem).css('position', position);
    $(elem).css('overflow', overflow);
}




// _________________________________________________________________
// _______________________ STRINGS _________________________________
// _________________________________________________________________

function strCamelize(str) {
    return str.replace(/-./g, function(ex) { return ex.charAt(1).toUpperCase(); });
}

function strDecamelize(str) {
    return str.replace(/[A-Z]/g, function(ex) { return '-' + ex.toLowerCase(); });
}









// _________________________________________________________________
// _______________________ SHORTCUTS _______________________________
// _________________________________________________________________



function toggle( x, st1, st2 ) {
    x = (x==st1) ? st2 : st1;
    return x;
}






