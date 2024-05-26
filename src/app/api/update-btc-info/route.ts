import { firebaseApp } from "@/lib/firebase";

export const runtime = 'nodejs';

export async function GET() {
  const resBtcPrice = await fetch(
    "https://blockchain.info/ticker",
    {
      cache: "no-store"
    }
  );
  const price = await resBtcPrice.json();

  const resBlockInfo = await fetch(
    "https://blockchain.info/latestblock",
    {
      cache: "no-store"
    }
  );
  const blockInfo = await resBlockInfo.json();

  const resLastBlock = await fetch(
    `https://blockchain.info/rawblock/${blockInfo.hash}`,
    {
      cache: "no-store"
    }
  );
  const lastBlock = await resLastBlock.json();

  await firebaseApp
    .firestore()
    .collection("bitcoin")
    .add({
      price,
      time: new Date(lastBlock.time * 1000),
      txsAmount: lastBlock.tx.length,
      size: lastBlock.size,
      height: blockInfo.height,
    });
  console.log("Updated bitcoin data");
    
  return Response.json({ success: true })
}