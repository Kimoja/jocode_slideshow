<?php

$exemples_data = array();
$doc_data = array();

if ($dir = opendir('./site/')) {
    
    while (($entry = readdir($dir)) !== false) {
        
       if($entry == '.' || $entry == '..' || $entry == 'css'  || $entry == 'image' || $entry == 'js'
                || $entry == 'slide' || $entry == 'index.php' || $entry == 'test.html' || $entry == 'temp')
            continue;
        
        if($entry == 'doc' && $doc_dir = opendir('./site/'.$entry)){
            
            while (($doc = readdir($doc_dir)) !== false) {
                
                if($doc == '.' || $doc == '..') continue;
                 
                $src = "./site/$entry/$doc";
                
                $doc_data[]= array(
                            "id" => substr($doc, 0, strrpos($doc, '.')),
                            "data" => file_get_contents($src) 
                );
            }
            
            closedir($doc_dir);
            
        } elseif ($exemple_dir = opendir('./site/'.$entry)) {
            
            while (($exemple = readdir($exemple_dir)) !== false) {
                
                if($exemple == '.' || $exemple == '..') continue;
                
                $explode = explode(".", $exemple); 
                $src = "./site/$entry/$exemple";
                
                $exemples_data[$explode[1]][] = array(
                            "id" => $explode[0],
                            "src" => $src,
                            "data" => file_get_contents($src) 
                );
            }
            
            closedir($exemple_dir);
        }
    }
    
    closedir($dir);
    
    //echo var_dump($exemples_data);
}

?>

<!DOCTYPE html>
<html>
    <head>

        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        
        <title>JocodeSlideshow</title>
        
        <!--[if lt IE 9]>
            <script src="./js/html5.js" type="text/javascript"></script>
        <![endif]-->
        
        <link rel="stylesheet" href="./site/css/index.css">
        <link rel="stylesheet" href="./site/css/sh_nedit.css">
        
        <script src="./lib/jquery-1.9.1.min.js"></script>
        
        <script src="./src/jocode_class.js"></script>
        <script src="./src/jocode_slideshow.js"></script>
        <script src="./src/fx/slideshow/scroll.js"></script>
        <script src="./src/fx/slideshow/fade.js"></script>
        <script src="./src/jocode_slideshow_navigation.js"></script>
        <script src="./src/fx/navigation/scroll.js"></script>
        
        <script src="./site/js/main.js"></script>
        
        <?php
            foreach ($exemples_data['css'] as $value)
                echo '<link rel="stylesheet" href="'.$value['src'].'">';
            
            foreach ($exemples_data['js'] as $value)
                echo '<script src="'.$value['src'].'"></script>';
        ?>
        
        
        <script type="text/javascript" src="./site/js/sh_main.min.js"></script>
        <script type="text/javascript" src="./site/js/sh_css.min.js"></script>
        <script type="text/javascript" src="./site/js/sh_html.min.js"></script>
        <script type="text/javascript" src="./site/js/sh_javascript.min.js"></script>
       
    </head>
    <body>
        
        <div id="wrapper">
            
            <div id="header">
                    
                <div id="logo">
                    <a href="http://jocode.org">
                        <img src="./site/image/jocode.png" alt="JoCode">
                    </a>
                </div>
                
                <h1>Exemple</h1>

                <nav id="exemple">
                    <ul>
                        <li><a href="#exemple_basic">Basic</a></li>
                        <li><a href="#exemple_horizontal_fade">Horizontal fade</a></li>
                        <li><a href="#exemple_vertical_scroll">Vertical scroll</a></li>
                        <li><a href="#exemple_horizontal_scroll_async">Horizontal scroll asynchronous</a></li>
                    </ul>
                </nav>
                
                <h1>Documentation</h1>

                <nav id="doc">
                    <ul>
                        <li><a href="#doc__">$</a></li>
                        <li><a href="#doc__JocodeSlideshow">$.JocodeSlideshow</a></li>
                        <li><a href="#doc__JocodeSlideshowNavigation">$.JocodeSlideshowNavigation</a></li>
                        <li><a href="#doc__JocodeSlideshowFx_Base">$.JocodeSlideshowFx.Base</a></li>
                        <li><a href="#doc__JocodeSlideshowNavigationFx_Base">$.JocodeSlideshowNavigationFx.Base</a></li>
                    </ul>
                </nav>
                
            </div>    

            <div class="section" id="main">

            </div>

            <?php

                $i = 0;
                foreach ($exemples_data['html'] as $value){

                    echo '<div class="section exemple" id="'.$value['id'].'">';

                    echo $value['data'],
                            '<ul class="tab">',
                                '<li><a href="#javascript">Javascript</a></li>',
                                '<li><a href="#html">HTML</a></li>',
                                '<li><a href="#css">CSS</a></li>',
                            '</ul>',
                            '<div class="tab_content javascript"><pre class="sh_javascript">',
                                 $exemples_data['js'][$i]['data'].'</pre></div>',
                            '<div class="tab_content html"><pre class="sh_html">',
                                 htmlentities($value['data']).'</pre></div>',
                            '<div class="tab_content css"><pre class="sh_css">',
                                 $exemples_data['css'][$i]['data'].'</pre></div></div>';
                    $i++;
                }
                
                foreach ($doc_data as $value){
                    
                    $id = str_replace('$', "_" , str_replace ('.', "_" , str_replace ('$.', "_", $value['id'])));
                    
                    echo '<div class="section doc" id="'.$id.'">', $value['data'], '</div>';
                }
                
            ?>
            
        </div>
        
    </body>
</html>