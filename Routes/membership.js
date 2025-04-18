import express from 'express';
import { addMembership,getMembership } from '../Controllers/membership.js';
import auth from '../Auth/auth.js';

const packs = express.Router();

packs.post('/addMembership',auth,addMembership);
packs.get('/getMembership',auth,getMembership);
export default packs;