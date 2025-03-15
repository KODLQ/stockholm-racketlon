CREATE TYPE "public"."club_member_role" AS ENUM('member', 'admin', 'owner');--> statement-breakpoint
CREATE TYPE "public"."court_type" AS ENUM('tennis', 'squash', 'tabletennis', 'badminton', 'padel');--> statement-breakpoint
CREATE TYPE "public"."ladder_type" AS ENUM('racketlon', 'tennis', 'squash', 'tabletennis', 'badminton', 'padel');--> statement-breakpoint
CREATE TYPE "public"."challenge_status" AS ENUM('pending', 'accepted', 'rejected', 'completed');--> statement-breakpoint
CREATE TYPE "public"."match_status" AS ENUM('scheduled', 'in_progress', 'completed', 'draw', 'abandoned');--> statement-breakpoint
CREATE TYPE "public"."match_type" AS ENUM('racketlon', 'tennis', 'squash', 'table tennis', 'badminton', 'padel');--> statement-breakpoint
CREATE TYPE "public"."tournament_type" AS ENUM('singles', 'doubles', 'team');--> statement-breakpoint
CREATE TYPE "public"."stage_type" AS ENUM('group', 'knockout');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('user', 'admin');--> statement-breakpoint
CREATE TYPE "public"."activity_type" AS ENUM('login', 'logout', 'match_created', 'match_updated', 'profile_update', 'team_join', 'team_leave', 'ladder_challenge', 'ladder_match_result', 'other');--> statement-breakpoint
CREATE TYPE "public"."sport_type" AS ENUM('racketlon', 'tennis', 'tabletennis', 'squash', 'badminton', 'padel');--> statement-breakpoint
CREATE TABLE "clubs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	"club_name" text NOT NULL,
	"club_description" text,
	"club_address" text,
	"club_contact_email" text,
	"club_contact_phone" text
);
--> statement-breakpoint
CREATE TABLE "club_members" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	"user_id" uuid NOT NULL,
	"club_id" uuid NOT NULL,
	"club_member_role" "club_member_role" DEFAULT 'member' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "courts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	"court_name" text NOT NULL,
	"court_description" text NOT NULL,
	"court_type" "court_type" DEFAULT 'tennis' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	"club_id" uuid NOT NULL,
	"event_name" text NOT NULL,
	"event_description" text,
	"event_start_time" timestamp with time zone NOT NULL,
	"event_end_time" timestamp with time zone,
	"location" text,
	"image_url" text
);
--> statement-breakpoint
CREATE TABLE "group_stage_settings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	"tournament_stage_id" uuid NOT NULL,
	"group_size" integer NOT NULL,
	"points_for_win" integer NOT NULL,
	"points_for_draw" integer NOT NULL,
	"points_for_loss" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "guest_user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	"guest_name" text NOT NULL,
	"guest_emamil" text,
	"guest_phone" text
);
--> statement-breakpoint
CREATE TABLE "knockout_stage_settings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	"tournament_stage_id" uuid NOT NULL,
	"number_of_rounds" integer NOT NULL,
	"is_winner_bracket" boolean,
	"is_loser_bracket" boolean
);
--> statement-breakpoint
CREATE TABLE "ladders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	"start_date" timestamp with time zone NOT NULL,
	"end_date" timestamp with time zone NOT NULL,
	"club_id" uuid NOT NULL,
	"ladder_name" text NOT NULL,
	"ladder_description" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "elo_rating_history" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"ladder_team_id" uuid NOT NULL,
	"elo_rating" integer NOT NULL,
	"effective_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ladder_matches" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	"ladder_id" uuid NOT NULL,
	"match_id" uuid NOT NULL,
	"challenger_team_id" uuid NOT NULL,
	"challenged_team_id" uuid NOT NULL,
	"court_id" uuid NOT NULL,
	"challenge_status" "challenge_status" DEFAULT 'pending' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ladder_position_history" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"ladder_team_id" uuid NOT NULL,
	"ladder_position" integer NOT NULL,
	"effective_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ladder_teams" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	"ladder_id" uuid NOT NULL,
	"team_id" uuid NOT NULL,
	"ladder_position" integer NOT NULL,
	"elo_rating" integer DEFAULT 1000
);
--> statement-breakpoint
CREATE TABLE "matches" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	"scheduled_start_time" timestamp with time zone NOT NULL,
	"scheduled_end_time" timestamp with time zone NOT NULL,
	"match_type" "match_type" DEFAULT 'racketlon' NOT NULL,
	"match_description" text,
	"winner_id" uuid,
	"loser_id" uuid,
	"match_status" "match_status" DEFAULT 'scheduled' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "match_team" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	"match_id" uuid NOT NULL,
	"team_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	"set_number" integer,
	"team1_score" integer,
	"team2_score" integer,
	"match_id" uuid NOT NULL,
	"winner_id" uuid NOT NULL,
	"loser_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "stadium" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	"stadium_name" text NOT NULL,
	"stadium_description" text NOT NULL,
	"stadium_adress" text NOT NULL,
	"stadium_city" text NOT NULL,
	"stadium_country" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "teams" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"team_name" text NOT NULL,
	"team_leader" uuid NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "team_members" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	"team_id" uuid,
	"user_id" uuid,
	"guest_id" uuid,
	CONSTRAINT "check_user_or_guest" CHECK (("team_members"."user_id" IS NOT NULL AND "team_members"."guest_id" IS NULL) OR ("team_members"."user_id" IS NULL AND "team_members"."guest_id" IS NOT NULL))
);
--> statement-breakpoint
CREATE TABLE "tournaments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	"tournament_name" text NOT NULL,
	"start_date" timestamp with time zone NOT NULL,
	"end_date" timestamp with time zone,
	"description" text,
	"tournament_team_size" integer NOT NULL,
	"tournament_type" "tournament_type" DEFAULT 'singles' NOT NULL,
	"club_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tournament_matches" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	"tournament_id" uuid NOT NULL,
	"stage_id" uuid NOT NULL,
	"match_number" integer NOT NULL,
	"team1_id" uuid NOT NULL,
	"team2_id" uuid NOT NULL,
	"match_id" uuid NOT NULL,
	"court_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tournament_stages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	"tournament_id" uuid NOT NULL,
	"tournament_stage_name" text NOT NULL,
	"tournament_stage_order" integer NOT NULL,
	"stage_type" "stage_type" DEFAULT 'knockout' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tournament_teams" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	"tournament_id" uuid NOT NULL,
	"team_id" uuid NOT NULL,
	"seed" integer
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	"deletedAt" timestamp with time zone,
	"user_email" text NOT NULL,
	"user_name" text NOT NULL,
	"user_date_of_birth" text,
	"user_phone" text,
	"user_city" text,
	"user_role" "user_role" DEFAULT 'user' NOT NULL,
	"user_profile_picture_url" text
);
--> statement-breakpoint
CREATE TABLE "user_activities" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	"user_id" uuid NOT NULL,
	"activity_type" "activity_type" NOT NULL,
	"activity_timestamp" timestamp with time zone DEFAULT now() NOT NULL,
	"details" text
);
--> statement-breakpoint
CREATE TABLE "user_ratings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	"rater_user_id" uuid NOT NULL,
	"rated_user_id" uuid NOT NULL,
	"user_sport_level_id" uuid NOT NULL,
	"rating" integer NOT NULL,
	"comment" text,
	CONSTRAINT "rating_range" CHECK ("user_ratings"."rating" >= 1 AND "user_ratings"."rating" <= 10)
);
--> statement-breakpoint
CREATE TABLE "user_sport_levels" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	"user_id" uuid NOT NULL,
	"sport_type" "sport_type" NOT NULL,
	"skill_level" numeric(3, 2) DEFAULT 5.0 NOT NULL,
	CONSTRAINT "skill_level_range" CHECK ("user_sport_levels"."skill_level" >= 1 AND "user_sport_levels"."skill_level" <= 10)
);
--> statement-breakpoint
ALTER TABLE "club_members" ADD CONSTRAINT "club_members_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "club_members" ADD CONSTRAINT "club_members_club_id_clubs_id_fk" FOREIGN KEY ("club_id") REFERENCES "public"."clubs"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_club_id_clubs_id_fk" FOREIGN KEY ("club_id") REFERENCES "public"."clubs"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "group_stage_settings" ADD CONSTRAINT "group_stage_settings_tournament_stage_id_tournament_stages_id_fk" FOREIGN KEY ("tournament_stage_id") REFERENCES "public"."tournament_stages"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "knockout_stage_settings" ADD CONSTRAINT "knockout_stage_settings_tournament_stage_id_tournament_stages_id_fk" FOREIGN KEY ("tournament_stage_id") REFERENCES "public"."tournament_stages"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "ladders" ADD CONSTRAINT "ladders_club_id_clubs_id_fk" FOREIGN KEY ("club_id") REFERENCES "public"."clubs"("id") ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE "elo_rating_history" ADD CONSTRAINT "elo_rating_history_ladder_team_id_ladder_teams_id_fk" FOREIGN KEY ("ladder_team_id") REFERENCES "public"."ladder_teams"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "ladder_matches" ADD CONSTRAINT "ladder_matches_ladder_id_ladders_id_fk" FOREIGN KEY ("ladder_id") REFERENCES "public"."ladders"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "ladder_matches" ADD CONSTRAINT "ladder_matches_match_id_matches_id_fk" FOREIGN KEY ("match_id") REFERENCES "public"."matches"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "ladder_matches" ADD CONSTRAINT "ladder_matches_challenger_team_id_ladder_teams_id_fk" FOREIGN KEY ("challenger_team_id") REFERENCES "public"."ladder_teams"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "ladder_matches" ADD CONSTRAINT "ladder_matches_challenged_team_id_ladder_teams_id_fk" FOREIGN KEY ("challenged_team_id") REFERENCES "public"."ladder_teams"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "ladder_matches" ADD CONSTRAINT "ladder_matches_court_id_courts_id_fk" FOREIGN KEY ("court_id") REFERENCES "public"."courts"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "ladder_position_history" ADD CONSTRAINT "ladder_position_history_ladder_team_id_ladder_teams_id_fk" FOREIGN KEY ("ladder_team_id") REFERENCES "public"."ladder_teams"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "ladder_teams" ADD CONSTRAINT "ladder_teams_ladder_id_ladders_id_fk" FOREIGN KEY ("ladder_id") REFERENCES "public"."ladders"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "ladder_teams" ADD CONSTRAINT "ladder_teams_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "matches" ADD CONSTRAINT "matches_winner_id_teams_id_fk" FOREIGN KEY ("winner_id") REFERENCES "public"."teams"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "matches" ADD CONSTRAINT "matches_loser_id_teams_id_fk" FOREIGN KEY ("loser_id") REFERENCES "public"."teams"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "match_team" ADD CONSTRAINT "match_team_match_id_matches_id_fk" FOREIGN KEY ("match_id") REFERENCES "public"."matches"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "match_team" ADD CONSTRAINT "match_team_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "sets" ADD CONSTRAINT "sets_match_id_matches_id_fk" FOREIGN KEY ("match_id") REFERENCES "public"."matches"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "sets" ADD CONSTRAINT "sets_winner_id_teams_id_fk" FOREIGN KEY ("winner_id") REFERENCES "public"."teams"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "sets" ADD CONSTRAINT "sets_loser_id_teams_id_fk" FOREIGN KEY ("loser_id") REFERENCES "public"."teams"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "teams" ADD CONSTRAINT "teams_team_leader_users_id_fk" FOREIGN KEY ("team_leader") REFERENCES "public"."users"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "team_members" ADD CONSTRAINT "team_members_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "team_members" ADD CONSTRAINT "team_members_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "team_members" ADD CONSTRAINT "team_members_guest_id_guest_user_id_fk" FOREIGN KEY ("guest_id") REFERENCES "public"."guest_user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "tournaments" ADD CONSTRAINT "tournaments_club_id_clubs_id_fk" FOREIGN KEY ("club_id") REFERENCES "public"."clubs"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "tournament_matches" ADD CONSTRAINT "tournament_matches_tournament_id_tournaments_id_fk" FOREIGN KEY ("tournament_id") REFERENCES "public"."tournaments"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "tournament_matches" ADD CONSTRAINT "tournament_matches_stage_id_tournament_stages_id_fk" FOREIGN KEY ("stage_id") REFERENCES "public"."tournament_stages"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "tournament_matches" ADD CONSTRAINT "tournament_matches_team1_id_tournament_teams_id_fk" FOREIGN KEY ("team1_id") REFERENCES "public"."tournament_teams"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "tournament_matches" ADD CONSTRAINT "tournament_matches_team2_id_tournament_teams_id_fk" FOREIGN KEY ("team2_id") REFERENCES "public"."tournament_teams"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "tournament_matches" ADD CONSTRAINT "tournament_matches_match_id_matches_id_fk" FOREIGN KEY ("match_id") REFERENCES "public"."matches"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "tournament_matches" ADD CONSTRAINT "tournament_matches_court_id_courts_id_fk" FOREIGN KEY ("court_id") REFERENCES "public"."courts"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "tournament_stages" ADD CONSTRAINT "tournament_stages_tournament_id_tournaments_id_fk" FOREIGN KEY ("tournament_id") REFERENCES "public"."tournaments"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "tournament_teams" ADD CONSTRAINT "tournament_teams_tournament_id_tournaments_id_fk" FOREIGN KEY ("tournament_id") REFERENCES "public"."tournaments"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "tournament_teams" ADD CONSTRAINT "tournament_teams_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "user_activities" ADD CONSTRAINT "user_activities_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "user_ratings" ADD CONSTRAINT "user_ratings_rater_user_id_users_id_fk" FOREIGN KEY ("rater_user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "user_ratings" ADD CONSTRAINT "user_ratings_rated_user_id_users_id_fk" FOREIGN KEY ("rated_user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "user_ratings" ADD CONSTRAINT "user_ratings_user_sport_level_id_user_sport_levels_id_fk" FOREIGN KEY ("user_sport_level_id") REFERENCES "public"."user_sport_levels"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "user_sport_levels" ADD CONSTRAINT "user_sport_levels_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;