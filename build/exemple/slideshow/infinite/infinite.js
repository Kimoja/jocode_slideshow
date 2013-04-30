$('.slideshow.infinite').jocodeSlideshow({

    $slides : '> .slides > img',
    $controls : '> .player',
    $loader : '> .loader',
    $pause_hover : '.slides, .navigation',
    $mask_progress_hover : '.slides, .navigation',
    
    mask_progress_load : false,
    mask_progress_transition : false,

    delay : 3000,
    await_nav_transition : true,
    await_transition : true,
    css_disable_control : 'disabled',
    css_await_control  : 'await',

    transition : new $.JocodeSlideshowTransition.Fade({
        duration : 500
    }),
    
    progress : new $.JocodeSlideshowProgress({
        $container : '> .progress',
        transition : new $.JocodeSlideshowProgressTransition.Bar({
            css : 'bar',
            inverse : true
        })
    }),


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
    
    navigation : new $.JocodeSlideshowNavigation({

        $container : '> .navigation',
        $items : '> .scroller > div > div',
        $controls : '<',

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

        transition : new $.JocodeSlideshowNavigationTransition.Scroll({
            $scroller : '> .scroller',
            scroll_over : true
        })
    })
})