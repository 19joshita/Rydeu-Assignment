import { setTime } from "@/src/redux/calendarSlice";
import React, { useMemo, useState } from "react";
import {
  Dimensions,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";

interface Props {
  visible: boolean;
  setVisible: (val: boolean) => void;
}

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function TimePicker({ visible, setVisible }: Props) {
  const dispatch = useDispatch();

  const [hour, setHour] = useState("13");
  const [minute, setMinute] = useState("00");

  /** Hours: 01 → 23 (NO 00) */
  const hours = Array.from({ length: 23 }, (_, i) =>
    String(i + 1).padStart(2, "0")
  );

  const minutes = Array.from({ length: 60 }, (_, i) =>
    String(i).padStart(2, "0")
  );

  /** AM / PM logic */
  const amPm = useMemo(() => {
    const h = parseInt(hour, 10);
    return h < 12 ? "AM" : "PM";
  }, [hour]);

  /** Convert to 12-hour for display */
  const displayHour = useMemo(() => {
    const h = parseInt(hour, 10);
    const converted = h % 12 === 0 ? 12 : h % 12;
    return String(converted).padStart(2, "0");
  }, [hour]);

  const previewTime = `${displayHour}:${minute} ${amPm}`;

  const handleConfirm = () => {
    dispatch(setTime(previewTime));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <Modal transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.heading}>Select Time</Text>

          <View style={styles.header}>
            <Text style={styles.timePreview}>{previewTime}</Text>
          </View>

          <View style={styles.pickers}>
            <TimeColumn
              data={hours}
              selected={hour}
              onSelect={setHour}
              activeColor="#2563EB"
            />

            <TimeColumn
              data={minutes}
              selected={minute}
              onSelect={setMinute}
              activeColor="#2563EB"
            />
          </View>
          <View style={styles.buttons}>
            <TouchableOpacity
              onPress={() => setVisible(false)}
              style={styles.cancelBtn}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleConfirm} style={styles.confirmBtn}>
              <Text style={styles.confirmText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

function TimeColumn({
  data,
  selected,
  onSelect,
  activeColor,
}: {
  data: string[];
  selected: string;
  onSelect: (v: string) => void;
  activeColor: string;
}) {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item}
      showsVerticalScrollIndicator={false}
      style={styles.list}
      renderItem={({ item }) => {
        const isSelected = selected === item;
        return (
          <TouchableOpacity
            onPress={() => onSelect(item)}
            style={[
              styles.item,
              isSelected && { backgroundColor: activeColor },
            ]}
          >
            <Text style={[styles.itemText, isSelected && styles.selectedText]}>
              {item}
            </Text>
          </TouchableOpacity>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "94%",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
  },

  heading: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 12,
    color: "#111827",
  },

  header: {
    alignItems: "center",
    marginBottom: 18,
  },
  timePreview: {
    fontSize: 26,
    fontWeight: "700",
    color: "#2563EB",
  },

  pickers: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  list: {
    width: SCREEN_WIDTH / 3,
    maxHeight: 260,
  },

  item: {
    paddingVertical: 12,
    borderRadius: 14,
    marginVertical: 4,
    alignItems: "center",
  },
  itemText: {
    fontSize: 18,
    color: "#374151",
  },
  selectedText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },

  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
  },
  cancelBtn: {
    width: "45%",
    padding: 14,
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
  },
  cancelText: {
    fontWeight: "600",
    color: "#6B7280",
  },
  confirmBtn: {
    width: "45%",
    padding: 14,
    borderRadius: 12,
    backgroundColor: "#2563EB",
    alignItems: "center",
  },
  confirmText: {
    fontWeight: "700",
    color: "#FFFFFF",
  },
});
