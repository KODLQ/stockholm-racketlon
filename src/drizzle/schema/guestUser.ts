import { relations } from 'drizzle-orm';
import { pgTable, text } from 'drizzle-orm/pg-core';
import { createdAt, id, updatedAt } from '../schemaHelper';
import { TeamMemberTable } from './teamMember';

// Defines the database schema for the 'guest_user' table and its relationships.

// Defines the 'guest_user' table with columns for guest user information.
export const GuestUserTable = pgTable('guest_user', {
  id,
  createdAt,
  updatedAt,

  guest_name: text().notNull(),
  guest_emamil: text(),
  guest_phone: text(),
});

// Defines the relationship between the 'guest_user' table and the 'teamMember' table:
// - `teams`: Establishes a one-to-many relationship, indicating that a guest user can be a member of multiple teams via the 'teamMember' table.
export const GuestUserRelationships = relations(GuestUserTable, ({ many }) => ({
  teams: many(TeamMemberTable),
}));
