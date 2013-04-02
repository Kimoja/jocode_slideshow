JocodeSlideshowExemple.basic = function(){
    
    return $.data(
    
        //slideshow config
        $('.slideshow.basic').jocodeSlideshow({
            
            $slides : '> .scroller > .slides > div',
            $buttons : '> .player',
            
            delay : 1000,
            keyboard : true,
            
            await_nav_fx : true,
            await_load : true,
            await_fx : true,
            
            display_nav_on_mouseout : false,
            
            css_disable_bt : 'disabled',
            css_await_bt : 'await',
            
            fx : new $.JocodeSlideshowFx.Scroll({
                duration : 1000,
                $scroller  : '> .scroller'
            }),

            navigation : new $.JocodeSlideshowNavigation({
                
                $container : '> .navigation',
                $items_container : '> .scroller > div',
                $buttons : '> .navigation',
                
                css_selected : 'selected',
                css_scrolled : 'scrolled',
                css_await : 'await',
                
                itemFactory : function(slide, index){
                    
                    var a = document.createElement('a');
                    
                    a.href = '#';
                    a.appendChild(document.createTextNode("Nav " + (index + 1)));
                    
                    return a;
                },
                
                fx : new $.JocodeSlideshowNavigationFx.Scroll({
                    
                    $scroller : '> .scroller',
                    scroll_over : true
                })
            })
        })[0]
        , 'jocodeSlideshow'
    );
};