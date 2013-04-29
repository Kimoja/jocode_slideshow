
(function($){
    
    /**
     * Mixin ...
     * @class $.JocodeConfigurable
     **/ 
    $.JocodeConfigurable = $.jocodeClass({
      
        
        /**
         * ...
         * @protected
         * @method initConfig
         * @param {Object} [config] The configuration object
         */
        initConfig : function(config){
        
            var self = this,
                key;
        
            config = self.config || (self.config = config || {});
        
            for(key in config) key in self.defaultConfig 
                && !self.hasOwnProperty(key) 
                && self.setAsMember(key, config[key]);
        },
    
        /**
         * ...
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
                self.setter_cache[key]  = 'set' + key.replace(/(^|_)([a-z])/g, function($1, $2, $3){
                    return $3.toUpperCase();
                })
            )) in self 
                ? self[setter](value) 
                : self[key] = value;
        },
        
        /**
         * ...
         * @protected
         * @property setter_cache
         * @type {Object}
         */
        setter_cache : {},
     
        /**
         * The configuration object
         * 
         * @property config
         * @type {Object}
         */
        config : null,

        /**
         * The default configuration object
         * 
         * @property defaultConfig
         * @type {Object}
         */
        defaultConfig : {}
    
    });

})(jQuery);
