import DataSource from '@joseaburt/mysql2-query-builder';

export const defaultDatasource = DataSource.createDataSource({
  port: 3306,
  password: '',
  user: 'root',
  database: 'test',
  host: 'localhost',
});
