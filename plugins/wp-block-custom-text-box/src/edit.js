/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import {__} from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {useBlockProps, RichText, BlockControls, AlignmentToolbar} from '@wordpress/block-editor';
import {ToolbarGroup, ToolbarButton, ToolbarDropdownMenu} from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 *	 editor. This represents what the editor will render when the block is used.
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({attributes, setAttributes}) {
	const {text, alignment} = attributes;
	const onChangeAlignment = (newAlignment) => {
		setAttributes({alignment: newAlignment});
	};
	const onChangeText = (newText) => {
		setAttributes({text: newText});
	};
	return (
		<>
			<BlockControls>
				<div className="editor-custom-label">Theme Custom Block Options <svg className="fav-icon"
																					 xmlns="http://www.w3.org/2000/svg"
																					 viewBox="0 0 384 512">
					<path
						d="M342.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L274.7 256 105.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/>
				</svg></div>
				<ToolbarGroup>
					<ToolbarButton
						title="Button 2"
						icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
							<path
								d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM64 256c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H96c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/>
						</svg>}
						onClick={() => console.log('Button 2 clicked')}
					/>
					<ToolbarDropdownMenu
						label={__("Align More", "custom-text-box")}
						icon="arrow-down-alt2"
						controls={[
							{
								title: __("Align Left", "custom-text-box"),
								icon: "align-left"
							},
							{
								title: __("Align Right", "custom-text-box"),
								icon: "align-right"
							},
							{
								title: __("Align Center", "custom-text-box"),
								icon: "align-center",
								onClick: () => console.log('Magic is happening here.')
							}
						]}
					/>

				</ToolbarGroup>
			</BlockControls>

			<BlockControls>
				<AlignmentToolbar
					value={alignment}
					onChange={onChangeAlignment}
				/>
			</BlockControls>
			<RichText
				{...useBlockProps({className: `text-box-align-${alignment}`})}
				onChange={onChangeText}
				value={text}
				tagName="h4"
				placeholder={__("Your Text", "custom-text-box")}
				allowedFormats={[]}

			/>
		</>
	);
}
