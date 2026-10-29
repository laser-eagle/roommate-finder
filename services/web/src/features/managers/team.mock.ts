export const teamAreas = ['Properties', 'Messages', 'Applications', 'Resident records', 'Financial information'] as const
export type TeamArea = typeof teamAreas[number]

export const teamRoles = ['Leasing Agent', 'Maintenance', 'Accountant', 'Office Admin'] as const
export type TeamRole = typeof teamRoles[number] | 'Custom permissions'

export const rolePermissions: Record<typeof teamRoles[number], TeamArea[]> = {
  'Leasing Agent': ['Properties', 'Messages', 'Applications'],
  Maintenance: ['Properties', 'Resident records'],
  Accountant: ['Resident records', 'Financial information'],
  'Office Admin': [...teamAreas],
}

export const teamProperties = ['Market Street', 'Fremont Court', 'Wallingford House', 'Greenwood Flats']

export interface TeamMember {
  id: string
  name: string
  email: string
  role: TeamRole
  permissions: TeamArea[]
  properties: string[]
  status: 'Active' | 'Invitation pending'
}

const member = (id: string, name: string, email: string, role: typeof teamRoles[number], status: TeamMember['status'] = 'Active'): TeamMember => ({
  id, name, email, role, permissions: rolePermissions[role], properties: [...teamProperties], status,
})

export const initialTeam: TeamMember[] = [
  member('team-hannah', 'Hannah Wu', 'hannah.wu@pinestreethomes.example', 'Leasing Agent'),
  member('team-omar', 'Omar Haddad', 'omar.haddad@pinestreethomes.example', 'Maintenance'),
  member('team-chris', 'Chris Morales', 'chris.morales@pinestreethomes.example', 'Office Admin'),
  member('team-priya', 'Priya Shah', 'priya.shah@pinestreethomes.example', 'Accountant', 'Invitation pending'),
]
