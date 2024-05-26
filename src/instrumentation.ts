const blockInfoAPIBaseParams = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { firebaseApp } = await import("./lib/firebase");

    // a very naieve approach of creating a worker that updates bitcoin block/price data every 15 minutes
    setInterval(async () => {
      const resBtcPrice = await fetch(
        "https://blockchain.info/ticker",
        blockInfoAPIBaseParams
      );
      const price = await resBtcPrice.json();

      const resBlockInfo = await fetch(
        "https://blockchain.info/latestblock",
        blockInfoAPIBaseParams
      );
      const blockInfo = await resBlockInfo.json();

      const resLastBlock = await fetch(
        `https://blockchain.info/rawblock/${blockInfo.hash}`,
        blockInfoAPIBaseParams
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
    }, 15 * 60 * 1000);
  }
}
