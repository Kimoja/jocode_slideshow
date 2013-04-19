

(function($){
    

 /**
  * Create classes, that support inheritance and mixins
  * @method jocodeClass
  * @param {Function} construct The constructor
  * @param {Object} proto The prototype
  * @param {Function} parent The super class
  * @for $ 
  * @static
  * @return {Function}
  */
$.jocodeClass = function(proto, parent, mixins) {
    
    proto = proto || {};
    
    var parent_constructor = parent ? typeof parent === 'function' ? parent : parent.constructor : null,
        parent_proto = parent_constructor ? parent_constructor.prototype : null,
        construct = proto.constructor = proto.constructor === Object ? parent_constructor 
                    ? function(){parent_constructor.apply(this, arguments)} 
                    : function(){} : proto.constructor,
        key;
    
    if(parent_constructor){

        function S(){};
        S.prototype = parent_proto;

        construct.prototype = new S();
        
        $.each(proto, function(key, member){
            construct.prototype[key] = proto[key];
        });
    }
    else  construct.prototype = proto;    
    
    construct.prototype.constructor = construct;
    
    if(mixins){
        
        $.each(mixins, function(i, mixin){
            
            mixin = typeof mixin === 'function' ? mixin.prototype : mixin;
            
            $.each(mixin, function(key, member){
                !(key in construct.prototype) && (construct.prototype[key] = member);
            });
        });
    }
    
    return construct;
};
    
})(jQuery);
