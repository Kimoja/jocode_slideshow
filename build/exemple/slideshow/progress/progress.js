$('.slideshow.progress').jocodeSlideshow({

    $slides : '> .pad > .scroller > .slides > div',
    $controls : '> .player',
    $pause_hover : '<',
    $mask_controls_hover : '<',
    $mask_progress_hover : '<',
    
    mask_progress_load : true,
    mask_progress_transition : true,
    
    delay : 1000,

    transition : new $.JocodeSlideshowTransition.Scroll({
        duration : 500,
        $scroller  : '> .pad > .scroller'
    }),
    
    progress : new $.JocodeSlideshowProgress({
        $container : '> .progress',
        transition : new $.JocodeSlideshowProgressTransition.Bar({
            css : 'bar',
            inverse : true
        })
    })
});