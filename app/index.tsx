import Constants from "expo-constants";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { createWebView } from "@webview-bridge/react-native";
import { appBridge } from "@/bridge";
const { WebView } = createWebView({
  bridge: appBridge,
});

export default function LayerApp() {
  const insets = useSafeAreaInsets();
  return (
    <WebView
      originWhitelist={["*"]}
      style={{
        flex: 1,
        paddingBottom: insets.bottom,
      }}
      source={{
        uri: "https://stg.layerapp.io/",
      }}
    />
  );
}
