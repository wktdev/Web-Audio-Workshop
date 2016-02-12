$(function() {

    var audioContext = new AudioContext();
    var oscillator;
    var val;
    var frequencyValue = 20;



    var valueFreqDial = document.getElementById("freqDial").value;

    $(".dial").knob({

        change: function(valueFreqDial) {
            frequencyValue = valueFreqDial;
        }
    });



    $("#pad").on("mousedown", function() {
        oscillator = audioContext.createOscillator();
        volume = audioContext.createGain();
        volume.gain.value = 1;
        oscillator.frequency.value = frequencyValue;
        oscillator.type = "sawtooth";
        oscillator.connect(volume); // Connects it to output
        volume.connect(audioContext.destination);
        oscillator.start(audioContext.currentTime);
    })


    $("#pad").on("mouseup", function() {
        oscillator.stop(audioContext.currentTime);

    })


});