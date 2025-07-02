import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import SearchBar from "@/components/libs/SearchBar";
import { Add_people, SearchPeople } from "@/backend/firebase/People";
import { UserStructure } from "@/types/user";
import LoadingModal from "@/components/libs/LoadingModal";
import { useUser } from "@/context/UserContext";
import RouteButton from "@/components/libs/RouteButton";
import ThemeClassWrapper from "@/hooks/Themewrapper";
import SearchResult from "@/components/SearchResult";

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

  const handleAdd = async (userval: UserStructure) => {
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
            <SearchResult
              key={userval.Email}
              person={userval}
              onAdd={async () => await handleAdd(userval)}
            />
          ))}
        </View>
      </View>
    </ThemeClassWrapper>
  );
};

export default add;
