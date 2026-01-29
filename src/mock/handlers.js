// src/mocks/handlers.js
import { http, HttpResponse, delay } from "msw";
import { db } from "./db";

const getAuctionSummary = (a) => {
  const sorted = [...a.bids].sort((x, y) => y.amount - x.amount);
  const leader = sorted[0]?.amount ?? a.startPrice;
  const second = sorted[1]?.amount ?? null;

  return {
    id: a.id,
    title: a.title,
    startPrice: a.startPrice,
    minStep: a.minStep,
    timeLeft: a.timeLeft,
    status: a.status,
    bidsCount: a.bids.length,
    leader,
    second,
  };
};


export const handlers = [
  // GET /api/auctions — список
  http.get("/api/auctions", async () => {
    await delay(350);
    return HttpResponse.json(db.auctions.map(getAuctionSummary));
  }),

  // GET /api/auctions/:id — один аукцион (полные данные)
  http.get("/api/auctions/:id", async ({ params }) => {
    await delay(350);
    const auction = db.auctions.find((a) => a.id === params.id);

    if (!auction) {
      return new HttpResponse("Auction not found", { status: 404 });
    }

    return HttpResponse.json(auction);
  }),

http.get("/api/me/operations", async () => {
  await delay(300);
  return HttpResponse.json(db.operations);
}),


  // POST /api/auctions/:id/bid — сделать ставку
  http.post("/api/auctions/:id/bid", async ({ params, request }) => {
    await delay(350);
    const auction = db.auctions.find((a) => a.id === params.id);
    if (!auction) return new HttpResponse("Auction not found", { status: 404 });

    const body = await request.json();
    const amount = Number(body?.amount);

    if (!amount || Number.isNaN(amount)) {
      return new HttpResponse("Invalid amount", { status: 400 });
    }

    const sorted = [...auction.bids].sort((x, y) => y.amount - x.amount);
    const leaderAmount = sorted[0]?.amount ?? auction.startPrice;
    const minNext = leaderAmount + auction.minStep;

    if (amount < minNext) {
      return new HttpResponse(`Min next bid is ${minNext}`, { status: 400 });
    }

    if (db.me.balance < amount) {
      return new HttpResponse("Not enough balance", { status: 400 });
    }

    // Пример логики: ставку НЕ списываем сразу (спишем потом по правилам на бэке)
    // Сейчас просто добавляем в историю
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");

    const newBid = {
      id: `b_${Date.now()}`,
      userId: db.me.id,
      username: db.me.username,
      amount,
      time: `${hh}:${mm}`,
    };

    auction.bids.unshift(newBid);

    return HttpResponse.json({
      ok: true,
      bid: newBid,
      auction,
    });
  }),

  // GET /api/me
  http.get("/api/me", async () => {
    await delay(200);
    return HttpResponse.json(db.me);
  }),

  // GET /api/me/balance
  http.get("/api/me/balance", async () => {
    await delay(200);
    return HttpResponse.json({ balance: db.me.balance });
  }),

  // POST /api/upgrades — простая имитация апгрейда
  http.post("/api/upgrades", async ({ request }) => {
    await delay(400);
    const body = await request.json();

    // Простейшая модель шанса (потом заменим на реальную)
    const chance = 42;
    const roll = Math.random() * 100;
    const success = roll <= chance;

    // Условная экономика
    if (success) db.me.balance += 200;
    else db.me.balance -= 120;

    return HttpResponse.json({
      ok: true,
      success,
      chance,
      fromItemId: body?.fromItemId ?? null,
      toItemId: body?.toItemId ?? null,
      newBalance: db.me.balance,
    });
 

  }),


];
