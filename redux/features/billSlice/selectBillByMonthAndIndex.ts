import { RootState } from "@/redux/store/store";

export const selectBillByYearMonthAndIndex =
  (year: string, month: string, index: number) => (state: RootState) => {
    const bills = state.bill.billsByYear?.[year]?.[month] || [];
    return bills[index];
  };
