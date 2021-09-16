var visible_paths = true;


$(window).scroll(function () {
    /* Check the location of each desired element */
    $('.path_switcher').each(function (i) {
        var scroll_position = window.pageXOffset;

        //TODO
        var finish = $(window).width(); //finishline

        /* If the object is completely visible in the window, fade it it */
        if (finish > scroll_position && !visible_paths) {
            // show everything again
        }

        if (finish < scroll_position && visible_paths) {
            // ve crolled beyond the end: hiding buttons, counters(distance-counter), jump panels(nav nav-timepath1)
        }
    });
});