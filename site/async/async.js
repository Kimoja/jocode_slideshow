JocodeSlideshowExemple.async = function(){
    
    return $.data(
    
        //slideshow config
        $('.slideshow.async').jocodeSlideshow({
            
            $slides : '> .slides > img',
            $buttons : '> .player',
            $pause_hover : '.slides, .navigation',
            $loader : '> .loader',
            
            delay : 1000,
            css_disable_bt : 'disabled',
            css_await_bt : 'await',
            
            auto_play : true,
            
            //simulate an loader
            //enter here the code of asynchronous requests
            load : function(index){

                var self = this;
                
                setTimeout(function(){
                    self.draw(index);
                }, 1000);
            },
            
            isLoaded : function(){
                
                return false;
            },
            
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