var sound = audioBatchLoader({
    snare: "sounds/snare.mp3",
    drumloop: "sounds/drum_loop.mp3"

});




$(function() {

    $(".snare").click(function() {
        sound.snare.play();
    })

    $(".loop").click(function() {
        sound.drumloop.play();
    })


})




/*


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

    $(".loop").click(function() {
        loop.drumloop.play();
    })


})

*/