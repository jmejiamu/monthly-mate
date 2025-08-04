import { RootState } from "@/redux/store/store";

export const selectCurrentBill = (state: RootState) => state.bill.currentBill;
export const selectParticipants = (state: RootState) =>
  state.bill.currentBill.participants;

export const selectBillsByMonth = (state: RootState) => state.bill;
