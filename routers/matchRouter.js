import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import pool from '../db.js';

const matchRouter = express.Router();

matchRouter.get('/', expressAsyncHandler(async (req, res) => {

    pool.query('SELECT * FROM matches', function (error, results, fields) {
        // error will be an Error if one occurred during the query
        // results will contain the results of the query
        // fields will contain information about the returned results fields (if any)
        const myObj = results;
       // res.send(myObj.match_id);
      });


    //res.send('veja bem');
})
);

export default matchRouter;