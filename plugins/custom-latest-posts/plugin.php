<?php
/**
 * Plugin Name:       Custom Latest Posts
 * Description:       A custom block to filter and display a lists of recent posts.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Chad Barbee
 * Author URI:        https://chadbarbee.com
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       latest-posts
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
include_once("format-output-helpers.php");

function create_block_latest_posts_block_init()
{
    register_block_type(__DIR__ . '/build', array('render_callback' => 'custom_render_latest_posts_block'));
}

add_action('init', 'create_block_latest_posts_block_init');

function custom_render_latest_posts_block($attributes)
{
    $args = array(
        'posts_per_page' => $attributes['numberOfPosts'],
        'post_status' => 'publish',
        'order' => $attributes['order'],
        'orderby' => $attributes['orderBy'],
    );
    if (!empty($attributes['categories'])) {
        $args['category__in'] = array_column($attributes['categories'], 'id');
    }
    $recent_posts = get_posts($args);
    $formatted_posts = format_new_line() . "<ul " . get_block_wrapper_attributes() . ">" . format_new_line();
    foreach ($recent_posts as $post) {
        $post = $post->to_array();
        $formatted_posts .= format_indent(1) . "<li>" . format_new_line();
        if ($attributes["displayFeaturedImage"] && has_post_thumbnail($post['ID'])) {
            $formatted_posts .= format_indent(1) . get_the_post_thumbnail($post['ID'], 'large') . format_new_line();
        }
        $formatted_posts .= format_indent(2) . "<h5>" . format_new_line();
        $formatted_posts .= format_indent(3) . "<a href='" . get_permalink($post['ID']) . "'>" . format_new_line();
        $formatted_posts .= format_indent(4) . $post['post_title'] . format_new_line();
        $formatted_posts .= format_indent(3) . "</a>" . format_new_line();
        $formatted_posts .= format_indent(2) . "</h5>" . format_new_line();
        $formatted_posts .= format_indent(2) . "<time datetime='" . esc_attr__(get_the_date('c', $post["ID"])) . "'>";
        $formatted_posts .= format_indent(3) . esc_html(get_the_date('', $post['ID'])) . format_new_line();
        $formatted_posts .= format_indent(2) . "</time>" . format_new_line();
        if (!empty($post['post_excerpt'])) {
            $formatted_posts .= format_indent(2) . "<p>" . format_new_line();
            $formatted_posts .= format_new_line(3) . $post['post_excerpt'] . format_new_line();
            $formatted_posts .= format_indent(2) . "</p>" . format_new_line();
        }
        $formatted_posts .= format_indent(1) . "</li>" . format_new_line();
    }
    $formatted_posts .= "</ul>" . format_new_line();
    return $formatted_posts;
}