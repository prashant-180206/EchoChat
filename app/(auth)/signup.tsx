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
import { useForm, Controller } from "react-hook-form";
import { Signup, validateSignup } from "@/backend/firebase/signup";
import ThemeClassWrapper from "@/hooks/Themewrapper";
import Input from "@/components/libs/Input";
import { useRouter } from "expo-router";
import LoadingModal from "@/components/libs/LoadingModal";
import ScreenWrapper from "@/components/libs/ScreenContainer";
import ScrollWrapper from "@/components/libs/ScreenContainer";

type InputData = {
  Firstname: string;
  Lastname: string;
  Email: string;
  password: string;
  confirmPassword: string;
  Bio: string;
};

const signup = () => {
  const { control, handleSubmit } = useForm<InputData>({
    defaultValues: {
      Firstname: "",
      Lastname: "",
      Email: "",
      password: "",
      confirmPassword: "",
      Bio: "",
    },
  });

  const router = useRouter();

  const [Error, setError] = useState<string>("");
  const [Loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (data: InputData) => {
    setLoading(true);
    const { Firstname, Lastname, Email, password, confirmPassword, Bio } = data;
    const { valid, error } = validateSignup(
      Firstname,
      Lastname,
      Email,
      password,
      confirmPassword,
      Bio
    );
    if (!valid) {
      setError(error || "Validation failed");
      return;
    }
    const complete = await Signup(Email, password, Bio, Firstname, Lastname);
    if (!complete) {
      setError("Signup failed, please try again.");
    }
    setLoading(false);
    router.push("/(auth)/login");
  };

  return (
    <ThemeClassWrapper>
      <View className="flex-1  items-center justify-center flex-col ">
        <LoadingModal visible={Loading} />
        <KeyboardAvoidingView className="w-full items-center justify-center flex-col">
          <ScrollWrapper>
            <View className="w-5/6 md:w-2/6">
              {Error && (
                <Text className="text-red-600 mb-4 w-full text-center font-semibold text-xl">
                  {Error}
                </Text>
              )}
              <Controller
                control={control}
                name="Firstname"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    Title="Enter First name"
                    placeholder="Enter First name"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />

              <Controller
                control={control}
                name="Lastname"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    Title="Enter Lastname"
                    placeholder="Enter Lastname"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
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
              <Controller
                control={control}
                name="confirmPassword"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    Title="Enter Password Again"
                    placeholder="Confirm Password"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    VisibilityToggleShow
                  />
                )}
              />
              <Controller
                control={control}
                name="Bio"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    Title="Enter Bio"
                    placeholder="Tell About Yourself"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    numberOfLines={3}
                    className="h-24 rounded-3xl"
                  />
                )}
              />
              <TouchableOpacity
                onPress={() => handleSubmit(onSubmit)()}
                className="w-full items-center justify-center"
              >
                <Text className="bg-accent-100 p-4 text-text font-semibold rounded-full text-xl px-10 border-2 border-accent-200">
                  Submit
                </Text>
              </TouchableOpacity>
              <Text className="text-text text-center mt-4">
                Already have an account?{" "}
                <Text
                  className="text-accent-100 font-semibold"
                  onPress={() => router.push("/(auth)/login")}
                >
                  Log In
                </Text>
              </Text>
            </View>
          </ScrollWrapper>
          {/* <View className="w-full h-[100dvh] bg-secondary-100  items-center justify-center">
            <ScrollView className="w-full">
             
            </ScrollView>
          </View> */}
        </KeyboardAvoidingView>
      </View>
    </ThemeClassWrapper>
  );
};

export default signup;
