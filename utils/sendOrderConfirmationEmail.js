var Sib = require("sib-api-v3-sdk");
const { putOrderdataIntoHtml } = require("./generateOrderHTML");

var client = Sib.ApiClient.instance;

var apiKey = client.authentications["api-key"];

apiKey.apiKey = process.env.SENDINBLUE_KEY;

const sendEmailforOrder = (name, recieverEmail, order_data) => {
  console.log("Sending order email");

  const tranEmailApi = new Sib.TransactionalEmailsApi();
  const sender = { email: " utkarshrkt2001@gmail.com " };
  const receivers = [
    {
      email: recieverEmail,
    },
  ];

  const htmlTemplate = putOrderdataIntoHtml(order_data);

  tranEmailApi
    .sendTransacEmail({
      sender,
      to: receivers,
      subject: `Hey ${name} .Thank you for shopping with us`,
      htmlContent: `${htmlTemplate}`,
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

module.exports = { sendEmailforOrder };
