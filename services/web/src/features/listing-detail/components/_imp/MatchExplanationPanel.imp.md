# MatchExplanationPanel

## Metadata

- Status: `in-progress`
- Updated: 2026-09-27
- File: `MatchExplanationPanel.tsx`

## Purpose

Explain known search matches and missing information without inventing a score.

## Usage

```tsx
<MatchExplanationPanel match={listing.match} />
```

`match` contains reasons, a gap, a search ID, and an evaluation version, or is `null`.

## Requirements and behavior

- [x] Display the supplied reasons and information gap in a soft green panel.
- [x] Render nothing when personalized context is absent.
- [x] Omit reasons in unknown-cost, paused, and unconfirmed-availability scenarios.
- [x] Keep fixture search and evaluation identifiers with the explanation.
- [ ] Consume policy-filtered DiscoveryService evaluations.
- [ ] Reject stale or unrelated evaluations at the service boundary.

The presentation component has no match algorithm or fit score.
The fixture contains a sample budget and October availability explanation.
Its commute information remains explicitly missing.

## Testing and acceptance

- [x] The default fixture displays both the positive explanation and missing commute information.
- [x] No-personalization, unknown-cost, paused, and unconfirmed scenarios show no personalized claims.
- [ ] Production evaluations correspond to the current listing and selected search.

## Risks and open questions

Stale evaluations can produce misleading claims. Production freshness and visibility rules remain TBD.

## Completion checklist

- [x] Conditional panel and fixtures exist.
- [x] Browser acceptance checks pass.
- [ ] Production evaluation freshness and visibility checks exist.
