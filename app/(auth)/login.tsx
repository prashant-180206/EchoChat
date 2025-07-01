import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { useForm, Controller, set } from "react-hook-form";
import { Signup, validateSignup } from "@/backend/firebase/signup";
import ThemeClassWrapper from "@/hooks/Themewrapper";
import Input from "@/components/libs/Input";
import { useRouter } from "expo-router";
import LoadingModal from "@/components/libs/LoadingModal";
import ScreenWrapper from "@/components/libs/ScreenContainer";
import ScrollWrapper from "@/components/libs/ScreenContainer";
import { Login } from "@/backend/firebase/login";

type InputData = {
  Email: string;
  password: string;
};

const login = () => {
  const { control, handleSubmit } = useForm<InputData>({
    defaultValues: {
      Email: "",
      password: "",
    },
  });

  const router = useRouter();

  const [Error, setError] = useState<string>("");
  const [Loading, setLoading] = useState<boolean>(false);

  const onLogin = async (data: InputData) => {
    setLoading(true);
    const loaded = await Login(data.Email, data.password);
    if (!loaded) {
      setError("Login failed. Please check your credentials.");
      setLoading(false);
      return;
    }
    setLoading(false);
    router.push("/(tabs)/chats/chatlist");
  };

  return (
    <ThemeClassWrapper>
      <View className="flex-1  items-center justify-center flex-col ">
        <LoadingModal visible={Loading} />
        <KeyboardAvoidingView className="w-full items-center justify-center flex-col">
          <View className="w-full h-full items-center justify-center">
            <View className="w-5/6 md:w-2/6 pb-32">
              {Error && (
                <Text className="text-red-600 mb-4 w-full text-center font-semibold text-xl">
                  {Error}
                </Text>
              )}

              <Controller
                control={control}
                name="Email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    Title="Enter Email"
                    placeholder="Enter Email"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    Title="Enter Password"
                    placeholder="Enter Password"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    VisibilityToggleShow
                  />
                )}
              />

              <TouchableOpacity
                onPress={() => handleSubmit(onLogin)()}
                className="w-full items-center justify-center"
              >
                <Text className="bg-accent-100 p-2 text-text font-semibold rounded-full text-xl px-10 border-2 border-accent-200">
                  Log In
                </Text>
              </TouchableOpacity>
              <Text className="text-text text-center mt-4">
                New to EchoChat ?{" "}
                <Text
                  className="text-accent-100 font-semibold"
                  onPress={() => router.push("/(auth)/signup")}
                >
                  Sign Up
                </Text>
              </Text>
            </View>
          </View>
          {/* <View className="w-full h-[100dvh] bg-secondary-100  items-center justify-center">
            <ScrollView className="w-full">
             
            </ScrollView>
          </View> */}
        </KeyboardAvoidingView>
      </View>
    </ThemeClassWrapper>
  );
};

export default login;
