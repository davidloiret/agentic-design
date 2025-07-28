"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20250728091723 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20250728091723 extends migrations_1.Migration {
    async up() {
        this.addSql(`create table "users" ("id" varchar(255) not null, "created_at" timestamptz null, "updated_at" timestamptz null, "email" varchar(255) not null, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "supabase_id" varchar(255) null, constraint "users_pkey" primary key ("id"));`);
        this.addSql(`alter table "users" add constraint "users_email_unique" unique ("email");`);
    }
}
exports.Migration20250728091723 = Migration20250728091723;
//# sourceMappingURL=Migration20250728091723.js.map