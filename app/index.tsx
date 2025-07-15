import { StartApp } from "@/backend/firebase/login";
import LoadingModal from "@/components/libs/LoadingModal";
import RouteButton from "@/components/libs/RouteButton";
import ThemeClassWrapper from "@/hooks/Themewrapper";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

export default function Home() {
  const router = useRouter();
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    const tryAutoLogin = async () => {
      setLoading(true);
      const success = await StartApp();
      if (success) {
        router.replace("./(tabs)/chats/list");
      }
    };
    tryAutoLogin();
    setLoading(false);
  }, []);

  return (
    <ThemeClassWrapper>
      <View className="flex-col flex-1 bg-bg items-center justify-center">
        <LoadingModal visible={Loading} />
        <RouteButton
          path="./(tabs)/chats/chat/test@5.in"
          Name="Move"
        ></RouteButton>
        <Text className="text-primary-200 font-semibold text-3xl mb-4 bg">
          Welcome to EchoChat !
        </Text>
        <Image
          source={require("./../assets/images/LOGO_BG_TRANSPARENT.png")}
          resizeMode="contain"
          className="w-60 h-60 "
        />
        <Text className="text-2xl text-text my-4 font-semibold ">
          Lets connect{" "}
        </Text>
        <Text className="text-text-100 font-semibold text-sm">
          New To Echohat , Click Here to SignUp
        </Text>

        <RouteButton path="./(auth)/signup" Name="SignUp" />
        <Text className="text-text-100 font-semibold text-sm">
          Already Have an Accont , Click here to Login
        </Text>
        <RouteButton
          path="./(auth)/login"
          Name="Login"
          className="bg-secondary "
        />
        <RouteButton path="./(tabs)/add" Name="Move to Tabs" />
      </View>
    </ThemeClassWrapper>
  );
}
