import { Button, Text, View } from "tamagui";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Button m={10} size="$4">
        Press ME
      </Button>
    </View>
  );
}
