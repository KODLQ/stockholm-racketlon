import { relations } from 'drizzle-orm';
import { pgTable, text, pgEnum } from 'drizzle-orm/pg-core';
import { createdAt, id, updatedAt } from '../schemaHelper';
import { StadiumTable } from './stadium';

export const courtType = [
  'tennis',
  'squash',
  'tabletennis',
  'badminton',
  'padel',
] as const;
export type Court = (typeof courtType)[number];
export const courtTypeEnum = pgEnum('court_type', courtType);

// Defines the 'courts' table with columns for court information.
export const CourtTable = pgTable('courts', {
  id,
  createdAt,
  updatedAt,

  court_name: text().notNull(),
  court_description: text().notNull(),
  court_type: courtTypeEnum().notNull().default('tennis'),
});

// Defines the relationship between the 'courts' table and the 'stadiums' table:
// - `court_stadium`: Establishes a one-to-one relationship, indicating that a court belongs to one stadium via the `stadiums` table.
export const CourtsRelationships = relations(CourtTable, ({ one }) => ({
  court_stadium: one(StadiumTable, {
    fields: [CourtTable.id],
    references: [StadiumTable.id],
  }),
}));
