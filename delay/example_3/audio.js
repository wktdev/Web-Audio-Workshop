"use strict"


var audioContext = new AudioContext()

var audioBuffer;

var getSound = new XMLHttpRequest();
getSound.open("get", "snare.mp3", true);
getSound.responseType = "arraybuffer";

getSound.onload = function() {
    audioContext.decodeAudioData(getSound.response, function(buffer) {
        audioBuffer = buffer;
    });
};

getSound.send();


window.addEventListener("mousedown", playback);

function playback() {
    var sound = audioContext.createBufferSource();

    var delayLeft = audioContext.createDelay();
    var delayGainLeft = audioContext.createGain();
    var panDelayLeft = audioContext.createStereoPanner();
    panDelayLeft.pan.value = 1;
    sound.buffer = audioBuffer;
    sound.connect(delayLeft);
    delayLeft.connect(delayGainLeft);
    delayGainLeft.connect(delayLeft);
    delayGainLeft.connect(panDelayLeft);
    delayLeft.delayTime.value = 0.25;
    delayGainLeft.gain.value = 0.6;
    panDelayLeft.connect(audioContext.destination);




    var delayRight = audioContext.createDelay();
    var delayGainRight = audioContext.createGain();
    var panDelayRight = audioContext.createStereoPanner();
    panDelayRight.pan.value = -1;
    sound.connect(delayRight);
    delayRight.connect(delayGainRight);
    delayGainRight.connect(delayRight);
    delayGainRight.connect(panDelayRight);
    delayRight.delayTime.value = 2.3;
    delayGainRight.gain.value = 0.4;
    panDelayRight.connect(audioContext.destination);


    sound.connect(audioContext.destination);
    sound.start(audioContext.currentTime);
}