var finish = $('#path_container').position().left + $('#path_container').width() - $(window).width() * 0.35;
var start =  $('#path_container').position().left - $(window).width() * 0.55;

var visible_eventjumps;
var visible_buttons;
var visible_counters;

if ((window.pageXOffset < start) || window.pageXOffset > finish) {
    hideEventJumps();
    hidePathSwitcher();
    hideCounters();
    visible_eventjumps = false;
    visible_buttons = false;
    visible_counters = false;
}
else {
    visible_eventjumps = true;
    showEventJumps();
    visible_buttons = true;
    showPathSwitcher();
    visible_counters = true;
    showCounters();
}
//window.path_switcher_opacity = 0
//$('.path_switcher')[0].style.opacity = window.path_switcher_opacity;

function hideCounters() {
    document.getElementById('distance-counter1').style.opacity = 0;
    document.getElementById('distance-counter2').style.opacity = 0;
    document.getElementById('counterline1').style.opacity = 0;
    document.getElementById('counterline2').style.opacity = 0;
};

function showCounters() {
    document.getElementById('distance-counter1').style.opacity = 1.0;
    document.getElementById('distance-counter2').style.opacity = 1.0;
    document.getElementById('counterline1').style.opacity = 1.0;
    document.getElementById('counterline2').style.opacity = 1.0;
};

function hideEventJumps() {
    document.getElementsByClassName('nav-timepath1')[0].style.opacity = 0.0;
    document.getElementsByClassName('nav-timepath2')[0].style.opacity = 0.0;
    var navigator_btns = document.getElementsByClassName('jumpbtn');
    for (var i = 0, all = navigator_btns.length; i < all; i++) {
        navigator_btns[i].classList.remove('cursor_pointer');
        navigator_btns[i].style.pointerEvents = 'none';
    }
    
}

function showEventJumps() {
    var navigator_btns = document.getElementsByClassName('jumpbtn');
    for (var i = 0, all = navigator_btns.length; i < all; i++) {
        navigator_btns[i].classList.add('cursor_pointer');
        navigator_btns[i].style.pointerEvents = '';
    }
    document.getElementsByClassName('nav-timepath1')[0].style.opacity = 1.0;
    document.getElementsByClassName('nav-timepath2')[0].style.opacity = 1.0;
}

function hidePathSwitcher() {
    var buttons = document.getElementsByClassName('path_switcher_button');
    for (var i = 0, all = buttons.length; i < all; i++) {
        buttons[i].classList.remove('cursor_pointer');
    }
    $('.path_switcher')[0].style.opacity = 0;
    $('.path_switcher_button').disabled = true;
};

function showPathSwitcher() {
    var buttons = document.getElementsByClassName('path_switcher_button');
    for (var i = 0, all = buttons.length; i < all; i++) {
        buttons[i].classList.add('cursor_pointer');
    }
    $('.path_switcher')[0].style.opacity = 1.0;
    $('.path_switcher_button').disabled = false;
};


$(window).scroll(function () {
    /* Check the location of each desired element */
    //console.log("Current scroll position:", window.pageXOffset, start, finish);
    //console.log("eventjumps:", visible_eventjumps);
    var scroll_position = window.pageXOffset;

    // scrolling in and out counters
    if (visible_counters && start > scroll_position){
        visible_counters = false;
        hideCounters();
    }
    else if (!visible_counters && start < scroll_position && finish > scroll_position) {
        visible_counters = true;
        showCounters();
    }
    else if (visible_counters && start < scroll_position && finish < scroll_position){
        visible_counters = false;
        hideCounters();
    };

    //scrolling in and out path buttons
    /* If the object is completely visible in the window, fade it it */
    if (visible_buttons && start > scroll_position){
        visible_buttons = false;
        hidePathSwitcher();
    }
    else if (!visible_buttons && start < scroll_position && finish > scroll_position) {
        visible_buttons = true;
        showPathSwitcher();
    }
    else if(visible_buttons && start < scroll_position && finish < scroll_position){
        visible_buttons = false;
        hidePathSwitcher();
    };

    //scrolling in and out jump navigator buttons
    if (visible_eventjumps && start > scroll_position) {
        // before start
        hideEventJumps();
        visible_eventjumps = false;
        
    }
    else if (!visible_eventjumps && start < scroll_position && finish > scroll_position) {
        // between start and finish
        showEventJumps();
        visible_eventjumps = true;
    }
    else if (visible_eventjumps && start < scroll_position && finish < scroll_position) {
        //after finish
        hideEventJumps();
        visible_eventjumps = false;
    };
});
