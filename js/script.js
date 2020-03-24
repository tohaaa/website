$(document).ready(function () {

    $('#arrow').click(function () {
        $.fn.pagepiling.moveSectionDown();
    });




    $('#pagepiling').pagepiling({
        menu: null,
        direction: 'vertical',
        verticalCentered: true,
        sectionsColor: [],
        anchors: ['section1', 'section2', 'section3'],
        menu: '#mySidenav',
        scrollingSpeed: 1000,
        easing: 'swing',
        loopBottom: false,
        loopTop: false,
        css3: true,
        navigation: false,

        normalScrollElements: null,
        normalScrollElementTouchThreshold: 5,
        touchSensitivity: 5,
        keyboardScrolling: true,
        sectionSelector: '.section1, .section2, .section3, .section4',
        animateAnchor: false,

        //events
        onLeave: function (index, nextIndex, direction) {},
        afterLoad: function (anchorLink, index) {},
        afterRender: function () {},
    });
});
