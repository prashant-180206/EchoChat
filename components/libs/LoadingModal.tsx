import { Modal, View, ActivityIndicator } from "react-native";

type LoadingModalProps = {
  visible: boolean;
};

const LoadingModal = ({ visible }: LoadingModalProps) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >
      <View className="flex-1 justify-center items-center bg-black/70">
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    </Modal>
  );
};

export default LoadingModal;
