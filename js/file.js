alert("Welcome")

// Date code 
var today = moment();
$("#currentDay").text(today.format("dddd, MMMM Do"));

// creating a timeschedule object for storage in the local storage
var timeschedule = {
    "9": [],
    "10": [],
    "11": [],
    "12": [],
    "13": [],
    "14": [],
    "15": [],
    "16": [],
    "17": []
};

var settimeschedule = function () {
    // add timeschedule to localStorage 
    localStorage.setItem("timeschedule", JSON.stringify(timeschedule));
}

var gettimeschedule = function () {

    var loadedtimeschedule = JSON.parse(localStorage.getItem("timeschedule"));
    if (loadedtimeschedule) {
        timeschedule = loadedtimeschedule

        $.each(timeschedule, function (hour, task) {
            var hourDiv = $("#" + hour);
            createTask(task, hourDiv);
        })
    }

    audittimeschedule()
}
var createTask = function (taskText, hourDiv) {
    //create a task in the row that corresponds to the specified hour 

    var taskDiv = hourDiv.find(".task");
    var taskP = $("<p>")
        .addClass("description")
        .text(taskText)
    taskDiv.html(taskP);
}

var audittimeschedule = function () {

    // update row based on time of the day

    var currentHour = moment().hour();
    $(".task-info").each(function () {
        var elementHour = parseInt($(this).attr("id"));

        // This code takes care of the past, present, and future
        if (elementHour < currentHour) {
            $(this).removeClass(["present", "future"]).addClass("past");
        }
        else if (elementHour === currentHour) {
            $(this).removeClass(["past", "future"]).addClass("present");
        }
        else {
            $(this).removeClass(["past", "present"]).addClass("future");
        }
    })
};


var replaceTextarea = function (textareaElement) {

    // Create variable for neccessary element
    var taskInfo = textareaElement.closest(".task-info");
    var textArea = taskInfo.find("textarea");

    // declare variable for time and text
    var time = taskInfo.attr("id");
    var text = textArea.val().trim();

    timeschedule[time] = [text];
    settimeschedule();

    createTask(text, taskInfo);
}

// CLICK HANDLERS 

$(".task").click(function () {

    $("textarea").each(function () {
        replaceTextarea($(this));
    })

    // convert to a textarea element if the time hasn't passed
    var time = $(this).closest(".task-info").attr("id");
    if (parseInt(time) >= moment().hour()) {

        // create a textInput element that includes the current task
        var text = $(this).text();
        var textInput = $("<textarea>")
            .addClass("form-control")
            .val(text);

        // add the textInput element to the parent div
        $(this).html(textInput);
        textInput.trigger("focus");
    }
})

// save button click handler
$(".saveBtn").click(function () {
    replaceTextarea($(this));
})

// update the hour
timeToHour = 3600000 - today.milliseconds();
setTimeout(function () {
    setInterval(audittimeschedule, 3600000)
}, timeToHour);

// get the timeschedule from localStorage on load.
gettimeschedule();