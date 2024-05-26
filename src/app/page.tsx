import { firebaseApp } from "@/lib/firebase";
import { formatDistanceToNow } from "date-fns";
import { unstable_cache as cache } from "next/cache";

const fetchBTCInfo = async () => {
  const btc = await firebaseApp
    .firestore()
    .collection("bitcoin")
    .orderBy("height", "desc")
    .limit(1)
    .get();
  return btc.docs[0].data();
};

const getCachedBTCInfo = cache(fetchBTCInfo, ["fetchBTCInfo"], {
  revalidate: 15 * 60, // revalidate cache every 15 minutes
});

export default async function Home() {
  const data = await getCachedBTCInfo();
  const { price, time, txsAmount, size, height } = data;
  return (
    <>
      <div className="text-lg opacity-50 mt-12 uppercase">
        Latests Bitcoin block info
      </div>
      <div className="grid grid-cols-5 gap-4 my-8">
        <div className="flex flex-col  space-y-2">
          <div>Minted</div>
          <div className="text-xl font-semibold">
            {formatDistanceToNow(new Date(time._seconds * 1000), {
              addSuffix: true,
            })}
          </div>
        </div>
        <div className="flex flex-col  space-y-2">
          <div>Price in $</div>
          <div className="text-xl font-semibold">{price.USD["15m"]}</div>
        </div>
        <div className="flex flex-col  space-y-2">
          <div>Block height</div>
          <div className="text-xl font-semibold">{height}</div>
        </div>
        <div>
          <div>Block size</div>
          <div className="text-xl font-semibold">{size}</div>
        </div>
        <div>
          <div>Number of transactions</div>
          <div className="text-xl font-semibold">{txsAmount}</div>
        </div>
      </div>
    </>
  );
}
