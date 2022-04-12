import App from '@/app';
import HealthRoute from '@routes/health.route';
import IndexRoute from '@routes/index.route';
import WebhookRoute from '@/routes/webhook.route';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App({
  client: [new IndexRoute(), new HealthRoute()],
  server: [new WebhookRoute()],
});

app.listen();
