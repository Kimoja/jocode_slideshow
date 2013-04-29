
(function($){
    
var self;
    
$.JocodeSlideshowProgressFx.Basic = $.jocodeClass(

    function(config){
        this.setConfig(config);
    }, {
        
        css : '',
                
        /**
         * ...
         * 
         * @property progress_element
         * @type {jQuery}
         */
        _bar : null,
                
       
        init : function(progress){

            self = this;
            
            var el = self._bar = $(document.createElement('div'));
            progress.progress.append(el);
            
            self.css && el.addClass(self.css);
        },
                
        draw : function(ratio){
            console.log(ratio)
            self._bar.css('width', (ratio * 100) + '%');
        }

    }, 
    $.JocodeSlideshowProgressFx.Base
); 

})(jQuery);
