import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { removeParticipantFromBill } from "./removeParticipantFromBill";

interface Bill {
  amount: string;
  description: string;
  participants: string[];
  month?: string;
}

interface BillState {
  billsByMonth: {
    [month: string]: Bill[];
  };
  currentBill: Bill;
}

const initialBill: Bill = {
  amount: "",
  description: "",
  participants: [],
  month: "",
};

const initialState: BillState = {
  billsByMonth: {},
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
      const { month, ...rest } = action.payload;
      if (!month) return;
      const billCopy = {
        ...rest,
        month,
        participants: [...action.payload.participants],
      };
      if (!state.billsByMonth[month]) {
        state.billsByMonth[month] = [];
      }
      state.billsByMonth[month].push(billCopy);
    },
    resetBill: (state) => {
      state.currentBill = {
        ...initialBill,
        participants: [],
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(removeParticipantFromBill, (state, action) => {
      const { month, billIndex, participant } = action.payload;
      const bills = state.billsByMonth[month];
      if (bills && bills[billIndex]) {
        bills[billIndex].participants = bills[billIndex].participants.filter(
          (p) => p !== participant
        );
      }
    });
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
