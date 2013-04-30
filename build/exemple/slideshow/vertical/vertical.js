
$('.slideshow.vertical').jocodeSlideshow({
    
    $slides : '> .pad > .scroller > .slides > img',
    $controls : '> .player',
    $pause_hover : '.pad, .navigation',
    $mask_progress_hover : '.pad, .navigation',
    
    mask_progress_load : false,
    mask_progress_transition : false,

    delay : 3000,
    await_nav_transition : true,
    await_transition : true,
    css_disable_control : 'disabled',
    css_await_control  : 'await',
    
    transition : new $.JocodeSlideshowTransition.Scroll({
        duration : 1000,
        $scroller  : '> .pad > .scroller',
        vertical : true
    }),
    
    progress : new $.JocodeSlideshowProgress({
        $container : '> .progress',
        transition : new $.JocodeSlideshowProgressTransition.Bar({
            css : 'bar',
            inverse : true,
            vertical : true
        })
    }),

    navigation : new $.JocodeSlideshowNavigation({

        $container : '> .navigation',
        $items: '> .scroller > img',
        $buttons : '<',

        css_scrolled : 'scrolled',
        css_selected : 'selected',

        itemsFactory : function(obj_arguments){
            
            var ct_items = this.$('> .scroller');
            
            $.each(this.slideshow.$slides, function(i, slide){
                
                var img = document.createElement('img');
                img.src = slide.src;
                
                ct_items.append(img);
            });
        },
        
        transition : new $.JocodeSlideshowNavigationTransition.Scroll({
            $scroller : '> .scroller',
            scroll_over : true,
            vertical : true
        })
    })
})