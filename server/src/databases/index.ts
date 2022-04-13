import { DB_HOST } from '@config';

export const dbConnection = DB_HOST && {
  url: DB_HOST,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
};
