console.log("Button js loaded");

var button = document.getElementById('button_both_paths');
button.classList.add('activebutton');

$(function () {
    $('#button_both_paths').on('click', function (e) {
        console.log("button both click: default");
        document.getElementById('timepath').style.visibility = 'visible';
        document.getElementById('timepath2').style.visibility = 'visible';
        document.getElementById('timepath2').style.opacity = 1.0;
        document.getElementById('timepath').style.opacity = 1.0;
        document.getElementById('timepath2').style.height = "47.5%";
        document.getElementById('timepath').style.height = "47.5%";
        document.getElementById('button_lower_path').classList.remove('activebutton');
        document.getElementById('button_upper_path').classList.remove('activebutton');
        document.getElementById('button_both_paths').classList.add('activebutton');
    });

    $('#button_lower_path').on('click', function (e) {
        console.log("button lowr");

        document.getElementById('timepath2').style.height = "94.9%";
        document.getElementById('timepath2').style.visibility = 'visible';
        document.getElementById('timepath2').style.opacity = 1.0;
        document.getElementById('timepath').style.height = "0%";
        document.getElementById('timepath').style.visibility = 'hidden';
        document.getElementById('timepath').style.opacity = 0;
        document.getElementById('button_upper_path').classList.remove('activebutton');
        document.getElementById('button_both_paths').classList.remove('activebutton');
        document.getElementById('button_lower_path').classList.add('activebutton');
    });

    $('#button_upper_path').on('click', function (e) {
        console.log("button upper click");
        document.getElementById('timepath2').style.height = "0%";
        document.getElementById('timepath2').style.visibility = 'hidden';
        document.getElementById('timepath2').style.opacity = 0;
        document.getElementById('timepath').style.height = "94.9%";
        document.getElementById('timepath').style.visibility = 'visible';
        document.getElementById('timepath').style.opacity = 1.0;

        document.getElementById('button_lower_path').classList.remove('activebutton');
        document.getElementById('button_both_paths').classList.remove('activebutton');
        document.getElementById('button_upper_path').classList.add('activebutton');
    });

});
