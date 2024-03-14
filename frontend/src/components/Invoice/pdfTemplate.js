/**
 * Generates an HTML template for an invoice.
 * @param {Object} options - The options for generating the invoice template.
 * @param {string} options.userID - The user ID.
 * @param {string} options.invoiceID - The invoice ID.
 * @param {string} options.customerName - The name of the customer.
 * @param {string} options.phoneNo - The phone number of the customer.
 * @param {string} options.customerEmail - The email of the customer.
 * @param {number} options.totalAmount - The total amount of the invoice.
 * @param {string} options.notes - Any notes for the invoice.
 * @param {string} options.paymentMode - The payment mode.
 * @param {number} options.discount - The discount amount.
 * @param {Object[]} options.itemList - The list of items in the invoice.
 * @param {string} options.itemList[].itemName - The name of the item.
 * @param {number} options.itemList[].quantity - The quantity of the item.
 * @param {number} options.itemList[].rate - The rate of the item.
 * @param {number} options.itemList[].gst - The GST of the item.
 * @param {number} options.itemList[].amount - The total amount for the item.
 * @param {Date} options.createdAt - The date when the invoice was created.
 * @returns {string} The HTML template for the invoice.
 */
module.exports = (options) => {
  const today = new Date();
  // console.log(options.itemList[0].itemName);
  return `<!DOCTYPE html>
  <html>
  <head>
      <style>
          body {
              margin-left: 15px ;
              margin-top: 15px;
              margin-right:15px;
              padding: 0;
              font-family: 'Roboto', sans-serif;
              width: 1000px;
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
                  <h4>${options.customerName}</h4>
                  <p>${options.customerEmail}</p>
                  <p>${options.phoneNo}</p>
              </div>
          </div>

          <div class="status">
              <div class="receipt-id">
                  <h1>Receipt</h1>
                  <p>#${options.invoiceID}</p>
              </div>
              <p class="title">Status</p>
              <h3>${options.paymentMode}</h3>
              <p class="title">Date</p>
              <p>${options.createdAt}</p>
              <p class="title">Amount</p>
              <h3>&#8377;${options.totalAmount}</h3>
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
              ${options.itemList.map(item => `
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
                  <td style="text-align: center">${options.totalAmount}</td>
              </tr>

              <tr>
                  <td>Payment made</td>
                  <td style="text-align: center">${options.totalAmount}</td>
              </tr>

              <tr>
                  <td>Balance</td>
                  <td><h3 style="line-height: 5px; text-align: center">&#8377;0.00</h3></td>
              </tr>
          </table>
      </section>

  </body>
  </html>`;
};
