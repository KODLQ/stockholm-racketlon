import { relations } from 'drizzle-orm';
import { pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { createdAt, id, updatedAt } from '../schemaHelper';
import { TeamMemberTable } from './teamMember';
import { UserSportLevelTable } from './userSportLevel';

// Defines the database schema for the 'users' table and its relationships.

export const userRoles = ['user', 'admin'] as const;
export type UserRole = (typeof userRoles)[number];
export const userRoleEnum = pgEnum('user_role', userRoles);

// Defines the 'users' table with columns for user information.
export const UserTable = pgTable('users', {
  id,
  clerkUserId: text().notNull().unique(),
  createdAt,
  updatedAt,
  deletedAt: timestamp({ withTimezone: true }),

  user_email: text().notNull(),
  user_name: text().notNull(),
  user_date_of_birth: text(),
  user_phone: text(),
  user_city: text(),
  user_role: userRoleEnum().notNull().default('user'),
  user_profile_picture_url: text(),
});

// Defines the relationship between the 'users' table and other tables:
// - `teams`: Establishes a one-to-many relationship, indicating that a user can be a member of multiple teams via the 'teamMembers' table.
// - `sportLevels`: Establishes a one-to-many relationship, indicating that a user can have multiple sport skill levels via the 'userSportLevel' table.
export const UserRelationships = relations(UserTable, ({ many }) => ({
  teams: many(TeamMemberTable),
  sportLevels: many(UserSportLevelTable),
}));
