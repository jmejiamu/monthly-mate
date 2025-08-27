import { createAction } from "@reduxjs/toolkit";

// Payload: { year: string, month: string, billIndex: number, participant: string }
export const removeParticipantFromBill = createAction<{
  year: string;
  month: string;
  billIndex: number;
  participant: string;
}>("bill/removeParticipantFromBill");
