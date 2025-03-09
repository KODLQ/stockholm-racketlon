import { relations } from 'drizzle-orm';
import { pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { createdAt, id, updatedAt } from '../schemaHelper';
import { UserTable } from './user';
import { TeamMemberTable } from './teamMember';

export const TeamTable = pgTable('teams', {
  id,

  team_name: text().notNull(),
  team_leader: uuid()
    .notNull()
    .references(() => UserTable.id),

  createdAt,
  updatedAt,
});

// A team can have many team members, one team leader
export const TeamRelationships = relations(TeamTable, ({ many, one }) => ({
  team_members: many(TeamMemberTable),
  //many matches
  team_leader: one(UserTable, {
    fields: [TeamTable.team_leader],
    references: [UserTable.id],
  }),
}));
