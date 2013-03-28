

(function($){
    
 /**
  * Create class with inheritance
  * @function
  * @param {Function} construct The constructor
  * @param {Object} proto The prototype
  * @param {Function} parent The super class
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
    
    return construct;
};
    
})(jQuery);
