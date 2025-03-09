import { relations } from 'drizzle-orm';
import { pgTable, uuid, integer } from 'drizzle-orm/pg-core';
import { createdAt, id, updatedAt } from '../schemaHelper';
import { TeamTable } from './team';
import { MatchTable } from './match';

export const SetTable = pgTable('sets', {
  id,
  createdAt,
  updatedAt,

  set_number: integer(),
  team1_score: integer(),
  team2_score: integer(),
  match_id: uuid()
    .notNull()
    .references(() => MatchTable.id),
  winner_id: uuid()
    .notNull()
    .references(() => TeamTable.id),
});

// A set have one match and one winner
export const SetRelationships = relations(SetTable, ({ one, many }) => ({
  match: one(MatchTable, {
    fields: [SetTable.match_id],
    references: [MatchTable.id],
  }),

  winner: one(TeamTable, {
    fields: [SetTable.winner_id],
    references: [TeamTable.id],
  }),
}));
