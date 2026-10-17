# Roommate Finder: Conceptual Data Relationships

This table identifies the entities that Roommate Finder uses, needs, or stores across its 45 proposed features.
It uses the supplied template: **Entity | Relationship | Related Entities**.
The sections group one conceptual model by feature area.

The model covers the planned product, including features beyond the current prototype.
Each row describes a concept or record, not a required database table.
Supporting records make implied relationships explicit. Their storage design remains open.

## 1. Profiles and social networking

Feature coverage: 1-8.

| Entity | Relationship | Related Entities |
| --- | --- | --- |
| User Account | Represents a person who holds one or more roles and maintains profiles. | Account Role, Renter Profile, Housing Preference Profile, Compatibility Profile |
| Account Role | Identifies a user as a renter, roommate seeker, landlord, or property manager. A user can hold multiple roles. | User Account |
| Renter Profile | Describes a user through biography, interests, move-in date, and optional employment or education details. | User Account |
| Housing Preference Profile | Records a user's budget, preferred locations, lease length, room type, and essential amenities. | User Account, Location, Amenity |
| Compatibility Profile | Records a user's cleanliness, sleep, noise, guest, smoking, pet, and shared-space preferences for roommate matching. | User Account, Match Result |
| Connection | Links two users and records their connection status. Mutual connections derive from these links. | User Account |
| Property Follow | Links a user to a property whose updates the user follows. | User Account, Property |
| Reference | Attributes an endorsement to its author and the user it describes. | User Account, Moderation Report |
| Feed Post | Shares a user's housing search, available room, property update, or introduction request. Can appear in a community group. | User Account, Saved Search, Listing, Property, Community Group |
| Community Group | Organizes users, discussions, and shared listings around a location or interest. | Location, Group Membership, Feed Post, Listing |
| Group Membership | Links a user to a community group and records the user's member or moderator role. | User Account, Community Group |
| Comment | Records a user's contribution to a group discussion, feed post, or shared shortlist item. | User Account, Feed Post, Shortlist Item |

## 2. Listings and housing discovery

Feature coverage: 9-16. Property inventory also supports features 32-34.

| Entity | Relationship | Related Entities |
| --- | --- | --- |
| Property | Represents a managed housing site at a location. Contains buildings or standalone housing units and belongs to a property portfolio. | Location, Building, Housing Unit, Property Portfolio, User Account |
| Building | Groups housing units within a property. | Property, Housing Unit |
| Housing Unit | Represents an apartment or other dwelling within a property. Contains rooms and can house a household. | Property, Building, Room, Household, Occupancy Record, Availability Period |
| Room | Represents a space within a housing unit that can be advertised separately. | Housing Unit, Listing, Occupancy Record, Availability Period |
| Household | Groups current or prospective roommates and their shared housing plans. Can seek another member through a listing. | Household Membership, Housing Unit, Listing, Household Rule, Household Task, Shared Expense |
| Household Membership | Links a user to a household and records membership status and relevant dates. | User Account, Household |
| Listing | Advertises an apartment, room, sublet, or household opening. Connects its publisher to the offered housing and any associated household. | User Account, Property, Housing Unit, Room, Household, Listing Media, Listing Cost, Lease Terms, Availability Period, Amenity |
| Location | Describes an address, neighborhood, city, or geographic area for housing, preferences, groups, and search criteria. | Property, Housing Preference Profile, Community Group, Search Criterion, Commute Destination |
| Amenity | Describes a housing feature, including accessibility features, that a listing offers or a user requests. | Listing, Housing Preference Profile, Search Criterion |
| Listing Media | Attaches a photo, video, or floor plan to a listing. | Listing, File Asset |
| Listing Cost | Describes rent, required recurring fees, estimated utilities, deposits, or other move-in costs for a listing. | Listing |
| Lease Terms | Describes the advertised duration, conditions, and policies for a listing. Informs a later lease agreement. | Listing, Lease Agreement |
| Availability Period | Records when a housing unit or room is available and whether that availability is confirmed. | Housing Unit, Room, Listing |
| Commute Destination | Records a user's selected destination for travel-time searches and comparisons. | User Account, Location, Search Criterion |
| Commute Estimate | Relates an origin property to a destination through estimated travel time and travel mode. | Property, Commute Destination, Listing Comparison, Match Result |
| Favorite | Links a user to a saved property, listing, or roommate profile. Can have private notes and labels. | User Account, Property, Listing, Renter Profile, Private Note, Organizational Label |
| Private Note | Records a user's personal comments about a favorite. | User Account, Favorite |
| Organizational Label | Organizes a user's favorites under a reusable label. | User Account, Favorite |
| Listing Comparison | Groups listings for a user's side-by-side comparison of cost, features, availability, commute, and preference fit. | User Account, Listing, Listing Cost, Commute Estimate, Match Result |
| Collaborative Search | Groups prospective roommates and their shared housing shortlist. | User Account, Shared Shortlist |
| Shared Shortlist | Collects candidate listings for a collaborative search. | Collaborative Search, Shortlist Item |
| Shortlist Item | Connects a listing to a shared shortlist and records the user who added it. | Shared Shortlist, Listing, User Account, Comment, Shortlist Vote |
| Shortlist Vote | Records a participant's vote on a shortlist item. | User Account, Shortlist Item |

## 3. Daily automated searches and notifications

Feature coverage: 17-24.

| Entity | Relationship | Related Entities |
| --- | --- | --- |
| Saved Search | Belongs to a user and targets apartments, rooms, or roommates through independent criteria and notification settings. | User Account, Search Criterion, Search Schedule, Search Run, Notification Preference |
| Search Criterion | Expresses a required condition or preferred condition for a saved search, such as budget, amenities, location, or compatibility. | Saved Search, Location, Amenity, Commute Destination, Compatibility Profile |
| Search Schedule | Sets the daily run time, timezone, and pause state for a saved search. | Saved Search, Search Run |
| Search Run | Records an execution of a saved search, its time, outcome, failure details, and resulting matches. | Saved Search, Search Schedule, Match Result |
| Match Result | Links a search run to a listing or roommate profile with a score and evaluation time. | Search Run, Listing, Renter Profile, Match Explanation, Listing Change |
| Match Explanation | Describes a result's satisfied requirements, unmet preferences, and missing information against individual search criteria. | Match Result, Search Criterion |
| Listing Change | Records a new listing or changes to price, availability, and active status for search comparison and duplicate suppression. | Listing, Search Run, Match Result |
| Notification Preference | Records a user's channels, digest frequency, minimum match score, and quiet hours, with optional settings for individual saved searches. | User Account, Saved Search, Notification Endpoint |
| Notification Endpoint | Identifies a user's email address, web-push subscription, or optional text-message destination for alert delivery. | User Account, Notification Preference, Delivery Attempt |
| Notification | Presents an alert or daily digest to a user. Can reference matches, messages, tours, deadlines, payments, or service updates. | User Account, Match Result, Message, Reminder, Maintenance Update, Announcement, Delivery Attempt |
| Delivery Attempt | Records a notification's channel, destination, attempt time, delivery status, and failure details. Supports retries without duplicate alerts. | Notification, Notification Endpoint |
| Reminder | Connects a due time and recipient to a tour, task, expense, charge, lease deadline, or renewal offer. | User Account, Tour Appointment, Household Task, Checklist Item, Follow-up Task, Shared Expense, Charge, Lease Agreement, Renewal Offer, Notification |

## 4. Renter and roommate services

Feature coverage: 25-31. Files and payments also support manager and administration features.

| Entity | Relationship | Related Entities |
| --- | --- | --- |
| Conversation | Groups private or group messages and their participants. Can concern a listing, inquiry, or household. | Conversation Participant, Message, Listing, Inquiry, Household |
| Conversation Participant | Links a user to a conversation and records membership and read state. | User Account, Conversation |
| Message | Records content sent by a user within a conversation and can include attachments. | User Account, Conversation, Message Attachment |
| Message Attachment | Connects a file to a message. | Message, File Asset |
| User Block | Records which user blocks another user from contact. | User Account |
| Tour Slot | Defines an available in-person or virtual tour time for a listing and its host. | Listing, User Account, Tour Appointment |
| Tour Appointment | Connects requesting users and a host to a listing and tour slot. Records attendance details and booking status. | User Account, Listing, Tour Slot, Calendar Invitation, Reminder |
| Calendar Invitation | Represents the calendar event sent to tour participants and tracks event updates or cancellation. | Tour Appointment, User Account |
| Rental Application Profile | Stores a renter's reusable application information and supporting documents. | User Account, Application Document, Rental Application |
| Rental Application | Represents a selected submission to a listing and its recipient. Tracks submitted information and application status. | User Account, Listing, Business Profile, Rental Application Profile, Application Document, Document Access Grant, Application Review |
| Application Document | Describes an application file owned by a user and made available through explicit access grants. | User Account, File Asset, Rental Application Profile, Rental Application, Document Access Grant |
| File Asset | Represents an uploaded file, its owner, storage reference, and metadata. Supports documents, listing media, attachments, and condition photos. | User Account, Listing Media, Message Attachment, Application Document, Condition Record, Lease Agreement, Verification Record |
| Document Access Grant | Gives a specific recipient access to an application document and records permission, expiration, and revocation. | User Account, Application Document, Rental Application |
| Household Rule | Records a household's expectations and shared-space rules before or during occupancy. | Household |
| Household Task | Records a chore or responsibility, its assigned household members, due date, and completion status. | Household, Household Membership, Reminder |
| Shared Expense | Records rent, utilities, or another household expense and divides the amount among members. | Household, Expense Share, Payment Record, Reminder |
| Expense Share | Records the amount a household member owes for a shared expense and links recorded payments. | Shared Expense, Household Membership, Payment Record |
| Payment Record | Records a payment's payer, recipient, amount, date, and status for an expense share or rental charge. | User Account, Business Profile, Expense Share, Charge, Payment Transaction, Receipt |
| Move Checklist | Organizes a household's move-in or move-out tasks, dates, and condition records for a housing unit or room. | Household, Housing Unit, Room, Checklist Item, Condition Record |
| Checklist Item | Records an assigned move task, such as a key handoff, with its deadline and completion status. | Move Checklist, User Account, Reminder |
| Condition Record | Records a dated condition observation, condition photos, or meter readings during move-in or move-out. | Move Checklist, Housing Unit, Room, User Account, File Asset |

## 5. Property manager tools

Feature coverage: 32-39.

| Entity | Relationship | Related Entities |
| --- | --- | --- |
| Business Profile | Describes a landlord's business or management company, its contact details, verification, staff, and property portfolios. | User Account, Verification Record, Staff Membership, Property Portfolio |
| Property Portfolio | Groups properties under a business profile. | Business Profile, Property |
| Listing Management Operation | Records a user's creation, edit, import, publication, renewal, or archival action on one or multiple listings and the outcome. | User Account, Business Profile, Listing |
| Occupancy Record | Relates residents and a household to a housing unit or room over time, including move-in, notice, and move-out dates. | User Account, Household, Housing Unit, Room, Lease Agreement |
| Waitlist Entry | Links a prospective renter to a property, housing unit, or room and records priority and status. | User Account, Property, Housing Unit, Room, Prospect Record |
| Prospect Record | Tracks a prospective renter's progress from inquiry through move-in and the responsible manager. | User Account, Listing, Inquiry, Follow-up Task, Prospect Note, Rental Application, Occupancy Record |
| Inquiry | Records a user's question or interest in a listing and connects it to the responsible manager and any conversation. | User Account, Listing, Prospect Record, Conversation |
| Follow-up Task | Assigns a prospect-related action to a staff member with a deadline and completion status. | Prospect Record, Staff Membership, Reminder |
| Prospect Note | Records an attributed staff note about a prospective renter. | Prospect Record, Staff Membership |
| Application Review | Records an authorized reviewer's feedback and decision on a rental application. | Rental Application, User Account, Staff Membership, Information Request |
| Information Request | Records missing information requested by a reviewer and the applicant's response. | Rental Application, Application Review, User Account, Application Document, Message |
| Lease Agreement | Connects renters and a landlord or business to housing, agreed terms, lease dates, and documents. | User Account, Business Profile, Housing Unit, Room, Lease Terms, File Asset, Signature Request, Charge, Renewal Offer |
| Signature Request | Tracks a lease document's external signing reference, required signers, and signing status. | Lease Agreement, File Asset, User Account |
| Renewal Offer | Proposes new dates and terms for an existing lease and records the response and deadline. | Lease Agreement, User Account, Reminder |
| Charge | Records an amount due under a lease, such as rent or a fee, and its due date. | Lease Agreement, User Account, Payment Record, Reminder |
| Payment Transaction | Tracks a payment provider's transaction reference, processing status, and related payment record. | Payment Record |
| Receipt | Documents a recorded payment and its recipient. | Payment Record, User Account, Business Profile |
| Maintenance Request | Records a resident's reported problem at a property, housing unit, or room and its assigned staff and status. | User Account, Property, Housing Unit, Room, Staff Membership, Maintenance Update |
| Maintenance Update | Records an attributed repair update or status change for a maintenance request. | Maintenance Request, User Account, Notification |
| Announcement | Publishes a manager's building or property notice to affected residents. | User Account, Property, Building, Occupancy Record, Notification |

## 6. Trust, administration, and platform quality

Feature coverage: 40-45.

| Entity | Relationship | Related Entities |
| --- | --- | --- |
| Verification Record | Records identity, business, or listing-authorization checks, including evidence, outcome, expiry, and displayed badge status. | User Account, Business Profile, Property, Listing, File Asset |
| Moderation Report | Records a user's report about suspected scams, misleading listings, harassment, spam, or abusive content. | User Account, Listing, Message, Feed Post, Comment, Reference, Community Group, Moderation Action |
| Moderation Action | Records a moderator's review, decision, and any restriction or content removal for a report. | Moderation Report, User Account, Moderation Appeal |
| Moderation Appeal | Records a user's challenge to a moderation decision and the subsequent review outcome. | User Account, Moderation Action |
| Privacy Setting | Controls a user's profile visibility and disclosure of contact details and other personal information. | User Account, Renter Profile, Housing Preference Profile, Compatibility Profile |
| Authentication Identity | Links a user to a sign-in method and protected authentication information. | User Account, Account Recovery Request, Security Event |
| Account Session | Records an authenticated user's session, device information, expiry, and revocation status. | User Account, Authentication Identity, Security Event |
| Account Recovery Request | Tracks an expiring account recovery or password-reset request and its completion status. | User Account, Authentication Identity, Security Event |
| Data Deletion Request | Records a user's request to delete account data and tracks its processing status. | User Account |
| Staff Membership | Links a user to a business and its assigned team roles. | User Account, Business Profile, Team Role, Access Grant |
| Team Role | Groups permissions for staff responsibilities within a business. | Business Profile, Staff Membership, Permission |
| Permission | Defines an allowed action on properties, messages, applications, resident records, or financial information. | Team Role, Access Grant |
| Access Grant | Applies staff permissions to a defined business or property scope. | Staff Membership, Team Role, Permission, Business Profile, Property |
| Security Event | Records account access, recovery, or security-setting activity for review. | User Account, Authentication Identity, Account Session, Account Recovery Request |
| Analytics Event | Records a listing interaction, response time, successful match, search failure, or notification outcome for aggregate reporting. | User Account, Listing, Inquiry, Match Result, Search Run, Delivery Attempt |

Feature 45 concerns accessible interaction and responsive layouts. It does not, by itself, require a separate data entity.

## Modeling notes

- User roles share one account. A resident is a user linked to an occupancy record, rather than a separate person record.
- A property, housing unit, room, and listing represent different concepts. Listing publication status does not determine occupancy.
- A household can form before its members select housing. Its housing relationship can therefore remain empty during planning.
- Listing type, status, budget, dates, interests, furnishing, pet policies, and notification channel are attributes of the relevant entities.
- Advertised listing costs describe expected amounts. Charges record actual obligations, and payment records describe payments toward those obligations.
- Application submissions preserve the information shared with each recipient. Later profile edits do not silently change a previous submission.
- Favorites and notes belong to individual users. Shared shortlists, comments, and votes belong to collaborative searches.
- Comparison views, commute estimates, badges, balances, and analytics summaries can derive from other data. A conceptual entity does not imply permanent storage.
- Maps, calendars, payment providers, and signing services are external systems. Their relevant data appears as locations, invitations, transactions, and signature requests.
- Memberships, grants, histories, and operational records are proposed supporting concepts inferred from the features. The source documents do not specify their database structure.
- Exact relationship cardinalities, retention rules, and physical storage design remain subjects for the later logical data model.

## Sources

- [Project Features.pdf](<Project Features.pdf>), pages 1-3: the 45 numbered project features.
- Project Features Table.pdf, pages 2-7: the same numbered features, grouped into six areas with difficulty estimates.
- 491A 3_Requirements Specification.pdf, page 26: the conceptual relationship template shown in the supplied image.
- Current prototype types and implementation records provide terminology checks for accounts, listings, saved homes, inquiries, tours, and occupancy.

The project feature documents define the scope. The course slides supply the requested table format.
