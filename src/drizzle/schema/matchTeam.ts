import { relations } from 'drizzle-orm';
import { pgTable, uuid } from 'drizzle-orm/pg-core';
import { createdAt, id, updatedAt } from '../schemaHelper';
import { TeamTable } from './team';
import { MatchTable } from './match';

// Defines the database schema for the 'match_team' table and its relationships.

// Defines the 'match_team' table with columns for match team information.
export const MatchTeamTable = pgTable('match_team', {
  id,
  createdAt,
  updatedAt,

  match_id: uuid()
    .notNull()
    .references(() => MatchTable.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  team_id: uuid()
    .notNull()
    .references(() => TeamTable.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
});

// Defines the relationships between the 'match_team' table and other tables:
// - `match`: Establishes a one-to-one relationship, indicating that a match team is associated with one match via the 'matches' table.
// - `team`: Establishes a one-to-one relationship, indicating that a match team is associated with one team via the 'teams' table.
export const MatchTeamRelationships = relations(MatchTeamTable, ({ one }) => ({
  match: one(MatchTable, {
    fields: [MatchTeamTable.match_id],
    references: [MatchTable.id],
  }),
  team: one(TeamTable, {
    fields: [MatchTeamTable.team_id],
    references: [TeamTable.id],
  }),
}));
