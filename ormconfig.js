module.exports = {
  type: 'mysql',
  host: 'localhost',
  port: 1412,
  username: 'root',
  password: 'root',
  database: 'ticket_management',
  synchronize: false,
  logging: false,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/db/migrations/*{.js,.ts}'],
  cli: {
    migrationsDir: 'src/db/migrations',
  },
};
