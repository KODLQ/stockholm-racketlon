import { relations } from 'drizzle-orm';
import { pgTable, uuid, pgEnum, timestamp } from 'drizzle-orm/pg-core';
import { createdAt, id, updatedAt } from '../schemaHelper';
import { MatchTable } from './match';
import { LadderTeamTable } from './ladderTeam';
import { LadderTable } from './ladder';
import { CourtTable } from './court';

// Defines the database schema for the 'ladder_matches' table and its relationships.

export const challengeStatus = [
  'pending',
  'accepted',
  'rejected',
  'completed',
] as const;
export type ChallengeStatus = (typeof challengeStatus)[number];
export const challengeStatusEnum = pgEnum('challenge_status', challengeStatus);

// Defines the 'ladder_matches' table with columns for ladder match information.
export const LadderMatchTable = pgTable('ladder_matches', {
  id,
  createdAt,
  updatedAt,

  ladder_id: uuid()
    .notNull()
    .references(() => LadderTable.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  match_id: uuid()
    .notNull()
    .references(() => MatchTable.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  challenger_team_id: uuid()
    .notNull()
    .references(() => LadderTeamTable.id, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    }),
  challenged_team_id: uuid()
    .notNull()
    .references(() => LadderTeamTable.id, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    }),
  court_id: uuid()
    .notNull()
    .references(() => CourtTable.id, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    }),
  challenge_status: challengeStatusEnum().notNull().default('pending'),
});

// Defines the relationships between the 'ladder_matches' table and other tables:
// - `ladder`: Establishes a one-to-one relationship, indicating that a ladder match belongs to one ladder via the 'ladders' table.
// - `match`: Establishes a one-to-one relationship, indicating that a ladder match is associated with one match entry via the 'matches' table.
// - `challenger_team`: Establishes a one-to-one relationship, indicating that a ladder match has one challenger team via the 'ladderTeams' table.
// - `challenged_team`: Establishes a one-to-one relationship, indicating that a ladder match has one challenged team via the 'ladderTeams' table.
// - `court`: Establishes a one-to-one relationship, indicating that a ladder match takes place on one court via the 'courts' table.
export const LadderMatchRelationships = relations(
  LadderMatchTable,
  ({ one }) => ({
    ladder: one(LadderTable, {
      fields: [LadderMatchTable.ladder_id],
      references: [LadderTable.id],
    }),
    match: one(MatchTable, {
      fields: [LadderMatchTable.match_id],
      references: [MatchTable.id],
    }),
    challenger_team: one(LadderTeamTable, {
      fields: [LadderMatchTable.challenger_team_id],
      references: [LadderTeamTable.id],
    }),
    challenged_team: one(LadderTeamTable, {
      fields: [LadderMatchTable.challenged_team_id],
      references: [LadderTeamTable.id],
    }),
    court: one(CourtTable, {
      fields: [LadderMatchTable.court_id],
      references: [CourtTable.id],
    }),
  })
);
