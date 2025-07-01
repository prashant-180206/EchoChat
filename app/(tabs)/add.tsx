import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import SearchBar from "@/components/libs/SearchBar";
import { set } from "react-hook-form";
import { Add_people, SearchPeople } from "@/backend/firebase/People";
import { UserStructure } from "@/types/user";
import LoadingModal from "@/components/libs/LoadingModal";
import { Timestamp } from "firebase/firestore";
import { useUser } from "@/context/UserContext";
import RouteButton from "@/components/libs/RouteButton";
import ThemeClassWrapper from "@/hooks/Themewrapper";

const add = () => {
  const [Searchvalue, setSearchValue] = useState("");
  const [SearchResults, setSearchResults] = useState<UserStructure[]>([]);
  const [Loading, setLoading] = useState(false);

  const { user } = useUser();

  const handleSearch = async () => {
    setLoading(true);
    if (Searchvalue.trim() !== "") {
      const results = await SearchPeople(Searchvalue);
      setSearchResults(results);
      setLoading(false);
      return;
    }
    setLoading(false);
  };
  return (
    <ThemeClassWrapper>
      <View className="flex-1 flex-col items-center justify-start bg-bg">
        <LoadingModal visible={Loading} />
        <SearchBar
          onChangeText={setSearchValue}
          value={Searchvalue}
          className="w-11/12 my-4 "
          onSearch={handleSearch}
        />
        <RouteButton path="./../(auth)/login" Name="Index" />

        <View className="w-full px-4 flex-col gap-2 flex-1">
          {SearchResults.map((userval, index) => (
            <View
              key={index}
              className="flex-row items-center justify-between gap-2  border-2 border-bg-200 p-4 rounded-2xl mb-2"
            >
              <View className="flex-row items-center w-4/6">
                <View className="w-20 h-20">
                  <Image
                    source={{
                      uri: userval.ProfilePicUrl
                        ? userval.ProfilePicUrl
                        : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
                    }}
                    className="flex-1 bg-black rounded-full border-2 border-secondary-100"
                  />
                </View>
                <View className="flex-col pl-2">
                  <Text className="text-text font-semibold text-xl">
                    {userval.Name}
                  </Text>
                  <Text className="text-text-100">{userval.Email}</Text>
                </View>
              </View>
              <TouchableOpacity
                className=""
                onPress={async () => {
                  setLoading(true);
                  if (user === null) {
                    console.log("User is null, cannot add people");
                    setLoading(false);
                    return;
                  }
                  const added = await Add_people(userval, user);
                  if (added) {
                    Alert.alert("Success", "User added successfully");
                  } else {
                    Alert.alert("Error", "Failed to add user");
                  }
                  setLoading(false);
                }}
              >
                <Text className="bg-secondary-100 px-4 p-2 rounded-full font-semibold">
                  + add
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    </ThemeClassWrapper>
  );
};

export default add;
