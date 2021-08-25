var lightspeed = 299792
var _1unit = 1
var unit = 'μs'
var unit2 = 'ps'
var delimeter = ','
var decimalmark = '.'
var unitname = 'μs'
var unitname2 = 'ps'
var language = languages.Čeština
var currentRAFID = 0
var isSpeeding = 0
var unitTable = {
    μs: 1,
    ms: 0.001,
    ps: 1,
    ns: 0.001,
    s: 0.000001,
    km: 1,
    lightminutes: 0.0000000555941,
    pixels: 0.0002877863474156786
}

var msgTimer
var msgNum = [$('#msg1'), $('#msg2'), $('#msg3'), $('#msg4'), $('#msg5')]
var msgIndex = 0
var startX = window.pageXOffset

$(document).ready(function () {
    $('html, body').mousewheel(function (e, delta) {
        if (Math.abs(e.deltaX)) {
            return
        } else {
            this.scrollLeft -= (e.deltaY * 15);
        }
        e.preventDefault();
    });
});

//updateDistance('ms','ms','#counter');
//updateDistance('ps','ps','#counter2');


$(function () {
    if (typeof window.performance === 'undefined') {
        window.performance = {};
    }
    if (!window.performance.now) {
        var nowOffset = Date.now();
        if (performance.timing && performance.timing.navigationStart) {
            nowOffset = performance.timing.navigationStart
        }
        window.performance.now = function now() {
            return Date.now() - nowOffset;
        }
    }
    $('ul.nav a.eventjump').bind('click', function (event) {
        cancelLightMsg()
        stopSpeeding();
        var $anchor = $(this);
        $('html, body').stop().animate({scrollLeft: $($anchor.attr('href')).offset().left}, 5000, 'easeInOutExpo');
        event.preventDefault();
    })
    var essayMarks = [];
    $('.essay').each(function () {
        essayMarks.push($(this).offset().left - 200)
    });
    var planetMarks = [$('#starttxt').offset().left, $('#endtxt').offset().left,];
    var destinations = $.makeArray(essayMarks).concat($.makeArray(planetMarks));
    destinations.sort(function (a, b) {
        return a - b
    });
    var destinationNext = destinations[0];
    $('ul.nav a.nextjump').bind('click', function (event) {
        cancelLightMsg()
        stopSpeeding();
        var currentDist = (window.pageXOffset);
        $.each(destinations, function (index, value) {
            if (currentDist >= value - 100) {
                destinationNext = destinations[index + 1];
            }
            else {
                return false
            }
        });
        $('html, body').stop().animate({scrollLeft: destinationNext}, 4500, 'easeInOutQuad');
        event.preventDefault();
    })
    $('ul.nav a.prevjump').bind('click', function (event) {
        cancelLightMsg()
        stopSpeeding();
        var currentDist = (window.pageXOffset);
        $.each(destinations, function (index, value) {
            if (currentDist <= value + 100) {
                destinationNext = destinations[index - 1];
                return false
            }
        });
        $('html, body').stop().animate({scrollLeft: destinationNext}, 4500, 'easeInOutQuad');
        event.preventDefault();
    })
    $('#distance-counter1').on('click', function (e) {
        var units = $(this).find('.unitselect')
        console.log('units', units[0])
        units.css('display', units.css('display') == 'none' ? 'block' : 'none')
    })

    $('#distance-counter2').on('click', function (e) {
        var units = $(this).find('.unitselect')
        console.log('units', units[0])
        units.css('display', units.css('display') == 'none' ? 'block' : 'none')
    })

    $('.unitselect li').on('click', function (e) {
        //check for timepath id
        var counter_div = e.target.parentNode.parentNode.parentNode.parentNode;
        if(counter_div.id ==  "distance-counter1"){
            console.log("Parent id:", counter_div.id)
            unit = $(e.target).attr('class')
            unitname = $(e.target).text()
        }
        else{
            unit2 = $(e.target).attr('class')
            unitname2 = $(e.target).text()
        }
        updateDistance()
        $('.unitselect').css('display', 'none')
        return false

    })
    $('#langselect').on('click', function (e) {
        var $lang = $('#langs')
        $lang.css('display', $lang.css('display') == 'none' ? 'block' : 'none')
    })
    $('#langselect a').on('click', function (e) {
        language = languages[$(e.target).text()]
        delimeter = delimeters[$(e.target).text()]
        decimalmark = decimalmarks[$(e.target).text()]
        $('#titleimg').attr('src', 'img/maintitle-' + language + '.svg')
        $('#scaleimg').attr('src', 'img/scale-' + language + '.svg')
        $('#langs').css('display', 'none')
        for (var translation in translations) {
            $('#' + translation).text(translations[translation][language])
        }
        updateDistance()
        return false
    })
    $('#lightspeeder a').on('click', function (e) {
        console.log("Speeding");
        stopSpeeding()
        if (isSpeeding == 1) {
            cancelLightMsg()
            stopSpeeding()
            isSpeeding = 0
            return false
        }
        else {
            isSpeeding = 1
            fadeInLightMsg()
            changeUnitToLight()
            $('#lightspeeder a').css('opacity', 1.0)
            $('#lightspeedmsg').css('display', 'block')
            currentRAFID = startSpeedingAt()
            return false
        }
    })
});

function startSpeedingAt() {
    stopSpeeding()
    var startX = window.pageXOffset
    var lastTime = window.performance.now()
    var onEnterFrame = function (now) {
        var timeDelta = now - lastTime
        var distance = (lightspeed * timeDelta) / (_1km * 1000)
        $('html, body').scrollLeft(startX + distance)
        currentRAFID = requestAnimationFrame(onEnterFrame)
    }
    return requestAnimationFrame(onEnterFrame)
}


function fadeInLightMsg() {
    msgNum[msgIndex].fadeIn(500)
    msgTimer = window.setTimeout(fadeOutLightMsg, 4500)
};

function fadeOutLightMsg() {
    msgNum[msgIndex].fadeOut(500)
    if (msgIndex < msgNum.length - 1) {
        msgIndex = msgIndex + 1
        fadeInLightMsg()
    } else {
        return
    }
};

function cancelLightMsg() {
    msgNum[msgIndex].fadeOut(500)
    msgIndex = 0
    isSpeeding = 0
    window.clearTimeout(msgTimer)
    $('#lightspeedmsg').css('display', 'none')
    $('#lightspeeder a').css('opacity', 0.7)
};

function updateDistance() {
    var px = (window.pageXOffset - $('#timepath').position().left + $(window).width() / 2);
    var distance = px * unitTable[unit];
    $('#counter').text(Math.max(0, distance.toFixed(1)).toString().replace(".", decimalmark).replace(/\B(?=(\d{3})+(?!\d))/g, delimeter) + ' ' + unitname);

    var px = (window.pageXOffset - $('#timepath').position().left + $(window).width() / 2);
    var distance = px * unitTable[unit2];
    $('#counter2').text(Math.max(0, distance.toFixed(1)).toString().replace(".", decimalmark).replace(/\B(?=(\d{3})+(?!\d))/g, delimeter) + ' ' + unitname2);
}

function stopSpeeding() {
    cancelAnimationFrame(currentRAFID);
}

$('#monitors').text(Math.floor($('#timepath').width() / screen.availWidth / window.devicePixelRatio));
$(window).scroll(updateDistance);
