import { pgEnum, pgTable, text, timestamp, integer } from "drizzle-orm/pg-core"
import { createdAt, id, updatedAt } from "../schemaHelper"

export const userRoles = ["user", "admin"] as const
export type UserRole = (typeof userRoles)[number]
export const userRoleEnum = pgEnum("user_role", userRoles)

export const UserTable = pgTable("users", {
  id,
  user_email: text().notNull(),
  user_name: text().notNull(),
  user_date_of_birth: text(),  
  user_phone: text(),
  user_city: text(),
  user_role: userRoleEnum().notNull().default("user"),
  user_profile_picture: text(),
  user_tennis_level: integer,
  user_tabletennis_level: integer,
  user_squash_level: integer,
  user_badminton_level: integer,
  user_padel_level: integer,
  createdAt,
  updatedAt,
})
