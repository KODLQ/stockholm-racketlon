import { relations } from 'drizzle-orm';
import { pgTable, uuid, integer, boolean } from 'drizzle-orm/pg-core';
import { createdAt, id, updatedAt } from '../schemaHelper';
import { TournamentStageTable } from './tournamentStage';

// Defines the database schema for the 'knockout_stage_settings' table and its relationship with the 'tournament_stages' table.
export const KnockoutStageSettingTable = pgTable('knockout_stage_settings', {
  id,
  createdAt,
  updatedAt,

  tournament_stage_id: uuid()
    .notNull()
    .references(() => TournamentStageTable.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  number_of_rounds: integer().notNull(),
  is_winner_bracket: boolean(),
  is_loser_bracket: boolean(),
});

// Defines the relationship between the 'knockout_stage_settings' table and the 'tournament_stages' table:
// - `stage`: Establishes a one-to-one relationship, indicating that a knockout stage setting belongs to one tournament stage via the 'tournament_stages' table.
export const KnockoutStageSettingRelations = relations(
  KnockoutStageSettingTable,
  ({ one }) => ({
    stage: one(TournamentStageTable, {
      fields: [KnockoutStageSettingTable.tournament_stage_id],
      references: [TournamentStageTable.id],
    }),
  })
);
