JocodeSlideshowExemple.basic = function(){
    
    return $.data(
    
        $('.slideshow.basic').jocodeSlideshow({
            
            $slides : '> .pad > .scroller > .slides > div',
            $buttons : '> .player',
            $pause_hover : '<',
            $mask_buttons_hover : '<' ,
            delay : 1000,
            auto_play : true,
            
            fx : new $.JocodeSlideshowFx.Scroll({
                duration : 1000,
                $scroller  : '> .pad > .scroller'
            })
            
        })[0]
        
        , 'jocodeSlideshow'
    );
};