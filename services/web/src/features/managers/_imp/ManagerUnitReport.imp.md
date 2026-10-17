# ManagerUnitReport

## Metadata

- Status: `complete`
- Updated: 2026-09-27
- File: `ManagerUnitReport.tsx`
- Routes: `/managers/vacant`, `/managers/notices`
- Scope: vacancy and notice detail interfaces using local records

## Purpose and requirements

- [x] Show a dedicated list for vacant units or units with notice given.
- [x] Include property, unit, housing type, and neighborhood.
- [x] Show vacancy dates or notice and move-out dates, plus current listing availability.
- [x] Show base asking rent, listing status, and unit preparation.
- [x] Derive the next renter action from current pending tour and inquiry records.
- [x] Summarize unit count, total monthly asking rent, and live listing count.
- [x] Search within the report by property, unit, listing name, or location.
- [x] Open the existing listing editor and listing-specific activity pages.
- [x] Provide meaningful empty states and search recovery.
- [x] Retain labels and controls in mobile cards.

## Usage and design

ManagerWorkspace supplies `kind`, collections, and edit/activity callbacks.
The report scope comes from explicit occupancy metadata, not publishing status.
The workspace shell supplies the page heading, active summary link, and Back to listings action.
Search is local to the report. Rows sort by availability, using the current listing record.
Summary totals describe the entire report scope; the result count identifies search matches separately.
Rent totals are advertised base rent, not revenue or a claim of vacancy losses.

Preparation and lifecycle dates come from representative unit metadata.
Next-step copy follows pending tour requests, then pending inquiries, then draft publishing work.
This copy updates after a local reply or confirmation. It does not continue to request completed work.
No occupancy, preparation, notice, or lease record is modified by the report.

## Testing and acceptance

- [x] The vacancy page lists three units, $4,550 monthly asking rent, and two live listings.
- [x] The notice page lists two units, $4,845 monthly asking rent, and one live listing.
- [x] Notices show received and move-out dates as well as availability.
- [x] Direct refresh opens the intended report and sets its page title.
- [x] Replying and confirming a tour update the unit's next step across report navigation.
- [x] Layouts fit 320, 768, 1024, and 1440px without page overflow.

## Limitations

Data and updates remain local. Production needs authorized occupancy, preparation, notice, and lease records.
The report does not calculate vacancy loss, predict occupancy, or schedule cleaning and inspections.
