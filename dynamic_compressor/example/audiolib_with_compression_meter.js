function audioFileLoader(fileDirectory) {
    var soundObj = {};
    var compressor = audioContext.createDynamicsCompressor();
    var cachedMeterValue = undefined;

    function compReductionMeter() {
        cachedMeterValue = $(".compression-meter").height();
        var reduction = compressor.reduction.value;
        var bar = $(".compression-meter");
        bar.height((-1 * reduction) + "%");
        requestAnimationFrame(compReductionMeter);
    };

    window.setInterval(function() {
        if ($(".compression-meter").height() == cachedMeterValue) {
            $(".compression-meter").css("display", "none");
        };
    }, 2000);

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


    soundObj.play = function() {

        $(".compression-meter").css("display", "block");
        compressor.threshold.value = -80;
        compressor.ratio.value = 3;
        var playSound = audioContext.createBufferSource();
        playSound.buffer = soundObj.soundToPlay;
        playSound.connect(compressor);
        var gain = audioContext.createGain();
        compressor.connect(gain);
        gain.gain.value = 0;
        gain.connect(audioContext.destination)
        compressor.connect(audioContext.destination);
        playSound.start(audioContext.currentTime);
        console.log(compressor.reduction.value);
        compReductionMeter()

    };


    return soundObj;

};




var drumLoop = audioFileLoader("drum_loop.mp3");
window.addEventListener("keydown", drumLoop.play, false);