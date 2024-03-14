/**
 * Generates an HTML template for an invoice.
 * @param {Object} invoice - The invoice for generating the invoice template.
 * @param {string} invoice.userID - The user ID.
 * @param {string} invoice.invoiceID - The invoice ID.
 * @param {string} invoice.customerName - The name of the customer.
 * @param {string} invoice.phoneNo - The phone number of the customer.
 * @param {string} invoice.customerEmail - The email of the customer.
 * @param {number} invoice.totalAmount - The total amount of the invoice.
 * @param {string} invoice.notes - Any notes for the invoice.
 * @param {string} invoice.paymentMode - The payment mode.
 * @param {number} invoice.discount - The discount amount.
 * @param {Object[]} invoice.itemList - The list of items in the invoice.
 * @param {string} invoice.itemList[].itemName - The name of the item.
 * @param {number} invoice.itemList[].quantity - The quantity of the item.
 * @param {number} invoice.itemList[].rate - The rate of the item.
 * @param {number} invoice.itemList[].gst - The GST of the item.
 * @param {number} invoice.itemList[].amount - The total amount for the item.
 * @param {Date} invoice.createdAt - The date when the invoice was created.
 * @returns {string} The HTML template for the invoice.
 */
module.exports = (invoice) => {
  const today = new Date();
  // console.log(invoice.itemList[0].itemName);
  return `<!DOCTYPE html>
  <html>
  <head>
      <style>
          body {
              margin-left: 30px ;
              margin-top: 15px;
              margin-right:15px;
              padding: 0;
              font-family: 'Roboto', sans-serif;
              //width: 700px;
          }

          table {
              font-family: Arial, Helvetica, sans-serif;
              border-collapse: collapse;
              width: 100%;
          }

          table td, table th {
              border: 1px solid rgb(247, 247, 247);
              padding: 15px;
          }

          table tr:nth-child(even) {
              background-color: #f8f8f8;
          }

          table tr:hover {
              background-color: rgb(243, 243, 243);
          }

          table th {
              padding-top: 12px;
              padding-bottom: 12px;
              text-align: left;
              background-color: #FFFFFF;
              color: rgb(78, 78, 78);
          }

          .header {
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 10px;
          }

          .address {
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 10px;
              line-height: 12px;
              font-size: 15px;
              margin-top: -10px;
          }

          .contact {
              display: flex;
              align-items: center;
              justify-content: flex-start;
              margin-right:15px;
          }

          .status {
              text-align: right;
              margin-right:30px;
              margin-left: auto;
              margin-top:-200px;
          }

          .receipt-id {
              text-align: right;
          }

          .title {
              font-weight: 100px;
              text-transform: uppercase;
              color: gray;
              letter-spacing: 2px;
              font-size: 15px;
          }

          .summary {
              margin-top: 2px;
              margin-right: 0px;
              margin-left: 55%;
              margin-bottom: 50px;
          }

          img {
              width: 150px;
              padding-top: 100px;
          }
      </style>
  </head>
  <body>
      <section class="header"></section>
      <section class="address">
          <div class="contact">
              <div>
                  <h4>SALESFORCE</h4>
                  <p>payments@salesforce.com</p>
                  <p>1234567890</p>
                  <p>415 Mission Street Suite 300</p>
                  <p>San Francisco, CA 94105</p>
              </div>

              <div>
                  <p class="title">Bill to:</p>
                  <h4>${invoice.customerName}</h4>
                  <p>${invoice.customerEmail}</p>
                  <p>${invoice.phoneNo}</p>
              </div>
          </div>

          <div class="status">
              <div class="receipt-id">
                  <h1>Receipt</h1>
                  <p>#${invoice.invoiceID}</p>
              </div>
              <p class="title">Status</p>
              <h3>${invoice.paymentMode}</h3>
              <p class="title">Date</p>
              <p>${invoice.createdAt}</p>
              <p class="title">Amount</p>
              <h3>&#8377;${invoice.totalAmount}</h3>
          </div>
      </section>

      <table>
          <thead>
              <tr>
                  <th>Description</th>
                  <th>Quantity</th>
                  <th>Rate</th>
                  <th>GST</th>
                  <th style="text-align: center">Amount</th>
              </tr>
          </thead>
          <tbody id="table-body">
              ${invoice.itemList.map(item => `
                  <tr>
                      <td>${item.itemName}</td>
                      <td>${item.quantity}</td>
                      <td>${item.rate}</td>
                      <td>${item.gst}</td>
                      <td style="text-align: center">${item.amount}</td>
                  </tr>`).join('')}
          </tbody>
      </table>

      <section class="summary">
          <table>
              <tr>
                  <th>Summary</th>
                  <th></th>
              </tr>
              <tr>
                  <td>Total</td>
                  <td style="text-align: center">${invoice.totalAmount}</td>
              </tr>

              <tr>
                <td>Payment made</td>
                <td style="text-align: center">${invoice.paymentMode === 'Paid' ? invoice.totalAmount : '&#8377;0.00'}</td>
            </tr>
            <tr>
                <td>Balance</td>
                <td><h3 style="line-height: 5px; text-align: center">${invoice.paymentMode === 'Paid' ?'&#8377;0.00' : invoice.totalAmount}</td>
            </tr>
          </table>
      </section>

  </body>
  </html>`;
};
