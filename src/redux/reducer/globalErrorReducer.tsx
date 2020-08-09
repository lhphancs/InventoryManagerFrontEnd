import { createSlice } from "@reduxjs/toolkit";
import { IReduxAction } from "../../interfaces/IReduxAction";

const globalErrorSlice = createSlice({
    name: 'globalerror',
    initialState: { message: '' },
    reducers: {
        setGlobalError(state, action: IReduxAction) {
            state.message = action.payload;
        },
        clearGlobalError(state, _: IReduxAction) {
            state.message = '';
        }
    }
});

export const { setGlobalError, clearGlobalError } = globalErrorSlice.actions;

export default globalErrorSlice.reducer;