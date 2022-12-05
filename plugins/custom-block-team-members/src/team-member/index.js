/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import {__} from '@wordpress/i18n';

/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import {registerBlockType, createBlock} from '@wordpress/blocks';

//TODO: there should be a way to set the data inside a block.json....it doesn't work for me
//import {metadata} from './block.json';

/**
 * Internal dependencies
 */
import Edit from './edit';
import Save from './save';
// import innerBlocks from "@wordpress/block-editor/build/components/inner-blocks";

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType("custom-block/team-member", {
	title: __("Team Member", "team-members"),
	description: __("A team member", "team-members"),
	icon: "admin-users",
	parent: "custom-block/team-members",
	supports: {
		reusable: false,
		html: false
	},
	attributes: {
		name: {
			type: "string",
			source: "html",
			selector: "h4"
		},
		bio: {
			type: "string",
			source: "html",
			selector: "p"
		},
		id: {
			type: 'number',
		},
		alt: {
			type: 'string',
			source: 'attribute',
			selector: 'img',
			attribute: 'alt',
			default: '',
		},
		url: {
			type: 'string',
			source: 'attribute',
			selector: 'img',
			attribute: 'src',
		},
		socialLinks: {
			type: 'array',
			default: [],
			source: 'query',
			selector: '.wp-block-custom-block-team-member-social-links ul li',
			query: {
				icon: {
					source: 'attribute',
					attribute: 'data-icon',
				},
				link: {
					selector: 'a',
					source: 'attribute',
					attribute: 'href',
				},
			}

		}
	},
	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save: Save,

	/**
	 * This Transform causes strange errors. I cannot find the bug here.
	 * I'll leave this here...for reference only.
	 * This function does not work
	 */
	/*transforms: {
		from: [
			{
				type: 'block',
				blocks: ['core/gallery'],
				transform: ({images, columns}) => {
					const innerBlocks = images.map(({url, id, alt}) => {
						return createBlock('custom-block/team-member', {
							alt,
							id,
							url,
						});
					});
					return createBlock(
						'custom-block/team-members',
						{
							columns: columns || 2,
						},
						innerBlocks
					);
				},
			},
			{
				type: 'block',
				blocks: ['core/image'],
				isMultiBlock: true,
				transform: (attributes) => {
					const innerBlocks = attributes.map(
						({url, id, alt}) => {
							return createBlock('custom-block/team-member', {
								alt,
								id,
								url,
							});
						}
					);
					return createBlock(
						'custom-block/team-members',
						{
							columns:
								attributes.length > 3 ? 3 : attributes.length,
						},
						innerBlocks
					);
				},
			},
		],
	},*/
});
