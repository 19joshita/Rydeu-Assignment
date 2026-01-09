import Calendar from "@/src/components/calendar/Calendar";
import TimePicker from "@/src/components/calendar/TimePiker";
import Header from "@/src/components/Header";
import { RootState } from "@/src/redux/store";
import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Dimensions,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

const { width } = Dimensions.get("window");
const scale = (size: number) => (width / 375) * size;
const Home = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { selectedDate, selectedTime } = useSelector(
    (state: RootState) => state.calendar
  );

  const [showCalendar, setShowCalendar] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const isSlotAvailable = useMemo(() => {
    if (!selectedDate || !selectedTime) return true;

    return !selectedTime.includes("11:") && !selectedTime.includes("12:");
  }, [selectedDate, selectedTime]);
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Stack.Screen
          options={{
            header: () => <Header email={user?.email ?? "example@gmai.com"} />,
          }}
        />
        <Text style={styles.sectionTitle}>Schedule Slot</Text>
        <Text style={styles.sectionSub}>Choose a convenient date & time</Text>
        <TouchableOpacity
          style={styles.inputWrapper}
          onPress={() => setShowCalendar(true)}
          activeOpacity={0.8}
        >
          <Ionicons name="calendar-outline" size={20} color="#2563EB" />
          <TextInput
            placeholder="Select Date"
            value={selectedDate ?? ""}
            editable={false}
            style={styles.input}
            placeholderTextColor="#9CA3AF"
          />
        </TouchableOpacity>

        {/* Time Input */}
        <TouchableOpacity
          style={styles.inputWrapper}
          onPress={() => setShowTimePicker(true)}
          activeOpacity={0.8}
        >
          <Ionicons name="time-outline" size={20} color="#2563EB" />
          <TextInput
            placeholder="Select Time"
            value={selectedTime ?? ""}
            editable={false}
            style={styles.input}
            placeholderTextColor="#9CA3AF"
          />
        </TouchableOpacity>

        {/* Slot Not Available */}
        {selectedDate && selectedTime && !isSlotAvailable && (
          <View style={styles.slotError}>
            <Ionicons name="alert-circle-outline" size={18} color="#DC2626" />
            <Text style={styles.slotErrorText}>
              Selected slot is not available
            </Text>
          </View>
        )}

        {/* Summary */}
        {selectedDate && selectedTime && isSlotAvailable && (
          <View style={styles.summary}>
            <Text style={styles.summaryTitle}>Selected Slot</Text>

            <View style={styles.summaryRow}>
              <Ionicons name="calendar-outline" size={18} color="#2563EB" />
              <Text style={styles.summaryText}>{selectedDate}</Text>
            </View>

            <View style={styles.summaryRow}>
              <Ionicons name="time-outline" size={18} color="#2563EB" />
              <Text style={styles.summaryText}>{selectedTime}</Text>
            </View>
          </View>
        )}

        {/* Calendar Modal */}
        <Modal visible={showCalendar} animationType="slide">
          <SafeAreaView style={{ flex: 1, backgroundColor: "#F9FAFB" }}>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                onPress={() => setShowCalendar(false)}
                style={styles.modalClose}
              >
                <Text style={styles.closeText}>Close</Text>
              </TouchableOpacity>

              <Calendar onClose={() => setShowCalendar(false)} />
            </View>
          </SafeAreaView>
        </Modal>

        {/* Time Picker */}
        <TimePicker visible={showTimePicker} setVisible={setShowTimePicker} />
      </View>
    </SafeAreaView>
  );
};

export default Home;
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F1F5F9",
  },

  container: {
    flex: 1,
    paddingHorizontal: scale(16),
    paddingTop: Platform.OS === "ios" ? scale(8) : scale(4),
  },

  sectionTitle: {
    fontSize: scale(22),
    fontWeight: "800",
    color: "#0F172A",
    marginTop: scale(2),
    letterSpacing: 0.4,
  },

  sectionSub: {
    fontSize: scale(15),
    color: "#64748B",
    marginTop: scale(6),
    marginBottom: scale(22),
    lineHeight: scale(21),
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: scale(16),
    paddingHorizontal: scale(16),
    paddingVertical: Platform.OS === "ios" ? scale(16) : scale(12),
    marginBottom: scale(14),

    borderWidth: 1,
    borderColor: "#E5E7EB",

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },

  input: {
    flex: 1,
    fontSize: scale(16),
    marginLeft: scale(12),
    color: "#0F172A",
    fontWeight: "500",
  },

  /* ---------------- ERROR ---------------- */

  slotError: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: scale(10),
    padding: scale(14),
    borderRadius: scale(14),
    backgroundColor: "#FEF2F2",
    borderWidth: 1,
    borderColor: "#FECACA",
  },

  slotErrorText: {
    marginLeft: scale(8),
    color: "#DC2626",
    fontWeight: "600",
    fontSize: scale(14),
  },

  /* ---------------- SUMMARY ---------------- */

  summary: {
    marginTop: scale(26),
    padding: scale(18),
    backgroundColor: "#FFFFFF",
    borderRadius: scale(20),

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },

  summaryTitle: {
    fontSize: scale(17),
    fontWeight: "700",
    marginBottom: scale(14),
    color: "#0F172A",
  },

  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: scale(12),
  },

  summaryText: {
    fontSize: scale(16),
    marginLeft: scale(12),
    color: "#0F172A",
    fontWeight: "500",
  },

  /* ---------------- MODAL ---------------- */

  modalClose: {
    paddingHorizontal: scale(16),
    paddingVertical: scale(14),
    alignItems: "flex-end",
  },

  closeText: {
    color: "#2563EB",
    fontWeight: "700",
    fontSize: scale(16),
  },
});
