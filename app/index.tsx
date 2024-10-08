import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { createWebView } from "@webview-bridge/react-native";
import { appBridge } from "@/bridge";
import { useEffect } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import { PERMISSIONS } from "react-native-permissions";
const { WebView } = createWebView({
  bridge: appBridge,
});

export default function LayerApp() {
  const insets = useSafeAreaInsets();

  const customUserAgent = "customUserAgent";
  useEffect(() => {
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    if (Platform.OS === "ios") {
      // iOS는 자동으로 권한을 요청하므로, 추가 설정이 필요 없습니다.
    } else {
      // 안드로이드의 경우 권한 요청이 필요합니다.
      const granted = await PermissionsAndroid.requestMultiple([
        PERMISSIONS.ANDROID.CAMERA,
        PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
      ]);

      if (
        granted["android.permission.CAMERA"] ===
        PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log("Camera permission granted");
      } else {
        console.log("Camera permission denied");
      }
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <WebView
        userAgent={customUserAgent}
        originWhitelist={["*"]}
        style={{
          flex: 1,
        }}
        contentInsetAdjustmentBehavior="never"
        scrollEnabled
        allowsInlineMediaPlayback
        mediaCapturePermissionGrantType="grantIfSameHostElsePrompt"
        bounces={false}
        source={{
          uri: "https://layerapp.io/",
        }}
      />
    </SafeAreaView>
  );
}
