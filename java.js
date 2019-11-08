var firebaseConfig = {
    apiKey: "AIzaSyAXq_y0JVVRdwzpQEbUiZZvBEdDasEhHro",
    authDomain: "train-scheduler-cfc41.firebaseapp.com",
    databaseURL: "https://train-scheduler-cfc41.firebaseio.com",
    projectId: "train-scheduler-cfc41",
    storageBucket: "train-scheduler-cfc41.appspot.com",
};

firebase.initializeApp(firebaseConfig);

var database = firebase.database();
// -----------------------------------------------

$("#add-train-btn").on("click", function(event){

    event.preventDefault();

    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();

})