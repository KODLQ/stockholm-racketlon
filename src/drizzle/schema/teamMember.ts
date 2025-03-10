import { relations, sql } from 'drizzle-orm';
import { check, pgTable, uuid } from 'drizzle-orm/pg-core';
import { createdAt, id, updatedAt } from '../schemaHelper';
import { TeamTable } from './team';
import { UserTable } from './user';
import { GuestUserTable } from './guestUser';

// Defines the database schema for the 'team_members' table and its relationships.

// Defines the 'team_members' table with columns for team member information.
export const TeamMemberTable = pgTable(
  'team_members',
  {
    id,
    createdAt,
    updatedAt,

    team_id: uuid().references(() => TeamTable.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    user_id: uuid().references(() => UserTable.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    guest_id: uuid().references(() => GuestUserTable.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  },
  (table) => [
    check(
      'check_user_or_guest',
      sql`(${table.user_id} IS NOT NULL AND ${table.guest_id} IS NULL) OR (${table.user_id} IS NULL AND ${table.guest_id} IS NOT NULL)`
    ),
  ]
);

// Defines the relationships between the 'team_members' table and other tables:
// - `team`: Establishes a one-to-one relationship, indicating that a team member belongs to one team via the 'teams' table.
// - `member`: Establishes a one-to-one relationship (nullable), indicating that a team member can be a registered user via the 'users' table.
// - `guest`: Establishes a one-to-one relationship (nullable), indicating that a team member can be a guest user via the 'guestUser' table.
export const TeamMemberRelationships = relations(
  TeamMemberTable,
  ({ one }) => ({
    team: one(TeamTable, {
      fields: [TeamMemberTable.team_id],
      references: [TeamTable.id],
    }),
    member: one(UserTable, {
      fields: [TeamMemberTable.user_id],
      references: [UserTable.id],
    }),
    guest: one(GuestUserTable, {
      fields: [TeamMemberTable.guest_id],
      references: [GuestUserTable.id],
    }),
  })
);
