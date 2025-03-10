import { relations } from 'drizzle-orm';
import { pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { createdAt, id, updatedAt } from '../schemaHelper';
import { UserTable } from './user';
import { TeamMemberTable } from './teamMember';

// Defines the database schema for the 'teams' table and its relationships.

// Defines the 'teams' table with columns for team information.
export const TeamTable = pgTable('teams', {
  id,
  team_name: text().notNull(),
  team_leader: uuid()
    .notNull()
    .references(() => UserTable.id, {
      onDelete: 'restrict',
      onUpdate: 'cascade',
    }),
  createdAt,
  updatedAt,
});

// Defines the relationships between the 'teams' table and other tables:
// - `team_members`: Establishes a one-to-many relationship, indicating that a team can have multiple team members via the 'teamMembers' table.
// - `team_leader`: Establishes a one-to-one relationship, indicating that a team has one team leader via the 'users' table.
export const TeamRelationships = relations(TeamTable, ({ many, one }) => ({
  team_members: many(TeamMemberTable),
  team_leader: one(UserTable, {
    fields: [TeamTable.team_leader],
    references: [UserTable.id],
  }),
}));
