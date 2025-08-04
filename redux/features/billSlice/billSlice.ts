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
      state.currentBill.participants.push({
        name: action.payload,
        paid: false,
      });
    },
    removeParticipant: (state, action: PayloadAction<string>) => {
      state.currentBill.participants = state.currentBill.participants.filter(
        (participant) => participant.name !== action.payload
      );
    },
    toggleParticipantPaid: (
      state,
      action: PayloadAction<{
        month: string;
        billIndex: number;
        participantName: string;
      }>
    ) => {
      const { month, billIndex, participantName } = action.payload;
      const bills = state.billsByMonth[month];
      if (bills && bills[billIndex]) {
        const participant = bills[billIndex].participants.find(
          (p) => p.name === participantName
        );
        if (participant) {
          participant.paid = !participant.paid;
        }
      }
    },
    saveBill: (state, action: PayloadAction<Bill>) => {
      const { month, ...rest } = action.payload;
      if (!month) return;
      const billCopy = {
        ...rest,
        month,
        participants: action.payload.participants.map((p) => ({ ...p })),
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
} = billSlice.actions;
export default billSlice.reducer;
