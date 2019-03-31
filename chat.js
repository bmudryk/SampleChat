var socket = io();
$(() => {
    $("#send").click(() => {
        sendMessage({ name: $("#name").val(), message: $("#message").val() });
    })
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

function addMessages(message) {
    $("#messages").append(`
        <div> 
            <span class="username">
                ${message.name}
            </span> 
            (${getFormattedDateTime()})
        </div>  
        <ul> 
            <li>${message.message}
        </ul>
    `)
    $("#messages").animate({scrollTop:$("#messages")[0].scrollHeight}, 1000);
}

function sendMessage(message) {
    // $.post('https://samplechatfsa.azurewebsites.net/messages', message)
    $.post('http://localhost:3000/messages', message)
}