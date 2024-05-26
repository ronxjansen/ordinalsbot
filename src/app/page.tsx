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

  if (btc.empty) {
    return null
  }

  return btc.docs[0].data();
};

const getCachedBTCInfo = cache(fetchBTCInfo, ["fetchBTCInfo"], {
  revalidate: 15 * 60, // revalidate cache every 15 minutes
});

export default async function Home() {
  const data = await getCachedBTCInfo();
  return (
    <>
      <div className="text-lg opacity-50 mt-12 uppercase">
        Latests Bitcoin block info
      </div>
      
      {data ? (<div className="grid grid-cols-5 gap-4 my-8">
        <div className="flex flex-col  space-y-2">
          <div>Minted</div>
          <div className="text-xl font-semibold">
            {formatDistanceToNow(new Date(data.time._seconds * 1000), {
              addSuffix: true,
            })}
          </div>
        </div>
        <div className="flex flex-col  space-y-2">
          <div>Price in $</div>
          <div className="text-xl font-semibold">{data.price.USD["15m"]}</div>
        </div>
        <div className="flex flex-col  space-y-2">
          <div>Block height</div>
          <div className="text-xl font-semibold">{data.height}</div>
        </div>
        <div>
          <div>Block size</div>
          <div className="text-xl font-semibold">{data.size}</div>
        </div>
        <div>
          <div>Number of transactions</div>
          <div className="text-xl font-semibold">{data.txsAmount}</div>
        </div>
      </div>) : (
        <div className="text-red-500">No data available</div>
      )}
    </>
  );
}
