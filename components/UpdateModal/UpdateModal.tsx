import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";

type UpdateModalProps = {
  visible: boolean;
  onReload: () => void;
  onClose: () => void;
};

export const UpdateModal = ({
  visible,
  onReload,
  onClose,
}: UpdateModalProps) => {
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      await onReload();
    } finally {
      setLoading(false);
    }
  };

  if (!visible) return null;

  return (
    <View style={styles.absoluteOverlay}>
      <View style={styles.modalContent}>
        {/* Icon */}
        <View style={styles.iconContainer}>{/* <svgImages.cables /> */}</View>
        {/* Title */}
        <Text style={styles.title}>Update Available</Text>
        {/* Description */}
        <Text style={styles.description}>
          A new update is available for download.
        </Text>
        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.updateButton}
            onPress={handleUpdate}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.updateButtonText}>Update Now</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={onClose}
            disabled={loading}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  absoluteOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 24,
    borderRadius: 25,
    width: "90%",
    alignItems: "center",
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: 16,
    position: "absolute",
    top: -50,
    left: "50%",
    transform: [{ translateX: -20 }],
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 9,
  },
  title: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    color: "#020047",
    fontFamily: "noto-sans-bold",
    marginTop: 40,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "black",
    marginBottom: 24,
    fontFamily: "noto-sans-regular",
    paddingHorizontal: 10,
    lineHeight: 25,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 16,
  },
  updateButton: {
    backgroundColor: "#F94171",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    flex: 1,
    marginHorizontal: 8,
    alignItems: "center",
  },
  updateButtonText: {
    fontFamily: "noto-sans-bold",
    color: "white",
    fontSize: 18,
  },
  cancelButton: {
    backgroundColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#FFA500",
    flex: 1,
    marginHorizontal: 8,
    alignItems: "center",
  },
  cancelButtonText: {
    fontFamily: "noto-sans-bold",
    color: "#FFA500",
    fontSize: 18,
  },
});
