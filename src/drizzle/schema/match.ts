import { relations } from 'drizzle-orm';
import { pgTable, text, pgEnum, timestamp, uuid } from 'drizzle-orm/pg-core';
import { createdAt, id, updatedAt } from '../schemaHelper';
import { TeamTable } from './team';
import { MatchTeamTable } from './matchTeam';
import { SetTable } from './sets';

// Defines the database schema for the 'matches' table and its relationships.

// Enumeration for match types.
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

// Enumeration for match statuses.
export const matchStatus = [
  'scheduled',
  'in_progress',
  'completed',
  'draw',
  'abandoned',
] as const;
export type MatchStatus = (typeof matchStatus)[number];
export const matchStatusEnum = pgEnum('match_status', matchStatus);

// Defines the 'matches' table with columns for match information.
export const MatchTable = pgTable('matches', {
  id,
  createdAt,
  updatedAt,

  scheduled_start_time: timestamp({ withTimezone: true }).notNull(),
  scheduled_end_time: timestamp({ withTimezone: true }).notNull(),

  match_type: matchTypeEnum().notNull().default('racketlon'),
  match_description: text(),
  winner_id: uuid().references(() => TeamTable.id, {
    onDelete: 'set null',
    onUpdate: 'cascade',
  }),
  loser_id: uuid().references(() => TeamTable.id, {
    onDelete: 'set null',
    onUpdate: 'cascade',
  }),

  match_status: matchStatusEnum().notNull().default('scheduled'),
});

// Defines the relationships between the 'matches' table and other tables:
// - `match_teams`: Establishes a one-to-many relationship, indicating that a match can have multiple teams associated with it via the 'matchTeams' table.
// - `sets`: Establishes a one-to-many relationship, indicating that a match can have multiple sets associated with it via the 'sets' table.
// - `winner`: Establishes a one-to-one relationship (nullable), indicating that a match can have one winning team via the 'teams' table.
// - `loser`: Establishes a one-to-one relationship (nullable), indicating that a match can have one losing team via the 'teams' table.
export const MatchRelationships = relations(MatchTable, ({ one, many }) => ({
  match_teams: many(MatchTeamTable),
  sets: many(SetTable),
  winner: one(TeamTable, {
    fields: [MatchTable.winner_id],
    references: [TeamTable.id],
  }),
  loser: one(TeamTable, {
    fields: [MatchTable.loser_id],
    references: [TeamTable.id],
  }),
}));
