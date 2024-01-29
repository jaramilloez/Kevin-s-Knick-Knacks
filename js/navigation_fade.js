$(document).ready(function(){
    $('nav a, footer a, button').hover(
        function(){
            $(this).fadeTo(150, 0.3);
        },
        function(){
            $(this).fadeTo(150, 1);
        }
    );
});