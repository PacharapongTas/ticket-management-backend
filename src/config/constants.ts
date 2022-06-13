// config
export const SERVER_PORT =
  (process.env.SERVER_PORT as unknown as number) || 2538;
export const DATABASE_TYPE = 'mysql';
export const DATABASE_HOST = process.env.DB_HOST || 'localhost';
export const DB_PORT = (process.env.DB_PORT as unknown as number) || 1412;
export const DATABASE_USERNAME = process.env.DB_USERNAME || 'root';
export const DATABASE_PASSWORD = process.env.DB_PASSWORD || 'root';
export const DATABASE_NAME = process.env.DB_NAME || 'ticket_management';
