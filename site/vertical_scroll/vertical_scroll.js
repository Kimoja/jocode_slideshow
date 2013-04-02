JocodeSlideshowExemple.vertical_scroll = function(){
    
    return $.data(
    
        //slideshow config
        $('.slideshow.vertical_scroll').jocodeSlideshow({
        
            $slides : '> .pad > .scroller > .slides > img',
            disabled_bt_class : 'disabled',
            
            fx : new $.JocodeSlideshowFx.Scroll({
                $scroller : '> .pad > .scroller',
                duration : 1000,
                vertical : true
            }),

            navigation : new $.JocodeSlideshowNavigation({

                $items : '> .navigation > .scroller > a',
                $buttons: '> .navigation',

                selected_class : 'selected',
                scrolled_class : 'scrolled',

                fx : new $.JocodeSlideshowNavigationFx.Scroll({

                    $scroller : '> .navigation > .scroller',
                    scroll_over : true,
                    vertical : true
                })
            })
        })[0]
        , 'jocodeSlideshow'
    );
};;