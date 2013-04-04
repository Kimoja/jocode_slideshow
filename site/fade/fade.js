JocodeSlideshowExemple.fade = function(){
    
    return $.data(
    
        //slideshow config
        $('.slideshow.fade').jocodeSlideshow({
            
            $slides : '> .slides > img',
            $buttons : '> .player',
            $pause_hover : '.slides, .navigation',
            
            delay : 1000,
            await_nav_fx : true,
            await_fx : true,
            css_disable_bt : 'disabled',
            css_await_bt : 'await',
            auto_play : true,

            fx : new $.JocodeSlideshowFx.Fade({
                duration : 1000
            }),

            navigation : new $.JocodeSlideshowNavigation({
                
                $container : '> .navigation',
                $items_container : '> .scroller > div',
                $buttons : '<',
                
                css_scrolled : 'scrolled',
                css_selected : 'selected',
                
                itemFactory : function(slide, index){
                    
                    var div = document.createElement('div'),
                        img = document.createElement('img');
                    
                    img.src = './site/slide/'+(index + 1)+'.jpg';
                    div.appendChild(img);
                    
                    return div
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