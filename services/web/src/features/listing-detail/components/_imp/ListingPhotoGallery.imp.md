# ListingPhotoGallery

## Metadata

- Status: `in-progress`
- Updated: 2026-09-27
- File: `ListingPhotoGallery.tsx`

## Purpose

Present the listing photograph without suggesting unsupported media.

## Usage

```tsx
<ListingPhotoGallery photo={listing.photo} caption="Ballard, Seattle · Private room" />
```

`photo` is `null` or contains a source URL, alternative text, and an optional crop rectangle.
The crop includes source dimensions and a viewport in source pixels.
The component records a failed image URL to replace broken-image chrome.

## Requirements

- [x] Render a single supplied photo without dead carousel controls.
- [x] Preserve the photo region when no image is available.
- [x] Provide an accessible missing-photo description.
- [x] Use cover cropping and a centered focal point for a supplied image.
- [x] Use the bedroom photograph embedded in the supplied concept reference.
- [ ] Support ordered media, captions, and keyboard controls when inventory contains more images.

## Design and limitations

Desktop targets an 800:460 ratio. Mobile targets 390:252 and spans the page width.
The user supplied `docs/web.ui.png` as the photo source.
An SVG viewport displays its bedroom region at `68, 173, 518, 297` within the 1306 × 850 source.
The source file remains unchanged. The surrounding reference interface is outside the visible viewport.
The missing-photo scenario and failed sources display a neutral placeholder.
The caller supplies the caption from the selected listing's location and housing type.
Missing photos use a neutral Property photo placeholder without promotional or development copy.

## Testing and acceptance

- [ ] Null and failed photo sources display no broken-image chrome.
- [x] The image region remains within the viewport at 320px.
- [x] The visible crop contains only the supplied bedroom photo at desktop and mobile widths.

## Open questions

- Where will a higher-resolution production photo and its publishing rights be supplied?
- What responsive source sizes will inventory provide?

## Completion checklist

- [x] Single-image and fallback presentation exist.
- [x] The supplied reference image is connected to the mockup.
- [x] The displayed photo crop is visually reviewed.
- [ ] Production media contract is complete.
