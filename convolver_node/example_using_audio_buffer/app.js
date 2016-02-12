var sound = audioBatchLoader({
    drumLoop: "sounds/drum_loop.mp3"

}, function(sound) {
    var gain = audioContext.createGain();
    var reverb = audioContext.createConvolver();
    reverb.buffer = impulseResponseBuffer;
    gain.gain.value = 0.4;
    sound.connect(reverb);
    reverb.connect(gain);
    sound.connect(audioContext.destination);
    gain.connect(audioContext.destination);

});





$(function() {

    $(".loop").click(function() {
        sound.drumLoop.play();
    })


})