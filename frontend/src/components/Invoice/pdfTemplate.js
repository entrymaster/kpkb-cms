/**
 * Generates an HTML template for an invoice.
 * @param {object} params - An object containing the invoice data.
 * @param {string} params.userID - The ID of the user.
 * @param {string} params.invoiceID - The ID of the invoice.
 * @param {string} params.customerName - The name of the customer.
 * @param {string} params.phoneNo - The phone number of the customer.
 * @param {string} params.customerEmail - The email address of the customer.
 * @param {number} params.totalAmount - The total amount of the invoice.
 * @param {string} params.notes - Any notes related to the invoice.
 * @param {string} params.paymentMode - The payment mode of the invoice (e.g., 'Credit' or 'Paid').
 * @param {number} params.discount - The discount applied to the invoice.
 * @param {Array<object>} params.itemList - An array of item objects representing the items in the invoice.
 * @param {Date} params.createdAt - The date when the invoice was created.
 * @returns {string} The generated HTML template for the invoice.
 */

module.exports = ({userID, invoiceID, customerName, phoneNo, customerEmail, totalAmount, notes, paymentMode, discount, itemList, createdAt }) => {
    const today = new Date();
    const itemRows = itemList.map((item, index) => `
        <tr>
            <td>${item.itemName}</td>
            <td>${item.quantity}</td>
            <td>${item.rate}</td>
            <td>${item.amount}</td>
        </tr>
    `).join('');
    return `<!DOCTYPE html>
<html>
<head>
<style>

body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    width: 1000px;
    margin: 0px auto;
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

table tr:nth-child(even){background-color: #f8f8f8;}

table tr:hover {background-color: rgb(243, 243, 243);}

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
  justify-content: center;
}

.status {
    text-align: right;
    margin-top: -200px;
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
<section  class="header">
</section>
<section class="address">
    <div class="contact">
          <div>
          <h4>SALESFORCE</h4>
          <p>payments@salesforce.com</p>
          <p>+009 353 1440 3500</p>
          <p>415 Mission Street Suite 300</p>
          <p>San Francisco, CA 94105</p>
      </div>

      <div>
          <p class="title">Bill to:</p>
          <h4>${customerName}</h4>
          <p>${customerEmail}</p>
          <p>${phoneNo}</p>
      </div>
    </div>

    <div class="status">
        <div class="receipt-id">
            <h1>Receipt</h1>
            <p>#${invoiceID}</p>
        </div>
        <p class="title">Status</p>
        <h3>${paymentMode}</h3>
        <p class="title">Date</p>
        <p>${createdAt}</p>
        <p class="title">Amount</p>
        <h3>&#8377;${totalAmount}</h3>
    </div>


</section>

<table>
  <tr>
    <th>Description</th>
    <th>Quantity</th>
    <th>Price</th>
    <th style="text-align: center">Amount</th>
  </tr>
  ${itemRows}

</table>

<section class="summary">
    <table>
        <tr>
          <th>Summary</th>
          <th></th>
        </tr>
        <tr>
          <td>Total</td>
          <td style="text-align: center">${totalAmount}</td>
        </tr>

        <tr>
            <td>Payment made</td>
            <td style="text-align: center">${totalAmount}</td>
          </tr>

        <tr>
            <td>Balance</td>
            <td ><h3 style="line-height: 5px; text-align: center">&#8377;0.00</h3></td>
          </tr>
        
      </table>
</section>
<div>
    <hr>
    <h4>Note</h4>
    <p>This payment was charged from the credit card ending with 0651</p>
</div>
</body>
</html>
`
;
};