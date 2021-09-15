console.log("Button js loaded");

var button = document.getElementById('button_both_paths');
button.classList.add('activebutton');
var visible_buttons = false;
$('.path_switcher')[0].style.opacity = 0;

$(function () {
    $('#button_both_paths').on('click', function (e) {
        console.log("button both click: default");
        RollDownTimepath('timepath',"100%")
        RollDownTimepath('timepath2',"100%")
        document.getElementById('distance-counter1').style.top= "42%";
        document.getElementById('nav-timepath1').style.top= "42%";
        document.getElementById('distance-counter1').style.opacity= "1.0";
        document.getElementById('distance-counter2').style.opacity= "1.0";
        document.getElementById('nav-timepath2').style.opacity= "1.0";
        document.getElementById('button_lower_path').classList.remove('activebutton');
        document.getElementById('button_upper_path').classList.remove('activebutton');
        document.getElementById('button_both_paths').classList.add('activebutton');
    });

    $('#button_lower_path').on('click', function (e) {
        RollUpTimepath('timepath')
        RollDownTimepath('timepath2', "100%")
        document.getElementById('distance-counter1').style.opacity= "0";
        document.getElementById('distance-counter2').style.opacity= "1.0";
        document.getElementById('nav-timepath1').style.opacity= "0";
        document.getElementById('nav-timepath2').style.opacity= "1.0";
        document.getElementById('button_upper_path').classList.remove('activebutton');
        document.getElementById('button_both_paths').classList.remove('activebutton');
        document.getElementById('button_lower_path').classList.add('activebutton');
    });

    $('#button_upper_path').on('click', function (e) {
        RollUpTimepath('timepath2')
        RollDownTimepath('timepath',"100%")
        document.getElementById('distance-counter1').style.top= "92%";
        document.getElementById('nav-timepath1').style.top= "92%";
        document.getElementById('distance-counter1').style.opacity= "1.0";
        document.getElementById('distance-counter2').style.opacity= "0";
        document.getElementById('nav-timepath1').style.opacity= "1.0";
        document.getElementById('nav-timepath2').style.opacity= "0";
        document.getElementById('button_lower_path').classList.remove('activebutton');
        document.getElementById('button_both_paths').classList.remove('activebutton');
        document.getElementById('button_upper_path').classList.add('activebutton');
    });

});

function RollUpTimepath(element){
    document.getElementById(element).style.height = "0%";
    //document.getElementById(element).style.visibility = 'hidden';
    document.getElementById(element).style.flexBasis = "auto";
    document.getElementById(element).style.opacity = 0;
}

function RollDownTimepath(element, height){
    document.getElementById(element).style.opacity = 1.0;
    document.getElementById(element).style.height = height;
    document.getElementById(element).style.flexBasis = "auto";
    //document.getElementById(element).style.visibility = 'visible';
}

function HideElement(){

}

function ShowElement(){

}

$(window).scroll(function () {
    /* Check the location of each desired element */
    $('.path_switcher').each(function (i) {
        var obj_left = window.pageXOffset;
        var offset = $(window).width();

        /* If the object is completely visible in the window, fade it it */
        if (offset < obj_left && visible_buttons == false) {
            visible_buttons = true;
            $('.path_switcher')[0].style.opacity = 1.0;
        }

        if (offset > obj_left && visible_buttons) {
            visible_buttons = false
            $('.path_switcher')[0].style.opacity = 0;
        }
    });
});