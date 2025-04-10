import { MikroORM } from '@mikro-orm/core';
import { MySqlDriver } from '@mikro-orm/mysql';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
export const orm = await MikroORM.init({
    entities: ['Back-End/dist/**/*.entity.js'],
    entitiesTs: ['Back-End/src/**/*.entity.ts'],
    dbName: 'club_deportes',
    driver: MySqlDriver,
    clientUrl: 'mysql://dsw:dsw@localhost:3306/club-deportes',
    highlighter: new SqlHighlighter(),
    debug: true,
    schemaGenerator: {
        //never in production
        disableForeignKeys: true,
        createForeignKeyConstraints: true,
        ignoreSchema: [],
    },
});
export const syncSchema = async () => {
    const generator = orm.getSchemaGenerator();
    /*
    await generator.dropSchema()
    await generator.createSchema()
    */
    await generator.updateSchema();
};
//# sourceMappingURL=orm.js.map