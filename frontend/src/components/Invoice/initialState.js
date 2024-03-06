// const user = JSON.parse(localStorage.getItem('profile'))

export const initialState = {
    userID:'user',
    invoiceID:'abc001',
    customerName:'afa',
    phoneNo:'asfa',
    customerEmail:'afad',
    totalAmount:0,
    notes:'Thanks for your visit. Come Again!',
    paymentMode:'Paid',
    itemList:[{ itemID:'', itemName:'', quantity:0, rate:0, discount:0, gst:0, amount:0 }],
    createdAt: "abc",
}