import { relations, sql } from 'drizzle-orm';
import { pgTable, uuid, integer, check, text } from 'drizzle-orm/pg-core';
import { createdAt, id, updatedAt } from '../schemaHelper';
import { UserTable } from './user';
import { UserSportLevelTable } from './userSportLevel';

// Defines the database schema for the 'user_ratings' table and its relationships.

// Defines the 'user_ratings' table with columns for user ratings information.
export const UserRatingTable = pgTable(
  'user_ratings',
  {
    id,
    createdAt,
    updatedAt,

    rater_user_id: uuid()
      .notNull()
      .references(() => UserTable.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
    rated_user_id: uuid()
      .notNull()
      .references(() => UserTable.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),

    user_sport_level_id: uuid()
      .notNull()
      .references(() => UserSportLevelTable.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),

    rating: integer().notNull(),
    comment: text(),
  },
  (table) => [
    check('rating_range', sql`${table.rating} >= 1 AND ${table.rating} <= 10`),
    sql`UNIQUE(${table.rater_user_id}, ${table.rated_user_id}, ${table.user_sport_level_id})`, // Ensure unique rating per rater, rated user, and sport
  ]
);

// Defines the relationships between the 'user_ratings' table and other tables:
// - `rater`: Establishes a one-to-one relationship, indicating that a user rating entry belongs to one rater user via the 'users' table.
// - `rated`: Establishes a one-to-one relationship, indicating that a user rating entry belongs to one rated user via the 'users' table.
// - `userSportLevel`: Establishes a one-to-one relationship, indicating that a user rating entry belongs to one user sport level via the 'user_sport_levels' table.
export const UserRatingRelations = relations(UserRatingTable, ({ one }) => ({
  rater: one(UserTable, {
    fields: [UserRatingTable.rater_user_id],
    references: [UserTable.id],
  }),
  rated: one(UserTable, {
    fields: [UserRatingTable.rated_user_id],
    references: [UserTable.id],
  }),
  userSportLevel: one(UserSportLevelTable, {
    fields: [UserRatingTable.user_sport_level_id],
    references: [UserSportLevelTable.id],
  }),
}));
