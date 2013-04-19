var fs = require('fs'),
    ejs = require('ejs'),
    hl = require("highlight.js"),
    doc_json = require("./doc/data.json");

var files = {},
    doc_obj = {},
    exemple_tpl = ejs.compile(fs.readFileSync('exemple.ejs', 'utf8'), {}),
    doc_tpl = ejs.compile(fs.readFileSync('doc.ejs', 'utf8'), {});

function forEach(obj, callback){
    
    for(var i in obj){
        callback(obj[i], i);
    }
}

fs.readdirSync('exemple/').forEach(function(project, index){
    
    var site_project_path = '../site/' + project + '/',
        build_project_path = 'exemple/' + project + '/',
        file_project = files[project] = {};
    
    if(!fs.existsSync(site_project_path))
        fs.mkdirSync(site_project_path);

    fs.readdirSync('exemple/' + project + '/').forEach(function(id, index){
        
        var base_path = build_project_path + id + '/' + id,
            txt = fs.existsSync(base_path + '.txt') 
                        ? fs.readFileSync(base_path + '.txt') + '' : '',
            html = fs.existsSync(base_path + '.html') 
                        ?  fs.readFileSync(base_path + '.html') + ''  : '',
            css= fs.existsSync(base_path + '.css')  
                        ? fs.readFileSync(base_path + '.css') + ''   : '',
            js = fs.existsSync(base_path + '.js') 
                        ? fs.readFileSync(base_path + '.js') + ''  : '',
            site_id_path = site_project_path + '/' + id,
            id_project = file_project[id] = ['html'];
            
         fs.writeFileSync(site_id_path + '.html', exemple_tpl({
             txt : txt + html,
             html : html && hl.highlight('xml',  html).value.trim(),
             css : css && hl.highlight('css', css).value.trim(),
             js :  js && hl.highlight('javascript', js).value.trim(),
             project : project,
             id : id
         }));
         
        css && (fs.writeFileSync(site_id_path + '.css', css) || id_project.push('css'));
        js && (fs.writeFileSync(site_id_path + '.js', js) || id_project.push('js'));
    });
});


/* biuld doc
 **********************************/
forEach(doc_json.classes, function(cls, key_cls){
    
    doc_obj[key_cls] = cls;
    cls.methods = [];
    cls.properties = [];
});

doc_json.classitems.forEach(function(item, index){
    
    var cls = item["class"],
        o_cls;
        
    if(!(o_cls = doc_obj[cls])){
        console.log('Missing class :' + cls + ' , member : ' + item.name);
        return;
    }
    item.itemtype == 'property' 
        ? o_cls.properties.push(item)
        : o_cls.methods.push(item);
});

forEach(doc_obj, function(cls, key_cls){
    
    if(key_cls != '$.JocodeConfig' && /^.*Config$/.test(key_cls)){
        delete doc_obj[key_cls]
        doc_obj[key_cls.replace('Config', '')].config = cls;
    }
});


files.doc = {};
forEach(doc_obj, function(cls, key_cls){
    
    files.doc[cls.name] = ['html'];
    fs.writeFileSync('../site/doc/' + cls.name + '.html', doc_tpl({o : cls}));
});


fs.writeFileSync('../site/js/page.js', 'var Page = ' + JSON.stringify(files));

/* end biuld doc
 **********************************/
//classitems
//end biuld doc

/*rwebkit = /(webkit)[ \/]([\w.]+)/,
	ropera = /(opera)(?:.*version)?[ \/]([\w.]+)/,
	rmsie = /(msie) ([\w.]+)/,
	rmozilla = /(mozilla)(?:.*? rv:([\w.]+))?/,
*/

