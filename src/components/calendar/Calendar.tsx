import { setDate } from "@/src/redux/calendarSlice";
import { RootState } from "@/src/redux/store";
import moment from "moment";
import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  onClose?: () => void;
}

const SCREEN_WIDTH = Dimensions.get("window").width;
const DAY_SIZE = SCREEN_WIDTH / 9;

const Calendar = ({ onClose }: Props) => {
  const dispatch = useDispatch();
  const selectedDate = useSelector(
    (state: RootState) => state.calendar.selectedDate
  );

  const today = moment().format("DD-MM-YYYY");

  const firstMonth = moment();
  const lastMonth = moment().add(5, "months");

  const [currentMonth, setCurrentMonth] = useState(firstMonth);

  const handleDateSelect = (date: string) => {
    dispatch(setDate(date));
    if (onClose) onClose();
  };

  const prevMonth = () => {
    const prev = currentMonth.clone().subtract(1, "month");
    if (prev.isBefore(firstMonth, "month")) return;
    setCurrentMonth(prev);
  };

  const nextMonth = () => {
    const next = currentMonth.clone().add(1, "month");
    if (next.isAfter(lastMonth, "month")) return;
    setCurrentMonth(next);
  };

  const generateDates = () => {
    const startOfMonth = currentMonth.clone().startOf("month");
    const dates: (moment.Moment | null)[] = [];

    for (let i = 0; i < startOfMonth.day(); i++) {
      dates.push(null);
    }

    for (let d = 1; d <= currentMonth.daysInMonth(); d++) {
      dates.push(startOfMonth.clone().date(d));
    }

    return dates;
  };

  const dates = generateDates();
  const dayNames = moment.weekdaysShort();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={prevMonth}
          style={[
            styles.arrow,
            currentMonth.isSame(firstMonth, "month") && { opacity: 0.3 },
          ]}
          disabled={currentMonth.isSame(firstMonth, "month")}
        >
          <Text style={styles.arrowText}>{"<"}</Text>
        </TouchableOpacity>

        <Text style={styles.monthTitle}>
          {currentMonth.format("MMMM YYYY")}
        </Text>

        <TouchableOpacity
          onPress={nextMonth}
          style={[
            styles.arrow,
            currentMonth.isSame(lastMonth, "month") && { opacity: 0.3 },
          ]}
          disabled={currentMonth.isSame(lastMonth, "month")}
        >
          <Text style={styles.arrowText}>{">"}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.dayNamesRow}>
        {dayNames.map((day) => (
          <Text key={day} style={styles.dayName}>
            {day}
          </Text>
        ))}
      </View>

      <View style={styles.datesGrid}>
        {dates.map((date, index) => {
          if (!date)
            return (
              <View
                key={index}
                style={[styles.day, { width: DAY_SIZE, height: DAY_SIZE }]}
              />
            );

          const formatted = date.format("DD-MM-YYYY");
          const isSelected = selectedDate === formatted;
          const isToday = today === formatted;

          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.day,
                { width: DAY_SIZE, height: DAY_SIZE },
                isSelected && styles.selectedDay,
                isToday && styles.todayDay,
              ]}
              onPress={() => handleDateSelect(formatted)}
            >
              <Text
                style={[
                  styles.dayText,
                  isSelected && styles.selectedText,
                  isToday && styles.todayText,
                ]}
              >
                {date.date()}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Text style={styles.selectedText}>
        Selected Date:{" "}
        {selectedDate ? moment(selectedDate).format("DD/MM/YYYY") : "None"}
      </Text>
    </View>
  );
};

export default Calendar;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  arrow: {
    padding: 8,
  },
  arrowText: {
    fontSize: 20,
    color: "#2563EB", // Blue color
    fontWeight: "600",
  },
  monthTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },
  dayNamesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  dayName: {
    width: DAY_SIZE,
    textAlign: "center",
    fontWeight: "600",
    color: "#555",
  },
  datesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  day: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: DAY_SIZE / 2,
    marginVertical: 4,
    backgroundColor: "#fff",
  },
  selectedDay: {
    backgroundColor: "#2563EB",
  },
  todayDay: {
    borderWidth: 2,
    borderColor: "#2563EB",
  },
  dayText: {
    fontSize: 14,
    color: "#111827",
    fontWeight: "500",
  },
  selectedText: {
    color: "#fff",
    fontWeight: "600",
  },
  todayText: {
    color: "#2563EB",
    fontWeight: "700",
  },
  // selectedText: {
  //   marginTop: 20,
  //   textAlign: "center",
  //   fontSize: 16,
  //   fontWeight: "500",
  //   color: "#111",
  // },
});
