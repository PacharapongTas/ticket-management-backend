module.exports = {
  type: 'mysql',
  host: 'localhost',
  username: 'root',
  password: 'root',
  database: 'ticket_management',
  synchronize: false,
  entities: ['src/**/**.entity{.ts,.js}'],
  migrations: ['src/db/migrations/*{.js,.ts}'],
  cli: { migrationsDir: 'src/db/migrations' },
};
