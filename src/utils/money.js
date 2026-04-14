// this function converts the price money into cent foramt 
export function formatMoney(amountCents){
    return `$${(amountCents/100).toFixed(2)}` ; 
}