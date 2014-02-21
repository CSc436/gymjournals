$(document).foundation();

/*
 *
 *
 */
function getUser(){
    $.ajax({
    url: 'http://localhost:8000/api/users',
    dataType: 'json',
    success: function( data ) {
        $.each(data, function( i, item ){
            $("body").append( item +"\n" );
        });
    },
    error: function( data ) {
        console.log( data );
        proccessError( data, 400, "Not able to get user information" );
    }
  });
}

function proccessError ( XHR, status, message ) {
    //window.location.href = "error.html";
    $("body").empty();
    $("body").append(status +"\n");
    $("body").append(message +"\n");
}