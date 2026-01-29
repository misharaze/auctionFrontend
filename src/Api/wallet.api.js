import { http } from "./http";

export const getWalletBalance = () =>
  http.get("/api/wallet/balance").then(r => r.data);

export const getWalletOperations = () =>
  http.get("/api/wallet/operations").then(r => r.data);

export const deposit = (amount, method) =>
  http.post("/api/wallet/deposit", { amount, method });

export const withdraw = (amount, method, details) =>
  http.post("/api/wallet/withdraw", { amount, method, details });

export const getDeposits = () =>
  http.get("/api/wallet/deposits").then(r => r.data);

export const getWithdraws = () =>
  http.get("/api/wallet/withdraws").then(r => r.data);
