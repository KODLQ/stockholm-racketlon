import { relations } from 'drizzle-orm';
import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';
import { createdAt, id, updatedAt } from '../schemaHelper';
import { ClubTable } from './club';

// Defines the database schema for the 'events' table and its relationships.

// Defines the 'events' table with columns for event information.
export const EventTable = pgTable('events', {
  id,
  createdAt,
  updatedAt,

  club_id: uuid()
    .notNull()
    .references(() => ClubTable.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  event_name: text().notNull(),
  event_description: text(),
  event_start_time: timestamp({ withTimezone: true }).notNull(),
  event_end_time: timestamp({ withTimezone: true }), // End time is optional

  location: text(),
  image_url: text(),
});

// Defines the relationships between the 'events' table and other tables:
// - `club`: Establishes a one-to-many relationship, indicating that an event belongs to one club via the 'clubs' table.
export const EventRelations = relations(EventTable, ({ one }) => ({
  club: one(ClubTable, {
    fields: [EventTable.club_id],
    references: [ClubTable.id],
  }),
}));
