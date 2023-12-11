import { handler } from './build/handler.js';
import express from 'express';

const app = express();

app.use('/images', express.static('static/images'));

// let SvelteKit handle everything else, including serving prerendered pages and static assets
app.use(handler);

app.listen(3000, () => console.log('listening on port 3000'));
