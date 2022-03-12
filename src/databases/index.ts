import { DB_HOST } from '@config';

export const dbConnection = {
  url: DB_HOST,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
};
