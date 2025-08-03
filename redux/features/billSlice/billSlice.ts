import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Bill {
  amount: string;
  description: string;
  participants: string[];
  month?: string;
}

interface BillState {
  bills: Bill[];
  currentBill: Bill; // removed optional
}

const initialBill: Bill = {
  amount: "",
  description: "",
  participants: [],
  month: "",
};

const initialState: BillState = {
  bills: [],
  currentBill: { ...initialBill },
};

const billSlice = createSlice({
  name: "bill",
  initialState,
  reducers: {
    setAmount: (state, action: PayloadAction<string>) => {
      state.currentBill.amount = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.currentBill.description = action.payload;
    },
    addParticipant: (state, action: PayloadAction<string>) => {
      state.currentBill.participants.push(action.payload);
    },
    removeParticipant: (state, action: PayloadAction<string>) => {
      state.currentBill.participants = state.currentBill.participants.filter(
        (participant) => participant !== action.payload
      );
    },
    saveBill: (state, action: PayloadAction<Bill>) => {
      state.bills.push(action.payload);
      // state.currentBill = { ...initialBill };
    },
    resetBill: (state) => {
      state.currentBill = { ...initialBill };
    },
  },
});
export const {
  setAmount,
  setDescription,
  resetBill,
  addParticipant,
  removeParticipant,
  saveBill,
} = billSlice.actions;
export default billSlice.reducer;
