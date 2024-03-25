/**
 * Generates an HTML template for an invoice.
 * @param {Object} requestData
 * @param {Object} requestData.invoiceData - The invoice data for generating the invoice template.
 * @param {string} requestData.invoiceData.userID - The user ID.
 * @param {string} requestData.invoiceData.invoiceID - The invoice ID.
 * @param {string} requestData.invoiceData.customerName - The name of the customer.
 * @param {string} requestData.invoiceData.phoneNo - The phone number of the customer.
 * @param {string} requestData.invoiceData.customerEmail - The email of the customer.
 * @param {number} requestData.invoiceData.totalAmount - The total amount of the invoice.
 * @param {string} requestData.invoiceData.notes - Any notes for the invoice.
 * @param {string} requestData.invoiceData.paymentMode - The payment mode.
 * @param {number} requestData.invoiceData.discount - The discount amount.
 * @param {Object[]} requestData.invoiceData.itemList - The list of items in the invoice.
 * @param {string} requestData.invoiceData.itemList[].itemName - The name of the item.
 * @param {number} requestData.invoiceData.itemList[].quantity - The quantity of the item.
 * @param {number} requestData.invoiceData.itemList[].rate - The rate of the item.
 * @param {number} requestData.invoiceData.itemList[].gst - The GST of the item.
 * @param {number} requestData.invoiceData.itemList[].amount - The total amount for the item.
 * @param {Date} requestData.invoiceData.createdAt - The date when the invoice was created.
 * @param {string} requestData.invoiceData.customerNotes - Note for the customer.
 * @param {Object} requestData.userData - The user data for including shop details in the invoice.
 * @param {string} requestData.userData.shopname - The name of the shop.
 * @param {string} requestData.userData.gstno - The GST number of the shop.
 * @param {string} requestData.userData.email - The email address of the shop.
 * @param {string} requestData.userData.shopaddress - The address of the shop.
 * @param {string} requestData.userData.phonenumber - The phone number of the shop.
 * @returns {string} The HTML template for the invoice.
 */
  
const User = require('../models/user.model');
const formatDate = (date) => {
    const newDate= new Date(date);
    const options = {
        weekday: 'short',
        month: 'short',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'UTC'
    };
    const formatter = new Intl.DateTimeFormat('en', options);
    return formatter.format(newDate);
};

const invoicePDF = (requestData) => {
    
    // const billDate = formatDate(requestData.invoiceData.createdAt); 
    // console.log(typeof requestData.invoiceData.createdAt);
    const billDate = formatDate(requestData.invoiceData.createdAt);
    // console.log(requestData);
    let subtotal = 0;
    requestData.invoiceData.itemList.forEach((item) => {
        subtotal += item.amount;
    });
    
  return (`<!DOCTYPE html>
  <html lang="en">
  
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Invoice</title>
      <style>
          html{
              zoom: 0.55;
          }
          body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 20px;
              background-color: #eee;
          }
  
          .container {
              max-width: 800px;
              margin: 0 auto;
              background-color: #fff;
              border-radius: 1rem;
              box-shadow: 0 20px 27px 0 rgba(0, 0, 0, 0.05);
              padding: 20px;
          }
  
          .invoice-title {
              display: flex;
              justify-content: space-between;
              align-items: center;
          }
  
          .badge {
              background-color: #28a745;
              color: #fff;
              padding: 4px 8px;
              border-radius: 0.25rem;
          }
  
          .invoice-title h2 {
              margin: 0;
              font-size: 24px;
              color: #333;
          }
  
          .invoice-details {
              margin-top: 20px;
          }
  
          .invoice-details p {
              margin: 5px 0;
              color: #555;
          }
  
          .invoice-summary {
              margin-top: 20px;
              border-top: 1px solid #ccc;
              padding-top: 10px;
          }
  
          .invoice-summary table {
              width: 100%;
              border-collapse: collapse;
          }
  
          .invoice-summary th,
          .invoice-summary td {
              border-bottom: 1px solid #ccc;
              padding: 8px;
              text-align: left;
          }
  
          .invoice-summary .text-end {
              text-align: right;
          }
  
          .btn-print {
              display: inline-block;
              padding: 8px 16px;
              background-color: #007bff;
              color: #fff;
              text-decoration: none;
              border-radius: 0.25rem;
              transition: background-color 0.3s ease;
          }
  
          .btn-print:hover {
              background-color: #0056b3;
          }
  
          .btn-send {
              display: inline-block;
              padding: 8px 16px;
              background-color: #28a745;
              color: #fff;
              text-decoration: none;
              border-radius: 0.25rem;
              transition: background-color 0.3s ease;
              margin-left: 10px;
          }
  
          .btn-send:hover {
              background-color: #218838;
          }
          .float-end {
            margin-top: -20px;
            float: right;
          }
      </style>
  </head>
  
  <body>
      <div class="container">
          <div class="invoice-title">
              <h2>${requestData.userData.shopname}</h2>
          </div>
          
          <div class="invoice-details">
              <p>GST No. : ${requestData.userData.gstno}</p>
              <p>Address : ${requestData.userData.shopaddress}</p>
              <p>Email: ${requestData.userData.email}</p>
              <p>Phone No.: ${requestData.userData.phonenumber}</p>
          </div>
          <hr>
          <div class="row">
          <div class="float-end">
            <h4 class="font-size-15 mb-0">Invoice ID #${requestData.invoiceData.invoiceID}</h4>
                <h4>Created at: ${billDate}</h4>
            <p>STATUS: <span class="badge bg-success" style="background-color: ${requestData.invoiceData.paymentMode === 'Credit' ? 'red' : 'green'}">${requestData.invoiceData.paymentMode}</span></p>
          </div>
              <div class="col-sm-6">
                  <h3>Billed To:</h3>
                  <p>${requestData.invoiceData.customerName}</p>
                  <p>${requestData.invoiceData.customerEmail}</p>
                  <p>${requestData.invoiceData.phoneNo}</p>
              </div>
              
          </div>
          <div class="invoice-summary">
              <h3>Summary</h3>
              <table>
                  <thead>
                      <tr>
                          <th>No.</th>
                          <th>Item</th>
                          <th>Price</th>
                          <th>GST (%)</th>
                          <th>Quantity</th>
                          <th class="text-end">Total</th>
                      </tr>
                  </thead>
                  <tbody>
                  ${requestData.invoiceData.itemList.map((item, index) => `
                  <tr>
                      <td>${index + 1}</td>
                      <td>${item.itemName}</td>
                      <td>&#8377; ${item.rate.toFixed(2)}</td>
                      <td>${item.gst}</td>
                      <td>${item.quantity}</td>
                      <td class="text-end">&#8377; ${(item.amount).toFixed(2)}</td>
                  </tr>
              `).join('')}
                    <tr>
                          <td colspan="5" class="text-end">Sub Total :</td>
                          <td class="text-end">&#8377; ${subtotal}</td>
                      </tr>
                      <tr>
                          <td colspan="5" class="text-end">Discount :</td>
                          <td class="text-end">- &#8377; ${requestData.invoiceData.discount * subtotal / 100}</td>
                      </tr>
                      <tr>
                          <td colspan="5" class="text-end"><strong> Grand Total : </strong></td>
                          <td class="text-end"><strong> &#8377; ${requestData.invoiceData.totalAmount} </strong></td>
                      </tr>
                  </tbody>
              </table>
              
          </div>
      </div>
  </body>
  
  </html>
  `);
};
module.exports = invoicePDF;


// /**
//  * Generates an HTML template for an invoice.
//  * @param {Object} requestData
//  * @param {Object} requestData.invoiceData - The invoice data for generating the invoice template.
//  * @param {string} requestData.invoiceData.userID - The user ID.
//  * @param {string} requestData.invoiceData.invoiceID - The invoice ID.
//  * @param {string} requestData.invoiceData.customerName - The name of the customer.
//  * @param {string} requestData.invoiceData.phoneNo - The phone number of the customer.
//  * @param {string} requestData.invoiceData.customerEmail - The email of the customer.
//  * @param {number} requestData.invoiceData.totalAmount - The total amount of the invoice.
//  * @param {string} requestData.invoiceData.notes - Any notes for the invoice.
//  * @param {string} requestData.invoiceData.paymentMode - The payment mode.
//  * @param {number} requestData.invoiceData.discount - The discount amount.
//  * @param {Object[]} requestData.invoiceData.itemList - The list of items in the invoice.
//  * @param {string} requestData.invoiceData.itemList[].itemName - The name of the item.
//  * @param {number} requestData.invoiceData.itemList[].quantity - The quantity of the item.
//  * @param {number} requestData.invoiceData.itemList[].rate - The rate of the item.
//  * @param {number} requestData.invoiceData.itemList[].gst - The GST of the item.
//  * @param {number} requestData.invoiceData.itemList[].amount - The total amount for the item.
//  * @param {Date} requestData.invoiceData.createdAt - The date when the invoice was created.
//  * @param {string} requestData.invoiceData.customerNotes - Note for the customer.
//  * @param {Object} requestData.userData - The user data for including shop details in the invoice.
//  * @param {string} requestData.userData.shopname - The name of the shop.
//  * @param {string} requestData.userData.gstno - The GST number of the shop.
//  * @param {string} requestData.userData.email - The email address of the shop.
//  * @param {string} requestData.userData.shopaddress - The address of the shop.
//  * @returns {string} The HTML template for the invoice.
//  */
  
// const User = require('../models/user.model');
// const formatDate = (date) => {
//     const newDate= new Date(date);
//     const options = {
//         weekday: 'short',
//         month: 'short',
//         day: '2-digit',
//         year: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit',
//         timeZone: 'UTC'
//     };
//     const formatter = new Intl.DateTimeFormat('en', options);
//     return formatter.format(newDate);
// };

// const invoicePDF = (requestData) => {
    
//     // const billDate = formatDate(requestData.invoiceData.createdAt); 
//     // console.log(typeof requestData.invoiceData.createdAt);
//     const billDate = formatDate(requestData.invoiceData.createdAt);
//     // console.log(requestData);
  
//   return (`<!DOCTYPE html>
//   <html>
//   <head>
//       <style>
//             html{
//                 zoom: 0.55;
//             }
//           body {
//               margin-left: 30px ;
//               margin-top: 15px;
//               margin-right:15px;
//               padding: 0;
//               font-family: 'Roboto', sans-serif;
//               //width: 700px;
//           }

//           table {
//               font-family: Arial, Helvetica, sans-serif;
//               border-collapse: collapse;
//               width: 100%;
//           }

//           table td, table th {
//               border: 1px solid rgb(247, 247, 247);
//               padding: 15px;
//           }

//           table tr:nth-child(even) {
//               background-color: #f8f8f8;
//           }

//           table tr:hover {
//               background-color: rgb(243, 243, 243);
//           }

//           table th {
//               padding-top: 12px;
//               padding-bottom: 12px;
//               text-align: left;
//               background-color: #FFFFFF;
//               color: rgb(78, 78, 78);
//           }

//           .header {
//               display: flex;
//               align-items: center;
//               justify-content: space-between;
//               padding: 10px;
//           }

//           .address {
//               display: flex;
//               align-items: center;
//               justify-content: center;
//               padding: 10px;
//               line-height: 12px;
//               font-size: 15px;
//               margin-top: -10px;
//           }

//           .contact {
//               display: flex;
//               align-items: center;
//               justify-content: flex-start;
//               margin-right:15px;
//           }

//           .status {
//               text-align: right;
//               margin-right:30px;
//               margin-left: auto;
//               margin-top:-200px;
//           }

//           .receipt-id {
//               text-align: right;
//           }

//           .title {
//               font-weight: 100px;
//               text-transform: uppercase;
//               color: gray;
//               letter-spacing: 2px;
//               font-size: 15px;
//           }

//           .summary {
//               margin-top: 2px;
//               margin-right: 0px;
//               margin-left: 55%;
//               margin-bottom: 50px;
//           }

//           img {
//               width: 150px;
//               padding-top: 100px;
//           }
//       </style>
//   </head>
//   <body>
//       <section class="header"></section>
//       <section class="address">
//           <div class="contact">
//               <div>
//                   <h4>${requestData.userData.shopname}</h4>
//                   <p>${requestData.userData.gstno}</p>
//                   <p>${requestData.userData.email}</p>
//                   <p>${requestData.userData.shopaddress}</p>
//               </div>

//               <div>
//                   <p class="title">Bill to:</p>
//                   <h4>${requestData.invoiceData.customerName}</h4>
//                   <p>${requestData.invoiceData.customerEmail}</p>
//                   <p>${requestData.invoiceData.phoneNo}</p>
//               </div>
//           </div>

//           <div class="status">
//               <div class="receipt-id">
//                   <h1>Receipt</h1>
//                   <p>#${requestData.invoiceData.invoiceID}</p>
//               </div>
//               <p class="title">Status</p>
//               <h3>${requestData.invoiceData.paymentMode}</h3>
//               <p class="title">Date & Time</p>
//               <p>${billDate}</p>
//               <p class="title">Amount</p>
//               <h3>&#8377;${requestData.invoiceData.totalAmount}</h3>
//           </div>
//       </section>

//       <table>
//           <thead>
//               <tr>
//                   <th>Description</th>
//                   <th>Quantity</th>
//                   <th>Rate</th>
//                   <th>GST</th>
//                   <th style="text-align: center">Amount</th>
//               </tr>
//           </thead>
//           <tbody id="table-body">
//               ${requestData.invoiceData.itemList.map(item => `
//                   <tr>
//                       <td>${item.itemName}</td>
//                       <td>${item.quantity}</td>
//                       <td>${item.rate}</td>
//                       <td>${item.gst}</td>
//                       <td style="text-align: center">${item.amount}</td>
//                   </tr>`).join('')}
//           </tbody>
//       </table>

//       <section class="summary">
//           <table>
//               <tr>
//                   <th>Summary</th>
//                   <th></th>
//               </tr>
//               <tr>
//                   <td>Total</td>
//                   <td style="text-align: center">${requestData.invoiceData.totalAmount}</td>
//               </tr>

//               <tr>
//                 <td>Payment made</td>
//                 <td style="text-align: center">${requestData.invoiceData.paymentMode === 'Credit dues cleared' || requestData.invoiceData.paymentMode === 'Amount added to credit' ? "" : requestData.invoiceData.paymentMode === 'Paid'? requestData.invoiceData.totalAmount : '&#8377;0.00'}</td>
//             </tr>
//             <tr>
//                 <td>Balance</td>
//                 <td><h3 style="line-height: 5px; text-align: center">${requestData.invoiceData.paymentMode === 'Credit dues cleared' || requestData.invoiceData.paymentMode === 'Amount added to credit' ? "" : requestData.invoiceData.paymentMode === 'Paid' ?'&#8377;0.00' : requestData.invoiceData.totalAmount}</td>
//             </tr>
//           </table>
//       </section>

//   </body>
//   </html>`);
// };
// module.exports = invoicePDF;