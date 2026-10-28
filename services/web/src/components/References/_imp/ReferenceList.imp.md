# ReferenceList

## Metadata

- Status: `in-progress`
- Scope: shared list of attributed references shown on profiles
- Updated: 2026-10-28
- Files: `ReferenceList.tsx`, `References.css`
- Requirements source: SRS Feature 12 References and Endorsements; SRS 8.1 conceptual data (Reference); prototype checklist item 2.3

## Purpose and requirements

Show references that former roommates and landlords wrote about a person, with who wrote each one.

- [x] Show each reference's author, relationship (Former roommate or Former landlord), date, and text.
- [x] Show `No references yet.` when the list is empty.
- [x] Show a Report action on each reference.
- [x] Use the shared tokens from `index.css`.
- [ ] Open the reporting flow from Report (checklist item 2.23).
- [ ] Apply the recipient's privacy settings to reference visibility.

## Usage

```tsx
<ReferenceList references={referencesFor(person.id)} />
```

`references` is an array of `Reference` records: `id`, `author`, `relationship`, `date` (display text), and `text`.
The parent supplies the section heading and any Write or Request action.

## Design

References render as a list of bordered surface cards.
Report is a text-style button with an accessible name that includes the author. It has no action yet.

## Acceptance criteria

- [x] A profile with references lists every reference with its author, relationship, and date.
- [x] A profile without references shows the empty message.
- [ ] Selecting Report opens a report dialog.

## Limitations and open questions

References are fictional placeholder records. Nothing is stored or moderated.
The SRS requires controls against abuse but does not define them beyond reporting.

## Completion checklist

- [x] Reference list mockup exists.
- [ ] Report action is connected.
