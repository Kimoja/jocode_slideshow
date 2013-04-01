JocodeSlideshowExemple.horizontal_scroll_async = function(){
    
    return $.data(
        $('.slideshow.horizontal_scroll_async').jocodeSlideshow({
        
            $slides : '> .pad > .scroller > .slides > div',
            $buttons : '> .player',
            
            disabled_bt_class : 'disabled',
            
            delay : 1000,

            fx : new $.JocodeSlideshowFx.Scroll({
                duration : 1000,
                $scroller  : '> .pad > .scroller'
            }),

            navigation : new $.JocodeSlideshowNavigation({

                $items : '> .navigation > .scroller > div >  a',
                $buttons : '> .navigation',
                
                selected_class : 'selected',
                scrolled_class : 'scrolled',

                fx : new $.JocodeSlideshowNavigationFx.Scroll({
                    
                    $scroller : '> .navigation > .scroller',
                    scroll_over : true
                })
            }),
            
            beforeDraw : function(){
                $('.loader', this.context).hide();
            },

            //simulate an loader
            load : function(index){

                var self = this;
                $('.loader', this.context).css({opacity: 0.5}).show();

                setTimeout(function(){
                    self.draw(index);
                }, 1000);
            },

            //simulate an infinite slideshow
            onChange : function(new_index){

                var self, i, div, a, ct_slides, ct_nav, j, img;

                if(!this.hasNext()){

                    this.pause();

                    ct_slides = this.slides.parent()[0];
                    ct_nav = this.navigation.items.parent()[0];
                    self = this;
                    j = this.slides.length;

                    setTimeout(function(){
                        for(i = 0; i < 13; i++){

                            div = document.createElement('div');
                            img =  document.createElement('img');
                            
                            div.appendChild(img);
                            img.src = "./site/slide/"+ (i + 1) +".jpg";
                            img.setAttribute('alt', '')
                            
                            ct_slides.appendChild(div);

                            a = document.createElement('a');
                            a.href = '#';
                            a.innerHTML = "Nav" + (j + i + 1);

                            ct_nav.appendChild(a);
                        }

                        self.initPile();
                        self.resume();

                    }, 1500);
                }
            }
        })[0]
        , 'jocodeSlideshow'
    );
};