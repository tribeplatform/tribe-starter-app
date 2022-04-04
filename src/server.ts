import App from '@/app';
import IndexRoute from '@routes/index.route';
import AppRoute from '@routes/app.route';
import HealthRoute from '@routes/health.route';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App({
  client: [new IndexRoute(), new HealthRoute()],
  server: [new AppRoute()],
});

app.listen();
