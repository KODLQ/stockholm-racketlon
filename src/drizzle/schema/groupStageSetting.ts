import { relations } from 'drizzle-orm';
import { pgTable, uuid, integer } from 'drizzle-orm/pg-core';
import { createdAt, id, updatedAt } from '../schemaHelper';
import { TournamentStageTable } from './tournamentStage';

// Defines the database schema for the 'group_stage_settings' table and its relationship with the 'tournament_stages' table.
export const GroupStageSettingTable = pgTable('group_stage_settings', {
  id,
  createdAt,
  updatedAt,

  tournament_stage_id: uuid()
    .notNull()
    .references(() => TournamentStageTable.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  group_size: integer().notNull(),
  points_for_win: integer().notNull(),
  points_for_draw: integer().notNull(),
  points_for_loss: integer().notNull(),
});

// Defines the relationship between the 'group_stage_settings' table and the 'tournament_stages' table:
// - `stage`: Establishes a one-to-one relationship, indicating that a group stage setting belongs to one tournament stage via the 'tournament_stages' table.
export const GroupStageSettingRelations = relations(
  GroupStageSettingTable,
  ({ one }) => ({
    stage: one(TournamentStageTable, {
      fields: [GroupStageSettingTable.tournament_stage_id],
      references: [TournamentStageTable.id],
    }),
  })
);
