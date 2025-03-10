import { relations } from 'drizzle-orm';
import {
  pgTable,
  pgEnum,
  integer,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';
import { createdAt, id, updatedAt } from '../schemaHelper';
import { TournamentTeamTable } from './tournamentTeam';
import { TournamentStageTable } from './tournamentStage';
import { TournamentMatchTable } from './tournamentMatch';
import { ClubTable } from './club';

export const tournamentType = ['singles', 'doubles', 'team'] as const;
export type TournamentType = (typeof tournamentType)[number];
export const tournamentTypeEnum = pgEnum('tournament_type', tournamentType);

// Defines the 'tournaments' table with columns for tournament information.
export const TournamentTable = pgTable('tournaments', {
  id,
  createdAt,
  updatedAt,

  tournament_name: text().notNull(),
  start_date: timestamp({ withTimezone: true }).notNull(),
  end_date: timestamp({ withTimezone: true }),
  description: text(),
  tournament_team_size: integer().notNull(),
  tournament_type: tournamentTypeEnum().notNull().default('singles'),

  club_id: uuid()
    .notNull()
    .references(() => ClubTable.id, {
      onDelete: 'restrict',
      onUpdate: 'cascade',
    }),
});

// Defines the relationships between the 'tournaments' table and other tournament-related tables:
// - `tournament_teams`: Establishes a one-to-many relationship, indicating that a tournament can have multiple teams associated with it via the 'tournamentTeams' table.
// - `tournament_stages`: Establishes a one-to-many relationship, indicating that a tournament can have multiple stages associated with it via the 'tournamentStages' table.
// - `tournament_matches`: Establishes a one-to-many relationship, indicating that a tournament can have multiple matches associated with it via the 'tournamentMatches' table.
// - `club`: Establishes a one-to-one relationship, indicating that a tournament belongs to one club via the 'clubs' table.
export const TournamentRelations = relations(
  TournamentTable,
  ({ one, many }) => ({
    tournament_teams: many(TournamentTeamTable),
    tournament_stages: many(TournamentStageTable),
    tournament_matches: many(TournamentMatchTable),
    club: one(ClubTable, {
      fields: [TournamentTable.club_id],
      references: [ClubTable.id],
    }),
  })
);
