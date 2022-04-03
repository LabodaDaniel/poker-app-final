import express from 'express';

import  findStrongest  from './findStrongest.js';
import  findEnemyStrongest  from './findEnemyStrongest.js';

const router = express.Router();
router.post('/mystrongest', (req, res, next) => {
    let cards = req.body;
    res.setHeader("Content-Type", "application/json")
    res.json(findStrongest(cards)).send();
});

router.post('/enemystrongest', (req, res, next) => {
    let cards = req.body;
    res.setHeader("Content-Type", "application/json")
    res.json(findEnemyStrongest(cards));
});

export default router;