import { createSlice } from "@reduxjs/toolkit";
import { IReduxAction } from "../../interfaces/IReduxAction";

const globalMessagesSlice = createSlice({
    name: 'globalmessages',
    initialState: { 
        errorMessages: [] as string[],
        successMessages: [] as string[]
    },
    reducers: {
        addErrorMessage(state, action: IReduxAction) {
            state.errorMessages = [...state.errorMessages, action.payload];
        },
        addSuccessMessage(state, action: IReduxAction) {
            state.successMessages = [...state.successMessages, action.payload];
        },
        clearAndAddSuccessMessage(state, action: IReduxAction) {
            state.successMessages = [action.payload];
            state.errorMessages = [];
        },
        clearAndAddErrorMessage(state, action: IReduxAction) {
            state.errorMessages = [action.payload];
            state.successMessages = [];
        },
        clearAllGlobalMessage(state, _: IReduxAction) {
            state.errorMessages = [];
            state.successMessages = [];
        }
    }
});

export const { addErrorMessage, clearAndAddSuccessMessage, clearAndAddErrorMessage, clearAllGlobalMessage } = globalMessagesSlice.actions;

export default globalMessagesSlice.reducer;