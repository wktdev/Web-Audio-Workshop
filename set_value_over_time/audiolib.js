function audioFileLoader(fileDirectory) {
    var soundObj = {};
    soundObj.fileDirectory = fileDirectory;
    var playSound = audioContext.createBufferSource();
    var gainNode;

    var getSound = new XMLHttpRequest();
    getSound.open("GET", soundObj.fileDirectory, true);
    getSound.responseType = "arraybuffer";
    getSound.onload = function() {
        audioContext.decodeAudioData(getSound.response, function(buffer) {
            soundObj.soundToPlay = buffer;

        });
    }

    getSound.send();
    var gainNode = audioContext.createGain();
    gainNode.gain.value = 0.1;



    soundObj.play = function() {

        playSound.buffer = soundObj.soundToPlay;
        playSound.connect(gainNode);

        //_____Important! Sets the inital rampTime value
        gainNode.gain.setValueAtTime(gainNode.gain.value, audioContext.currentTime);
        //__________________________________________________________________________
        gainNode.connect(audioContext.destination);
        playSound.start(audioContext.currentTime);
    }

    soundObj.stop = function() {
        playSound.stop(audioContext.currentTime);
    }





    //_______________________________________________________________________________________RampToValue methods

    soundObj.setValueAtTime = function() {

        gainNode.gain.setValueAtTime(2.0, audioContext.currentTime + 3);

    }


    soundObj.changeUpExponentially = function() {

        gainNode.gain.exponentialRampToValueAtTime(2.0, audioContext.currentTime + 5);

    }

    soundObj.changeDownExponentially = function() {

        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 5);

    }

    soundObj.changeUpLinearly = function() {

        gainNode.gain.linearRampToValueAtTime(2.0, audioContext.currentTime + 5);

    }

    soundObj.changeDownLinearly = function() {

        gainNode.gain.linearRampToValueAtTime(0.01, audioContext.currentTime + 5);

    }

    soundObj.changeTargetAtTime = function() {

        gainNode.gain.setTargetAtTime(1.0, audioContext.currentTime + 1, 0.5);
    }


    soundObj.changeCustom = function() {

        gainNode.gain.setValueCurveAtTime(waveArray, audioContext.currentTime, 2);

    }




    var waveArray = new Float32Array(10);
    waveArray[0] = 0;
    waveArray[1] = 1;
    waveArray[2] = 0;
    waveArray[3] = 1;
    waveArray[4] = 0;
    waveArray[5] = 1;
    waveArray[6] = 0;
    waveArray[7] = 1;
    waveArray[8] = 0;
    waveArray[9] = 1;

    soundObj.cancel = function() {

        gainNode.gain.cancelScheduledValues(audioContext.currentTime);

    }



    //________________________________________________________________________________________END RampToValue methods






    return soundObj;

};