const express = require("express");
const cors = require("cors");
const {getSymbols, getChangeRate, createChangeRate} = require("./db")

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(418).send("I'm the backend");
});

app.get("/symbols", async (req, res) => {
  const symbols = await getSymbols();
  return res.json(symbols.map(symbol => symbol.code))
})

app.get("/convert", async (req, res) => {
  const {
    query: {
      from,
      to,
      amount
    }
  } = req;

  const change_rate = await getChangeRate({from, to})

  return res.json({
    from,
    to,
    amount,
    value: Number(amount) * change_rate.rate
  })
})

app.post("/change-rate", async (req, res) => {
  const {
    body: {
      from,
      to,
      rate
    }
  } = req;

  const changeRate = createChangeRate({from, to, rate});

  return res.json(changeRate)
})

app.listen(8080, "0.0.0.0");
