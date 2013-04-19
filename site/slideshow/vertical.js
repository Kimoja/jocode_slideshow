
$('.slideshow.vertical').jocodeSlideshow({

    $slides : '> .pad > .scroller > .slides > img',
    $buttons : '> .player',
    $pause_hover : '.slides, .navigation',

    delay : 1000,
    await_nav_fx : true,
    await_fx : true,
    css_disable_bt : 'disabled',
    css_await_bt : 'await',

    fx : new $.JocodeSlideshowFx.Scroll({
        $scroller : '> .pad > .scroller',
        duration : 1000,
        vertical : true
    }),

    navigation : new $.JocodeSlideshowNavigation({

        $container : '> .navigation',
        $items: '> .scroller > img',
        $buttons : '<',

        css_scrolled : 'scrolled',
        css_selected : 'selected',

        itemsFactory : function(obj_arguments){
            
            var ct_items = this.$('> .scroller');
            
            $.each(this.slideshow.slides, function(i, slide){
                
                var img = document.createElement('img');
                img.src = slide.src;
                
                ct_items.append(img);
            });
        },
        
        fx : new $.JocodeSlideshowNavigationFx.Scroll({

            $scroller : '> .scroller',
            scroll_over : true,
            vertical : true
        })
    })
})