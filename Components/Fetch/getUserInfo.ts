import { TWITCH_CLIENT_ID } from "@env";
import { logIn } from "../../redux/reducers/userInfoSlice";

export const getTwitchUserInformation = (
  twitchToken: string,
  dispatch: any,
  navigation: any
) => {
  const userUrl = "https://api.twitch.tv/helix/users";
  const header = {
    Authorization: `Bearer ${twitchToken}`,
    "Client-ID": TWITCH_CLIENT_ID,
  };

  fetch(userUrl, {
    method: "GET",
    headers: header,
  })
    .then((response) => response.json())
    .then(async (response) => {
      const userResponse = response && response.data[0];

      const followers_promise = await fetch(
        `https://api.twitch.tv/helix/users/follows?to_id=${userResponse.id}`,
        { method: "GET", headers: header }
      );
      const subs_promise = await fetch(
        `https://api.twitch.tv/helix/subscriptions?broadcaster_id=${userResponse.id}`,
        { method: "GET", headers: header }
      );
      const followers = await followers_promise.json();
      const subs = await subs_promise.json();

      await dispatch(
        logIn({
          login: true,
          user: {
            username: userResponse.login,
            display_name: userResponse.display_name,
            id: userResponse.id,
            email: userResponse.email,
            image: userResponse.profile_image_url,
          },
          channel: {
            description: userResponse.description,
            view_count: userResponse.view_count,
            follower_count: followers.total,
            subscriber_count: subs.total,
            sub_points: subs.points,
          },
        })
      );

      if (userResponse) {
        navigation.navigate("Dashboard");
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
