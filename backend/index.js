import {} from 'dotenv/config'
import express from 'express';
import cors from 'cors'
const app = express();
const port = process.env.PORT || 3001;
import {createDataTransfer, lookupTransaction} from './handler.js'
app.use(express.json());
app.use(cors());

//
app.post("/notaryService", async (req, res, next) => {
  const { hash, name } = req.body
  const transactionResult = (await createDataTransfer(req.body))
  const outcome = transactionResult.result ? `${transactionResult.tx} ` : 'Notary transaction failed'

  res.json({ 
    name,
    hash,
    txOK: transactionResult.result,
    msg: outcome
  })
});

app.get("/txLookup", async (req, res, next) => {
  // const { txHash } = req.body
  const lookupResult = (await lookupTransaction())
  console.log(lookupResult)
  res.json(lookupResult)
});

app.listen(port, () => {
  console.log(`Notarizer endpoint listening on port:${port}`);
  console.log(`set your extension's notary endpoint to: http://127.0.0.1:${port}`)
});
