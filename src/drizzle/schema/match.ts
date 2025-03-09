import { relations } from 'drizzle-orm';
import { pgTable, text, uuid, pgEnum, timestamp } from 'drizzle-orm/pg-core';
import { createdAt, id, updatedAt } from '../schemaHelper';
import { UserTable } from './user';
import { TeamTable } from './team';
import { MatchTeamTable } from './matchTeam';
import { SetTable } from './sets';

export const matchType = [
  'racketlon',
  'tennis',
  'squash',
  'table tennis',
  'badminton',
  'padel',
] as const;
export type Match = (typeof matchType)[number];
export const matchTypeEnum = pgEnum('match_type', matchType);

export const MatchTable = pgTable('matches', {
  id,
  createdAt,
  updatedAt,

  match_type: matchTypeEnum().notNull().default('racketlon'),
  match_description: text(),
  match_date: timestamp({ withTimezone: true }).notNull(),
  winner_id: uuid()
    .notNull()
    .references(() => TeamTable.id),
});

// A match have many teams and is one winner
export const MatchRelationships = relations(MatchTable, ({ one, many }) => ({
  matchTeams: many(MatchTeamTable),
  sets: many(SetTable),
  winner: one(TeamTable, {
    fields: [MatchTable.winner_id],
    references: [TeamTable.id],
  }),
}));
