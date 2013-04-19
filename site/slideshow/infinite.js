$('.slideshow.infinite').jocodeSlideshow({

    $slides : '> .slides > img',
    $buttons : '> .player',
    $pause_hover : '.slides, .navigation',
    $loader : '> .loader',

    delay : 1000,
    css_disable_bt : 'disabled',
    css_await_bt : 'await',

    //create dynamically slides
    load : function(index){

        var ct_slides = this.$('> .slides')[0],
            self = this,
            new_slides = [];

        //simulate an asynchronous loading
        setTimeout(function(){
            
            var i = 0, img;

            for(; i < 13; i++){

                img =  document.createElement('img');

                img.src = "./site/slide/"+ (i + 1) +".jpg";
                img.setAttribute('alt', '');
                
                new_slides.push(img);
                
                ct_slides.appendChild(img);
            }

            self.initPile({
                new_slides : new_slides
            });
            
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
        $items : '> .scroller > div > div',
        $buttons : '<',

        css_scrolled : 'scrolled',
        css_selected : 'selected',

        itemsFactory : function(obj_arguments){
            
            if(!obj_arguments)return;
            
            var ct_items = this.$('> .scroller > div'),
                new_slides = obj_arguments.new_slides;
            
            $.each(new_slides, function(i, slide){
                
                var div = document.createElement('div'),
                    img = document.createElement('img');

                img.src = slide.src;
                div.appendChild(img);
                
                ct_items.append(div);
            });
        },

        fx : new $.JocodeSlideshowNavigationFx.Scroll({

            $scroller : '> .scroller',
            scroll_over : true
        })
    })
})