

(function($){
    /**
     * ...
     * @class $.JocodeWidget
     * @uses $.JocodeConfigurable
     * @uses $.JocodeOverridable
     **/ 
    $.JocodeWidget = $.jocodeClass(
    {
    
        /**
         * The container of the widget
         * 
         * @uses $.JocodeConfigurable
         * @property $container
         * @type {jQuery}
         */
        $container : null,

        /**
         * ....
         * 
         * @method $
         * @param {String} selector ...
         */
        $ : function(selector){

            return !selector || selector === '<' ? this.$container : $(selector, this.$container);
        },
        
        /**
         * ....
         * 
         * @protected
         * @method setAsMember
         * @param {String} key ...
         * @param {Object} value ...
         */
        setAsMember : function(key, value){
            
            var self = this,
                setter;
            
            (setter = self.setter_cache[key] || (
                self.setter_cache[key]  = 'set' + key.replace(/\$/g, '').replace(/(^|_)([a-z])/g, function($1, $2, $3){
                    return $3.toUpperCase();
                })
            )) in self 
                ? self[setter](value) 
                : key.charAt(0) == '$' 
                    ? self[key] = self.$(value)
                    : self[key] = value;
        }
    },
    
    null,
    
    [$.JocodeConfigurable, $.JocodeOverridable]
    );

})(jQuery);
