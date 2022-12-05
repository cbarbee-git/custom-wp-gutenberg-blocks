<?php
/**
 * blocks theme functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package blocks_theme
 */

if (!defined('_S_VERSION')) {
    // Replace the version number of the theme on each release.
    define('_S_VERSION', '1.0.0');
}

/**
 * Set up ACF to create custom Gutenberg Blocks
 */
if (function_exists('acf_register_block_type')) {
    add_action('acf/init', 'register_acf_block_types');
}
function register_acf_block_types()
{
    //Toaster Test Block
    acf_register_block_type(array(
        'name' => 'toaster',
        'title' => __('Toaster'),
        'description' => __('A custom toaster block'),
        'render_template' => 'template-parts/blocks/toaster/toaster.php',
        'icon' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 32C192 32 0 64 0 192c0 35.3 28.7 64 64 64V432c0 26.5 21.5 48 48 48H400c26.5 0 48-21.5 48-48V256c35.3 0 64-28.7 64-64C512 64 320 32 256 32z"/></svg>',
        'keywords' => array('toaster', 'product')
    ));

    //Testimonial Block
    acf_register_block_type(array(
        'name' => 'testimonial',
        'title' => __('Testimonial'),
        'description' => __('A custom ACF Testimonial block'),
        'render_template' => 'template-parts/blocks/testimonial/testimonial.php',
        'category' => 'formatting',
        'icon' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M0 216C0 149.7 53.7 96 120 96h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V320 288 216zm256 0c0-66.3 53.7-120 120-120h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H320c-35.3 0-64-28.7-64-64V320 288 216z"/></svg>',
        'keywords' => array('testimonial', 'quote', 'client'),
        'supports' => [
            'color' => [
                'background' => true,
                'gradients' => true,
                'text' => true
            ]

        ]
    ));
}

/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function blocks_theme_setup()
{

    add_theme_support('editor-styles');
    add_editor_style('style-editor.css');
    //add custom block for testimonials styles here.
    add_editor_style('template-parts/blocks/testimonial/testimonial.css');
    add_theme_support('responsive-embeds');
    add_theme_support('align-wide');
    //remove custom colors, restrict to the palette listed below
    ////add_theme_support('disable-custom-colors');
    //here are the custom color palette to select in the editor
    add_theme_support('editor-color-palette', array(
            array(
                'name' => esc_attr__('Site Background', ''),
                'slug' => 'site-background',
                'color' => 'rgba(253, 251, 244, 1)'
            ),
            array(
                'name' => esc_attr__('White', ''),
                'slug' => 'white',
                'color' => 'rgba(255, 255, 255, 1)'
            ),
            array(
                'name' => esc_attr__('Dark Slate'),
                'slug' => 'dark-slate',
                'color' => 'rgba(65, 96, 120, 1)'
            ),
            array(
                'name' => esc_attr__('Medium Slate'),
                'slug' => 'medium-slate',
                'color' => 'rgba(100, 145, 187, 1)'
            ),
            array(
                'name' => esc_attr__('Light Slate'),
                'slug' => 'light-slate',
                'color' => 'rgba(194, 212, 233, 1)'
            ),
            array(
                'name' => esc_attr__('Accent Green'),
                'slug' => 'accent-green',
                'color' => 'rgba(184, 196, 75, 1)'
            ),
            array(
                'name' => esc_attr__('Cream'),
                'slug' => 'cream',
                'color' => 'rgba(234, 238, 217, 1)'
            ),
        )
    );
    //remove custom gradients, restrict to the preset(s) listed below
    ////add_theme_support('disable-custom-gradients');
    //here are the custom color palette to select in the editor
    add_theme_support('editor-gradient-presets', array(
        array(
            'name' => esc_attr__('Custom Button Gradient'),
            'slug' => 'custom-button-gradient',
            'gradient' => 'linear-gradient(45deg, rgb(59, 173, 227) 0%, rgb(87, 111, 230) 25%, rgb(152, 68, 183) 51%, rgb(255, 53, 127) 100%)'
            //'gradient' => 'linear-gradient(45deg, #3bade3 0%, #576fe6 25%, #9844b7 51%, #ff357f 100%)'
        )

    ));

    add_theme_support('custom-line-height');
    add_theme_support('custom-spacing');
    add_theme_support('custom-units');

    add_action('admin_head', 'my_custom_favicon');
    function my_custom_favicon()
    {
        echo '
                <style>
                    .dashicons-note {
                        background-image: url("https://icons.veryicon.com/png/128/business/credit/note-126.png");
                        background-repeat: no-repeat;
                        background-position: center; 
                    }
                </style>
        ';
    }

    /*
        * Make theme available for translation.
        * Translations can be filed in the /languages/ directory.
        * If you're building a theme based on blocks theme, use a find and replace
        * to change 'blocks-theme' to the name of your theme in all the template files.
        */
    load_theme_textdomain('blocks-theme', get_template_directory() . '/languages');

    // Add default posts and comments RSS feed links to head.
    add_theme_support('automatic-feed-links');

    /*
        * Let WordPress manage the document title.
        * By adding theme support, we declare that this theme does not use a
        * hard-coded <title> tag in the document head, and expect WordPress to
        * provide it for us.
        */
    add_theme_support('title-tag');

    /*
        * Enable support for Post Thumbnails on posts and pages.
        *
        * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
        */
    add_theme_support('post-thumbnails');

    // This theme uses wp_nav_menu() in one location.
    register_nav_menus(
        array(
            'menu-1' => esc_html__('Primary', 'blocks-theme'),
        )
    );

    /*
        * Switch default core markup for search form, comment form, and comments
        * to output valid HTML5.
        */
    add_theme_support(
        'html5',
        array(
            'search-form',
            'comment-form',
            'comment-list',
            'gallery',
            'caption',
            'style',
            'script',
        )
    );

    // Set up the WordPress core custom background feature.
    add_theme_support(
        'custom-background',
        apply_filters(
            'blocks_theme_custom_background_args',
            array(
                'default-color' => 'ffffff',
                'default-image' => '',
            )
        )
    );

    // Add theme support for selective refresh for widgets.
    add_theme_support('customize-selective-refresh-widgets');

    /**
     * Add support for core custom logo.
     *
     * @link https://codex.wordpress.org/Theme_Logo
     */
    add_theme_support(
        'custom-logo',
        array(
            'height' => 250,
            'width' => 250,
            'flex-width' => true,
            'flex-height' => true,
        )
    );
}

add_action('after_setup_theme', 'blocks_theme_setup');

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function blocks_theme_content_width()
{
    $GLOBALS['content_width'] = apply_filters('blocks_theme_content_width', 640);
}

add_action('after_setup_theme', 'blocks_theme_content_width', 0);

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function blocks_theme_widgets_init()
{
    register_sidebar(
        array(
            'name' => esc_html__('Sidebar', 'blocks-theme'),
            'id' => 'sidebar-1',
            'description' => esc_html__('Add widgets here.', 'blocks-theme'),
            'before_widget' => '<section id="%1$s" class="widget %2$s">',
            'after_widget' => '</section>',
            'before_title' => '<h2 class="widget-title">',
            'after_title' => '</h2>',
        )
    );
}

add_action('widgets_init', 'blocks_theme_widgets_init');

/**
 * Enqueue scripts and styles.
 */
function blocks_theme_scripts()
{
    wp_enqueue_style('blocks-theme-style', get_stylesheet_uri(), array(), _S_VERSION);
    wp_style_add_data('blocks-theme-style', 'rtl', 'replace');

    wp_enqueue_script('blocks-theme-navigation', get_template_directory_uri() . '/js/navigation.js', array(), _S_VERSION, true);

    if (is_singular() && comments_open() && get_option('thread_comments')) {
        wp_enqueue_script('comment-reply');
    }

    /* Custom ACF Block Styles for Testimonials */
    wp_enqueue_style('block-testimonial', get_stylesheet_directory_uri() . '/template-parts/blocks/testimonial/testimonial.css');
    /* END Custom ACF Block for Testimonials */
}

add_action('wp_enqueue_scripts', 'blocks_theme_scripts');

/**
 * Implement the Custom Header feature.
 */
require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require get_template_directory() . '/inc/template-functions.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
if (defined('JETPACK__VERSION')) {
    require get_template_directory() . '/inc/jetpack.php';
}

