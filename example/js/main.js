

var JocodeSlideshowExemple = {},
    JocodeSlideshow = {};

function getSlideshow(name){
    /*alert(name)
    alert(name == 'infinite_horizontal_scroll')
    alert(JocodeSlideshowExemple[name])*/
    if(!JocodeSlideshow[name])
        JocodeSlideshow[name] = JocodeSlideshowExemple[name]();
    
    return JocodeSlideshow[name];
}

$(function(){
    
    //gestion du menu des exemples
    var current_displayed = $('#main'),
        current_id = 'main',
        is_exemple = false;
    
    $('#exemple > ul > li > a').click(function(e){
        toogle($(this).attr("href").replace('#', ''));
    });
    
    function toogle(id){
        
        var old_is_exemple = is_exemple,
            old_id = current_id;
        
        if(old_id == id)return;
        
        if(/^exemple_/.test(id)){
            
            is_exemple = true;
            id = id.replace(/^exemple_/, '');
        }
        else is_exemple = false;
        
        current_displayed.hide();
        if(old_is_exemple)
            getSlideshow(old_id).pause();
        
        current_id = id;
        current_displayed = $('#' + id);
        
        current_displayed.show();
        
        if(is_exemple)
            getSlideshow(id).resume();
    }
    
    
    //gestion des onglets des exemples
    $('.exemple_tab a').click(function(e){
        
        e.preventDefault();
        e.stopPropagation();
            
        var self = $(this),
            type = self.attr("href").replace('#', ''),
            ul = self.parent().parent(),
            parent = ul.parent();
        
        $('li > a', ul).removeClass('active');
        
        $('> .exemple_tab_content' , parent).hide();
        $('> .exemple_tab_content.' + type , parent).show();
        
        self.addClass('active');
    });
});
