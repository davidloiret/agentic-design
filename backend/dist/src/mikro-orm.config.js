"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const postgresql_1 = require("@mikro-orm/postgresql");
const reflection_1 = require("@mikro-orm/reflection");
const sql_highlighter_1 = require("@mikro-orm/sql-highlighter");
const common_1 = require("@nestjs/common");
const dotenv = require("dotenv");
dotenv.config();
const logger = new common_1.Logger('MikroORM');
exports.default = (0, postgresql_1.defineConfig)({
    entities: ['dist/**/*.entity.js'],
    entitiesTs: ['src/**/*.entity.ts'],
    clientUrl: process.env.DATABASE_URL,
    dbName: process.env.DB_NAME || 'postgres',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    schema: 'public',
    driverOptions: {
        connection: {
            ssl: process.env.NODE_ENV === 'production' || process.env.DB_HOST?.includes('supabase.com')
                ? { rejectUnauthorized: false }
                : false,
            connectionTimeoutMillis: 10000,
            query_timeout: 10000,
            application_name: 'agentic-design-backend',
        },
    },
    debug: process.env.NODE_ENV !== 'production',
    logger: logger.log.bind(logger),
    highlighter: new sql_highlighter_1.SqlHighlighter(),
    metadataProvider: reflection_1.TsMorphMetadataProvider,
    migrations: {
        path: './dist/migrations',
        pathTs: './src/migrations',
        tableName: 'mikro_orm_migrations',
        transactional: true,
        disableForeignKeys: false,
        allOrNothing: true,
        dropTables: false,
        safe: true,
        emit: 'ts',
    },
    seeder: {
        path: './dist/seeders',
        pathTs: './src/seeders',
    },
    allowGlobalContext: true,
    schemaGenerator: {
        createForeignKeyConstraints: true,
        disableForeignKeys: false,
        ignoreSchema: ['auth', 'storage', 'realtime', 'supabase_migrations', 'vault'],
    },
    pool: {
        min: 1,
        max: 5,
        acquireTimeoutMillis: 10000,
        createTimeoutMillis: 10000,
        destroyTimeoutMillis: 5000,
        idleTimeoutMillis: 30000,
        reapIntervalMillis: 1000,
        createRetryIntervalMillis: 200,
    },
});
//# sourceMappingURL=mikro-orm.config.js.map