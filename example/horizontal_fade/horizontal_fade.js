

$(function(){
    $('.slideshow').jocodeSlideshow({
        
        selector : '> .fade > div',
        
        bt_first : '.first',
        bt_previous : '.previous',
        bt_play : '.play',
        bt_pause : '.pause',
        bt_resume : '.resume',
        bt_stop : '.stop',
        bt_next: '.next',
        bt_last : '.last',
        
        disabled_bt_class : 'disabled',
        
        auto_play : true,
        delay : 1000,
                   
        start_index : 0,
       
        fx : new $.JocodeFxSlideshow.Fade({
            duration : 1000
        }),
        
        navigation : new $.JocodeNavigationSlideshow({
            
            selector : '> .navigation > div > .scroller > div >  a',
            
            selected_class : 'selected',
            scrolled_class : 'scrolled',
            
            bt_next: '.scroll_next',
            bt_previous : '.scroll_previous',
            bt_first: '.scroll_first',
            bt_last : '.scroll_last',
            
            fx : new $.JocodeFxNavigationSlideshow.Scroll({
                scroll_over : true
            })
        })
    });
});