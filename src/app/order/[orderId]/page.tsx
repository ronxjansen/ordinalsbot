// 88c33f7b-644c-473b-acf7-7eb37ea74213

export enum ORDER_STATE {
    WAITING_PAYMENT = 'waiting-payment',
    WAITING_CONFIRMATION = 'waiting-confirmation',
    WAITING_PARENT = 'waiting-parent',
    PREP = 'prep',
    QUEUED = 'queued',
    ERROR = 'error',
    CANCELED = 'cancelled',
    WAITING_REFUND = 'waiting-refund',
    REFUNDED = 'refunded',
    EXPIRED = 'expired',
    WAITING_REVEAL = 'waiting-reveal',
    WAITING_RUNE_BALANCE = 'waiting-rune-balance',
    COMPLETED = 'completed',
}

const OrderState = ({ state }: { state: ORDER_STATE }) => {
    switch (state) {
        case ORDER_STATE.WAITING_PAYMENT:
            return <span className="text-yellow-500">Waiting for payment to be detected.</span>;
        case ORDER_STATE.WAITING_CONFIRMATION:
            return <span className="text-yellow-500">Payment is detected, waiting for confirmation.</span>;
        case ORDER_STATE.WAITING_PARENT:
            return <span className="text-yellow-500">Order is waiting for the parent inscription to hit the wallet.</span>;
        case ORDER_STATE.PREP:
            return <span className="text-yellow-500">Order files are being downloaded.</span>;
        case ORDER_STATE.QUEUED:
            return <span className="text-yellow-500">Order is queued for inscription.</span>;
        case ORDER_STATE.ERROR:
            return <span className="text-red-500">The order has an error.</span>;
        case ORDER_STATE.CANCELED:
            return <span className="text-red-500">Order is cancelled.</span>;
        case ORDER_STATE.WAITING_REFUND:
            return <span className="text-yellow-500">Order is waiting for refund.</span>;
        case ORDER_STATE.REFUNDED:
            return <span className="text-green-500">The order has been refunded.</span>;
        case ORDER_STATE.EXPIRED:
            return <span className="text-red-500">Invoice as expired.</span>;
        case ORDER_STATE.WAITING_REVEAL:
            return <span className="text-yellow-500">Order is waiting to broadcast the inscription reveal.</span>;
        case ORDER_STATE.WAITING_RUNE_BALANCE:
            return <span className="text-yellow-500">order is waiting for the rune balance to confirm.</span>;
        case ORDER_STATE.COMPLETED:
            return <span className="text-green-500">The order is completed.</span>;
        default:
            return <span className="text-red-500">Unknown</span>;
    }
}

export default async function orderPage({
  params,
}: {
  params: { orderId: string };
}) {
  const resp = await fetch(
    `https://api.ordinalsbot.com/order?id=${params.orderId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const order = await resp.json();

  return (
    <div>
      <div className="text-lg opacity-50 mt-12 uppercase">
        Info for order {params.orderId}
      </div>

      <div className="bg-gray-200 my-4 py-4 px-2 rounded-lg font-semibold">
        <OrderState state={order.state} />
    </div>

      <div className="grid grid-cols-3 gap-4 my-8">
        <div>
          <div>Receiving address</div>
          <div className="text-xl font-semibold text-ellipsis break-words whitespace-normal">{order.receiveAddress}</div>
        </div>

        <div>
          <div>Fee paid</div>
          <div className="text-xl font-semibold">{order.fee}</div>
        </div>
      </div>
    </div>
  );
}
