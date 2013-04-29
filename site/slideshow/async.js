$('.slideshow.async').jocodeSlideshow({

    $slides : '> .slides > img',
    $controls : '> .player',
    $pause_hover : '.slides, .navigation',
    $loader : '> .loader',
    $mask_progress_hover : '<',
    
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
    
    navigation : new $.JocodeSlideshowNavigation({

        $container : '> .navigation',
        $items : '> .scroller > div > div',
        $buttons : '<',

        css_scrolled : 'scrolled',
        css_selected : 'selected',

        itemsFactory : function(obj_arguments){
            
            var ct_items = this.$('> .scroller > div');
            
            $.each(this.slideshow.$slides, function(i, slide){
                
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