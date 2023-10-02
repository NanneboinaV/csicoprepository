<?php
add_action( 'wp_enqueue_scripts', 'my_theme_enqueue_assets',99 );
function my_theme_enqueue_assets() {
 
   // Enqueue the style
  
   if (basename(get_page_template()) === "page-repo.php") {

        wp_enqueue_style('custom-css', get_stylesheet_directory_uri() . '/css/custom.css');
        // wp_enqueue_script('my-custom-script', get_template_directory_uri() . '/js/custom.js', array('jquery'), '2.0.0', true);
        wp_enqueue_script('script-name', get_stylesheet_directory_uri() . '/js/custom.js', array('jquery'), date("his"), true);
        wp_enqueue_script('script-name-lang', get_stylesheet_directory_uri() . '/js/languageData.js', array('jquery'), date("h:i:s"), true);
        wp_enqueue_script('datatable-js', '//cdn.datatables.net/1.13.1/js/jquery.dataTables.min.js');
        wp_enqueue_script('bootstrap-js','//cdn.datatables.net/1.13.1/js/dataTables.bootstrap5.min.js');
        wp_enqueue_style('datatable-css', '//cdn.datatables.net/1.13.1/css/jquery.dataTables.min.css');
        wp_enqueue_style('bootstrap-css', '//cdn.datatables.net/1.13.1/css/dataTables.bootstrap5.min.css');
        wp_localize_script('script-name', 'MyAjax', array(
            // URL to wp-admin/admin-ajax.php to process the request
            'ajaxurl' => admin_url('admin-ajax.php'),
            // generate a nonce with a unique ID "myajax-post-comment-nonce"
            // so that you can check it later when an AJAX request is sent
            'security' => wp_create_nonce('my-special-string'),
        ));
    }
}


	
