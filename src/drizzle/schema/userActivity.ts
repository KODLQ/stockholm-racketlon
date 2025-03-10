import { relations } from 'drizzle-orm';
import { pgTable, uuid, timestamp, text, pgEnum } from 'drizzle-orm/pg-core';
import { createdAt, id, updatedAt } from '../schemaHelper';
import { UserTable } from './user';

// Defines the database schema for the 'user_activities' table and its relationships.

export const activityTypes = [
  'login',
  'logout',
  'match_created',
  'match_updated',
  'profile_update',
  'team_join',
  'team_leave',
  'ladder_challenge',
  'ladder_match_result',
  'other',
] as const;
export type ActivityType = (typeof activityTypes)[number];
export const activityTypeEnum = pgEnum('activity_type', activityTypes);

// Defines the 'user_activities' table with columns for user activity information.
export const UserActivityTable = pgTable('user_activities', {
  id,
  createdAt,
  updatedAt,

  user_id: uuid()
    .notNull()
    .references(() => UserTable.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  activity_type: activityTypeEnum().notNull(),
  activity_timestamp: timestamp({ withTimezone: true }).notNull().defaultNow(),
  details: text(),
});

// Defines the relationship between the 'user_activities' table and other tables:
// - `user`: Establishes a one-to-one relationship, indicating that a user activity belongs to one user via the 'users' table.
export const UserActivityRelationships = relations(
  UserActivityTable,
  ({ one }) => ({
    user: one(UserTable, {
      fields: [UserActivityTable.user_id],
      references: [UserTable.id],
    }),
  })
);
