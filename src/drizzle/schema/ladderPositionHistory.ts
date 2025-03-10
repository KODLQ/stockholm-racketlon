import { relations } from 'drizzle-orm';
import { pgTable, uuid, integer, timestamp } from 'drizzle-orm/pg-core';
import { createdAt, id } from '../schemaHelper';
import { LadderTeamTable } from './ladderTeam';

// Defines the database schema for the 'ladder_position_history' table and its relationships.

// Defines the 'ladder_position_history' table with columns for ladder position history information.
export const LadderPositionHistoryTable = pgTable('ladder_position_history', {
  id,
  createdAt,

  ladder_team_id: uuid()
    .notNull()
    .references(() => LadderTeamTable.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }), // Added onDelete and onUpdate
  ladder_position: integer().notNull(),
  effective_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
});

// Defines the relationships between the 'ladder_position_history' table and other tables:
// - `ladder_team`: Establishes a one-to-one relationship, indicating that a ladder position history entry belongs to one ladder team via the 'ladderTeams' table.
export const LadderPositionHistoryRelations = relations(
  LadderPositionHistoryTable,
  ({ one }) => ({
    ladder_team: one(LadderTeamTable, {
      fields: [LadderPositionHistoryTable.ladder_team_id],
      references: [LadderTeamTable.id],
    }),
  })
);
