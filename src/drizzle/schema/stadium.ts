import { relations } from 'drizzle-orm';
import { pgTable, text } from 'drizzle-orm/pg-core';
import { createdAt, id, updatedAt } from '../schemaHelper';
import { CourtTable } from './court';

export const StadiumTable = pgTable('stadium', {
  id,
  createdAt,
  updatedAt,

  stadium_name: text().notNull(),
  stadium_description: text().notNull(),
  stadium_adress: text().notNull(),
  stadium_city: text().notNull(),
  stadium_country: text().notNull(),
});

// A statium have many courts.
export const StadiumRelationships = relations(StadiumTable, ({ many }) => ({
  stadium_courts: many(CourtTable),
}));
