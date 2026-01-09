import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setTime } from "../../redux/calendarSlice";
import { RootState } from "../../redux/store";

const TIMES = ["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM"];

export default function TimeSlote() {
  const dispatch = useDispatch();
  const { selectedDate, selectedTime } = useSelector(
    (state: RootState) => state.calendar
  );

  if (!selectedDate) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Time</Text>

      <View style={styles.row}>
        {TIMES.map((time) => {
          const active = selectedTime === time;
          return (
            <TouchableOpacity
              key={time}
              style={[styles.slot, active && styles.active]}
              onPress={() => dispatch(setTime(time))}
            >
              <Text style={active && { color: "#fff" }}>{time}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 16 },
  title: { fontSize: 14, marginBottom: 8 },
  row: { flexDirection: "row", flexWrap: "wrap" },
  slot: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#ddd",
    marginRight: 8,
    marginBottom: 8,
  },
  active: { backgroundColor: "#0A66C2", borderColor: "#0A66C2" },
});
