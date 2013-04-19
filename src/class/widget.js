

(function($){
/**
* Mixin
* @class $.JocodeWidget
**/ 
$.JocodeWidget = $.jocodeClass(
    {
    
        /**
         * The container of the user interface widget
         * 
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
         * @private
         * @method setMember
         * @param {String} key ...
         * @param {Object} value ...
         */
        _setMember : function(key, value){
            
            key.charAt(0) == '$' 
                ? this[key] = this.$(value) 
                : $.JocodeConfigurable.prototype._setMember.call(this, key, value);
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
            
            $.JocodeConfigurable.prototype._initProperty.call(
                this, key.charAt(0) == '$' ? key.slice(1) : key, value
            );
        }
    },
    
    null,
    
    [$.JocodeConfigurable]
);

})(jQuery);
