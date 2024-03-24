const nodemailer = require("nodemailer");
require("dotenv").config();
const u = process.env.GMAIL_USER;
const p = process.env.GMAIL_PASS;
async function notifyCustomerController(email, organization, shopname, shopEmail, shopAddress, body, totalAmt, pdfPath) {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            secure: true,
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS,
            },
        });
        
        console.log("hello")

        const mailOptions = {
            from: `"${organization}" <${process.env.GMAIL_USER}>`,
            to: email,
            subject: `Know how much you owe to ${shopname}`,
            text: `This is to inform you that your credit log with ${shopname} has been changed. ${body} You now owe ${totalAmt} to ${shopname}. If this information is not correct, please reach out to the vendor(Email: ${shopEmail})`,
            attachments: [
                {
                  filename: 'invoice.pdf',
                  //path: pdfPath,
                  content: pdfPath,
                  contentType: 'application/pdf',
                },
              ],
            html: `
                  <!DOCTYPE html>
                  <html lang="en">
                      <head>
                          <meta charset="UTF-8">
                          <meta name="viewport" content="width=device-width, initial-scale=1.0">
                          <title>${organization} Your Credit Amount</title>
                          <style>
                              body {
                                  font-family: Arial, sans-serif;
                                  background-color: #f8f8f8;
                                  margin: 0;
                                  padding: 0;
                              }
  
                              .container {
                                  max-width: 600px;
                                  margin: 0 auto;
                                  background-color: #ffffff;
                                  border-radius: 5px;
                                  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
                              }
  
                              .header {
                                  background-color: #0073e6;
                                  color: #ffffff;
                                  padding: 20px;
                                  text-align: center;
                                  border-top-left-radius: 5px;
                                  border-top-right-radius: 5px;
                              }
  
                              h1 {
                                  font-size: 24px;
                                  margin: 0;
                              }
  
                              p {
                                  font-size: 16px;
                                  color: #333333;
                                  margin: 0;
                              }
                              .footer {
                                  border: 1px dashed #cccccc;
                                  border-width: 2px 0;
                                  padding: 20px;
                                  text-align: center;
                              }
  
                              .footer p {
                                  font-size: 14px;
                                  color: #333333;
                                  margin: 0;
                              }
  
                              .footer a {
                                  color: #0073e6;
                              }
  
                              .footer a:hover {
                                  text-decoration: underline;
                              }
                          </style>
                      </head>
                      <body>
                          <div class="container">
                              <div class="header">
                                  <h1>${organization}</h1>
                              </div>
                              <div>
                                    <p>
                                    This is to inform you that your credit log with ${shopname} has been changed. <br/>
                                    <em> ${body} You now owe Rs. ${totalAmt} to ${shopname}. </em> Please find attached the invoice. <br/>
                                    If this information is not correct, please reach out to the vendor.<br/>
                                    Email : ${shopEmail} <br/>
                                    Address : ${shopAddress} <br/>
                                    </p>
                              </div>
                              <div class="footer">
                                  <p>Author</p>
                                  <p><a href="http://localhost:3000/" target="_blank">Billing 360</a></p>
                              </div>
                          </div>
                      </body>
                  </html>
                  `,
        };
        console.log("message sent")
        // Send email
        await transporter.sendMail(mailOptions);
        console.log("message sent")
    } catch (error) {
        console.log(u)
        console.log(p)
        console.log(error)
        console.error(`Failed to send notification to ${email}`, error.message);
        throw new Error(error.message);
    }
}

module.exports = notifyCustomerController;
