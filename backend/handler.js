import * as ed from "noble-ed25519";
import {
  AccountAddress,
  AccountTransactionType,
  ConcordiumNodeClient,
  DataBlob,
  TransactionExpiry,
  getAccountTransactionHash,
  getAccountTransactionSignDigest,
} from "@concordium/node-sdk";
import { Buffer } from "buffer/index.js";
import { credentials, Metadata } from "@grpc/grpc-js";

function getNodeClient() {
  const metadata = new Metadata();
  metadata.add("authentication", "rpcadmin");
  return new ConcordiumNodeClient(
    process.env.NODE_ADDRESS,
    10000,
    credentials.createInsecure(),
    metadata,
    15000
  );
}

export const createDataTransfer = async (req) => {
  const client = getNodeClient();
  const sender = new AccountAddress(process.env.SENDER_ACCOUNT);
  const nextAccountNonce = await client.getNextAccountNonce(sender);

  if (!nextAccountNonce) {
    throw new Error("Nonce not found!");
  }

  const header = {
    expiry: new TransactionExpiry(new Date(Date.now() + 3600000)),
    nonce: nextAccountNonce.nonce, // the next nonce for this account, can be found using getNextAccountNonce
    sender,
  };

  const payload = {
    data: new DataBlob(Buffer.from(req.hash, "hex")), // Add the bytes you wish to register as a DataBlob
  };

  const registerDataTransaction = {
    header: header,
    payload: payload,
    type: AccountTransactionType.RegisterData,
  };

  const privateKey = process.env.ACCOUNT_SIGN_KEY;

  const hashToSign = getAccountTransactionSignDigest(registerDataTransaction);
  const signature = Buffer.from(await ed.sign(hashToSign, privateKey)).toString(
    "hex"
  );

  const signatures = {
    0: {
      0: signature,
    },
  };

  const result = await client.sendAccountTransaction(
    registerDataTransaction,
    signatures
  );
  const transactionHash = getAccountTransactionHash(
    registerDataTransaction,
    signatures
  );

  return { result: result, tx: transactionHash };
};
