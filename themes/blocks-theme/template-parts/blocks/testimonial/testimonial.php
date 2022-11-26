<?php
/**
 * Testimonial Block Template.
 *
 * @param array $block The block settings and attributes.
 * @param string $content The block inner HTML (empty).
 * @param bool $is_preview True during AJAX preview.
 * @param (int|string) $post_id The post ID this block is saved to.
 */
// Create id attribute allowing for custom "anchor" value.
$id = 'testimonial-' . $block['id'];
//var_dump($block);
if (!empty($block['anchor'])) {
    $id = $block['anchor'];
}
// Create class attribute allowing for custom "className" and "align" values.
$className = 'testimonial';
$classes = ['testimonial'];
$class_bg = '';
if (!empty($block['className'])) {
    $classes = array_merge($classes, explode(' ', $block['className']));
}
if (!empty($block['align'])) {
    $classes[] = 'align' . $block['align'];
}
$classes[] = 'has-background';
$class_bg = 'has-background';
if (!empty($block['backgroundColor'])) {
    $classes[] = 'has-' . $block['backgroundColor'] . '-background-color';
    //this class is handled slightly differently.
    // only use this on the interior of the block, otherwise this could affect the entire row.
    $class_bg .= ' has-' . $block['backgroundColor'] . '-background-color';
} else {
    //now check for gradient bg
    if (!empty($block['gradient'])) {
        $classes[] = 'has-' . $block['gradient'] . '-gradient-background';
        $class_bg .= ' has-' . $block['gradient'] . '-gradient-background';
    } else {
        //set defaults to white, if nothing else has been set
        $classes[] = 'has-white-background-color';
        // only use this on the interior of the block, otherwise this could affect the entire row.
        $class_bg .= ' has-white-background-color';
    }
}
if (!empty($block['textColor'])) {
    $classes[] = 'has-text-color';
    $classes[] = 'has-' . $block['textColor'] . '-color';
}

// Load values and assigning defaults.
$text = get_field('testimonial') ?: 'Your testimonial here...';
$author = get_field('author') ?: 'Author name';
$role = get_field('role') ?: 'Author role';
//TODO: find a better way to include a variable default
$image = get_field('image') ?: 56; //this sets a default imgID#, if none has been selected (specific to THIS WP Current Media Library)
?>
<!--Markup for Testimonial-->
<?php
//open container div with all the needed classes & the id from above
printf(
    '<div class="%s"%s>',
    esc_attr(join(' ', $classes)),
    ' id="' . $id . '"',
);
?>
<blockquote class="testimonial-blockquote">
    <span class="testimonial-text"><?php echo $text; ?></span>
    <div class="testimonial-arrow <?= $class_bg ?>"></div>
</blockquote>
<div class="testimonial-image">
    <?php echo wp_get_attachment_image($image, 'full'); ?>
</div>
<div class="testimonial-author <?= $class_bg ?>">
    <h5><?php echo $author; ?>
        <span class="testimonial-role">
                <cite> - <?php echo $role; ?></cite>
            </span>
    </h5>
</div>
</div>
<!--/END Markup for Testimonial -->
