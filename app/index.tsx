import RouteButton from "@/components/libs/RouteButton";
import ThemeClassWrapper from "@/hooks/Themewrapper";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, Image } from "react-native";

export default function Home() {
  const router = useRouter();
  return (
    <ThemeClassWrapper>
      <View className="flex-col flex-1 bg-bg items-center justify-center">
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
      </View>
    </ThemeClassWrapper>
  );
}
