import React from "react";
import { Platform, StatusBar } from "react-native";
import { StackNavigator , TabNavigator,SwitchNavigator, createStackNavigator, 
  createBottomTabNavigator, createSwitchNavigator} from "react-navigation";
import { FontAwesome } from "react-native-vector-icons";

import SignUp from "../screen/Signup";
import SignIn from "../screen/Signin";
import Home from "../screen/Home";
import Profile from "../screen/Profile";
import SelectedScreen from '../screen/SelectedScreen';

const headerStyle = {
  marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
};

export const SignedOut = createStackNavigator({
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      title: "Sign Up",
      headerStyle,
    }
  },
  SignIn: {
    screen: SignIn,
    navigationOptions: {
      title: "Sign In",
      headerStyle
    }
  },
  Selected: {
    screen: SelectedScreen,
    navigationOptions:{
      title: "Chon san",
      headerStyle
    }
  }
});

export const SignedIn = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: "Home",
        // tabBarIcon: ({ tintColor }) => (
        //   <FontAwesome name="home" size={30} color={tintColor} />
        // )
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarLabel: "Profile", 
        // tabBarIcon: ({ tintColor }) => (
        //   <FontAwesome name="user" size={30} color={tintColor} />
        // )
      }
    }
  },
  {
    tabBarOptions: {
      style: {
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
      }
    }
  }
);

export const createRootNavigator = (signedIn = false) => {
  return createSwitchNavigator(
    {
      SignedIn: {
        screen: SignedIn
      },
      SignedOut: {
        screen: SignedOut
      }
    },
    {
      initialRouteName: signedIn ? "SignedIn" : "SignedOut"
    }
  );
};