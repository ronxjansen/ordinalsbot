
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

export const getOrderStatus = async function (orderId: string) {
    const res = await fetch(`https://api.ordinalsbot.com/order/${orderId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
    return res.json();
}