import { Migration } from '@mikro-orm/migrations';

export class Migration20250731151022_CreatePatternGameTables extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "game_rooms" ("id" varchar(255) not null, "host_player_id" varchar(255) not null, "guest_player_id" varchar(255) null, "mode" varchar(255) not null default 'pvp', "status" varchar(255) not null default 'waiting', "phase" varchar(255) not null default 'mulligan', "current_turn" varchar(255) not null, "turn_number" int not null default 1, "turn_timer" int null, "game_state" jsonb not null, "game_settings" jsonb null, "winner_id" varchar(255) null, "win_condition" varchar(255) null, "battle_result" jsonb null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "completed_at" timestamptz null, constraint "game_rooms_pkey" primary key ("id"));`);

    this.addSql(`create table "game_actions" ("id" varchar(255) not null, "created_at" timestamptz null, "updated_at" timestamptz null, "game_room_id" varchar(255) not null, "player_id" varchar(255) not null, "action_type" varchar(255) not null, "action_data" jsonb not null, "turn_number" int not null, "action_sequence" int not null, "timestamp" timestamptz not null, "result" jsonb null, constraint "game_actions_pkey" primary key ("id"));`);

    this.addSql(`create table "player_stats" ("id" varchar(255) not null, "user_id" varchar(255) not null, "level" int not null default 1, "experience" int not null default 0, "experience_to_next_level" int not null default 100, "wins" int not null default 0, "losses" int not null default 0, "draws" int not null default 0, "total_games" int not null default 0, "win_rate" int not null default 0, "current_rank" varchar(255) not null default 'Bronze', "rank_points" int not null default 0, "currency" jsonb not null, "unlocked_patterns" jsonb not null, "achievements" jsonb not null, "statistics" jsonb null, "last_active_at" timestamptz not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, constraint "player_stats_pkey" primary key ("id"));`);

    this.addSql(`alter table "game_actions" add constraint "game_actions_game_room_id_foreign" foreign key ("game_room_id") references "game_rooms" ("id") on update cascade;`);

    // Add indexes for better performance
    this.addSql(`CREATE INDEX idx_player_stats_user_id ON player_stats(user_id);`);
    this.addSql(`CREATE INDEX idx_player_stats_level ON player_stats(level DESC);`);
    this.addSql(`CREATE INDEX idx_player_stats_win_rate ON player_stats(win_rate DESC);`);
    
    this.addSql(`CREATE INDEX idx_game_rooms_host_player ON game_rooms(host_player_id);`);
    this.addSql(`CREATE INDEX idx_game_rooms_guest_player ON game_rooms(guest_player_id);`);
    this.addSql(`CREATE INDEX idx_game_rooms_status ON game_rooms(status);`);
    this.addSql(`CREATE INDEX idx_game_rooms_created_at ON game_rooms(created_at);`);
    
    this.addSql(`CREATE INDEX idx_game_actions_game_room ON game_actions(game_room_id);`);
    this.addSql(`CREATE INDEX idx_game_actions_player ON game_actions(player_id);`);
    this.addSql(`CREATE INDEX idx_game_actions_turn ON game_actions(turn_number, action_sequence);`);

    this.addSql(`alter table "knowledge_base_items" alter column "tags" type text[] using ("tags"::text[]);`);
    this.addSql(`alter table "knowledge_base_items" alter column "tags" set default '{}';`);
    this.addSql(`alter table "knowledge_base_items" alter column "tags" set not null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "knowledge_base_items" alter column "tags" drop default;`);
    this.addSql(`alter table "knowledge_base_items" alter column "tags" type simple-array using ("tags"::simple-array);`);
    this.addSql(`alter table "knowledge_base_items" alter column "tags" drop not null;`);
  }

}
