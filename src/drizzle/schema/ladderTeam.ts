import { relations } from 'drizzle-orm';
import { pgTable, uuid, integer, decimal } from 'drizzle-orm/pg-core';
import { createdAt, id, updatedAt } from '../schemaHelper';
import { LadderTable } from './ladder';
import { TeamTable } from './team';

// Defines the database schema for the 'ladder_teams' table and its relationships.

// Defines the 'ladder_teams' table with columns for ladder team information.
export const LadderTeamTable = pgTable('ladder_teams', {
  id,
  createdAt,
  updatedAt,

  ladder_id: uuid()
    .notNull()
    .references(() => LadderTable.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }), // Added onDelete and onUpdate
  team_id: uuid()
    .notNull()
    .references(() => TeamTable.id, {
      onDelete: 'restrict',
      onUpdate: 'cascade',
    }), // Added onDelete and onUpdate
  ladder_position: integer().notNull(),
  elo_rating: integer().default(1000),
});

// Defines the relationships between the 'ladder_teams' table and other tables:
// - `ladder`: Establishes a one-to-one relationship, indicating that a ladder team belongs to one ladder via the 'ladders' table.
// - `team`: Establishes a one-to-one relationship, indicating that a ladder team is associated with one team via the 'teams' table.
export const LadderTeamRelationships = relations(
  LadderTeamTable,
  ({ one }) => ({
    ladder: one(LadderTable, {
      fields: [LadderTeamTable.ladder_id],
      references: [LadderTable.id],
    }),
    team: one(TeamTable, {
      fields: [LadderTeamTable.team_id],
      references: [TeamTable.id],
    }),
  })
);
