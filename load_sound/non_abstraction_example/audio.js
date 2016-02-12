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
    var playSound = audioContext.createBufferSource();
    playSound.buffer = audioBuffer;
    console.log(playSound.buffer.sampleRate);
    playSound.connect(audioContext.destination);
    playSound.start(audioContext.currentTime);
}