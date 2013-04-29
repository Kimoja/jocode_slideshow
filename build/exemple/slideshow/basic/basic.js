$('.slideshow.basic').jocodeSlideshow({

    $slides : '> .pad > .scroller > .slides > div',
    $controls : '> .player',
    $pause_hover : '<',
    $mask_controls_hover : '<',

    transition : new $.JocodeSlideshowTransition.Scroll({
        duration : 500,
        $scroller  : '> .pad > .scroller'
    })
});