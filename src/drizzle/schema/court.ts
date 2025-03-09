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

export const CourtTable = pgTable('courts', {
  id,
  createdAt,
  updatedAt,

  court_name: text().notNull(),
  court_description: text().notNull(),
  court_type: courtTypeEnum().notNull().default('tennis'),
});

// A court have one stadium
export const CourtsRelationships = relations(CourtTable, ({ one }) => ({
  court_stadium: one(StadiumTable, {
    fields: [CourtTable.id],
    references: [StadiumTable.id],
  }),
}));
