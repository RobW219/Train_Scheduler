var config = {
    apiKey: "AIzaSyDllZxMYgN2N8fltUiucUb5YyEWwavYxIk",
    authDomain: "project-c60c8.firebaseapp.com",
    databaseURL: "https://project-c60c8.firebaseio.com",
    projectId: "project-c60c8",
    storageBucket: "project-c60c8.appspot.com",
    messagingSenderId: "707034121615"
  };
firebase.initializeApp(config);
var database = firebase.database();

$("#add-train-btn").on("click", function(event) {
  event.preventDefault();
 
  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var trainStart = moment($("#start-input").val().trim(), "HH:mm").subtract(10, "years").format("X");
  var trainFrequency = $("#frequency-input").val().trim();
  console.log("trainStart", trainStart);

  var newTrain = {
    name: trainName,
    destination: trainDestination,
    start: trainStart,
    frequency: trainFrequency
  };
 
  database.ref().push(newTrain);
 
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.start);
  console.log(newTrain.frequency);
 
  alert("Train Successfully Added");
 
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#start-input").val("");
  $("#frequency-input").val("");
});

database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainStart = childSnapshot.val().start;
  var trainFrequency = childSnapshot.val().frequency;

  console.log(trainName);
  console.log(trainDestination);
  console.log(trainStart);
  console.log(trainFrequency);

  // var trainStartPretty = moment(trainStart).format("ddd, hA");

  // var startTime = moment($('#start-input').val().trim(), 'HH:mm').format('X');
        // Generate the Next Train time and minutes to Arrival
            var remainder = moment().diff(moment.unix(trainStart),"minutes")%trainFrequency;
            console.log('Remainder: ', remainder);
            var minutes = trainFrequency - remainder;
            console.log(minutes);
            var arrival = moment().add(minutes,'m').format('hh:mm A');
            console.log(arrival);
  // var trainNext = moment().diff(moment.unix(trainStart, "mm"), "minutes");
  // console.log(trainNext);

  // var trainNext2 = (trainStart + parseInt(trainFrequency));
  // console.log(trainNext2);

  // var trainNext = (trainTimes * trainFrequency);
  // console.log(trainNext);

  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
  trainFrequency + "</td><td>" + arrival + "</td><td>" + minutes + "</td></tr>");
});
