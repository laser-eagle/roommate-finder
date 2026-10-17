# Implementation File Instructions

## Purpose

`{ComponentName}.imp.md` files are the implementation specification and implementation record for a specific feature, component, service, module, or other implementation unit.

They describe:

- What the component is intended to do
- Why it exists
- How it behaves
- How it is designed
- How it is used
- What requirements it must satisfy
- What implementation work exists or remains
- What tests and acceptance criteria apply
- What important implementation decisions have been made
- What known risks, assumptions, limitations, or unresolved questions exist

The file should remain useful both before implementation and after implementation is complete.

It is not an agent instruction file and should not contain instructions for Codex, development commands, workflow procedures, or repository-wide development rules.

---

## Location

Every implementation file must be stored inside an `_imp` directory.

The `_imp` directory must be located in the same directory as the component it documents.

Example:

```text
components/
  Button/
    Button.tsx
    Button.test.tsx
    Button.module.css

    _imp/
      Button.imp.md
```

For a component represented by several files:

```text
components/
  DataTable/
    DataTable.tsx
    DataTableHeader.tsx
    DataTableRow.tsx
    types.ts

    _imp/
      DataTable.imp.md
```

For a module or service:

```text
services/
  authentication/
    auth-service.ts
    auth-session.ts
    auth-types.ts

    _imp/
      Authentication.imp.md
```

The `_imp` directory belongs to the implementation unit it accompanies. Implementation documentation should remain physically close to the code it describes.

---

## Naming

Implementation files use the following format:

```text
{ComponentName}.imp.md
```

Examples:

```text
Button.imp.md
DataTable.imp.md
Authentication.imp.md
ProjectFilter.imp.md
TokenRefresh.imp.md
```

The name should correspond to the canonical name of the implementation unit.

Avoid generic names such as:

```text
implementation.imp.md
feature.imp.md
changes.imp.md
notes.imp.md
todo.imp.md
```

---

## One Primary Implementation File

A component should normally have one primary implementation file.

Example:

```text
DataTable/
  _imp/
    DataTable.imp.md
```

That file should describe the component as a whole, including its internal subcomponents where appropriate.

A separate implementation file is appropriate when a subcomponent or subsystem has substantial independent behavior, requirements, lifecycle, or complexity.

Example:

```text
DataTable/
  DataTable.tsx
  DataTableVirtualization.ts
  DataTableSelection.ts

  _imp/
    DataTable.imp.md
    DataTableVirtualization.imp.md
    DataTableSelection.imp.md
```

Implementation files should not be split merely because the source code is split across several files.

---

## When an Implementation File Is Created

An implementation file should exist when an implementation unit has enough behavior, complexity, or importance that its intended behavior should be explicitly documented.

Typical examples include:

- User-facing components
- Significant internal components
- Features
- Services
- APIs
- Integrations
- State-management systems
- Complex hooks
- Data-processing systems
- Infrastructure components
- Migrations
- Significant refactors
- Cross-cutting subsystems

Very small implementation details do not necessarily require their own file if they are adequately covered by the parent component's implementation file.

---

## Initial State

When a new implementation file is created, it should describe the intended implementation as accurately as possible based on the information currently known.

Unknown information should remain explicitly unknown rather than being invented.

Use:

```text
TBD
```

or:

```text
Unknown
```

or place the matter under:

```markdown
## Open Questions
```

The document may begin incomplete. Its purpose is to converge toward an accurate representation of the implementation.

---

## Source of Truth

The implementation file is the local source of truth for the documented component's intended behavior and implementation-specific design.

When the implementation and the document disagree, the disagreement should be resolved rather than allowed to persist indefinitely.

The correct resolution depends on the cause:

- If the implementation is wrong, the implementation should eventually be brought into agreement with the specification.
- If the specification is outdated, the implementation file should be updated.
- If the intended behavior has changed, the relevant requirements, design, usage, acceptance criteria, and related sections should be updated together.
- If the discrepancy cannot yet be resolved, it should be documented explicitly.

An implementation file should not knowingly describe behavior that no longer exists.

---

## Relationship to the Code

The implementation file describes the implementation unit, not individual source files.

A component may have:

- One source file
- Several source files
- Tests
- Styles
- Types
- Supporting utilities
- Internal subcomponents

All of these may be covered by one `{ComponentName}.imp.md` file.

The `File Impact`, design, architecture, or related sections may reference individual files when those relationships are useful.

---

## Updating the Implementation File

The implementation file should be updated whenever a change materially affects the documented component.

This includes changes to:

- Behavior
- Public interfaces
- Inputs
- Outputs
- Configuration
- Usage
- Architecture
- State
- Data flow
- Dependencies
- Error handling
- Edge cases
- Security properties
- Privacy properties
- Performance characteristics
- Accessibility behavior
- Tests
- Acceptance criteria
- Known limitations
- Risks
- Assumptions
- Implementation decisions

Minor internal changes that do not affect the documented design or behavior do not require artificial documentation changes.

---

## Updating Requirements

Requirements should represent the current requirements of the component.

When a new requirement is introduced:

```markdown
- [ ] Support controlled selection state.
```

Once implemented and verified:

```markdown
- [x] Support controlled selection state.
```

If a requirement is removed from the component entirely, remove it from the current requirements rather than leaving an obsolete completed item indefinitely.

Historical information that remains important can be retained under `Decisions`, `Implementation Notes`, or another appropriate historical section.

---

## Maintaining Checklists

Checklist state must reflect reality.

Use:

```markdown
- [ ] Not complete
- [x] Complete
```

Nested requirements may use nested checklists:

```markdown
- [ ] Support keyboard navigation
  - [x] Arrow keys move between items
  - [x] Home selects the first item
  - [ ] End selects the last item
```

A parent checklist item should only be considered complete when all requirements represented by that item are complete.

Do not mark a checklist item complete merely because implementation work has started.

---

## Usage Section

The `Usage` section documents how the component itself is consumed or used.

It does not describe how to use the implementation file.

For a UI component, it may contain:

```tsx
<DataTable rows={rows} columns={columns} />
```

For a function:

```ts
const result = parseConfiguration(source);
```

For a service:

```ts
const session = await authService.createSession(credentials);
```

For an API:

```text
POST /api/sessions
```

The Usage section may include:

- Basic usage
- Common usage
- Inputs
- Outputs
- Props
- Configuration
- Public methods
- Public types
- Examples
- Integration examples
- Advanced usage
- Usage constraints

Usage examples should represent the current public interface.

When the public interface changes, its examples should change with it.

---

## Background Section

The `Background` section should explain context that is useful for understanding why the component exists or why its implementation has its current shape.

Appropriate information includes:

- Existing system behavior
- Historical constraints
- Domain concepts
- Related systems
- Previous architecture
- Problems the component was introduced to solve

Background information should remain relevant to understanding the current component.

Temporary implementation notes do not belong here.

---

## Design Section

The `Design` section should describe the current intended design.

It may include:

- Architecture
- Component relationships
- State ownership
- Data flow
- Public interfaces
- Internal interfaces
- Persistence
- API interactions
- Data models

The design section should be updated when implementation changes alter these relationships.

It should not become a historical list of every design the component has ever used.

Important superseded decisions may instead be preserved under `Decisions`.

---

## Decisions

The `Decisions` section records significant implementation decisions whose reasoning remains useful.

Examples include:

- Choosing controlled state over internal state
- Using URL state instead of local storage
- Introducing a particular abstraction
- Rejecting an otherwise plausible architecture
- Retaining behavior for compatibility reasons

A decision should generally include:

- Context
- Decision
- Rationale
- Alternatives
- Consequences

Minor coding choices do not need permanent decision records.

---

## Implementation Notes

`Implementation Notes` contain information about the actual implementation that is useful but does not belong in the permanent conceptual design.

Examples include:

- An unexpected limitation in an underlying dependency
- A repository-specific implementation constraint
- A discrepancy discovered between the proposed design and existing architecture
- A non-obvious implementation detail
- A temporary compatibility consideration

Implementation Notes should not become a chronological development journal.

Obsolete notes should be removed when they no longer provide useful context.

---

## Open Questions

Unresolved matters belong under `Open Questions`.

Example:

```markdown
## Open Questions

- [ ] Should selection state persist across pagination?
- [ ] Should consumers be able to override the default row identifier?
```

When a question is resolved:

- Update the relevant section of the implementation file.
- Record a significant decision under `Decisions` when useful.
- Remove the resolved question from `Open Questions`.

The Open Questions section should represent questions that are actually still open.

---

## Assumptions

Assumptions should describe conditions upon which the current design depends.

Example:

```markdown
## Assumptions

- Row identifiers are stable for the lifetime of the dataset.
- A table will not contain more than 10,000 simultaneously rendered rows.
```

When an assumption becomes confirmed, invalid, or irrelevant, update or remove it.

If invalidating an assumption changes the implementation, update the affected requirements and design sections as well.

---

## Risks

Risks should describe meaningful ways the implementation may fail to meet its intended properties.

Example:

```markdown
| Risk                                     | Impact                   | Mitigation                                        |
| ---------------------------------------- | ------------------------ | ------------------------------------------------- |
| Large datasets cause excessive rendering | Poor interaction latency | Use virtualization above the configured threshold |
```

Resolved or irrelevant risks should not remain indefinitely unless retaining them provides useful architectural context.

---

## Testing

The testing section should describe the verification coverage expected for the component.

It should focus on behaviors and cases rather than merely listing test filenames.

Example:

```markdown
### Unit Tests

- [x] Selection can be added.
- [x] Selection can be removed.
- [x] Disabled rows cannot be selected.
- [ ] Selection survives data refresh.
```

Testing documentation should change when component behavior changes.

---

## Acceptance Criteria

Acceptance criteria define observable conditions that determine whether the implementation satisfies its specification.

Good:

```markdown
- [ ] Selecting a row exposes its identifier through `onSelectionChange`.
- [ ] Disabled rows cannot become selected through pointer or keyboard input.
```

Weak:

```markdown
- [ ] Selection implemented.
- [ ] Code works.
```

Acceptance criteria should describe outcomes rather than development activity.

Completed criteria should remain checked while they remain part of the current specification.

---

## Completion Checklist

The Completion Checklist represents whether the implementation file's current specification has been fully satisfied.

It should be kept synchronized with the implementation.

A previously completed component may return to an incomplete state when new requirements are added.

For example:

```text
complete
```

may become:

```text
in-progress
```

when a new required behavior is introduced.

Completion is a statement about the current specification, not a permanent historical achievement.

---

## Status

Recommended statuses are:

```text
draft
ready
in-progress
blocked
complete
```

### `draft`

The specification is still being formed or contains substantial unresolved areas.

### `ready`

The intended behavior and requirements are sufficiently defined.

### `in-progress`

The current specification is not yet fully implemented.

### `blocked`

Required work cannot currently be completed because of an unresolved dependency, decision, or constraint.

### `complete`

The current implementation satisfies the current specification and acceptance criteria.

Status should reflect current reality.

---

## Changes to Existing Components

When modifying an existing component, its implementation file should be treated as a living specification.

Relevant sections should be updated together.

For example, adding a new prop might affect:

```text
Requirements
Usage
Inputs
Interfaces
Behavior
Edge Cases
Testing
Acceptance Criteria
Completion Checklist
```

Updating only one section can leave the document internally inconsistent.

---

## Refactors

A refactor that intentionally preserves external behavior may still require documentation changes when it changes meaningful implementation architecture.

Typical affected sections include:

- Design
- Architecture
- Components
- Data Flow
- State Model
- File Impact
- Dependencies
- Decisions
- Implementation Notes

Usage and functional requirements should remain unchanged when the public behavior truly remains unchanged.

---

## Renaming a Component

When a component is renamed, its implementation file should be renamed with it.

Before:

```text
UserTable/
  UserTable.tsx

  _imp/
    UserTable.imp.md
```

After:

```text
AccountTable/
  AccountTable.tsx

  _imp/
    AccountTable.imp.md
```

The document title and internal references should also use the new canonical name.

---

## Moving a Component

When a component moves, its `_imp` directory moves with it.

Before:

```text
components/
  UserTable/
    UserTable.tsx
    _imp/
      UserTable.imp.md
```

After:

```text
features/
  users/
    UserTable/
      UserTable.tsx
      _imp/
        UserTable.imp.md
```

Implementation documentation should not remain behind in the previous location.

---

## Deleting a Component

When a component is permanently removed from the repository, its local implementation file should normally be removed with it.

Long-lived historical or architectural information that must survive deletion belongs in the appropriate repository-level documentation rather than an orphaned `_imp` directory.

---

## Multiple Implementations in One Directory

When several independently documented components live in the same directory, they may share the same `_imp` directory.

Example:

```text
forms/
  TextField.tsx
  SelectField.tsx
  CheckboxField.tsx

  _imp/
    TextField.imp.md
    SelectField.imp.md
    CheckboxField.imp.md
```

Each file should clearly correspond to one implementation unit.

---

## Parent and Child Components

A parent component implementation file may describe child components that exist solely as internal implementation details.

Example:

```text
DataTable/
  DataTable.tsx
  DataTableHeader.tsx
  DataTableRow.tsx

  _imp/
    DataTable.imp.md
```

Separate child implementation files are useful when the child:

- Has its own meaningful public interface
- Has substantial independent behavior
- Is reusable independently
- Has significant requirements of its own
- Has an independent lifecycle
- Is complex enough to benefit from its own specification

---

## Consistency

The implementation file should remain internally consistent.

When one section changes, related sections should be reviewed.

Common relationships include:

```text
Requirements
  -> Behavior
  -> Design
  -> Usage
  -> Testing
  -> Acceptance Criteria
```

and:

```text
Interfaces
  -> Usage
  -> Edge Cases
  -> Compatibility
  -> Testing
```

and:

```text
Architecture
  -> Dependencies
  -> File Impact
  -> Risks
  -> Decisions
```

Contradictory sections should not be left unresolved.

---

## Maintenance Principle

`{ComponentName}.imp.md` represents the component as it exists and is intended to exist now.

It is not:

- A task prompt
- A Codex instruction file
- A development log
- A commit history
- A changelog
- A repository manual
- A replacement for source documentation
- A dumping ground for temporary notes

The document should remain concise enough to be useful, detailed enough to remove important ambiguity, and accurate enough to serve as a reliable implementation reference.
