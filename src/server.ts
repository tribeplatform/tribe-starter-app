import App from '@/app';
import IndexRoute from '@routes/index.route';
import HealthRoute from '@routes/health.route';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([new IndexRoute(), new HealthRoute()]);

app.listen();
