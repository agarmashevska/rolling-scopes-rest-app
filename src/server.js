const { PORT } = require('./common/config');
const app = require('./app');
const { connectMongoDB } = require('./db/db');

connectMongoDB(() => {
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
});
