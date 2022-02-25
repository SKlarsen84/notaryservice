import {} from 'dotenv/config'

import cors from 'cors'
import express from 'express'

import { createDataTransfer, lookupTransaction } from './handler.js'

const app = express()
const port = process.env.PORT || 3001

app.use(express.json())
app.use(cors())

//
app.post('/sendnotarytransaction', async (req, res, next) => {
  const { hash, name } = req.body
  const transactionResult = await createDataTransfer(req.body)
  const outcome = transactionResult.result ? `${transactionResult.tx} ` : 'Notary transaction failed'

  res.json({
    name,
    hash,
    txOK: transactionResult.result,
    msg: outcome
  })
})

app.post('/transactionlookup', async (req, res, next) => {
  const lookupResult = await lookupTransaction(req.body.tx)
  res.json(lookupResult)
})

app.listen(port, () => {
  console.log(`Notarizer endpoint listening on port:${port}`)
  console.log(
    `set your extension's notary endpoint to: http://127.0.0.1:${port} in chrome -> extensions -> extension preferences`
  )
})
