$('.slideshow.nav').jocodeSlideshow({

    $slides : '> .pad > .scroller > .slides > div',
    $controls : '> .player',
    $pause_hover : '<',

    delay : 1000,

    await_nav_fx : true,
    await_fx : true,
    css_disable_bt : 'disabled',
    css_await_bt : 'await',

    transition : {
        type : 'scroll',
        duration : 1000,
        $scroller  : '> .pad > .scroller'
    },

    navigation : {

        $container : '> .navigation',
        $items : '> .scroller > div > a',
        $controls : '<',

        css_scrolled : 'scrolled',
        css_selected : 'selected',
        css_await : 'await',

        itemsFactory : function(slide, index){
            
            var ct_items = this.$('> .scroller > div');
            
            $.each(this.slideshow.$slides, function(i, slide){
                
                var a = document.createElement('a');

                a.href = '#';
                a.appendChild(document.createTextNode("Nav " + (i + 1)));
                
                ct_items.append(a);
            });
        },

        transition : {
            type : 'scroll',
            $scroller : '> .scroller',
            scroll_over : true
        }
    }
})