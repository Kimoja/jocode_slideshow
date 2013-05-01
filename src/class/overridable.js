
(function($){
    
    /**
     * Mixin ...
     * @class $.JocodeOverridable
     **/ 
    $.JocodeOverridable = $.jocodeClass({
      
        /**
         * ...
         * @protected
         * @method override
         * @param {Object} members ...
         */
        override : function(override){
            
            if(!override)return;
            
            var key;
        
            for(key in override)
                key in this && (this[key] = override[key]);
        }
    });

})(jQuery);


