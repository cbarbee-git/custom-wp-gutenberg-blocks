<?php
/**
 * Plugin Name:       Team Members
 * Description:       A custom grid containing team members.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Chad Barbee
 * Author URI:        https://chadbarbee.com
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       team-members
 *
 * @package           custom-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function custom_block_team_members_block_init()
{
	register_block_type(__DIR__ . '/build');
}

add_action('init', 'custom_block_team_members_block_init');
