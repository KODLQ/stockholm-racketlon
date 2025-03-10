import { relations } from 'drizzle-orm';
import { pgTable, text, pgEnum, timestamp, uuid } from 'drizzle-orm/pg-core';
import { createdAt, id, updatedAt } from '../schemaHelper';
import { ClubTable } from './club';
import { LadderTeamTable } from './ladderTeam';
import { LadderMatchTable } from './ladderMatch';

// Defines the database schema for the 'ladders' table and its relationships.

export const ladderType = [
  'racketlon',
  'tennis',
  'squash',
  'tabletennis',
  'badminton',
  'padel',
] as const;
export type Ladder = (typeof ladderType)[number];
export const ladderTypeEnum = pgEnum('ladder_type', ladderType);

// Defines the 'ladders' table with columns for ladder information.
export const LadderTable = pgTable('ladders', {
  id,
  createdAt,
  updatedAt,

  start_date: timestamp({ withTimezone: true }).notNull(),
  end_date: timestamp({ withTimezone: true }).notNull(),
  club_id: uuid()
    .notNull()
    .references(() => ClubTable.id, {
      onDelete: 'restrict',
      onUpdate: 'restrict',
    }), // Added onDelete and onUpdate
  ladder_name: text().notNull(),
  ladder_description: text().notNull(),
});

// Defines the relationships between the 'ladders' table and other tables:
// - `club`: Establishes a one-to-one relationship, indicating that a ladder belongs to one club via the 'clubs' table.
// - `ladder_teams`: Establishes a one-to-many relationship, indicating that a ladder can have multiple teams participating in it via the 'ladderTeams' table.
// - `ladder_matches`: Establishes a one-to-many relationship, indicating that a ladder can have multiple matches associated with it via the 'ladderMatches' table.
export const LadderRelationships = relations(LadderTable, ({ one, many }) => ({
  club: one(ClubTable, {
    fields: [LadderTable.club_id],
    references: [ClubTable.id],
  }),
  ladder_teams: many(LadderTeamTable),
  ladder_matches: many(LadderMatchTable),
}));
