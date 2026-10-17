# `<Feature / Component / Service> Logging`

## Metadata

| Field                  | Value                                          |
| ---------------------- | ---------------------------------------------- |
| Status                 | `draft` / `ready` / `in-progress` / `complete` |
| Owner                  | `<name or team>`                               |
| Created                | `YYYY-MM-DD`                                   |
| Updated                | `YYYY-MM-DD`                                   |
| Related Implementation | `<implementation file or identifier>`          |
| Service / Package      | `<service or package>`                         |
| Environment            | `<development / staging / production / all>`   |

---

## Abstract

`<Concise description of the logging introduced or maintained for this feature, component, or service.>`

### Purpose

`<What operational, debugging, security, or analytical purpose these logs serve.>`

### Scope

`<Systems, components, workflows, and events covered by this logging specification.>`

---

## Logging Goals

- `<goal>`
- `<goal>`
- `<goal>`

---

## Non-Goals

- `<excluded logging concern>`
- `<excluded logging concern>`
- `<excluded logging concern>`

---

## Log Levels

| Level   | Usage                                                        |
| ------- | ------------------------------------------------------------ |
| `trace` | `<high-volume internal execution detail>`                    |
| `debug` | `<diagnostic information useful during investigation>`       |
| `info`  | `<normal significant system or business events>`             |
| `warn`  | `<unexpected or degraded behavior that remains recoverable>` |
| `error` | `<failed operation requiring investigation or handling>`     |
| `fatal` | `<system-level failure preventing continued operation>`      |

### Level Constraints

- [ ] `<level-specific constraint>`
- [ ] `<level-specific constraint>`

---

## Common Log Schema

Fields expected across applicable log events.

| Field         | Type       | Required      | Description                        |
| ------------- | ---------- | ------------- | ---------------------------------- |
| `timestamp`   | `<type>`   | `yes`         | `<event timestamp>`                |
| `level`       | `<type>`   | `yes`         | `<log severity>`                   |
| `event`       | `<type>`   | `yes`         | `<stable event identifier>`        |
| `message`     | `<type>`   | `yes`         | `<human-readable summary>`         |
| `service`     | `<type>`   | `yes`         | `<service or subsystem>`           |
| `environment` | `<type>`   | `yes`         | `<runtime environment>`            |
| `request_id`  | `<type>`   | `conditional` | `<request correlation identifier>` |
| `trace_id`    | `<type>`   | `conditional` | `<distributed trace identifier>`   |
| `user_id`     | `<type>`   | `conditional` | `<safe user identifier>`           |
| `session_id`  | `<type>`   | `conditional` | `<session correlation identifier>` |
| `duration_ms` | `<number>` | `conditional` | `<operation duration>`             |
| `error_code`  | `<type>`   | `conditional` | `<stable application error code>`  |

### Additional Common Fields

| Field     | Type     | Description     |
| --------- | -------- | --------------- |
| `<field>` | `<type>` | `<description>` |
| `<field>` | `<type>` | `<description>` |

---

## Event Naming

### Convention

```text
<domain>.<entity>.<event>
```

Examples:

```text
auth.session.created
auth.login.failed
project.created
project.updated
payment.request.failed
```

### Naming Requirements

- [ ] Event names are stable.
- [ ] Event names describe what occurred rather than implementation details.
- [ ] Equivalent events use consistent terminology.
- [ ] Event names are suitable for querying and aggregation.

---

## Log Events

### `<event.name>`

#### Description

`<What happened when this event is emitted.>`

#### Level

`<debug / info / warn / error / fatal>`

#### Trigger

`<Condition that causes this event to exist.>`

#### Fields

| Field     | Type     | Required   | Description     |
| --------- | -------- | ---------- | --------------- |
| `<field>` | `<type>` | `yes / no` | `<description>` |
| `<field>` | `<type>` | `yes / no` | `<description>` |

#### Example

```json
{
  "timestamp": "YYYY-MM-DDTHH:mm:ss.sssZ",
  "level": "info",
  "event": "<event.name>",
  "message": "<summary>",
  "service": "<service>"
}
```

#### Frequency

`<per request / per operation / rare / periodic / etc.>`

#### Notes

`<Additional context or constraints.>`

---

### `<event.name>`

#### Description

`<description>`

#### Level

`<level>`

#### Trigger

`<trigger>`

#### Fields

| Field     | Type     | Required   | Description     |
| --------- | -------- | ---------- | --------------- |
| `<field>` | `<type>` | `yes / no` | `<description>` |

#### Example

```json
{
  "timestamp": "YYYY-MM-DDTHH:mm:ss.sssZ",
  "level": "error",
  "event": "<event.name>",
  "message": "<summary>",
  "service": "<service>",
  "error_code": "<code>"
}
```

---

## Operation Lifecycle Logging

For operations with a meaningful lifecycle.

### Start

| Property        | Value                 |
| --------------- | --------------------- |
| Event           | `<operation>.started` |
| Level           | `<level>`             |
| Required Fields | `<fields>`            |

### Success

| Property        | Value                       |
| --------------- | --------------------------- |
| Event           | `<operation>.completed`     |
| Level           | `<level>`                   |
| Required Fields | `<fields>`                  |
| Duration        | `<included / not included>` |

### Failure

| Property        | Value                |
| --------------- | -------------------- |
| Event           | `<operation>.failed` |
| Level           | `<level>`            |
| Required Fields | `<fields>`           |
| Error Details   | `<fields>`           |

---

## Error Logging

### Error Fields

| Field           | Type     | Description                         |
| --------------- | -------- | ----------------------------------- |
| `error_code`    | `<type>` | `<stable machine-readable code>`    |
| `error_type`    | `<type>` | `<error category or class>`         |
| `error_message` | `<type>` | `<safe error description>`          |
| `stack`         | `<type>` | `<stack trace when applicable>`     |
| `cause`         | `<type>` | `<underlying cause when available>` |

### Error Categories

| Category     | Severity  | Description     |
| ------------ | --------- | --------------- |
| `<category>` | `<level>` | `<description>` |
| `<category>` | `<level>` | `<description>` |

### Expected Errors

`<Errors that are part of normal or anticipated application behavior.>`

### Unexpected Errors

`<Failures indicating defects, infrastructure problems, invalid state, or other unexpected conditions.>`

---

## Context and Correlation

### Request Context

- `request_id`
- `trace_id`
- `span_id`
- `<additional field>`

### User Context

- `user_id`
- `organization_id`
- `<additional safe identifier>`

### Domain Context

- `<entity_id>`
- `<resource_id>`
- `<operation_id>`

### Correlation Requirements

- [ ] `<correlation requirement>`
- [ ] `<correlation requirement>`
- [ ] `<cross-service correlation requirement>`

---

## Sensitive Data

### Prohibited Fields

The following data must not appear in logs.

- `<passwords>`
- `<authentication secrets>`
- `<access tokens>`
- `<private keys>`
- `<sensitive payload>`
- `<other prohibited data>`

### Restricted Fields

| Field     | Treatment                                   |
| --------- | ------------------------------------------- |
| `<field>` | `<redacted / hashed / truncated / omitted>` |
| `<field>` | `<treatment>`                               |

### Redaction

| Source     | Redaction Rule |
| ---------- | -------------- |
| `<source>` | `<rule>`       |

---

## Structured Logging

### Format

`<JSON / key-value / other structured format>`

### Example

```json
{
  "timestamp": "2026-01-01T00:00:00.000Z",
  "level": "info",
  "event": "example.operation.completed",
  "message": "Example operation completed",
  "service": "example-service",
  "request_id": "req_123",
  "duration_ms": 42,
  "resource_id": "resource_123"
}
```

### Field Types

- [ ] Identifiers use consistent types.
- [ ] Durations use consistent units.
- [ ] Timestamps use a consistent format.
- [ ] Booleans remain booleans.
- [ ] Numbers remain numeric.
- [ ] Structured data is not serialized into message strings when dedicated fields exist.

---

## Message Format

### Pattern

```text
<concise description of what occurred>
```

### Examples

```text
Project created
Authentication attempt failed
Database query exceeded latency threshold
External request completed
```

### Message Constraints

- [ ] Messages are concise.
- [ ] Messages do not duplicate structured fields unnecessarily.
- [ ] Messages do not contain sensitive data.
- [ ] Messages use consistent terminology.

---

## Performance Logging

### Timing Events

| Operation     | Event     | Duration Field |
| ------------- | --------- | -------------- |
| `<operation>` | `<event>` | `duration_ms`  |

### Threshold Events

| Condition     | Level     | Event     |
| ------------- | --------- | --------- |
| `<threshold>` | `<level>` | `<event>` |

### Performance Fields

- `duration_ms`
- `<query_count>`
- `<payload_size>`
- `<retry_count>`
- `<additional field>`

---

## External Dependencies

### `<Service / Dependency>`

Events:

- [ ] Request started
- [ ] Request completed
- [ ] Request failed
- [ ] Request retried
- [ ] Timeout
- [ ] Rate limited

Fields:

| Field           | Description            |
| --------------- | ---------------------- |
| `<dependency>`  | `<dependency name>`    |
| `<operation>`   | `<external operation>` |
| `<status>`      | `<result or status>`   |
| `<duration_ms>` | `<request duration>`   |

---

## Retry Logging

| Event                         | Level     | Description                      |
| ----------------------------- | --------- | -------------------------------- |
| `<operation>.retrying`        | `<level>` | `<retry attempt>`                |
| `<operation>.retry_exhausted` | `<level>` | `<all retry attempts exhausted>` |

### Retry Fields

- `attempt`
- `max_attempts`
- `retry_delay_ms`
- `error_code`

---

## State Changes

Significant state transitions.

| Event     | Previous State | New State | Level     |
| --------- | -------------- | --------- | --------- |
| `<event>` | `<state>`      | `<state>` | `<level>` |

### Required Fields

- `<entity_id>`
- `previous_state`
- `new_state`
- `<cause or trigger>`

---

## Security Events

| Event     | Level     | Description     |
| --------- | --------- | --------------- |
| `<event>` | `<level>` | `<description>` |

### Security Context

- `<actor identifier>`
- `<resource identifier>`
- `<authorization result>`
- `<source>`
- `<reason code>`

---

## Audit Events

| Event     | Actor     | Target     | Change     |
| --------- | --------- | ---------- | ---------- |
| `<event>` | `<actor>` | `<target>` | `<change>` |

### Audit Fields

- `actor_id`
- `action`
- `target_type`
- `target_id`
- `previous_value`
- `new_value`
- `timestamp`

---

## Volume and Sampling

### Expected Volume

| Event     | Expected Frequency |
| --------- | ------------------ |
| `<event>` | `<frequency>`      |

### Sampling

| Event     | Sampling Rate | Reason     |
| --------- | ------------- | ---------- |
| `<event>` | `<rate>`      | `<reason>` |

### High-Volume Events

- `<event>`
- `<event>`

---

## Retention

| Log Category | Retention  |
| ------------ | ---------- |
| Application  | `<period>` |
| Error        | `<period>` |
| Security     | `<period>` |
| Audit        | `<period>` |
| Debug        | `<period>` |

---

## Search and Diagnostics

### Primary Query Fields

- `event`
- `level`
- `service`
- `request_id`
- `trace_id`
- `<entity_id>`
- `error_code`

### Diagnostic Scenarios

#### `<Scenario>`

Relevant events:

- `<event>`
- `<event>`

Relevant fields:

- `<field>`
- `<field>`

#### `<Scenario>`

Relevant events:

- `<event>`

Relevant fields:

- `<field>`

---

## Observability Relationships

### Metrics

| Log Event | Related Metric |
| --------- | -------------- |
| `<event>` | `<metric>`     |

### Traces

| Log Event | Related Span |
| --------- | ------------ |
| `<event>` | `<span>`     |

### Alerts

| Condition     | Related Event |
| ------------- | ------------- |
| `<condition>` | `<event>`     |

---

## Environment Differences

### Development

`<development-specific logging behavior>`

### Test

`<test-specific logging behavior>`

### Staging

`<staging-specific logging behavior>`

### Production

`<production-specific logging behavior>`

---

## Edge Cases

- [ ] Logging failure
- [ ] Missing request context
- [ ] Missing user context
- [ ] Unknown error type
- [ ] High-volume repeated failures
- [ ] Retried operations
- [ ] Partial operation completion
- [ ] Concurrent operations
- [ ] Background operations without request context
- [ ] `<domain-specific case>`

---

## Testing

### Event Coverage

- [ ] `<event>` emitted under expected condition
- [ ] `<event>` not emitted under unrelated conditions
- [ ] `<error event>` emitted on failure

### Field Coverage

- [ ] Required fields present
- [ ] Optional fields behave correctly
- [ ] Correlation identifiers propagate correctly
- [ ] Field types remain stable

### Privacy Coverage

- [ ] Sensitive values absent
- [ ] Restricted values transformed correctly
- [ ] Error objects do not leak sensitive payloads

### Level Coverage

- [ ] Events use intended log levels
- [ ] Expected failures do not produce excessive severity
- [ ] Unexpected failures produce sufficient diagnostic detail

---

## Acceptance Criteria

- [ ] Required events are defined.
- [ ] Event names are stable and consistent.
- [ ] Log levels are appropriate.
- [ ] Required structured fields are defined.
- [ ] Correlation fields are present where applicable.
- [ ] Error logs provide sufficient diagnostic context.
- [ ] Sensitive information is excluded or transformed appropriately.
- [ ] High-volume events have documented volume expectations.
- [ ] Sampling behavior is defined where applicable.
- [ ] Retention requirements are defined where applicable.
- [ ] Logging supports the identified diagnostic scenarios.

---

## Risks

| Risk                        | Impact     | Mitigation     |
| --------------------------- | ---------- | -------------- |
| `<excessive volume>`        | `<impact>` | `<mitigation>` |
| `<sensitive data exposure>` | `<impact>` | `<mitigation>` |
| `<insufficient context>`    | `<impact>` | `<mitigation>` |
| `<high cardinality>`        | `<impact>` | `<mitigation>` |

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

## Completion Checklist

### Events

- [ ] Required events defined
- [ ] Event names finalized
- [ ] Event levels finalized
- [ ] Event triggers defined
- [ ] Event frequency understood

### Schema

- [ ] Common fields defined
- [ ] Event-specific fields defined
- [ ] Field types defined
- [ ] Correlation fields defined
- [ ] Error fields defined

### Privacy

- [ ] Prohibited data identified
- [ ] Restricted data identified
- [ ] Redaction requirements defined
- [ ] Sensitive error payloads accounted for

### Diagnostics

- [ ] Primary diagnostic scenarios supported
- [ ] Request correlation supported
- [ ] Cross-service correlation supported where applicable
- [ ] Relevant state changes observable
- [ ] Relevant external failures observable

### Operations

- [ ] Volume expectations documented
- [ ] Sampling defined where applicable
- [ ] Retention defined where applicable
- [ ] Environment differences documented
- [ ] Metrics, traces, and alerts related where applicable

### Verification

- [ ] Event coverage complete
- [ ] Field coverage complete
- [ ] Level coverage complete
- [ ] Privacy coverage complete
- [ ] Acceptance criteria satisfied

---

## Completion Record

### Status

`complete / partial / blocked`

### Events Added

| Event     | Level     | Purpose     |
| --------- | --------- | ----------- |
| `<event>` | `<level>` | `<purpose>` |

### Events Changed

| Event     | Change     |
| --------- | ---------- |
| `<event>` | `<change>` |

### Events Removed

| Event     | Reason     |
| --------- | ---------- |
| `<event>` | `<reason>` |

### Schema Changes

| Field     | Change     |
| --------- | ---------- |
| `<field>` | `<change>` |

### Deviations

`None.`

or

- `<deviation>`

### Remaining Issues

`None.`

or

- `<issue>`
