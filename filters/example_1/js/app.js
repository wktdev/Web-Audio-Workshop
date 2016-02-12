$(function() {

    var sliderParams64Hz = {
        'orientation': "vertical",
        'range': "min",
        'min': -30,
        'max': 30,
        'animate': true,
        'step': 0.01,
        'slide': function(event, ui) {
            window.filter1.gain.value = ui.value;

        },
        'stop': function(event, ui) {
            console.log(window.filter1.gain.value);
        }
    };

    $('#filter64Hz').slider(sliderParams64Hz);

    var sliderParams150Hz = {
        'orientation': "vertical",
        'range': "min",
        'min': -30,
        'max': 30,
        'animate': true,
        'step': 0.01,
        'slide': function(event, ui) {
            window.filter2.gain.value = ui.value;

        },
        'stop': function(event, ui) {
            console.log(window.filter2.gain.value);
        }
    };

    $('#filter150Hz').slider(sliderParams150Hz);







    var sliderParams350Hz = {
        'orientation': "vertical",
        'range': "min",
        'min': -30,
        'max': 30,
        'animate': true,
        'step': 0.01,
        'slide': function(event, ui) {
            window.filter3.gain.value = ui.value;

        },
        'stop': function(event, ui) {
            console.log(window.filter3.gain.value);
        }
    };

    $('#filter350Hz').slider(sliderParams350Hz);



    var sliderParams1000Hz = {
        'orientation': "vertical",
        'range': "min",
        'min': -30,
        'max': 30,
        'animate': true,
        'step': 0.01,
        'slide': function(event, ui) {
            window.filter4.gain.value = ui.value;

        },
        'stop': function(event, ui) {
            console.log(window.filter4.gain.value);
        }
    };

    $('#filter1000Hz').slider(sliderParams1000Hz);




    var sliderParams2000Hz = {
        'orientation': "vertical",
        'range': "min",
        'min': -30,
        'max': 30,
        'animate': true,
        'step': 0.01,
        'slide': function(event, ui) {
            window.filter5.gain.value = ui.value;

        },
        'stop': function(event, ui) {
            console.log(window.filter5.gain.value);
        }
    };

    $('#filter2000Hz').slider(sliderParams2000Hz);


    var sliderParams6000Hz = {
        'orientation': "vertical",
        'range': "min",
        'min': -30,
        'max': 30,
        'animate': true,
        'step': 0.01,
        'slide': function(event, ui) {
            window.filter6.gain.value = ui.value;

        },
        'stop': function(event, ui) {
            console.log(window.filter6.gain.value);
        }
    };

    $('#filter6000Hz').slider(sliderParams6000Hz);


    var sliderParams12000Hz = {
        'orientation': "vertical",
        'range': "min",
        'min': -30,
        'max': 30,
        'animate': true,
        'step': 0.01,
        'slide': function(event, ui) {
            window.filter7.gain.value = ui.value;

        },
        'stop': function(event, ui) {
            console.log(window.filter7.gain.value);
        }
    };

    $('#filter12000Hz').slider(sliderParams12000Hz);

})