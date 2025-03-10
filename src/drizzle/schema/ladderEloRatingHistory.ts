import { relations } from 'drizzle-orm';
import { pgTable, uuid, timestamp, integer } from 'drizzle-orm/pg-core';
import { createdAt, id } from '../schemaHelper';
import { LadderTeamTable } from './ladderTeam';

// Defines the database schema for the 'elo_rating_history' table and its relationships.

// Defines the 'elo_rating_history' table with columns for Elo rating history information.
export const EloRatingHistoryTable = pgTable('elo_rating_history', {
  id,
  createdAt,

  ladder_team_id: uuid()
    .notNull()
    .references(() => LadderTeamTable.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }), // Added onDelete and onUpdate

  elo_rating: integer().notNull(),
  effective_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
});

// Defines the relationships between the 'elo_rating_history' table and other tables:
// - `ladder_team`: Establishes a one-to-one relationship, indicating that an Elo rating history entry belongs to one ladder team via the 'ladderTeams' table.
export const EloRatingHistoryRelations = relations(
  EloRatingHistoryTable,
  ({ one }) => ({
    ladder_team: one(LadderTeamTable, {
      fields: [EloRatingHistoryTable.ladder_team_id],
      references: [LadderTeamTable.id],
    }),
  })
);
