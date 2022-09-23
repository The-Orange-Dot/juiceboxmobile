import React, { useEffect } from "react";
import { ScrollView, Text } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import NavBar from "../NavBar";

const Dashboard = ({ navigation }: any) => {
  const loggedIn = useSelector((state: RootState) => state.user.loggedIn);
  const user = useSelector((state: RootState) => state.user.user);
  const channel = useSelector((state: RootState) => state.user.channel);

  useEffect(() => {
    console.log(loggedIn);
    if (!loggedIn) {
      navigation.navigate("Login");
    }
  }, []);

  return (
    <>
      <ScrollView>
        <Text>{JSON.stringify(user)}</Text>
        <Text>{JSON.stringify(channel)}</Text>
      </ScrollView>
      <NavBar />
    </>
  );
};

export default Dashboard;
