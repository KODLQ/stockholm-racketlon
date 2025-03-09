import { relations } from 'drizzle-orm';
import { pgTable, uuid } from 'drizzle-orm/pg-core';
import { createdAt, id, updatedAt } from '../schemaHelper';
import { TeamTable } from './team';
import { MatchTable } from './match';

export const MatchTeamTable = pgTable('match-team', {
  id,
  createdAt,
  updatedAt,

  match_id: uuid()
    .notNull()
    .references(() => MatchTable.id),
  team_id: uuid()
    .notNull()
    .references(() => TeamTable.id),
  //team_score:
});

// A match team have one match and is one team
export const MatchTeamRelationships = relations(MatchTeamTable, ({ one }) => ({
  match: one(MatchTable, {
    fields: [MatchTeamTable.id],
    references: [MatchTable.id],
  }),
  team: one(TeamTable, {
    fields: [MatchTeamTable.team_id],
    references: [TeamTable.id],
  }),
}));
