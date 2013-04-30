$('.slideshow.nav').jocodeSlideshow({

    $slides : '> .pad > .scroller > .slides > div',
    $controls : '> .player',
    $pause_hover : '.pad, .navigation',
    $mask_progress_hover : '.pad, .navigation',
    
    mask_progress_load : false,
    mask_progress_transition : false,

    delay : 3000,

    await_nav_fx : true,
    await_fx : true,
    css_disable_control : 'disabled',
    css_await_control : 'await',
    
    transition : new $.JocodeSlideshowTransition.Scroll({
        duration : 500,
        $scroller  : '> .pad > .scroller'
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
        $items : '> .scroller > div > a',
        $controls : '<',

        css_scrolled : 'scrolled',
        css_selected : 'selected',
        css_await : 'await',

        itemsFactory : function(obj_arguments){
            
            var ct_items = this.$('> .scroller > div');
            
            $.each(this.slideshow.$slides, function(i, slide){
                
                var a = document.createElement('a');

                a.href = '#';
                a.appendChild(document.createTextNode("Nav " + (i + 1)));
                
                ct_items.append(a);
            });
        },

        transition : new $.JocodeSlideshowNavigationTransition.Scroll({
            $scroller : '> .scroller',
            scroll_over : true
        })
    })
})