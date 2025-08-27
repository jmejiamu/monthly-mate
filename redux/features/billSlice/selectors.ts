import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store/store";

export const selectCurrentBill = (state: RootState) => state.bill.currentBill;
export const selectParticipants = (state: RootState) =>
  state.bill.currentBill.participants;

export const selectBillsByYearMonth = createSelector(
  [
    (state: RootState) => state.bill.billsByYear,
    (state: RootState, year: string) => year,
    (state: RootState, _year: string, month: string) => month,
  ],
  (billsByYear, year, month) => billsByYear?.[year]?.[month] || []
);
