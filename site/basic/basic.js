JocodeSlideshowExemple.basic = function(){
    
    return $.data(
    
        //slideshow config
        $('.slideshow.basic').jocodeSlideshow({
            
            $slides : '> .scroller > .slides > div',
            $buttons : '> .player',
            
            disabled_bt_class : 'disabled',
            
            delay : 1000,

            fx : new $.JocodeSlideshowFx.Scroll({
                duration : 1000,
                $scroller  : '> .scroller'
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