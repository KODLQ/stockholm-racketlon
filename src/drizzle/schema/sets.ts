import { relations } from 'drizzle-orm';
import { pgTable, uuid, integer } from 'drizzle-orm/pg-core';
import { createdAt, id, updatedAt } from '../schemaHelper';
import { TeamTable } from './team';
import { MatchTable } from './match';

// Defines the database schema for the 'sets' table and its relationships.

// Defines the 'sets' table with columns for set information.
export const SetTable = pgTable('sets', {
  id,
  createdAt,
  updatedAt,

  set_number: integer(),
  team1_score: integer(),
  team2_score: integer(),
  match_id: uuid()
    .notNull()
    .references(() => MatchTable.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  winner_id: uuid()
    .notNull()
    .references(() => TeamTable.id, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    }),
  loser_id: uuid()
    .notNull()
    .references(() => TeamTable.id, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    }),
});

// Defines the relationships between the 'sets' table and other tables:
// - `match`: Establishes a one-to-one relationship, indicating that a set belongs to one match via the 'matches' table.
// - `winner`: Establishes a one-to-one relationship, indicating that a set has one winning team via the 'teams' table.
// - `loser`: Establishes a one-to-one relationship, indicating that a set has one losing team via the 'teams' table.
export const SetRelationships = relations(SetTable, ({ one }) => ({
  match: one(MatchTable, {
    fields: [SetTable.match_id],
    references: [MatchTable.id],
  }),
  winner: one(TeamTable, {
    fields: [SetTable.winner_id],
    references: [TeamTable.id],
  }),
  loser: one(TeamTable, {
    fields: [SetTable.loser_id],
    references: [TeamTable.id],
  }),
}));
