var socket = io();
$(() => {
    $("#send").click(() => {
        sendMessage({ name: $("#name").val(), message: $("#message").val() });
        $("#message").val("");
    })

    $("#message").prop("disabled", true);
    $("#save").click(() => {
        if ($("#name").val() === "" || $("#save").text() === "Edit") {
            $("#message").prop("disabled", true);
            $("#name").prop("disabled", false);
        }
        else {
            $("#message").prop("disabled", false);
            $("#name-group").hide();
            $("#name-label").text($("#name").val());
        }
    })

    $('#message').keypress((event) => {
        var key = event.which;
        if (key == 13)  // the enter key code
        {
            $("#send").click();
            return false;
        }
    });
})

socket.on('message', addMessages)

function getFormattedDateTime() {
    var today = new Date();

    // Format time
    var hours = today.getHours();
    hours = hours > 0 ? hours : 12; // the hour '0' should be '12'
    var minutes = today.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    var time = `${hours}:${minutes} ${ampm}`;

    // Format date
    // var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    // var date = `${months[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`;
    
    // return `${date}  ${time}`; 
    return `Today  ${time}`; 
}

function isMe(name) {
    if ($("#name-label").text() === name) {
        return "me";
    }
    return "someone-else";
}

function addMessages(message) {
    $("#messages").append(`
        <div class="${isMe(message.name)}">
            <div class="username"> 
                <span>
                    ${message.name}
                </span> 
                (${getFormattedDateTime()})
            </div>  
            <div class="bubble"> 
                <ul> 
                    <li>${message.message}
                </ul>
            </div> 
        </div>
    `)
    $("#messages").animate({scrollTop:$("#messages")[0].scrollHeight}, 1000);
}

function sendMessage(message) {
    $.post('https://fullsteamaheadchat.azurewebsites.net/messages', message)
    // $.post('http://localhost:3000/messages', message)
}