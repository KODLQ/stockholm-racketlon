import { relations } from 'drizzle-orm';
import { pgTable, text } from 'drizzle-orm/pg-core';
import { createdAt, id, updatedAt } from '../schemaHelper';
import { CourtTable } from './court';

// Defines the database schema for the 'stadium' table and its relationships.

// Defines the 'stadium' table with columns for stadium information.
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

// Defines the relationship between the 'stadium' table and other tables:
// - `stadium_courts`: Establishes a one-to-many relationship, indicating that a stadium can have multiple courts associated with it via the 'courts' table.
export const StadiumRelationships = relations(StadiumTable, ({ many }) => ({
  stadium_courts: many(CourtTable),
}));
