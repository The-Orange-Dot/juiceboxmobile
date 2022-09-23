import { createSlice } from "@reduxjs/toolkit";

export interface credentials {
  bearer_token: string | undefined;
}

const initialState: credentials = {
  bearer_token: undefined,
};

export const credentialsSlice = createSlice({
  name: "credentials",
  initialState,
  reducers: {
    authorize_token: (state, action) => {
      state.bearer_token = action.payload.bearer_token;
    },
  },
});

export const { authorize_token } = credentialsSlice.actions;
export default credentialsSlice.reducer;
