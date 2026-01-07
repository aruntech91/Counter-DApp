/* eslint-disable */
import React, { useState } from "react";
import { ccc } from "@ckb-ccc/connector-react";
// import { ClientPublicTestnet } from "@ckb-ccc/connector-react";
import CKB from "@nervosnetwork/ckb-sdk-core";

const ckb = new CKB("https://testnet.ckb.dev");
const EXPLORER = "https://pudge.explorer.nervos.org/transaction/";

const Counter: React.FC = () => {
  const signer = ccc.useSigner();
const { client } = ccc.useCcc();


const [loading, setLoading] = useState(false);

  const [counter, setCounter] = useState<number | null>(null);
  const [txHash, setTxHash] = useState<string>("");
  const [outPoint, setOutPoint] = useState<{ txHash: string; index: string } | null>(null);
  const [cellCapacity, setCellCapacity] = useState(200);

React.useEffect(() => {
  const saved = localStorage.getItem("counterOutPoint");

  if (saved) {
    setOutPoint(JSON.parse(saved));
  }
}, []);



  // -----------------------------
  // 1️⃣ CREATE COUNTER CELL
  // -----------------------------
  const createCounter = async () => {
    if (!signer) return;

    const { script: lock } = await signer.getRecommendedAddressObj();

    // Counter = 0 (u64 LE)
    const dataBytes = new Uint8Array(8);
    new DataView(dataBytes.buffer).setBigUint64(0, BigInt(0), true);

    const tx = ccc.Transaction.from({
      outputs: [
        { lock, capacity: ccc.fixedPointFrom(cellCapacity) }
      ],
      outputsData: [dataBytes]
    });

    try {
      await tx.completeInputsByCapacity(signer);
      await tx.completeFeeBy(signer);

      setLoading(true);
const hash = await signer.sendTransaction(tx);
const savedOutPoint = {
  txHash: hash,
  index: "0x0",
};

localStorage.setItem(
  "counterOutPoint",
  JSON.stringify(savedOutPoint)
);

setOutPoint(savedOutPoint);


setLoading(false);

      setCounter(0);
    } catch (err) {
      console.error(err);
      alert("Failed to create counter cell: " + (err as Error).message);
    }
  };

  // -----------------------------
  // 2️⃣ INCREMENT COUNTER
  // -----------------------------
  const incrementCounter = async () => {
    if (!signer || !outPoint || counter === null) return;

    const newValue = counter + 1;

    const { script: lock } = await signer.getRecommendedAddressObj();

    const dataBytes = new Uint8Array(8);
    new DataView(dataBytes.buffer).setBigUint64(0, BigInt(newValue), true);

    const tx = ccc.Transaction.from({
      inputs: [{ previousOutput: outPoint }],
      outputs: [{ lock, capacity: ccc.fixedPointFrom(cellCapacity) }],
      outputsData: [dataBytes]
    });

    try {
      await tx.completeFeeBy(signer);
      const hash = await signer.sendTransaction(tx);
      const savedOutPoint = {
  txHash: hash,
  index: "0x0",
};

localStorage.setItem(
  "counterOutPoint",
  JSON.stringify(savedOutPoint)
);

setOutPoint(savedOutPoint);
      setTxHash(hash);
      setCounter(newValue);
    } catch (err) {
      console.error(err);
      alert("Failed to increment counter: " + (err as Error).message);
    }
  };

  // load counter
const loadCounterFromChain = async () => {
  if (!outPoint) return;

  const result = await ckb.rpc.getLiveCell(
    {
      txHash: outPoint.txHash,
      index: outPoint.index,
    },
    true
  );

  if (!result || !result.cell || !result.cell.data) return;

  const hex = result.cell.data.content.replace("0x", "");
  const value = parseInt(hex, 16);

  setCounter(value);
};

React.useEffect(() => {
  loadCounterFromChain();
}, [outPoint]);


React.useEffect(() => {
  if (outPoint) {
    loadCounterFromChain();
  }
}, [outPoint]);



  return (
    <div style={{ padding: 16, border: "1px solid #444" }}>
      

      {!signer && <p className="text-red-900">Please connect your wallet above.</p>}

      

      {signer && counter === null && (
<button className="border rounded px-2 bg-blue-800 hover:bg-blue-900" disabled={loading} onClick={createCounter}>
  {loading ? "Creating..." : "Create Counter Cell"}
</button>
      )}

      {signer && counter !== null && (
        <>
          <p className="text-2xl">Counter Value: {counter}</p>
<div className="mt-4 ml-16">
<button className="border rounded px-2 bg-blue-800 hover:bg-blue-900" disabled={loading} onClick={incrementCounter}>
  {loading ? "Incrementing..." : "Increment"}
</button>
</div>
        </>
      )}

      {txHash && (
  <p className="mt-4">
    Tx Hash:{" "}
    <a className="text-red-400 underline"
      href={`${EXPLORER}${txHash}`}
      target="_blank"
      rel="noreferrer"
    >
      View on Explorer
    </a>
  </p>
)}

    </div>
  );
};

export default Counter;
