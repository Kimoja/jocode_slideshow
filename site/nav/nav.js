JocodeSlideshowExemple.nav = function(){
    
    return $.data(
    
        //slideshow config
        $('.slideshow.nav').jocodeSlideshow({
            
            $slides : '> .pad > .scroller > .slides > div',
            $buttons : '> .player',
            $pause_hover : '<',
            
            delay : 1000,
            
            await_nav_fx : true,
            await_fx : true,
            css_disable_bt : 'disabled',
            css_await_bt : 'await',
            auto_play : true,
            
            fx : new $.JocodeSlideshowFx.Scroll({
                duration : 1000,
                $scroller  : '> .pad > .scroller'
            }),
            
            navigation : new $.JocodeSlideshowNavigation({
                
                $container : '> .navigation',
                $items_container : '> .scroller > div',
                $buttons : '<',
                
                css_scrolled : 'scrolled',
                css_selected : 'selected',
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