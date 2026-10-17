# `<Feature / Component / Change Name>`

## Metadata

| Field          | Value                                                                                                        |
| -------------- | ------------------------------------------------------------------------------------------------------------ |
| Status         | `draft` / `ready` / `in-progress` / `blocked` / `complete`                                                   |
| Type           | `feature` / `component` / `service` / `integration` / `refactor` / `bugfix` / `migration` / `infrastructure` |
| Priority       | `low` / `medium` / `high` / `critical`                                                                       |
| Owner          | `<name or team>`                                                                                             |
| Created        | `YYYY-MM-DD`                                                                                                 |
| Updated        | `YYYY-MM-DD`                                                                                                 |
| Target Version | `<version / milestone / release>`                                                                            |
| Related Issue  | `<issue URL or identifier>`                                                                                  |
| Related PRs    | `<PR URLs>`                                                                                                  |
| Dependencies   | `<related components, systems, packages, or implementations>`                                                |
| Repository     | `<repository name>`                                                                                          |
| Location       | `<primary path or package>`                                                                                  |

---

## Abstract

`<Concise summary of what this feature, component, service, or change is and what purpose it serves.>`

### Problem

`<Problem or need being addressed.>`

### Outcome

`<Expected result after implementation.>`

---

## Background

`<Relevant context necessary to understand the implementation.>`

### Current Behavior

`<Existing behavior, if applicable.>`

### Desired Behavior

`<Expected behavior after implementation.>`

### Relevant Existing Code

| Area     | Path     | Relevance        |
| -------- | -------- | ---------------- |
| `<area>` | `<path>` | `<relationship>` |
| `<area>` | `<path>` | `<relationship>` |

### Related Systems

| System     | Relationship     |
| ---------- | ---------------- |
| `<system>` | `<relationship>` |

---

## Goals

- `<goal>`
- `<goal>`
- `<goal>`

---

## Non-Goals

- `<excluded behavior or scope>`
- `<excluded behavior or scope>`
- `<excluded behavior or scope>`

---

## Requirements

### Functional Requirements

- [ ] `<required behavior>`
- [ ] `<required behavior>`
- [ ] `<required behavior>`
  - [ ] `<sub-requirement>`
  - [ ] `<sub-requirement>`

### Technical Requirements

- [ ] `<technical requirement>`
- [ ] `<technical requirement>`
- [ ] `<technical requirement>`

### Compatibility Requirements

- [ ] `<compatibility requirement>`
- [ ] `<compatibility requirement>`

### Performance Requirements

- [ ] `<performance requirement>`
- [ ] `<performance requirement>`

### Accessibility Requirements

- [ ] `<accessibility requirement>`
- [ ] `<accessibility requirement>`

### Security Requirements

- [ ] `<security requirement>`
- [ ] `<security requirement>`

### Privacy Requirements

- [ ] `<privacy requirement>`
- [ ] `<privacy requirement>`

---

## Behavior

### Primary Behavior

`<Description of the primary behavior.>`

### Secondary Behavior

`<Description of secondary or supporting behavior.>`

### State Transitions

| From      | Event     | To        | Result     |
| --------- | --------- | --------- | ---------- |
| `<state>` | `<event>` | `<state>` | `<result>` |

### Loading States

| State     | Behavior     |
| --------- | ------------ |
| `<state>` | `<behavior>` |

### Empty States

| State     | Behavior     |
| --------- | ------------ |
| `<state>` | `<behavior>` |

### Error States

| Condition     | Behavior     |
| ------------- | ------------ |
| `<condition>` | `<behavior>` |
| `<condition>` | `<behavior>` |

---

## Usage

`<Description of how consumers interact with or use this feature, component, service, API, or system.>`

### Basic Usage

```ts
// Example usage
```

### Configuration

```ts
// Example configuration
```

| Option     | Type     | Default     | Description     |
| ---------- | -------- | ----------- | --------------- |
| `<option>` | `<type>` | `<default>` | `<description>` |
| `<option>` | `<type>` | `<default>` | `<description>` |

### Inputs

| Input     | Type     | Required   | Description     |
| --------- | -------- | ---------- | --------------- |
| `<input>` | `<type>` | `yes / no` | `<description>` |

### Outputs

| Output     | Type     | Description     |
| ---------- | -------- | --------------- |
| `<output>` | `<type>` | `<description>` |

### Example

```ts
// Representative example
```

### Advanced Usage

```ts
// Optional advanced example
```

### Integration Example

```ts
// Example showing integration with surrounding systems
```

### Usage Constraints

- `<constraint>`
- `<constraint>`

---

## Design

### Architecture

`<Description of how this implementation fits into the surrounding architecture.>`

### Components

| Component     | Responsibility     |
| ------------- | ------------------ |
| `<component>` | `<responsibility>` |
| `<component>` | `<responsibility>` |

### Data Flow

```text
<Input>
  -> <Component / Layer>
  -> <Transformation>
  -> <State / Service / Persistence>
  -> <Output>
```

### State Model

| State     | Owner     | Persistence  | Description     |
| --------- | --------- | ------------ | --------------- |
| `<state>` | `<owner>` | `<location>` | `<description>` |

### Interfaces

```ts
interface Example {
  id: string;
}
```

### Public API

```ts
// Public interface
```

### API Endpoints

#### `<METHOD> <route>`

Request:

```json
{}
```

Response:

```json
{}
```

Errors:

| Status     | Meaning     |
| ---------- | ----------- |
| `<status>` | `<meaning>` |

### Data Model

```text
<Model / schema description>
```

### Data Model Changes

`<Schema, persistence, serialization, migration, or indexing changes.>`

---

## File Impact

| File     | Change   | Purpose     |
| -------- | -------- | ----------- |
| `<path>` | `create` | `<purpose>` |
| `<path>` | `modify` | `<purpose>` |
| `<path>` | `delete` | `<purpose>` |

---

## Implementation Areas

### `<Area / Subsystem>`

`<Description of the implementation area.>`

- [ ] `<implementation requirement>`
- [ ] `<implementation requirement>`
  - [ ] `<nested requirement>`
  - [ ] `<nested requirement>`

### `<Area / Subsystem>`

`<Description of the implementation area.>`

- [ ] `<implementation requirement>`
- [ ] `<implementation requirement>`

---

## Edge Cases

- [ ] `<edge case>`
- [ ] `<edge case>`
- [ ] `<edge case>`
  - [ ] `<nested case>`
  - [ ] `<nested case>`

---

## Error Model

| Failure     | Result     | Recoverable |
| ----------- | ---------- | ----------- |
| `<failure>` | `<result>` | `yes / no`  |
| `<failure>` | `<result>` | `yes / no`  |

---

## Observability

### Logging

- [ ] `<logging requirement>`

### Metrics

- [ ] `<metric requirement>`

### Tracing

- [ ] `<tracing requirement>`

### Analytics

- [ ] `<analytics requirement>`

---

## Testing

### Unit Tests

- [ ] `<behavior>`
- [ ] `<edge case>`
- [ ] `<failure case>`

### Integration Tests

- [ ] `<interaction>`
- [ ] `<integration>`
- [ ] `<failure interaction>`

### End-to-End Tests

- [ ] `<workflow>`
- [ ] `<alternate workflow>`

### Regression Tests

- [ ] `<regression scenario>`

### Manual Verification

- [ ] `<observable behavior>`
- [ ] `<observable behavior>`

---

## Acceptance Criteria

- [ ] `<externally verifiable criterion>`
- [ ] `<externally verifiable criterion>`
- [ ] `<externally verifiable criterion>`
- [ ] `<criterion>`
  - [ ] `<nested criterion>`
  - [ ] `<nested criterion>`

---

## Constraints

### Architectural

- `<constraint>`

### Technical

- `<constraint>`

### Dependency

- `<constraint>`

### Compatibility

- `<constraint>`

### Performance

- `<constraint>`

### Product

- `<constraint>`

---

## Invariants

- `<condition that must always remain true>`
- `<condition that must always remain true>`
- `<condition that must always remain true>`

---

## Dependencies

### Internal Dependencies

| Dependency     | Relationship     |
| -------------- | ---------------- |
| `<dependency>` | `<relationship>` |

### External Dependencies

| Dependency     | Version     | Purpose     |
| -------------- | ----------- | ----------- |
| `<dependency>` | `<version>` | `<purpose>` |

---

## Migration

### Required

`yes / no`

### Existing Data

`<Effect on existing data.>`

### New Data

`<New representation or storage behavior.>`

### Compatibility

`<Transitional or mixed-version behavior.>`

### Rollback

`<Rollback implications.>`

---

## Rollout

### Type

`immediate / feature flag / gradual / configuration / coordinated / migration-dependent`

### Feature Flag

`<flag name or not applicable>`

### Deployment Dependencies

`<deployment relationships>`

### Rollback State

`<expected state after rollback>`

---

## Risks

| Risk     | Impact     | Mitigation     |
| -------- | ---------- | -------------- |
| `<risk>` | `<impact>` | `<mitigation>` |
| `<risk>` | `<impact>` | `<mitigation>` |

---

## Assumptions

- `<assumption>`
- `<assumption>`
- `<assumption>`

---

## Open Questions

- [ ] `<question>`
- [ ] `<question>`

---

## Decisions

### `<Decision Title>`

| Field        | Description      |
| ------------ | ---------------- |
| Context      | `<context>`      |
| Decision     | `<decision>`     |
| Rationale    | `<reason>`       |
| Alternatives | `<alternatives>` |
| Consequences | `<tradeoffs>`    |

---

## Implementation Notes

`<Material implementation details, findings, or deviations from the original design.>`

### Deviations

| Expected     | Actual     | Reason     |
| ------------ | ---------- | ---------- |
| `<expected>` | `<actual>` | `<reason>` |

---

## Completion Checklist

### Scope

- [ ] Goals satisfied
- [ ] Non-goals remain outside scope
- [ ] Required implementation areas complete

### Requirements

- [ ] Functional requirements complete
- [ ] Technical requirements complete
- [ ] Compatibility requirements complete
- [ ] Performance requirements complete
- [ ] Accessibility requirements complete
- [ ] Security requirements complete
- [ ] Privacy requirements complete

### Behavior

- [ ] Primary behavior complete
- [ ] Secondary behavior complete
- [ ] Loading states complete
- [ ] Empty states complete
- [ ] Error states complete
- [ ] Edge cases accounted for

### Interfaces

- [ ] Public interfaces complete
- [ ] Inputs and outputs complete
- [ ] Configuration complete
- [ ] API changes complete where applicable
- [ ] Data model changes complete where applicable

### Testing

- [ ] Unit coverage complete
- [ ] Integration coverage complete
- [ ] End-to-end coverage complete where applicable
- [ ] Regression coverage complete
- [ ] Manual verification complete where applicable

### Quality

- [ ] Acceptance criteria satisfied
- [ ] Constraints satisfied
- [ ] Invariants preserved
- [ ] Risks accounted for
- [ ] Dependencies accounted for
- [ ] Open questions resolved or explicitly non-blocking

---

## Completion Record

### Status

`complete / partial / blocked`

### Summary

`<Summary of the resulting implementation.>`

### Files Changed

| File     | Result     |
| -------- | ---------- |
| `<path>` | `<result>` |

### Verification

| Verification     | Result                           |
| ---------------- | -------------------------------- |
| `<verification>` | `<pass / fail / not applicable>` |

### Deviations

`None.`

or

- `<deviation>`

### Remaining Issues

`None.`

or

- `<issue>`
