$(function() {
    $(".freqDial").knob({

        change: function(valueFreqDial) {
            parametricEQ1.frequency.value = valueFreqDial;


        }
    });

    $(".bandwidthDial").knob({

        change: function(valueBandwidthDial) {
            parametricEQ1.Q.value = valueBandwidthDial;

        }
    });

    $(".gainDial").knob({

        change: function(valueGainDial) {
            parametricEQ1.gain.value = valueGainDial;


        }
    });


})