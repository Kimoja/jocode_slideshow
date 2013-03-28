<?php

$exemples_data = array();

if ($dir = opendir('./')) {
    
    while (($entry = readdir($dir)) !== false) {
        
        if($entry == '.' || $entry == '..' || $entry == 'css'  || $entry == 'image' || $entry == 'js' 
                || $entry == 'slide' || $entry == 'index.php' || $entry == 'tmp')
            continue;
        
        if ($exemple_dir = opendir($entry)) {
            
            while (($exemple = readdir($exemple_dir)) !== false) {
                
                if($exemple == '.' || $exemple == '..') continue;
                
                $explode = explode(".", $exemple); 
                $src = "./$entry/$exemple";
                
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
        
        <link rel="stylesheet" href="./css/index.css">
        
        <script src="../lib/jquery-1.9.1.min.js"></script>
        
        <script src="../src/jocode_class.js"></script>
        <script src="../src/jocode_slideshow.js"></script>
        <script src="../src/fx/slideshow/scroll.js"></script>
        <script src="../src/fx/slideshow/fade.js"></script>
        <script src="../src/jocode_slideshow_navigation.js"></script>
        <script src="../src/fx/navigation/scroll.js"></script>
        
        <script src="./js/main.js"></script>
        
        <?php
            foreach ($exemples_data['css'] as $value)
                echo '<link rel="stylesheet" href="'.$value['src'].'">';
            
            foreach ($exemples_data['js'] as $value)
                echo '<script src="'.$value['src'].'"></script>';
        ?>
        
        
        <script type="text/javascript" src="./js/rainbow-custom.min.js"></script>
        
    </head>
    <body>
        
        <div id="wrapper">
            
            <header id="nav">
                    
                <div id="logo">
                    <a href="http://jocode.org">
                        <figure><img src="./image/jocode.png" alt="JoCode"></figure>
                    </a>
                </div>
                
                <h1>Exemple</h1>

                <nav id="exemple">
                    <ul>
                        <li><a href="#exemple_basic">Basic</a></li>
                        <li><a href="#exemple_horizontal_fade">Horizontal fade</a></li>
                        <li><a href="#exemple_vertical_scroll">Vertical scroll</a></li>
                        <li><a href="#exemple_infinite_horizontal_scroll">Infinite horizontal scroll</a></li>
                    </ul>
                </nav>
                
            </header>    

            <section id="main">


            </section>

            <?php

                $i = 0;
                foreach ($exemples_data['html'] as $value){

                    echo '<section class="exemple" id="'.$value['id'].'">';

                    echo $value['data'],
                            '<ul class="exemple_tab">',
                                '<li><a href="#javascript" class="active">Javascript</a></li>',
                                '<li><a href="#html">HTML</a></li>',
                                '<li><a href="#css">CSS</a></li>',
                            '</ul>',
                            '<div class="exemple_tab_content javascript "><pre data-language="javascript">',
                                 $exemples_data['js'][$i]['data'].'</pre></div>',
                            '<div class="exemple_tab_content html"><pre data-language="html">',
                                 htmlentities($value['data']).'</pre></div>',
                            '<div class="exemple_tab_content css"><pre data-language="css">',
                                 $exemples_data['css'][$i]['data'].'</pre></div></section>';
                    $i++;
                }
            ?>
            
        </div>
        
    </body>
</html>