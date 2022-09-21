import React, { useCallback, useEffect } from "react";
import { Text, View, StyleSheet, Button, Linking, Alert } from "react-native";
import { TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET } from "@env";
import {
  makeRedirectUri,
  ResponseType,
  useAuthRequest,
} from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

const discovery = {
  authorizationEndpoint: "https://id.twitch.tv/oauth2/authorize",
  tokenEndpoint: "https://id.twitch.tv/oauth2/token",
  revocationEndpoint: "https://id.twitch.tv/oauth2/revoke",
};

const Home = () => {
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: TWITCH_CLIENT_ID,
      redirectUri: makeRedirectUri({
        scheme: "juiceBoxExpo",
      }),
      scopes: ["user:read:email", "analytics:read:games"],
    },
    discovery
  );

  React.useEffect(() => {
    console.log(response);
    if (response?.type === "success") {
      const { code } = response.params;
    }
  }, [response]);

  // const twitchlink = `https://id.twitch.tv/oauth2/authorize?response_type=token%20id_token&client_id=${TWITCH_CLIENT_ID}&redirect_uri=http://localhost:3000&scope=channel%3Amanage%3Apolls+channel%3Aread%3Apolls+openid`;

  // const loginPress = useCallback(async () => {
  //   await Linking.openURL(twitchlink);
  // }, [twitchlink]);

  // const handlePress = async () => {
  //   const res = await fetch("https://id.twitch.tv/oauth2/token", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/x-www-form-urlencoded" },
  //     body: `client_id=${TWITCH_CLIENT_ID}&client_secret=${TWITCH_CLIENT_SECRET}&grant_type=client_credentials`,
  //   });

  //   const key = await res.json();

  //   console.log(key);
  // };

  return (
    <View style={styles.container}>
      {/* <Button title="oauth" onPress={handlePress} />
      <Button title="Login" onPress={loginPress} /> */}
      <Button
        disabled={!request}
        title="Login"
        onPress={() => {
          promptAsync();
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
