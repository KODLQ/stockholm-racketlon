import { relations } from 'drizzle-orm';
import { pgTable, uuid, text, integer, pgEnum } from 'drizzle-orm/pg-core';
import { createdAt, id, updatedAt } from '../schemaHelper';
import { TournamentTable } from './tournament';
import { TournamentMatchTable } from './tournamentMatch';
import { GroupStageSettingTable } from './groupStageSetting';
import { KnockoutStageSettingTable } from './knockoutStageSetting';

export const stageType = ['group', 'knockout'] as const;
export type Stage = (typeof stageType)[number];
export const stageTypeEnum = pgEnum('stage_type', stageType);

// Defines the database schema for the 'tournament_stages' table and its relationships.

// Defines the 'tournament_stages' table with columns for tournament stage information.
export const TournamentStageTable = pgTable('tournament_stages', {
  id,
  createdAt,
  updatedAt,

  tournament_id: uuid()
    .notNull()
    .references(() => TournamentTable.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),

  tournament_stage_name: text().notNull(),
  tournament_stage_order: integer().notNull(),
  stage_type: stageTypeEnum().notNull().default('knockout'),
});

// Defines the relationships between the 'tournament_stages' table and other tables:
// - `tournament`: Establishes a one-to-one relationship, indicating that a tournament stage belongs to one tournament via the 'tournaments' table.
// - `tournament_matches`: Establishes a one-to-many relationship, indicating that a tournament stage can have multiple matches associated with it via the 'tournamentMatches' table.
// - `group_stage_settings`: Establishes a one-to-one relationship (nullable), indicating that a tournament stage can have one group stage setting via the 'groupStageSettings' table.
// - `knockout_stage_settings`: Establishes a one-to-one relationship (nullable), indicating that a tournament stage can have one knockout stage setting via the 'knockoutStageSettings' table.
export const TournamentStageRelations = relations(
  TournamentStageTable,
  ({ one, many }) => ({
    tournament: one(TournamentTable, {
      fields: [TournamentStageTable.tournament_id],
      references: [TournamentTable.id],
    }),
    tournament_matches: many(TournamentMatchTable),

    group_stage_settings: one(GroupStageSettingTable, {
      fields: [TournamentStageTable.id],
      references: [GroupStageSettingTable.tournament_stage_id],
    }),

    knockout_stage_settings: one(KnockoutStageSettingTable, {
      fields: [TournamentStageTable.id],
      references: [KnockoutStageSettingTable.tournament_stage_id],
    }),
  })
);
