import React, { useCallback, useEffect } from "react";
import { Text, View, StyleSheet, Button, Linking, Alert } from "react-native";
import { TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET } from "@env";
import {
  makeRedirectUri,
  ResponseType,
  useAuthRequest,
} from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import { getTwitchUserInformation } from "../Fetch/getUserInfo";
import { useDispatch } from "react-redux";
import { authorize_token } from "../../redux/reducers/credentialsSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const discovery = {
  authorizationEndpoint: "https://id.twitch.tv/oauth2/authorize",
  tokenEndpoint: "https://id.twitch.tv/oauth2/token",
  // revocationEndpoint: "https://id.twitch.tv/oauth2/revoke",
};

WebBrowser.maybeCompleteAuthSession();

const Home = ({ navigation }: any) => {
  const loggedIn = useSelector((state: RootState) => state.user.loggedIn);
  const dispatch = useDispatch();

  const signIn = async () => {
    const request = new AuthSession.AuthRequest({
      clientId: TWITCH_CLIENT_ID,
      redirectUri: makeRedirectUri({ useProxy: true }),
    });

    const redirectUrl = request?.redirectUri;
    const authUrl = `https://id.twitch.tv/oauth2/authorize?client_id=${TWITCH_CLIENT_ID}&redirect_uri=${redirectUrl}&response_type=token&scope=openid+moderator:manage:announcements+chat:edit+chat:read+moderation:read+channel:read:subscriptions+moderator:manage:chat_settings+moderator:read:chat_settings+user:edit+user:read:email&force_verify=true`;
    const response = await AuthSession.startAsync({ authUrl });

    if (response?.type === "success") {
      const { access_token } = response.params;

      //Stores bearer token
      dispatch(authorize_token(access_token));

      //Fetches and stores user's info and channel info
      getTwitchUserInformation(access_token, dispatch, navigation);
    }
  };

  return (
    <View style={styles.container}>
      <Button
        //disabled={!request}
        title="Login"
        onPress={() => {
          signIn();
        }}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
