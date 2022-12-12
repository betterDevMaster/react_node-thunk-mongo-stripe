const express = require("express");
const cors = require("cors");
const { connectToDatabase } = require("./middleware/mongodb");
const app = express();

// All Constants, can use the dotenv
const Secret_Key =
  "sk_test_51ME719A5xeLlYMZsD1UAxK5JPKallpoBMldzIlUFjA4iCJ0KVcvDCGha590CNJQF0kuaURgI3LAFMx5PHanazMys00bajYJESP";
const MONGODB_URI = "mongodb://localhost:27017/";
const MONGODB_DB = "xizhen";
const MONGODB_COLLECTION = "checkout";
const serverPort = 8001;

const stripe = require("stripe")(Secret_Key);

// Seta as rotas default da API
const routes = {
  products: {
    get: "/api/products",
    post: "/api/checkout",
  },
};

// Aplica o CORS para aceitar requisições de outros domínios
app.use(cors());
app.use(express.urlencoded());
app.use(express.json());

// Registra a rota GET default, enviando o JSON como retorno
app.get(routes.products.get, function (req, res) {
  res.sendFile(__dirname + "/data/products.json");
});

app.post(routes.products.post, async function (req, res) {
  let { amount, payment_method } = req.body;
  try {
    await stripe.paymentIntents.create({
      amount: Math.round(amount),
      currency: "USD",
      description: "XiZhen Part3 Test",
      payment_method,
      confirm: true,
    });

    let { db } = await connectToDatabase(MONGODB_URI, MONGODB_DB);
    await db.collection(MONGODB_COLLECTION).insertOne(req.body);
    return res.json({
      message: "Checkout and Payment added successfully",
      success: true,
    });
  } catch (error) {
    res.json({
      message: new Error(error).message,
      success: false,
    });
  }
});

// Inicia o servidor e avisa o usuário
app.listen(serverPort);
console.log(`[products] API escutando na porta ${serverPort}.`);
