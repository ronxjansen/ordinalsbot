"use client";

import { useRouter } from "next/navigation";

export const OrderForm = () => {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const id = formData.get("orderId") as string;
    router.push(`/order/${id}`);
  };

  return (
    <div>
      <form className="max-w-sm" onSubmit={handleSubmit}>
        <div className="space-y-2 flex flex-col">
          <label className="">Provide your orderID</label>
          <input
            type="text"
            name="orderId"
            className="border rounded-lg py-2 px-2"
          />
          <button
            type="submit"
            className="bg-green-900/60 text-white hover:bg-green-900/80 rounded-lg w-fit py-2 px-4"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
