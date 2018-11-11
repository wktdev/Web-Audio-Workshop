"use strict";

var audioContext = new AudioContext(),
    futureTickTime = audioContext.currentTime,
    counter = 1,
    tempo = 120,
    secondsPerBeat = 60 / tempo,
    counterTimeValue = (secondsPerBeat / 4),
    timerID = undefined,
    isPlaying = false;


//_____________________________________________BEGIN load sound samples
let kickBuffer;
loadKick('sounds/kick.mp3');

function loadKick(url) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function() {
        audioContext.decodeAudioData(xhr.response, function(decoded) {
            kickBuffer = decoded;
        });
    }
    xhr.send();
}

function playKick(time) {
    let source = audioContext.createBufferSource();
    source.connect(audioContext.destination);
    source.buffer = kickBuffer;
    source.start(audioContext.currentTime + time);
}


//_____________________________________________END load sound samples


//_____________________________________________BEGIN this math determines the future tick time
//_____________________________________________based on BPM and/or division (1/4, 1/8 1/16, 1/32 etc...)
function playTick(bpm, note) {
    secondsPerBeat = 240 / bpm;
    counterTimeValue = (secondsPerBeat / note);
    console.log(counterTimeValue + " counter time value");
    console.log("This is 4th note: " + counter);
    counter += 1;
    futureTickTime += counterTimeValue;
    if (counter > 16) {
        counter = 1;
    }
}



function scheduler() {
    if (futureTickTime < audioContext.currentTime + 0.1) {
        playKick(futureTickTime - audioContext.currentTime);
        console.log(audioContext.currentTime);
        console.log(futureTickTime);
        playTick(96, 4); // 96 BPM at 1/4 note
    }

    timerID = window.setTimeout(scheduler, 0);
}


function play() {
    isPlaying = !isPlaying;

    if (isPlaying) {
        counter = 1;
        futureTickTime = audioContext.currentTime;
        scheduler();
    } else {
        window.clearTimeout(timerID);

    }
}



var playStop = document.getElementsByClassName("play-stop-button")[0];

playStop.addEventListener("click",function(){
    play();
})