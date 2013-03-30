JocodeSlideshowExemple.horizontal_fade = function(){
    
    return $.data(
    
        //slideshow config
        $('.slideshow.horizontal_fade').jocodeSlideshow({
            
            $slides : '> .slides > img',
            $buttons : '> .player',
            
            disabled_bt_class : 'disabled',

            delay : 1000,

            fx : new $.JocodeSlideshowFx.Fade({
                duration : 1000
            }),

            navigation : new $.JocodeSlideshowNavigation({

                $items : '> .navigation > .scroller > div >  a',
                $buttons : '> .navigation',
                
                selected_class : 'selected',
                scrolled_class : 'scrolled',

                fx : new $.JocodeSlideshowNavigationFx.Scroll({
                    
                    $scroller : '> .navigation > .scroller',
                    scroll_over : true
                })
            })
        })[0]
        , 'jocodeSlideshow'
    );
};