import express from 'express';
import colors from 'colors';

const app = express();

//Dynamic Port Connection
let port = 4000;
if (port == null || port == '') {
  port = 4000;
}

app.listen(port, console.log(`Server running on ${port}`.cyan.underline));
