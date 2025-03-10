import { relations } from 'drizzle-orm';
import { pgTable, uuid, integer } from 'drizzle-orm/pg-core';
import { createdAt, id, updatedAt } from '../schemaHelper';

import { TournamentTable } from './tournament';
import { TournamentStageTable } from './tournamentStage';
import { CourtTable } from './court';
import { TournamentTeamTable } from './tournamentTeam';
import { MatchTable } from './match';

// Defines the database schema for the 'tournament_matches' table and its relationships.

// Defines the 'tournament_matches' table with columns for tournament match information.
export const TournamentMatchTable = pgTable('tournament_matches', {
  id,
  createdAt,
  updatedAt,

  tournament_id: uuid()
    .notNull()
    .references(() => TournamentTable.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  stage_id: uuid()
    .notNull()
    .references(() => TournamentStageTable.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  match_number: integer().notNull(),
  team1_id: uuid()
    .notNull()
    .references(() => TournamentTeamTable.id, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    }),
  team2_id: uuid()
    .notNull()
    .references(() => TournamentTeamTable.id, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    }),
  match_id: uuid()
    .notNull()
    .references(() => MatchTable.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  court_id: uuid()
    .notNull()
    .references(() => CourtTable.id, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    }),
});

// Defines the relationships between the 'tournament_matches' table and other tables:
// - `tournament`: Establishes a one-to-one relationship, indicating that a tournament match belongs to one tournament via the 'tournaments' table.
// - `stage`: Establishes a one-to-one relationship, indicating that a tournament match belongs to one stage via the 'tournamentStages' table.
// - `team1`: Establishes a one-to-one relationship, indicating that a tournament match has one team1 via the 'tournamentTeams' table.
// - `team2`: Establishes a one-to-one relationship, indicating that a tournament match has one team2 via the 'tournamentTeams' table.
// - `match`: Establishes a one-to-one relationship, indicating that a tournament match has one match via the 'match' table.
// - `court`: Establishes a one-to-one relationship, indicating that a tournament match takes place on one court via the 'courts' table.
export const TournamentMatchRelations = relations(
  TournamentMatchTable,
  ({ one }) => ({
    tournament: one(TournamentTable, {
      fields: [TournamentMatchTable.tournament_id],
      references: [TournamentTable.id],
    }),
    stage: one(TournamentStageTable, {
      fields: [TournamentMatchTable.stage_id],
      references: [TournamentStageTable.id],
    }),
    team1: one(TournamentTeamTable, {
      fields: [TournamentMatchTable.team1_id],
      references: [TournamentTeamTable.id],
    }),
    team2: one(TournamentTeamTable, {
      fields: [TournamentMatchTable.team2_id],
      references: [TournamentTeamTable.id],
    }),
    match: one(MatchTable, {
      fields: [TournamentMatchTable.match_id],
      references: [MatchTable.id],
    }),
    court: one(CourtTable, {
      fields: [TournamentMatchTable.court_id],
      references: [CourtTable.id],
    }),
  })
);
