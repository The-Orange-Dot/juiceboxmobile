import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
  loggedIn: boolean;
  user: {
    username: string;
    display_name: string;
    id: string;
    email: string;
    image: string;
  };
  channel: {
    broadcast_type: string;
    view_count: number;
    follower_count: number;
    subscriber_count: number;
    sub_points: number;
    description: string;
  };
}

const initialState: UserState = {
  loggedIn: false,
  user: {
    username: "",
    display_name: "",
    id: "",
    email: "",
    image: "",
  },
  channel: {
    broadcast_type: "",
    view_count: 0,
    follower_count: 0,
    subscriber_count: 0,
    sub_points: 0,
    description: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logIn: (state, action) => {
      state.loggedIn = true;
      state.user.username = action.payload.user.username;
      state.user.id = action.payload.user.id;
      state.user.display_name = action.payload.user.display_name;
      state.user.email = action.payload.user.email;
      state.user.image = action.payload.user.image;
      state.channel.view_count = action.payload.channel.view_count;
      state.channel.follower_count = action.payload.channel.follower_count;
      state.channel.subscriber_count = action.payload.channel.subscriber_count;
      state.channel.description = action.payload.channel.description;
      state.channel.sub_points = action.payload.channel.sub_points;
    },
    logOut: (state) => {
      state.loggedIn = false;
      state.user.username = "";
      state.user.id = "";
      state.user.display_name = "";
      state.user.email = "";
      state.user.image = "";
      state.channel.view_count = 0;
      state.channel.follower_count = 0;
      state.channel.subscriber_count = 0;
      state.channel.sub_points = 0;
      state.channel.description = "";
    },
  },
});

export const { logIn, logOut } = userSlice.actions;

export default userSlice.reducer;
