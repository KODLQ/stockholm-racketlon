import { relations } from 'drizzle-orm';
import { pgTable, text, pgEnum } from 'drizzle-orm/pg-core';
import { createdAt, id, updatedAt } from '../schemaHelper';
import { TeamMemberTable } from './teamMember';

export const GuestUserTable = pgTable('guest_user', {
  id,
  createdAt,
  updatedAt,

  guest_name: text().notNull(),
});

export const GuestUserRelationships = relations(GuestUserTable, ({ many }) => ({
  teams: many(TeamMemberTable),
}));
