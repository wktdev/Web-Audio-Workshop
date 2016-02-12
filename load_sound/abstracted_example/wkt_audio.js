var audioContext = new AudioContext();

function audioFileLoader(fileDirectory, callback) {
    var soundObj = {};
    var loadedSound = undefined;
    soundObj.fileDirectory = fileDirectory;
    var getSound = new XMLHttpRequest();
    getSound.open("GET", soundObj.fileDirectory, true);
    getSound.responseType = "arraybuffer";
    getSound.onload = function() {

        audioContext.decodeAudioData(getSound.response, function(buffer) {
            soundObj.soundToPlay = buffer;

        });
    }

    getSound.send();

    soundObj.play = function(time) {
        loadedSound = audioContext.createBufferSource();
        loadedSound.buffer = soundObj.soundToPlay;
        loadedSound.start(audioContext.currentTime + time || 0);
        return loadedSound.connect(audioContext.destination) || callback(loadedSound);
    }

    soundObj.stop = function() {
        loadedSound.stop(audioContext.currentTime);
    }

    return soundObj;
};

function audioBatchLoader(obj, callback) {

    for (prop in obj) {
        obj[prop] = audioFileLoader(obj[prop], callback);
    }
    return obj
}



/*_________________________________________BEGIN Example


var sound = audioBatchLoader({
    snare: "sounds/snare.mp3"

}, function(sound) {
    var gain = audioContext.createGain();
    gain.gain.value = 0.3;
    sound.connect(gain);
    gain.connect(audioContext.destination);

});



var loop = audioBatchLoader({
    drumloop: "sounds/drum_loop.mp3"

}, function(drumloop) {

    var gain = audioContext.createGain();
    gain.gain.value = 0.3;
    drumloop.connect(gain);
    gain.connect(audioContext.destination);
    drumloop.loop = true;
    drumloop.loopStart = 0;
    drumloop.loopEnd = 1.93;

});


$(function() {

    $(".snare").click(function() {
        sound.snare.play();
    })

    $(".loop").click(function() {
        loop.drumloop.play();
    })
})

//__________________________________________END Example*/