"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Nav = () => {
  const pathname = usePathname();

  return (
    <div className="mb grid text-center lg:mb-0 lg:w-full lg:max-w-6xl lg:grid-cols-4 lg:text-left gap-4">
      <Link
        href="/"
        className={`group rounded-lg border border-transparent hover:text-black px-5 py-4 transition-colors hover:border-gray-300 hover:bg-green-600/40 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 ${
          pathname === "/" ? "bg-green-600/40 text-white" : ""
        }`}
      >
        <h2 className="mb-3 text-xl font-semibold">
          Bitcoin info{" "}
          <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
            -&gt;
          </span>
        </h2>
        <p className="m-0 max-w-[30ch] text-sm opacity-50">
          Inspect block info & BTC price.
        </p>
      </Link>

      <Link
        href="/brc20"
        className={`group rounded-lg border border-transparent hover:text-black px-5 py-4 transition-colors hover:border-gray-300 hover:bg-green-600/40 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 ${
          pathname.match(/^\/brc20(\/.*)?$/) ? "bg-green-600/40 text-white" : ""
        }`}
      >
        <h2 className="mb-3 text-xl font-semibold">
          BRC-20 tickers{" "}
          <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
            -&gt;
          </span>
        </h2>
        <p className="m-0 max-w-[30ch] text-sm opacity-50">
          Get info on any BRC-20 ticker
        </p>
      </Link>
      <Link
        href="/order"
        className={`group rounded-lg border border-transparent hover:text-black px-5 py-4 transition-colors hover:border-gray-300 hover:bg-green-600/40 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 ${
          pathname === "/order" ? "bg-green-600/40 text-white" : ""
        }`}
      >
        <h2 className="mb-3 text-xl font-semibold">
          Order details{" "}
          <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
            -&gt;
          </span>
        </h2>
        <p className="m-0 max-w-[30ch] text-sm opacity-50">
          Explore relevant info on any order.
        </p>
      </Link>
    </div>
  );
};
