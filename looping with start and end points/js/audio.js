var audioContext = new AudioContext();



function audioFileLoader(fileDirectory, numberOfOscillators, callback) {

    var oscillatorArr = [];
    var loadedSound = undefined;
    var soundObj = {};




    soundObj.fileDirectory = fileDirectory;
    var getSound = new XMLHttpRequest();
    getSound.open("GET", soundObj.fileDirectory, true);
    getSound.responseType = "arraybuffer";
    getSound.onload = function() {
        audioContext.decodeAudioData(getSound.response, function(buffer) {
            soundObj.soundToPlay = buffer;

        });
    }


    //__________________________________BEGIN check that audio buffer reference is a string (and not a function).
    if (typeof fileDirectory === "string") {
        getSound.send();
    }


    //__________________________________END check that audio buffer reference is a string (and not a function).

    soundObj.play = function(time, setStart, setDuration) {
        oscillatorArr = [];
        loadedSound = audioContext.createBufferSource();
        soundFileLength = soundObj.soundToPlay.duration
        if (soundObj.soundToPlay !== undefined) {
            loadedSound.buffer = soundObj.soundToPlay;
            loadedSound.start(audioContext.currentTime + time || 0, setStart || 0, setDuration || soundObj.soundToPlay.duration);
        }



        //___BEGIN create oscillators
        for (var i = 0; i < numberOfOscillators; i += 1) {
            oscillatorArr.push(audioContext.createOscillator())
        }

        //___END create oscillators

        //___BEGIN start oscillators playing
        for (var i = 0; i < oscillatorArr.length; i += 1) {
            oscillatorArr[i].start(audioContext.currentTime + time || 0);
        }
        //___END start oscillators playing

        if (typeof callback === "function") {
            return callback(loadedSound, oscillatorArr)
        } else {
            return loadedSound.connect(audioContext.destination)
        }
    }

    soundObj.stop = function(time) {


        if (soundObj.soundToPlay !== undefined) {
            loadedSound.stop(audioContext.currentTime);
        }

        //____BEGIN stop oscillators playing
        for (var i = 0; i < oscillatorArr.length; i += 1) {
            oscillatorArr[i].stop(audioContext.currentTime + time || 0);
        }
        //____END stop oscillators playing
    }
    return soundObj;
};


function audioBatchLoader(obj) {

    var arrayFromObj = [];
    //________________________________________________________BEGIN converted object to array
    for (var prop in obj) {
        arrayFromObj.push(obj[prop]);
    }
    //________________________________________________________END converted object to array


    //________________________________________________________BEGIN error check. Array should only have 1 function, if more then throw error
    function badInputCheck(arr) {
        var functionHolder = arr.filter(function(val) {
            if (typeof val === "function") {
                return val
            }
        })
        if (functionHolder.length > 1) {
            throw new Error("AudioLoader: Only one method can be used")
        }
    }
    badInputCheck(arrayFromObj);
    //________________________________________________________END error check.

    //________________________________________________________BEGIN find function and swap position with first index of array

    var previousFirstIndex = arrayFromObj[0];
    for (var i = 0; i < arrayFromObj.length; i += 1) {
        if (typeof arrayFromObj[i] === "function") {
            arrayFromObj[0] = arrayFromObj[i];
            arrayFromObj[i] = previousFirstIndex;
        }

    }


    //________________________________________________________END find function and swap position with first index of array

    //___________________________________________BEGIN find osc number 

    var numberOfOscillators = undefined;
    for (var i = 0; i < arrayFromObj.length; i += 1) {
        if (typeof arrayFromObj[i] === "number") {
            numberOfOscillators = arrayFromObj[i]

        }
    }
    //____________________________________________END find osc number

    for (prop in obj) {
        obj[prop] = audioFileLoader(obj[prop], numberOfOscillators, arrayFromObj[0]) //___Place function as callback

    }
    return obj

}