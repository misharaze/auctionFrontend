import { create } from "zustand";

export const useAuctionStore = create(set => ({
  auctions: [],
  currentAuction: null,
  bids: [],

  setAuctions: auctions => set({ auctions }),
  setCurrentAuction: auction => set({ currentAuction: auction }),
  addBid: bid => set(state => ({ bids: [bid, ...state.bids] }))
}));
