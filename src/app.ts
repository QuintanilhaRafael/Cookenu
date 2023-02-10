import express from 'express'
import cors from 'cors'
import { AddressInfo } from 'net'

export const app = express()

app.use(express.json())
app.use(cors())

const server = app.listen(3003, () => {
  if (server) {
     const address = server.address() as AddressInfo;
     console.log(`Server is running on port ${address.port}`);
  } else {
     console.error(`Failure upon starting server.`);
  }
})