"use strict";
var audioContext = new AudioContext();

window.onload = function() {
    var onOff = document.getElementById("on-off");
    var span = document.getElementsByTagName("span")[0];
    var freqSliderVal = document.getElementsByTagName("input")[1].value;
    var osc = false;









    //_________________________________________BEGIN set selected waveform type value

    var selectedWaveform = "sawtooth";
    //_________________________________________END set selected waveform type value


    //_________________________________________BEGIN select all <li> elements
    var waveformTypes = document.getElementsByTagName('li');
    console.log(waveformTypes);
    //_________________________________________END select all <li> elements







    //_________________________________________BEGIN callback to select <li> by id and assign id name to selectWaveform
    function select() {
        selectedWaveform = document.getElementById(this.id).id;

        //_____________________________________BEGIN select element by id
        var selectedWaveformElement = document.getElementById(this.id);
        //_____________________________________END select element by id
        console.log(selectedWaveform);

        //_____________________________________BEGIN remove any previously added selected-waveform classes

        for (var i = 0; i < waveformTypes.length; i += 1) {
            waveformTypes[i].classList.remove("selected-waveform");
        }
        //_____________________________________END remove any previously added selected-waveform classes


        //_____________________________________BEGIN add the selected-waveform class to the selected element
        selectedWaveformElement.classList.add("selected-waveform");
        //_____________________________________END add the selected-waveform class to the selected element

    }

    //_________________________________________END callback to select <li> by id and assign id name to selectWaveform



    //_________________________________________BEGIN loop through all <li> elements and set a click eventListener on them

    for (var i = 0; i < waveformTypes.length; i++) {
        waveformTypes[i].addEventListener('click', select);
    }

    //_________________________________________END loop through all <li> elements and set a click eventListener on them




    setInterval(function() {

        if (!osc) {

            console.log("Oscillator is stopped. Waiting for oscillator to start");

        } else {

            freqSliderVal = document.getElementsByTagName("input")[1].value;
            osc.frequency.value = freqSliderVal;
            console.log("Oscillator is playing. Frequency value is " + freqSliderVal);
            osc.type = selectedWaveform;
        }


    }, 50);





    onOff.addEventListener("click", function() {



        if (!osc) {
            osc = audioContext.createOscillator();
            osc.type = selectedWaveform;
            osc.frequency.value = freqSliderVal;
            osc.connect(audioContext.destination);
            osc.start(audioContext.currentTime);
            onOff.value = "stop";
            span.innerHTML = "Click to stop oscillator";
        } else {

            osc.stop(audioContext.currentTime);
            osc = false;
            onOff.value = "start";
            span.innerHTML = "Click to start oscillator";
        }
    });

};