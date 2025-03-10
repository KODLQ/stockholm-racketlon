import { relations, sql } from 'drizzle-orm';
import { pgTable, uuid, decimal, pgEnum, check } from 'drizzle-orm/pg-core';
import { createdAt, id, updatedAt } from '../schemaHelper';
import { UserTable } from './user';
import { UserRatingTable } from './userRating';

// Defines the database schema for the 'user_sport_levels' table and its relationships.

export const sportType = [
  'racketlon',
  'tennis',
  'tabletennis',
  'squash',
  'badminton',
  'padel',
] as const;
export type SportType = (typeof sportType)[number];
export const sportTypeEnum = pgEnum('sport_type', sportType);

// Defines the 'user_sport_levels' table with columns for user sport skill level information.
export const UserSportLevelTable = pgTable(
  'user_sport_levels',
  {
    id,
    createdAt,
    updatedAt,

    user_id: uuid()
      .notNull()
      .references(() => UserTable.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
    sport_type: sportTypeEnum().notNull(),
    skill_level: decimal('skill_level', { precision: 3, scale: 2 })
      .notNull()
      .default(sql`5.0`),
  },
  (table) => [
    check(
      'skill_level_range',
      sql`${table.skill_level} >= 1 AND ${table.skill_level} <= 10`
    ),
  ]
);

// Defines the relationships between the 'user_sport_levels' table and other tables:
// - `user`: Establishes a one-to-one relationship, indicating that a user sport level entry belongs to one user via the 'users' table.
// - `ratings`: Establishes a one-to-many relationship, indicating that a user sport level can have multiple ratings associated with it via the 'user_ratings' table.
export const UserSportLevelRelations = relations(
  UserSportLevelTable,
  ({ one, many }) => ({
    user: one(UserTable, {
      fields: [UserSportLevelTable.user_id],
      references: [UserTable.id],
    }),
    ratings: many(UserRatingTable),
  })
);
