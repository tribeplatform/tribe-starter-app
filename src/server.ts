import App from '@/app';
import HealthRoute from '@routes/health.route';
import WebhookRoute from '@routes/webhook.route';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([new WebhookRoute(), new HealthRoute()]);

app.listen();
