const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;
const tasksRoutes = require("./routes/tasksRoutes");

app.use(express.json());
app.use('/tasks', tasksRoutes);
app.use('/', express.static(path.join(__dirname, './public/')));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});