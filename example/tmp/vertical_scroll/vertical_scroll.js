

$(function(){
    
    $('.slideshow').jocodeSlideshow({
        
        selector : '> .slides > .scroller > div > div > div',
        
        bt_first : '.slides .first',
        bt_previous : '.slides .previous',
        bt_play : '.slides .play',
        bt_pause : '.slides .pause',
        bt_resume : '.slides .resume',
        bt_stop : '.slides .stop',
        bt_next: '.slides .next',
        bt_last : '.slides .last',
        
        disabled_bt_class : 'disabled',
        
        auto_play : true,
        delay : 1000,
                   
        start_index : 0,
       
        fx : new $.JocodeFxSlideshow.Scroll({
            duration : 1000,
            selector : '> .slides > .scroller',
            vertical : true
        }),
        
        navigation : new $.JocodeNavigationSlideshow({
            
            selector : '> .navigation > .scroller > div > div > a',
            
            selected_class : 'selected',
            scrolled_class : 'scrolled',
            
            bt_next: '.navigation .next',
            bt_previous : '.navigation .previous',
            bt_first: '.navigation .first',
            bt_last : '.navigation .last',
            
            fx : new $.JocodeFxNavigationSlideshow.Scroll({
                
                selector : '> .navigation > .scroller',
                scroll_over : true,
                vertical : true
            }),
            
            indexOf : function(item){
                
                var tr = item.parent();
                return  tr.parent().children().index(tr);
            }
        })
    });
});