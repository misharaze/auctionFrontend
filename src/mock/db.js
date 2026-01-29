// src/mocks/db.js
export const db = {
  me: {
    id: "u1",
    username: "Misha",
    balance: 1000,
  },

  auctions: [
    {
      id: "1",
      title: "AWP | Asiimov",
      startPrice: 80,
      minStep: 10,
      timeLeft: 24,
      status: "active",
      bids: [
        { id: "b1", userId: "u2", username: "PlayerA", amount: 280, time: "10:34" },
        { id: "b2", userId: "u3", username: "PlayerB", amount: 300, time: "10:35" },
        { id: "b3", userId: "u4", username: "PlayerC", amount: 250, time: "10:33" },
      ],
    },
    {
      id: "2",
      title: "AK-47 | Redline",
      startPrice: 70,
      minStep: 10,
      timeLeft: 61,
      status: "active",
      bids: [
        { id: "b4", userId: "u5", username: "PlayerX", amount: 170, time: "09:10" },
        { id: "b5", userId: "u6", username: "PlayerY", amount: 190, time: "09:12" },
      ],
    },
  ],
operations: [
  {
    id: "op1",
    type: "bid_pay",
    amount: -280,
    title: "Оплата 2-го места (AWP | Asiimov)",
    createdAt: "2025-01-07 12:40",
  },
  {
    id: "op2",
    type: "upgrade_win",
    amount: +200,
    title: "Успешный апгрейд",
    createdAt: "2025-01-07 12:20",
  },
  {
    id: "op3",
    type: "deposit",
    amount: +500,
    title: "Пополнение баланса",
    createdAt: "2025-01-07 11:55",
  },
],


};
