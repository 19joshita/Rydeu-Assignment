import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CalendarState {
  selectedDate: string | null;
  selectedTime: string | null;
}

const initialState: CalendarState = {
  selectedDate: null,
  selectedTime: null,
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setDate(state, action: PayloadAction<string>) {
      state.selectedDate = action.payload;
    },
    setTime(state, action: PayloadAction<string>) {
      state.selectedTime = action.payload;
    },
    resetCalendar(state) {
      state.selectedDate = null;
      state.selectedTime = null;
    },
  },
});

export const { setDate, setTime, resetCalendar } = calendarSlice.actions;
export default calendarSlice.reducer;
