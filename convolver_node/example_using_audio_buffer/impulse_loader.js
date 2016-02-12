"use strict"


var audioContext = new AudioContext()

var impulseResponseBuffer;

var getSound = new XMLHttpRequest();
getSound.open("get", "sounds/impulse.wav", true);
getSound.responseType = "arraybuffer";

getSound.onload = function() {
    audioContext.decodeAudioData(getSound.response, function(buffer) {
        impulseResponseBuffer = buffer;
    });
};


getSound.send();