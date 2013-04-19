$('.slideshow.basic').jocodeSlideshow({

    $slides : '> .pad > .scroller > .slides > div',
    $controls : '> .player',
    $pause_hover : '.slides, .navigation',
    $mask_controls_hover : '<',

    delay : 1000,

    transition : {
        type : 'scroll',
        duration : 1000,
        $scroller  : '> .pad > .scroller'
    }
});