"use server";

import { TickerForm } from "@/components/TickerForm";

type BRC20TickerProps = {
  params: {
    ticker: string;
  };
};

const TICKER_API_ENDPOINT =
  "https://api.ordinalsbot.com/opi/v1/brc20/ticker_info";

export default async function brc20({ params }: BRC20TickerProps) {
  const resp = await fetch(`${TICKER_API_ENDPOINT}?ticker=${params.ticker}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ORDINALSBOT_API_KEY ?? "",
    },
    next: {
      revalidate: 60 * 60, // 1 hour
    },
  });
  const data = await resp.json();

  if (data.error?.length) {
    return (
      <div>
        <div className="text-red-400 my-4">
          Whoops. Ticker {params.ticker} not found!
        </div>
        <TickerForm />
      </div>
    );
  }

  const {
    original_tick,
    max_supply,
    remaining_supply,
    burned_supply,
    deploy_inscription_id,
    block_height,
  } = data.result;

  return (
    <div className="">
      <div className="grid grid-cols-3 gap-4 my-8">
        <div className="align-middle">
          <div>Ticker</div>
          <div className="text-xl font-semibold">{original_tick}</div>
        </div>

        <div className="align-middle">
          <div>Max supply</div>
          <div className="text-xl font-semibold">{max_supply}</div>
        </div>

        <div className="align-middle">
          <div>Mint block</div>
          <div className="text-xl font-semibold">{block_height}</div>
        </div>

        <div className="align-middle">
          <div>Available supply</div>
          <div className="text-xl font-semibold">{remaining_supply}</div>
        </div>

        <div className="align-middle">
          <div>Burned supply</div>
          <div className="text-xl font-semibold">{burned_supply}</div>
        </div>        
      </div>
    </div>
  );
}
