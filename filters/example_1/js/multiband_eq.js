"use strict";

var filter1 = audioContext.createBiquadFilter();
filter1.type = "peaking"; //______Do not let user modify. This is a graphic EQ!
filter1.gain.value = 0;
filter1.Q.value = 1; //___________Do not let user modify. This is a graphic EQ!
filter1.frequency.value = 64; //__Do not let user modify. This is a graphic EQ!

var filter2 = audioContext.createBiquadFilter();
filter2.type = "peaking"; //______Do not let user modify. This is a graphic EQ
filter2.gain.value = 0;
filter2.Q.value = 1; //___________Do not let user modify. This is a graphic EQ!
filter2.frequency.value = 150; //_Do not let user modify. This is a graphic EQ!

var filter3 = audioContext.createBiquadFilter();
filter3.type = "peaking"; //______Do not let user modify. This is a graphic EQ!
filter3.gain.value = 0;
filter3.Q.value = 1; //___________Do not let user modify. This is a graphic EQ!
filter3.frequency.value = 350; //_Do not let user modify. This is a graphic EQ!

var filter4 = audioContext.createBiquadFilter();
filter4.type = "peaking"; //______Do not let user modify. This is a graphic EQ!
filter4.gain.value = 0;
filter4.Q.value = 1; //___________Do not let user modify. This is a graphic EQ!
filter4.frequency.value = 1000; //Do not let user modify. This is a graphic EQ!

var filter5 = audioContext.createBiquadFilter();
filter5.type = "peaking"; //______Do not let user modify. This is a graphic EQ!
filter5.gain.value = 0;
filter5.Q.value = 1; //___________Do not let user modify. This is a graphic EQ!
filter5.frequency.value = 2000; //Do not let user modify. This is a graphic EQ!


var filter6 = audioContext.createBiquadFilter();
filter6.type = "peaking"; //______Do not let user modify. This is a graphic EQ!
filter6.gain.value = 0;
filter6.Q.value = 1; //___________Do not let user modify. This is a graphic EQ!
filter6.frequency.value = 6000; //Do not let user modify. This is a graphic EQ!

var filter7 = audioContext.createBiquadFilter();
filter7.type = "peaking"; //______Do not let user modify. This is a graphic EQ!
filter7.gain.value = 0;
filter7.Q.value = 1; //___________Do not let user modify. This is a graphic EQ!
filter7.frequency.value = 12000; //Do not let user modify. This is a graphic EQ!


function multibandEQ(inputConnection, outputConnection) {


    inputConnection.connect(filter1);
    filter1.connect(filter2);
    filter2.connect(filter3);
    filter3.connect(filter4);
    filter4.connect(filter5);
    filter5.connect(filter6);
    filter6.connect(filter7);
    filter7.connect(outputConnection);

}