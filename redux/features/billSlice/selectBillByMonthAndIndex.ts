import { RootState } from "@/redux/store/store";

export const selectBillByMonthAndIndex =
  (month: string, index: number) => (state: RootState) => {
    const bills = state.bill.billsByMonth[month] || [];
    return bills[index];
  };
