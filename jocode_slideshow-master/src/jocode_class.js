

(function($){
    
 /**
  * Create classes, that support  inheritance
  * @method jocodeClass
  * @param {Function} construct The constructor
  * @param {Object} proto The prototype
  * @param {Function} parent The super class
  * @for $ 
  * @static
  * @return {Function}
  */
$.jocodeClass = function(construct, proto, parent) {
    
    var key;
    
    if(parent && typeof parent === 'function'){

        function S(){};
        S.prototype = parent.prototype;

        construct.prototype = new S();
        
        for(key in proto)
            construct.prototype[key] = proto[key];
    }
    else  construct.prototype = proto;

    construct.prototype.constructor = construct;
    
    //to put somewhere else
    construct.prototype.setConfig = function(config){
        
        var i, member;
        
        for(i in config)
            i in this && (this[i] = config[i]);
        
        this.config = config;
    };
    
    return construct;
};
    
})(jQuery);
