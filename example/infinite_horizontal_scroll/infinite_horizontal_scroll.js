
JocodeSlideshowExemple['infinite_horizontal_scroll'] = function(){
    
    return $.data(
        $('.slideshow.infinite_horizontal_scroll').jocodeSlideshow({
        
            selector : '> .scroller > div > div',

            //define manually the container to support, on hover event, the loader element
            hover_container : '.loader,.scroller',

            bt_first : '> .first',
            bt_previous : '> .previous',
            bt_play : '> .play',
            bt_pause : '> .pause',
            bt_resume : '> .resume',
            bt_stop : '> .stop',
            bt_next: '> .next',
            bt_last : '> .last',

            disabled_bt_class : 'disabled',

            auto_play : false,
            delay : 1000,

            start_index : 0,

            fx : new $.JocodeSlideshowFx.Scroll({
                duration : 1000
            }),

            navigation : new $.JocodeSlideshowNavigation({

                selector : '> .navigation > div > .scroller > div >  a',

                selected_class : 'selected',
                scrolled_class : 'scrolled',

                bt_next: '> .navigation > div > .next',
                bt_previous : '> .navigation > div > .previous',
                bt_first: '> .navigation > div > .first',
                bt_last : '> .navigation > div > .last',

                fx : new $.JocodeSlideshowNavigationFx.Scroll({
                    scroll_over : true
                })
            }),

            beforeDraw : function(){
                $('.loader', this.context).hide();
            },

            //simulate an loader...
            load : function(index){

                var self = this;

                $('.loader', this.context).show();

                setTimeout(function(){

                    self.draw(index);

                }, 1000);
            },

            //simulate an infinite slideshow
            onChange : function(new_index){

                var self, i, div, a, ct_slides, ct_nav, j;

                if(!this.hasNext()){

                    this.pause();

                    ct_slides = this.slides.parent()[0];
                    ct_nav = this.navigation.items.parent()[0];
                    self = this;
                    j = this.slides.length;

                    setTimeout(function(){
                        for(i = 0; i < 13; i++){

                            div = document.createElement('div');
                            div.innerHTML = "<img src='./slide/"+i+".jpg' alt=''>";
                            ct_slides.appendChild(div);

                            a = document.createElement('a');
                            a.href = '#';
                            a.innerHTML = "Nav" + j;

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