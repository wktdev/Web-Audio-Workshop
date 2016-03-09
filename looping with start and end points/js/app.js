var loopStartVal = 0;
var loopEndVal = 0;

var appSounds = {
    loop: "sounds/drums.mp3", // ________________________________Audio file directory
    count: "sounds/count.mp3", // ___________________________________Audio file directory

    nodes: function nodeGraph(sound, osc) {
        sound.loop = true;
        sound.loopStart = loopStartVal;
        sound.loopEnd = loopEndVal;
        sound.connect(audioContext.destination)

    }
}




var sounds = audioBatchLoader(appSounds);
var startTimeVal = 0;
var startPointVal = 0;
var endPointVal = 0;
var soundFileLength = undefined;
var soundFileLengthFloor = undefined;
var playing = false;

$(function() {



    $(".transport-icon").on("click", function() {
        console.log("start time:" + startTimeVal);
        console.log("start point:" + startPointVal);
        console.log("end point:" + endPointVal);


        if (!playing) {
            playing = true;
            sounds.count.play(startTimeVal, startPointVal, endPointVal);
            $(".transport-icon").attr("src", "images/stop.png");
            $(".length-data").empty();
            $(".length-data").append("<b>" + soundFileLength + "</b>");

        } else {
            playing = false;
            sounds.count.stop();
            $(".transport-icon").attr("src", "images/play.png");
        }
        soundFileLengthFixed = soundFileLength.toFixed(1)


        $('#start-time-slider').slider("option", "max", soundFileLengthFixed);
        $('#start-point-slider').slider("option", "max", soundFileLengthFixed);
        $('#end-point-slider').slider("option", "max", soundFileLengthFixed);

    });








    var startTime = {
        'orientation': "vertical",
        'range': "min",
        'min': 0,
        'max': 0,
        'animate': true,
        'step': 0.01,
        'slide': function(event, ui) {
            startTimeVal = ui.value;


            $("#start-time-val").empty();
            $("#start-time-val").append(ui.value)

            playing = true;
            $(".transport-icon").attr("src", "images/stop.png");
            $(".length-data").empty();
            $(".length-data").append("<b>" + soundFileLength + "</b>");
            sounds.count.stop();
            sounds.count.play(startTimeVal, startPointVal, endPointVal);


        }
    };

    $('#start-time-slider').slider(startTime, soundFileLength);





    var startPoint = {
        'orientation': "vertical",
        'range': "min",
        'min': 0,
        'max': 0,
        'animate': true,
        'step': 0.01,
        'slide': function(event, ui) {
            startPointVal = ui.value;


            $("#start-point-val").empty();
            $("#start-point-val").append(ui.value)


            playing = true;
            $(".transport-icon").attr("src", "images/stop.png");
            $(".length-data").empty();
            $(".length-data").append("<b>" + soundFileLength + "</b>");

            loopStartVal = +ui.value;

            sounds.count.stop();
            sounds.count.play(startTimeVal, startPointVal, endPointVal);

        }


    };

    $('#start-point-slider').slider(startPoint);





    var endPoint = {

        'orientation': "vertical",
        'range': "min",
        'min': 0,
        'max': 0,
        'animate': true,
        'step': 0.01,
        'slide': function(event, ui) {
            endPointVal = ui.value;


            $("#end-point-val").empty();
            $("#end-point-val").append(ui.value)

            playing = true;
            $(".transport-icon").attr("src", "images/stop.png");
            $(".length-data").empty();
            $(".length-data").append("<b>" + soundFileLength + "</b>");
            loopEndVal = +ui.value;
            sounds.count.stop();
            sounds.count.play(startTimeVal, startPointVal, endPointVal);


        }
    };

    $('#end-point-slider').slider(endPoint);



})