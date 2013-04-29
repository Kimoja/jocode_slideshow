JocodeSlideshowExemple.infinite = function(){
    
    return $.data(
    
        //slideshow config
        $('.slideshow.infinite').jocodeSlideshow({
            
            $slides : '> .slides > img',
            $buttons : '> .player',
            $pause_hover : '.slides, .navigation',
            $loader : '> .loader',
            
            delay : 1000,
            css_disable_bt : 'disabled',
            css_await_bt : 'await',
            
            auto_play : true,
            
            //create dynamically slides
            load : function(index){
                
                var ct_slides = this.$('> .slides')[0],
                    self = this;
                
                //simulate an asynchronous loading
                setTimeout(function(){
                    
                    var i = 0, img;
                    
                    for(; i < 13; i++){

                        img =  document.createElement('img');

                        img.src = "./site/slide/"+ (i + 1) +".jpg";
                        img.setAttribute('alt', '');
                        
                        ct_slides.appendChild(img);
                    }

                    self.initPile();
                    self.draw(index);

                }, 1500);
            },
            
            //if the slide is the last, we define the loading to true, 
            //for displaying the loader element and for call the custom method "load"
            isLoaded : function(){
                
                return this.hasNext();
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
                
                itemFactory : function(slide, index, last_pile){
                    
                    if(last_pile && index < last_pile.length)
                        return null;
                    
                    var div = document.createElement('div'),
                        img = document.createElement('img'),
                        l = last_pile ? last_pile.length : 0;
                    
                    img.src = './site/slide/'+(1 + index - l)+'.jpg';
                    div.appendChild(img);
                    
                    return div;
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