var visible = false;


$(window).scroll(function () {
    /* Check the location of each desired element */
    $('.distance-counter').each(function (i) {
        var obj_left = $(this).position().left + window.pageXOffset;
        var offset = $(window).width() * 1.45;

        /* If the object is completely visible in the window, fade it it */
        if (offset < obj_left && visible == false) {
            visible = true;
            document.getElementById('distance-counter1').style.opacity = 1.0;
            document.getElementById('distance-counter2').style.opacity = 1.0;
            document.getElementById('nav-timepath1').style.opacity = 1.0;
            document.getElementById('nav-timepath2').style.opacity = 1.0;
        }

        if (offset > obj_left && visible) {
            visible = false
            document.getElementById('distance-counter1').style.opacity = 0;
            document.getElementById('distance-counter2').style.opacity = 0;
            document.getElementById('nav-timepath1').style.opacity = 0;
            document.getElementById('nav-timepath2').style.opacity = 0;
        }
    });
});