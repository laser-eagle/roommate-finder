import { AccountSaveBar, AccountToggle } from './AccountControls'
import type { AccountNotifications, HousingPreferences } from './accounts.mock'

interface FormActions { dirty: boolean; onSave: () => void; onDiscard: () => void }

export function AccountHousing({ value, dirty, onChange, onSave, onDiscard }: FormActions & {
  value: HousingPreferences; onChange: (value: HousingPreferences) => void
}) {
  return <form className="account-panel" aria-labelledby="account-panel-heading" onSubmit={(event) => { event.preventDefault(); onSave() }}>
    <div className="account-panel-heading"><span className="eyebrow muted">Your search</span><h2 id="account-panel-heading">Housing preferences</h2><p className="small muted">Set your budget, location, and move-in date.</p></div>
    <div className="account-form-content">
      <label>Search location<input required pattern=".*\S.*" maxLength={80} value={value.location} onChange={(event) => onChange({ ...value, location: event.target.value })} /></label>
      <label>Preferred neighborhoods<input maxLength={160} value={value.neighborhoods} onChange={(event) => onChange({ ...value, neighborhoods: event.target.value })} /><span className="account-field-hint">Separate neighborhoods with commas. Leave blank to search the whole city.</span></label>
      <div className="account-field-grid">
        <label>Maximum monthly cost ($)<input type="number" required min="1" max="100000" step="1" value={value.budget} onChange={(event) => onChange({ ...value, budget: event.target.value })} /><span className="account-field-hint">Include rent, fees, and estimated utilities.</span></label>
        <label>Move-in date<input type="date" required value={value.moveIn} onChange={(event) => onChange({ ...value, moveIn: event.target.value })} /></label>
      </div>
      <label>Housing type<select value={value.homeType} onChange={(event) => onChange({ ...value, homeType: event.target.value })}><option>Private room</option><option>Entire apartment</option><option>Either</option></select></label>
      <p className="account-inline-note small muted">These preferences are private and are not shown on your profile.</p>
    </div>
    <AccountSaveBar dirty={dirty} onDiscard={onDiscard} />
  </form>
}

export function AccountNotificationSettings({ value, dirty, onChange, onSave, onDiscard }: FormActions & {
  value: AccountNotifications; onChange: (value: AccountNotifications) => void
}) {
  return <form className="account-panel" aria-labelledby="account-panel-heading" onSubmit={(event) => { event.preventDefault(); onSave() }}>
    <div className="account-panel-heading"><span className="eyebrow muted">Email preferences</span><h2 id="account-panel-heading">Notifications</h2><p className="small muted">Choose which updates you receive by email.</p></div>
    <div className="account-form-content">
      <AccountToggle title="New messages" description="Messages from households, renters, and property managers." checked={value.messages} onChange={(messages) => onChange({ ...value, messages })} />
      <AccountToggle title="Tour updates" description="Tour requests, confirmations, and schedule changes." checked={value.tours} onChange={(tours) => onChange({ ...value, tours })} />
      <AccountToggle title="New listing matches" description="New listings that match your housing preferences." checked={value.matches} onChange={(matches) => onChange({ ...value, matches })} />
      <label>Listing email frequency<select disabled={!value.matches} value={value.frequency} onChange={(event) => onChange({ ...value, frequency: event.target.value })}><option>Daily</option><option>Weekly</option></select><span className="account-field-hint">Applies to listing matches. Messages and tour updates arrive as they happen.</span></label>
      <p className="account-inline-note small muted">Account security emails stay enabled.</p>
    </div>
    <AccountSaveBar dirty={dirty} onDiscard={onDiscard} />
  </form>
}
