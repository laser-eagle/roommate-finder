# WelcomeView

## Metadata

- Status: `in-progress`
- Scope: welcome page for visitors, with entry points to sign up and log in
- Route: `/`
- Updated: 2026-10-28
- Files: `WelcomeView.tsx`, `WelcomeView.css`
- Requirements source: SRS UC-1.1 Create Account and UC-1.2 Log In (triggers), Feature 11 Multi-role Accounts; prototype checklist item 2.1

## Purpose and requirements

Introduce Roommate Finder to visitors and lead them to account creation or login.

- [x] Render at `/`, including a trailing slash.
- [x] Show a heading and the product description from SRS Section 1.1 Context.
- [x] Provide a Sign up action that links to `/signup`.
- [x] Provide a Log in action that links to `/login`.
- [x] Use the shared SiteHeader, which shows Log in and Sign up links on this page.
- [x] Use the shared tokens and button classes from `index.css`.
- [x] Sign-up screen exists at `/signup`.
- [ ] Login screen exists at `/login`.

## Usage

```tsx
<WelcomeView />
```

App selects the component when the pathname is `/`.
The component supplies the SiteHeader, the main landmark, and the page title `Welcome | Roommate Finder`.
useSavedHomes supplies the header's saved-home count.

## Design

The page is a single introduction section inside the shared container.
The heading uses the shared serif `h1` style. The description uses a larger lead paragraph followed by a muted paragraph.
Sign up uses `button-primary`; Log in uses the default `button` style.
Spacing reduces below 960px. The action buttons wrap on narrow screens.

## Acceptance criteria

- [x] `/` shows the welcome heading, description, and both actions.
- [x] Sign up and Log in navigate to `/signup` and `/login`.
- [ ] Both destinations show their screens instead of the unavailable-listing state.
  - [x] `/signup` shows SignUpView.
  - [ ] `/login` shows the login screen.

## Limitations and open questions

No account state exists. The header always shows the signed-in destinations alongside the Log in and Sign up links.
The heading text is not specified in the SRS.

## Completion checklist

- [x] Welcome page mockup exists.
- [ ] Sign-up and login destinations exist.
  - [x] Sign-up destination exists.
  - [ ] Login destination exists.
