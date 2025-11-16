import React, { memo, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getDayjs, getWeekdays } from '../utils';
import {
  Styles,
  ClassNames,
  WeekdayFormat,
  CalendarComponents,
  DateType,
} from '../types';
import { WEEKDAYS_HEIGHT } from '../enums';

type WeekdaysProps = {
  locale: string;
  firstDayOfWeek: number;
  styles?: Styles;
  classNames?: ClassNames;
  weekdaysFormat?: WeekdayFormat;
  weekdaysHeight?: number;
  components?: CalendarComponents;
  isRTL: boolean;
  selectedDate?: DateType;
};

const Weekdays = ({
  locale,
  firstDayOfWeek,
  styles = {},
  classNames = {},
  weekdaysFormat = 'min',
  weekdaysHeight = WEEKDAYS_HEIGHT,
  components = {},
  isRTL,
  selectedDate,
}: WeekdaysProps) => {
  const style = useMemo(
    () => createDefaultStyles(weekdaysHeight, isRTL),
    [weekdaysHeight, isRTL]
  );
  const selectedWeekdayIndex = selectedDate
    ? getDayjs(selectedDate).day() // 0 = Sunday, 6 = Saturday
    : null;

  return (
    <View
      style={[style.container, styles.weekdays]}
      className={classNames.weekdays}
      testID="weekdays"
    >
      {getWeekdays(locale, firstDayOfWeek)?.map((weekday, index) => {
        const isSelected = index === selectedWeekdayIndex;
        return (
          <View
            key={index}
            style={[style.weekday, styles.weekday]}
            className={classNames.weekday}
          >
            {components.Weekday ? (
              components.Weekday(weekday)
            ) : (
              <Text
                style={[
                  styles?.weekday_label,
                  isSelected && style.selectedWeekday,
                ]}
                className={classNames.weekday_label}
              >
                {weekday.name[weekdaysFormat]}
              </Text>
            )}
          </View>
        );
      })}
    </View>
  );
};

export default memo(Weekdays);

const createDefaultStyles = (weekdaysHeight: number, isRTL: boolean) =>
  StyleSheet.create({
    container: {
      height: weekdaysHeight,
      flexDirection: isRTL ? 'row-reverse' : 'row',
      alignItems: 'center',
    },
    weekday: {
      width: `${99.9 / 7}%`,
      alignItems: 'center',
      justifyContent: 'center',
    },
    selectedWeekday: {
      color: '#212121',
      fontWeight: '700',
    },
  });
