import { relations } from 'drizzle-orm';
import { pgTable, uuid } from 'drizzle-orm/pg-core';
import { createdAt, id, updatedAt } from '../schemaHelper';
import { TeamTable } from './team';
import { UserTable } from './user';
import { GuestUserTable } from './guestUser';

export const TeamMemberTable = pgTable('team_members', {
  id,
  team_id: uuid().references(() => TeamTable.id),
  user_id: uuid().references(() => UserTable.id),
  guest_id: uuid().references(() => GuestUserTable.id),

  createdAt,
  updatedAt,
});

// A team member is in one team, can be either a User or a GuestUser
export const TeamMemberRelationships = relations(
  TeamMemberTable,
  ({ one }) => ({
    team: one(TeamTable, {
      fields: [TeamMemberTable.team_id],
      references: [TeamTable.id],
    }),
    member: one(UserTable, {
      fields: [TeamMemberTable.user_id],
      references: [UserTable.id],
    }),
    guest: one(GuestUserTable, {
      fields: [TeamMemberTable.guest_id],
      references: [GuestUserTable.id],
    }),
  })
);
