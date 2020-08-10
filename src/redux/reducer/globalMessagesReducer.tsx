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
        clearAndAddSuccessMessages(state, action: IReduxAction) {
            state.successMessages = [action.payload];
            state.errorMessages = [];
        },
        clearAndAddErrorMessages(state, action: IReduxAction) {
            state.errorMessages = [action.payload];
            state.successMessages = [];
        },
        clearAllGlobalMessages(state, _: IReduxAction) {
            state.errorMessages = [];
            state.successMessages = [];
        }
    }
});

export const { addErrorMessage, addSuccessMessage, clearAndAddSuccessMessages, clearAndAddErrorMessages, clearAllGlobalMessages } = globalMessagesSlice.actions;

export default globalMessagesSlice.reducer;