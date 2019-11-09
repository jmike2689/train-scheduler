var firebaseConfig = {
    apiKey: "AIzaSyAXq_y0JVVRdwzpQEbUiZZvBEdDasEhHro",
    authDomain: "train-scheduler-cfc41.firebaseapp.com",
    databaseURL: "https://train-scheduler-cfc41.firebaseio.com",
    projectId: "train-scheduler-cfc41",
    storageBucket: "train-scheduler-cfc41.appspot.com",
    messagingSenderId: "468475102098",
    appId: "1:468475102098:web:64e528a4aa07c88292374b",
    measurementId: "G-6TV8278R8L"
};

firebase.initializeApp(firebaseConfig);

var trainData = firebase.database();

$("#add-train-btn").on("click", function () {
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrain = moment($("#first-train-input").val().trim(), "HH:mm").subtract(10, "years").format("X");
    var frequency = $("#frequency-input").val().trim();

    var newTrain = {
        name: trainName,
        destination: destination,
        fristTrain: firstTrain,
        frequency: frequency
    }

    trainData.ref().push(newTrain);

    alert("Train Added!");

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");

    return false;
});

trainData.ref().on("child_added", function (snapshot) {
    var name = snapshot.val().name;
    var destination = snapshot.val().destination;
    var frequency = snapshot.val().frequency;
    var firstTrain = snapshot.val().firstTrain;

    //Unable to get the time to appear correctly. Keep getting NaN when ran in console. 
    var remainder = moment().diff(moment.unix(firstTrain), "minutes") % frequency;
    var minutes = frequency - remainder;
    var arrival = moment().add(minutes, "m").format("hh:mm A");

    console.log(remainder);
    console.log(minutes);
    console.log(arrival);

    $("#train-table > tBody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + arrival + "</td><td>" + minutes + "</td></tr>");

    //Alternate option that as tried to make data come onto screen. Was unsuccessful.

    // var newRow = $("<tr>").append(
    //     $("<td>").text(trainName),
    //     $("<td>").text(destination),
    //     $("<td>").text(frequency),
    //     $("<td>").text(arrival),
    //     $("<td>").text(minutes)
    // );

    // $("#train-table > tbody").append(newRow);
});