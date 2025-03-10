import { relations } from 'drizzle-orm';
import { pgTable, text } from 'drizzle-orm/pg-core';
import { createdAt, id, updatedAt } from '../schemaHelper';
import { LadderTable } from './ladder';
import { EventTable } from './event';

// Defines the database schema for the 'clubs' table and its relationships.
export const ClubTable = pgTable('clubs', {
  id,
  createdAt,
  updatedAt,

  club_name: text().notNull(),
  club_description: text(),
  club_address: text(),
  club_contact_email: text(),
  club_contact_phone: text(),
});

// Defines the relationship between the 'clubs' table and the 'ladders' table:
// - `ladders`: Establishes a one-to-many relationship, indicating that a club can have multiple ladders via the 'ladders' table.
// - `events`: Establishes a one-to-many relationship, indicating that a club can have multiple events via the 'events' table.
export const ClubRelationships = relations(ClubTable, ({ many }) => ({
  ladders: many(LadderTable),
  events: many(EventTable),
}));
