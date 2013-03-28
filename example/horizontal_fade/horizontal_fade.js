
JocodeSlideshowExemple['horizontal_fade'] = function(){
    
    return $.data(
    
        //slideshow config
        $('.slideshow.horizontal_fade').jocodeSlideshow({

            selector : '> .fade > div',

            bt_first : '> .first',
            bt_previous : '> .previous',
            bt_play : '> .play',
            bt_pause : '> .pause',
            bt_resume : '> .resume',
            bt_stop : '> .stop',
            bt_next: '> .next',
            bt_last : '> .last',
            
            disabled_bt_class : 'disabled',

            auto_play : false,
            delay : 1000,

            start_index : 0,

            fx : new $.JocodeSlideshowFx.Fade({
                duration : 1000
            }),

            navigation : new $.JocodeSlideshowNavigation({

                selector : '> .navigation > div > .scroller > div >  a',

                selected_class : 'selected',
                scrolled_class : 'scrolled',

                bt_next: '> .navigation > div > .next',
                bt_previous : '> .navigation > div > .previous',
                bt_first: '> .navigation > div > .first',
                bt_last : '> .navigation > div > .last',

                fx : new $.JocodeSlideshowNavigationFx.Scroll({
                    scroll_over : true
                })
            })
        })[0]
        , 'jocodeSlideshow'
    );
};