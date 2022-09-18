var Sib = require("sib-api-v3-sdk");

var client = Sib.ApiClient.instance;

var apiKey = client.authentications["api-key"];

apiKey.apiKey = process.env.SENDINBLUE_KEY;

const sendEmailforOrder = (name, recieverEmail, order_data) => {
  const tranEmailApi = new Sib.TransactionalEmailsApi();
  const sender = { email: " utkarshrkt2001@gmail.com " };
  const receivers = [
    {
      email: recieverEmail,
    },
  ];

  tranEmailApi
    .sendTransacEmail({
      sender,
      to: receivers,
      subject: `Hey ${name} .Thank you for shopping with us`,
      htmlContent: putOrderdataIntoHtml(order_data),
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

module.exports = { sendEmailforOrder };
