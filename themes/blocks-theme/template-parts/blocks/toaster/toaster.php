<?php

$className = 'toaster';
if (!empty($block['className'])) {
    $className .= ' ' . $block['className'];
}
if (!empty($block['align'])) {
    $className .= ' align' . $block['align'];
}
?>

<div class="<?php echo esc_attr($className); ?>">
    <div class="grid-x grid-margin-x">
        <div class="cell">
            <?php if (have_rows('toasters')) : ?>
                <table>
                    <thead>
                    <th></th>
                    <th>Price</th>
                    <th>Rating</th>
                    <th>Cust. Rating</th>
                    <th>Dimensions</th>
                    <th>Weight</th>
                    <th>Watts</th>
                    </thead>
                    <tbody>
                    <?php while (have_rows('toasters')) : the_row() ?>
                        <tr>
                            <td>
                                <img src="<?= get_sub_field('image')['sizes']['thumbnail']; ?>"
                                     alt="<?= get_sub_field('name') ?>" title="<?= get_sub_field('name') ?>"/>
                                <br/>
                                <?= get_sub_field('name') ?>
                            </td>
                            <td>
                                <?= get_sub_field('price') ?>
                            </td>
                            <td>
                                <?= get_sub_field('our_rating') ?>
                            </td>
                            <td>
                                <?= get_sub_field('average_customer_rating') ?>
                            </td>
                            <td>
                                <?= get_sub_field('dimensions') ?>
                            </td>
                            <td>
                                <?= get_sub_field('weight') ?>
                            </td>
                            <td>
                                <?= get_sub_field('watts') ?>
                            </td>
                        </tr>
                    <?php endwhile; ?>
                    </tbody>
                </table>
            <?php endif; ?>
        </div>
    </div>
</div>
