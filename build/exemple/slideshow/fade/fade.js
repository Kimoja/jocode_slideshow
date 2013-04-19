$('.slideshow.fade').jocodeSlideshow({

    $slides : '> .slides > img',
    $buttons : '> .player',
    $pause_hover : '.slides, .navigation',

    delay : 1000,
    await_nav_fx : true,
    await_fx : true,
    css_disable_bt : 'disabled',
    css_await_bt : 'await',

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
            
            var ct_items = this.$('> .scroller > div');
            
            $.each(this.slideshow.slides, function(i, slide){
                
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