import { relations } from 'drizzle-orm';
import { pgTable, uuid, integer } from 'drizzle-orm/pg-core';
import { createdAt, id, updatedAt } from '../schemaHelper';
import { TournamentTable } from './tournament';
import { TeamTable } from './team';

// Defines the database schema for the 'tournament_teams' table and its relationships.

// Defines the 'tournament_teams' table with columns for tournament team information.
export const TournamentTeamTable = pgTable('tournament_teams', {
  id,
  createdAt,
  updatedAt,

  tournament_id: uuid()
    .notNull()
    .references(() => TournamentTable.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  team_id: uuid()
    .notNull()
    .references(() => TeamTable.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),

  seed: integer(),
});

// Defines the relationships between the 'tournament_teams' table and other tables:
// - `tournament`: Establishes a one-to-one relationship, indicating that a tournament team belongs to one tournament via the 'tournaments' table.
// - `team`: Establishes a one-to-one relationship, indicating that a tournament team is associated with one team via the 'teams' table.
export const TournamentTeamRelations = relations(
  TournamentTeamTable,
  ({ one }) => ({
    tournament: one(TournamentTable, {
      fields: [TournamentTeamTable.tournament_id],
      references: [TournamentTable.id],
    }),
    team: one(TeamTable, {
      fields: [TournamentTeamTable.team_id],
      references: [TeamTable.id],
    }),
  })
);
