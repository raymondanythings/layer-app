import { bridge } from "@webview-bridge/react-native";

import Constants from "expo-constants";
import { useContext } from "react";

export const appBridge = bridge({
  async getSafeAreaHeight(): Promise<number> {
    return Constants.statusBarHeight;
  },

  async checkWebview() {
    return true;
  },
});
