import { createAction } from "@reduxjs/toolkit";

// Payload: { month: string, billIndex: number, participant: string }
export const removeParticipantFromBill = createAction<{
  month: string;
  billIndex: number;
  participant: string;
}>("bill/removeParticipantFromBill");
