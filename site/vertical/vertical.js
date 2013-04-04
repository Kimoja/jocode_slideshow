JocodeSlideshowExemple.vertical = function(){
    
    return $.data(
    
        //slideshow config
        $('.slideshow.vertical').jocodeSlideshow({
        
            $slides : '> .pad > .scroller > .slides > img',
            $buttons : '> .player',
            $pause_hover : '.slides, .navigation',
            
            delay : 1000,
            await_nav_fx : true,
            await_fx : true,
            css_disable_bt : 'disabled',
            css_await_bt : 'await',
            
            fx : new $.JocodeSlideshowFx.Scroll({
                $scroller : '> .pad > .scroller',
                duration : 1000,
                vertical : true
            }),

            navigation : new $.JocodeSlideshowNavigation({
                
                $container : '> .navigation',
                $items_container : '> .scroller',
                $buttons : '<',
                
                css_scrolled : 'scrolled',
                css_selected : 'selected',

                itemFactory : function(slide, index){
                   
                    var img = document.createElement('img');
                    img.src = './site/slide/'+(index + 1)+'.jpg';
                    return img;
                },
                
                fx : new $.JocodeSlideshowNavigationFx.Scroll({

                    $scroller : '> .scroller',
                    scroll_over : true,
                    vertical : true
                })
            })
        })[0]
        , 'jocodeSlideshow'
    );
};;