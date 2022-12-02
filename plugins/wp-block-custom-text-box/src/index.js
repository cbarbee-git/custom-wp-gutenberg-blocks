/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import {registerBlockType, createBlock} from '@wordpress/blocks';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';
import {__} from '@wordpress/i18n';

/**
 * Adding support for deprecated tag H4 change to P tag
 */
import v1 from './v1';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';
import metadata from './block.json';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType(metadata.name, {
    icon: {
        src: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                   className="bi bi-card-text"
                   viewBox="0 0 16 16">
            <path
                d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
            <path
                d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z"/>
        </svg>)
    },
    /**
     * @see ./edit.js
     */
    edit: Edit,

    /**
     * @see ./save.js
     */
    save,
    deprecated: [v1],
    variations: [{
        name: "custom-block/gradient-text-box",
        title: __("Gradient Text Box", "custom-text-box"),
        icon: {
            src: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                       className="bi bi-card-text svg-gradient"
                       viewBox="0 0 16 16">
                <linearGradient id='g1' y1='1'>
                    <stop stopColor='#3bade3'/>
                    <stop offset='.25' stopColor='#576fe6'/>
                    <stop offset='.51' stopColor='#9844b7'/>
                    <stop offset='1' stopColor='#ff357f'/>
                </linearGradient>
                <path
                    d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
                <path
                    d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z"/>
            </svg>)
        },
        attributes: {
            gradient: "custom-button-gradient"
        }
    }],
    transforms: {
        from: [
            {
                type: "block",
                blocks: ["core/paragraph"],
                transform: ({content, align, shadow, gradient}) => {
                    return createBlock("custom-block/text-box", {
                        text: content,
                        alignment: align,
                        shadow,
                        gradient,
                    })
                }
            },
            {
                type: "enter",
                regEx: /textbox/i,
                transform: () => {
                    return createBlock("custom-block/text-box")
                }
            },
            {
                type: "prefix",
                prefix: "textbox",
                transform: () => {
                    return createBlock("custom-block/text-box")
                }
            },
        ],
        to: [{
            type: "block",
            block: "core/paragraph",
            isMatch: ({text}) => {
                return text ? true : false
            },
            transform: ({text, alignment}) => {
                return createBlock("core/paragraph", {
                    content: text,
                    align: alignment,
                })
            }
        }]
    }
});
