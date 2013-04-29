$('.slideshow.fade').jocodeSlideshow({

    $slides : '> .slides > img',
    $controls : '> .player',
    $pause_hover : '.slides, .navigation',
    $mask_progress_hover : '<',
    
    mask_progress_load : false,
    mask_progress_transition : false,

    delay : 3000,
    await_nav_transition : true,
    await_transition : true,
    css_disable_control : 'disabled',
    css_await_control  : 'await',

    transition : new $.JocodeSlideshowTransition.Fade({
        duration : 1000
    }),

    progress : new $.JocodeSlideshowProgress({
        $container : '> .progress',
        transition : new $.JocodeSlideshowProgressTransition.Bar({
            css : 'bar',
            inverse : true
        })
    }),

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
            type : 'scroll',
            $scroller : '> .scroller',
            scroll_over : true
        })
    })
})