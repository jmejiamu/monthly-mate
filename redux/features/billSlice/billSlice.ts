import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { removeParticipantFromBill } from "./removeParticipantFromBill";

interface Participant {
  name: string;
  paid: boolean;
}

export interface Bill {
  amount: string;
  description: string;
  participants: Participant[];
  month?: string;
}

interface BillState {
  billsByYear: {
    [year: string]: {
      [month: string]: Bill[];
    };
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
  billsByYear: {},
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
      state.currentBill.participants.push({
        name: action.payload,
        paid: false,
      });
    },
    addParticipantToBill: (
      state,
      action: PayloadAction<{
        year: string;
        month: string;
        billIndex: number;
        participantName: string;
      }>
    ) => {
      const { year, month, billIndex, participantName } = action.payload;
      const bills = state.billsByYear[year]?.[month];
      if (bills && bills[billIndex]) {
        bills[billIndex].participants.push({
          name: participantName,
          paid: false,
        });
      }
    },
    removeParticipant: (state, action: PayloadAction<string>) => {
      state.currentBill.participants = state.currentBill.participants.filter(
        (participant) => participant.name !== action.payload
      );
    },
    toggleParticipantPaid: (
      state,
      action: PayloadAction<{
        year: string;
        month: string;
        billIndex: number;
        participantName: string;
      }>
    ) => {
      const { year, month, billIndex, participantName } = action.payload;
      const bills = state.billsByYear[year]?.[month];
      if (bills && bills[billIndex]) {
        const participant = bills[billIndex].participants.find(
          (p) => p.name === participantName
        );
        if (participant) {
          participant.paid = !participant.paid;
        }
      }
    },
    saveBill: (state, action: PayloadAction<Bill & { year: string }>) => {
      const { month, year, ...rest } = action.payload;
      if (!month || !year) return;
      const billCopy = {
        ...rest,
        month,
        participants: action.payload.participants.map((p) => ({ ...p })),
      };

      if (!state.billsByYear[year]) {
        state.billsByYear[year] = {};
      }
      if (!state.billsByYear[year][month]) {
        state.billsByYear[year][month] = [];
      }
      state.billsByYear[year][month].push(billCopy);
    },
    resetBill: (state) => {
      state.currentBill = {
        ...initialBill,
        participants: [],
      };
    },
    deleteBill: (
      state,
      action: PayloadAction<{ year: string; month: string; billIndex: number }>
    ) => {
      const { year, month, billIndex } = action.payload;
      const bills = state.billsByYear[year]?.[month];
      if (bills && bills[billIndex]) {
        bills.splice(billIndex, 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(removeParticipantFromBill, (state, action) => {
      const { year, month, billIndex, participant } = action.payload;
      const bills = state.billsByYear[year]?.[month];
      if (bills && bills[billIndex]) {
        bills[billIndex].participants = bills[billIndex].participants.filter(
          (p) => p.name !== participant
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
  toggleParticipantPaid,
  addParticipantToBill,
  deleteBill,
} = billSlice.actions;
export default billSlice.reducer;
