

$(function(){
    $('.slideshow').jocodeSlideshow({
        
        selector : '> .scroller > div > div',
        
        //define manually the container to support, on hover event, the loader element
        hover_container : '.loader,.scroller',
            
        bt_first : '.first',
        bt_previous : '.previous',
        bt_play : '.play',
        bt_pause : '.pause',
        bt_resume : '.resume',
        bt_stop : '.stop',
        bt_next: '.next',
        bt_last : '.last',
        
        disabled_bt_class : 'disabled',
        
        auto_play : true,
        delay : 1000,
                   
        start_index : 0,
       
        fx : new $.JocodeFxSlideshow.Scroll({
            duration : 1000
        }),
        
        navigation : new $.JocodeNavigationSlideshow({
            
            selector : '> .navigation > div > .scroller > div >  a',
            
            selected_class : 'selected',
            scrolled_class : 'scrolled',
            
            bt_next: '.scroll_next',
            bt_previous : '.scroll_previous',
            bt_first: '.scroll_first',
            bt_last : '.scroll_last',
            
            fx : new $.JocodeFxNavigationSlideshow.Scroll({
                scroll_over : true
            })
        }),
        
        //simulate an loader...
        load : function(index){
            
            var self = this;
            
            $('.loader', this.context).show();
            
            setTimeout(function(){
                
                self.draw(index);
                
            }, 1000);
        },
        
        beforeDraw : function(){
            //console.log('beforeDraw');
            $('.loader', this.context).hide();
        },
        onCancel : function(canceled_index){
            console.log('onCancel');
        },
        onPlay : function(){
            console.log('onPlay');
        },
        onPause : function(){
            console.log('onPause');
        },
        onResume : function(){
            console.log('onResume');
        },
        onStop : function(){
            console.log('onStop');
        },
        
        //simulate an infinite slideshow
        onChange : function(new_index){
            
            console.log('onChange');
            
            var self, i, div, a, ct_slides, ct_nav;
            
            if(!this.hasNext()){
                
                this.pause();
                
                ct_slides = this.slides.parent()[0];
                ct_nav = this.navigation.items.parent()[0];
                self = this;
                
                setTimeout(function(){
                    for(i = 0; i < 10; i++){
                    
                        div = document.createElement('div');
                        div.innerHTML = "<img src='../../image/jocode.png' alt=''>";
                        ct_slides.appendChild(div);

                        a = document.createElement('a');
                        a.href = '#';
                        a.innerHTML = "Nav1";

                        ct_nav.appendChild(a);
                    }
                    
                    self.initPile();
                    self.resume();
                    
                }, 1500);
            }
        },
        
        beforeWait : function(delay, elapsed, start_time){
            console.log('beforeWait');
        }
    });
});