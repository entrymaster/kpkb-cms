// const user = JSON.parse(localStorage.getItem('profile'))

export const initialState = {
    userID:'user',
    invoiceID:'000',
    customerName:'',
    phoneNo:'',
    customerEmail:'',
    totalAmount:0,
    notes:'Thanks for your visit. Come Again!',
    paymentMode:'Paid',
    itemList:[{ itemID:'', itemName:'', quantity:0, rate:0, discount:0, gst:0, amount:0 }],
    createdAt: new Date(),
}