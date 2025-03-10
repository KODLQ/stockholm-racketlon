import { relations } from 'drizzle-orm';
import { pgTable, uuid, pgEnum } from 'drizzle-orm/pg-core';
import { createdAt, id, updatedAt } from '../schemaHelper';
import { UserTable } from './user';
import { ClubTable } from './club';

// Defines the database schema for the 'club_members' table and its relationships.

export const clubMemberRole = ['member', 'admin', 'owner'] as const;
export type ClubMemberRole = (typeof clubMemberRole)[number];
export const clubMemberRoleEnum = pgEnum('club_member_role', clubMemberRole);

// Defines the 'club_members' table with columns for club membership information.
export const ClubMemberTable = pgTable('club_members', {
  id,
  createdAt,
  updatedAt,

  user_id: uuid()
    .notNull()
    .references(() => UserTable.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  club_id: uuid()
    .notNull()
    .references(() => ClubTable.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  club_member_role: clubMemberRoleEnum().notNull().default('member'),
});

// Defines the relationships between the 'club_members' table and other tables:
// - `user`: Establishes a one-to-one relationship, indicating that a club member belongs to one user via the 'users' table.
// - `club`: Establishes a one-to-one relationship, indicating that a club member belongs to one club via the 'clubs' table.
export const ClubMemberRelationships = relations(
  ClubMemberTable,
  ({ one }) => ({
    user: one(UserTable, {
      fields: [ClubMemberTable.user_id],
      references: [UserTable.id],
    }),
    club: one(ClubTable, {
      fields: [ClubMemberTable.club_id],
      references: [ClubTable.id],
    }),
  })
);
