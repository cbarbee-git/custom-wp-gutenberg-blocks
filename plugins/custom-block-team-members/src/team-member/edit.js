/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import {__} from '@wordpress/i18n';
import {isBlobURL, revokeBlobURL} from '@wordpress/blob';
import {
	Spinner,
	withNotices,
	ToolbarButton,
	PanelBody,
	TextareaControl,
	SelectControl,
	Icon,
	Tooltip,
	TextControl,
	Button
} from '@wordpress/components';
import {useEffect, useState, useRef} from '@wordpress/element';
import {usePrevious} from '@wordpress/compose';
import {useSelect} from '@wordpress/data'
/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
	useBlockProps,
	RichText,
	MediaPlaceholder,
	BlockControls,
	MediaReplaceFlow,
	InspectorControls,
	store as BlockEditorStore
} from "@wordpress/block-editor";
import {DndContext, useSensors, useSensor, PointerSensor, TouchSensor} from "@dnd-kit/core";
import {restrictToHorizontalAxis} from '@dnd-kit/modifiers';
import {
	SortableContext,
	horizontalListSortingStrategy,
	arrayMove
} from "@dnd-kit/sortable";
import SortableItem from './sortable-item';

function Edit({attributes, setAttributes, noticeOperations, noticeIU, isSelected}) {
	const {name, bio, url, alt, id, socialLinks} = attributes
	const [blobURL, setBlobURL] = useState();
	const [selectedLink, setSelectedLink] = useState();
	const titleRef = useRef();
	const previousURL = usePrevious(url);
	const previousIsSelected = usePrevious(isSelected);
	const sensors = useSensors(
		useSensor(PointerSensor,
			{activationConstraint: {distance: 5}}),
		useSensor(TouchSensor,
			{activationConstraint: {distance: 5}})
	);
	const handleDragEnd = (event) => {
		const {active, over} = event;
		if (active && over && active.id !== over.id) {
			const oldIndex = socialLinks.findIndex(
				(i) => active.id === `${i.icon}-${i.link}`
			);
			const newIndex = socialLinks.findIndex(
				(i) => over.id === `${i.icon}-${i.link}`
			);
			setAttributes({
				socialLinks: arrayMove(socialLinks, oldIndex, newIndex),
			});
			setSelectedLink(newIndex);
		}
	};
	const imageObject = useSelect((select) => {
		const {getMedia} = select('core');
		return id ? getMedia(id) : null;
	}, [id]);
	const imageSizes = useSelect((select) => {
		return select(BlockEditorStore).getSettings().imageSizes;
	}, []);
	const getImageSizeOptions = () => {
		if (!imageObject) return [];
		const options = [];
		const sizes = imageObject.media_details.sizes;
		for (const key in sizes) {
			const size = sizes[key];
			const imageSize = imageSizes.find(s => s.slug === key)
			if (imageSize) {
				options.push({
					label: imageSize.name,
					value: size.source_url,
				});
			}
		}
		return options;
	}
	const onChangeImageSize = (newURL) => {
		setAttributes({url: newURL});
	}
	const onChangeName = (newName) => {
		setAttributes({name: newName});
	}
	const onChangeBio = (newBio) => {
		setAttributes({bio: newBio});
	}
	const onChangeAltText = (newAltText) => {
		setAttributes({alt: newAltText})
	}
	const onSelectImage = (image) => {
		if (!image || !image.url) {
			setAttributes({url: undefined, id: undefined, alt: ''});
			return;
		}
		setAttributes({url: image.url, id: image.id, alt: image.alt});
	}
	const onSelectImageURL = (newUrl) => {
		setAttributes({url: newUrl, id: undefined, alt: ''});
	}
	const onClickRemoveImage = () => {
		setAttributes({url: undefined, id: undefined, alt: ''});
	}
	const onUploadError = (message) => {
		noticeOperations.removeAllNotices();
		noticeOperations.createErrorNotice(message);
	}

	const addNewSocialItem = () => {
		setAttributes({
			socialLinks: [...socialLinks, {icon: "wordpress", link: 'https://chadbarbee.com'}]
		});
		setSelectedLink(socialLinks.length);
	}

	const removeSocialItem = () => {
		//slice the Current Array, at the Selected Element
		//then concat them fragments to produce a new array (minus the removed item)
		setAttributes({
			socialLinks: [
				...socialLinks.slice(0, selectedLink),
				...socialLinks.slice(selectedLink + 1)]
		});
		setSelectedLink(undefined);
	}

	const updateSocialItem = (type, value) => {
		//make a copy, as to not edited the array directly
		const tempSocialLinks = [...socialLinks];
		tempSocialLinks[selectedLink][type] = value;
		//now use the copy to reset the values
		setAttributes({
			socialLinks: tempSocialLinks
		});
	}

	//This handles cases when img upload did not finish prior to save
	useEffect(() => {
		//if no ID is set and the BlobURL is being used, just reset and allow to upload again.
		if (!id && isBlobURL(url)) {
			setAttributes({
				url: undefined,
				alt: ''
			});
		}
	}, []);

	//This will clear any existing BlobURL from memory
	useEffect(() => {
		if (isBlobURL(url)) {
			setBlobURL(url);
		} else {
			revokeBlobURL(blobURL);
			setBlobURL(undefined);
		}
	}, [url])

	//set focus on the next likely element to edit, post image select
	useEffect(() => {
		//this only set focus on title input when adding new image (not removing, or replacing one)
		if (url && !previousURL && isSelected) {
			titleRef.current.focus();
		}
	}, [url, previousURL]);

	useEffect(() => {
		if (previousIsSelected && !isSelected) {
			setSelectedLink(undefined);
		}
	}, [isSelected, previousIsSelected])
	return (
		<>
			{/* This will allow a change within this template but keep the value in the Media Library intact */}
			<InspectorControls>
				<PanelBody label={__("Image Settings", "team-members")}>
					<SelectControl
						label={__("Image Sizes", "team-members")}
						options={getImageSizeOptions()}
						value={url}
						onChange={onChangeImageSize}
					/>
					<TextareaControl
						label={__("Alt Text", "team-members")}
						onChange={onChangeAltText}
						value={alt}
						help={__("Alternative text describes your image to people who cannot see it. Add a short description with key details", "team-members")}
					/>
				</PanelBody>
			</InspectorControls>
			{url && (
				<BlockControls group="inline">
					<MediaReplaceFlow
						name={__("Replace Image", "team-members")}
						onSelect={onSelectImage}
						onSelectURL={onSelectImageURL}
						onError={onUploadError}
						accept="image/*"
						allowedTypes={['image']}
						mediaId={id}
						mediaURL={url}
					/>
					<ToolbarButton onClick={onClickRemoveImage}>{__("Remove Image", "team-members")}</ToolbarButton>
				</BlockControls>
			)}
			<div {...useBlockProps()}>
				{url && (
					<div
						className={`wp-block-custom-block-team-member-img${isBlobURL(url) ? ' is-loading' : ''}`}
					>
						<img src={url} alt={alt}/>
						{isBlobURL(url) && <Spinner/>}
					</div>
				)}
				<MediaPlaceholder
					onSelect={onSelectImage}
					onSelectURL={onSelectImageURL}
					onError={onUploadError}
					accept="image/*"
					allowedTypes={['image']}
					disableMediaButtons={url}
					notices={noticeIU}
				/>
				<RichText
					ref={titleRef}
					placeholder={__("Member Name", "team-members")}
					tagName="h4"
					onChange={onChangeName}
					value={name}
					allowedFormats={[]}
				/>
				<RichText
					placeholder={__("Member Bio", "team-members")}
					tagName="p"
					onChange={onChangeBio}
					value={bio}
					allowedFormats={[]}
				/>
				<div className="wp-block-custom-block-team-member-social-links">
					<ul>
						<DndContext
							sensors={sensors}
							onDragEnd={handleDragEnd}
							modifiers={[restrictToHorizontalAxis]}
						>
							<SortableContext
								items={socialLinks.map(
									(item) => `${item.icon}-${item.link}`
								)}
								strategy={horizontalListSortingStrategy}
							>
								{socialLinks.map((item, index) => {
									return (
										<SortableItem
											key={`${item.icon}-${item.link}`}
											id={`${item.icon}-${item.link}`}
											index={index}
											selectedLink={selectedLink}
											setSelectedLink={setSelectedLink}
											icon={item.icon}
										/>
									);
								})}
							</SortableContext>
						</DndContext>
						{isSelected && (
							<li className="wp-block-custom-block-team-member-add-icon-li">
								<Tooltip
									text={__(
										'Add Social Link',
										'team-members'
									)}
								>
									<button
										aria-label={__(
											'Add Social Link',
											'team-members'
										)}
										onClick={addNewSocialItem}
									>
										<Icon icon="plus"/>
									</button>
								</Tooltip>
							</li>
						)}
					</ul>
				</div>
				{selectedLink !== undefined && (
					<div className="wp-block-custom-block-team-member-link-form">
						<TextControl
							label={__("Icon", "text-member")}
							value={socialLinks[selectedLink].icon}
							onChange={(icon) => {
								updateSocialItem('icon', icon);
							}
							}
						/>
						<TextControl
							label={__("Link", "text-member")}
							value={socialLinks[selectedLink].link}
							onChange={(link) => {
								updateSocialItem('link', link);
							}
							}
						/>
						<br/>
						<Button isDestructive onClick={removeSocialItem}>
							{__("Remove Link", "text-member")}
						</Button>
					</div>
				)}
			</div>
		</>
	);
}

export default withNotices(Edit);
