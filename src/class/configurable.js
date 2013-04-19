

(function($){
    

var camel_cache = {};

function camelCase(key){
    return key.replace(/(^|_)([a-z])/g, function($1, $2, $3){return $3.toUpperCase();});
}    

/**
* Mixin
* @class $.JocodeConfigurable
**/ 
$.JocodeConfigurable = $.jocodeClass({
      
    /**
     * ...
     * @protected
     * @method setConfig
     * @param {Object} config The configuration object
     */
    setConfig : function(config){
        
        var i, j;
        
        this.config = config = config || {};
        
        for(j in this.defaultConfig)
            !(j in config) && (config[j] = this.defaultConfig[j]);
    
        for(i in config){
            
            if(!this.hasOwnProperty(i)){
                i in this 
                    ? this._setMember(i, config[i])
                    : this._initProperty(i, config[i]);
            }
        }

    },
    
    /**
     * ...
     * 
     * @private
     * @method setMember
     * @param {String} key ...
     * @param {Object} value ...
     */
    _setMember : function(key, value){
        
        var setter = 'set' + key.replace(/(^|_)([a-z])/g, function($1, $2, $3){
                      return $3.toUpperCase();});
        
        this[key] = setter in this 
            ? this[setter](value) 
            : value;
    },
    
    /**
     * ...
     * 
     * @private
     * @method _initProperty
     * @param {String} key ...
     * @param {Object} value ...
     */
    _initProperty : function(key, value){
        
        var init = 'init' + key.replace(/(^|_)([a-z])/g, function($1, $2, $3){
                      return $3.toUpperCase();});
        
        init in this && this[init](value);
    },
    
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
