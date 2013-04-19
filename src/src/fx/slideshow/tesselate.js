
(function($){
    
var self;
    
$.JocodeSlideshowFx.Tesselate = $.jocodeClass(

    function(config){
        
        self = this;
        
        self.config = config = config || {};
        $.extend(self, config);
        
    }, {

        config : null,
        
        duration : 3000,

        init : function(slideshow){

            self = this;
            $.JocodeSlideshowFx.Base.prototype.init.call(self, slideshow);
        },
        
        initPile : function(){
            
            this.slideshow.slides.each(function(){
                
                $(this).tesselate({ rows: 5, cols: 5});
            });
        },
        
        draw : function(from, to, from_index, to_index){
            
            self = this;
            /*
            to.tesselate({
                progression: 'random',
		effect: function(cell) {
                    cell.animate({
                        'margin-left':'0px',
                        'margin-top':'0px',
                        'opacity':'1'
                    }, 1000);
		},
		delay: 20,
                callback: function () {
                    self.slideshow.keepOn(to_index);
                }
            });
            
            from && from.tesselate({
                    progression: 'random',
                    effect: function(cell) {
                            cell.animate({
                                    'margin-left':'50px',
                                    'margin-top':'34px',
                                    'opacity':'0'
                            },
                            1000
                            );
                    }
            });*/
            appear();
            function vanish() {
                to.tesselate({
                    progression: 'random',
                    effect: function(cell) {
                        cell.animate({
                            'margin-left':'50px',
                            'margin-top':'34px',
                            'opacity':'0'
                        },
                        1000
                        );
                    },
                    delay: 50,
                    callback: function () {
                        window.setTimeout(appear, 1000);
                    }
                });
            }
            function appear() {
                to.tesselate({
                    progression: 'random',
                    effect: function(cell) {
                        cell.animate({
                            'margin-left':'0px',
                            'margin-top':'0px',
                            'opacity':'1'
                        },
                        1000
                        );
                    },
                    delay: 20
                });
            }

        }

    }, 
    $.JocodeSlideshowFx.Base
); 

})(jQuery);
/*
var element = $('#element');

element.tesselate({ rows: 5, cols: 5});

function vanish() {
	element.tesselate({
		progression: 'random',
		effect: function(cell) {
			cell.animate({
				'margin-left':'50px',
				'margin-top':'34px',
				'opacity':'0'
			},
			1000
			);
		},
		delay: 50,
		callback: function () {
			window.setTimeout(appear, 1000);
		}
	});
}

function appear() {
	element.tesselate({
		progression: 'random',
		effect: function(cell) {
			cell.animate({
				'margin-left':'0px',
				'margin-top':'0px',
				'opacity':'1'
			},
			1000
			);
		},
		delay: 20
	});
}

$('#start').click(vanish);
			


*/