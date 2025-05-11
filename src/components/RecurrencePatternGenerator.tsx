/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, ChangeEvent } from 'react';

type PatternType = 'daily' | 'weekly' | 'monthly';

interface DaysSelection {
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
}

const RecurrencePatternGenerator: React.FC = () => {
  const [pattern, setPattern] = useState<PatternType>('daily');
  const [time, setTime] = useState<string>('12:00');
  const [timeFormat, setTimeFormat] = useState<string>('pm');
  const [selectedDays, setSelectedDays] = useState<DaysSelection>({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  });
  const [selectedDate, setSelectedDate] = useState<string>('1');
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    setDescription(generateDescription());
  }, [pattern, time, timeFormat, selectedDays, selectedDate]);

  const handlePatternChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPattern(e.target.value as PatternType);
  };

  const handleTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);
    setTimeFormat(e.target.value);
  };

  const handleDayChange = (day: keyof DaysSelection) => {
    setSelectedDays(prev => ({
      ...prev,
      [day]: !prev[day]
    }));
  };

  const handleDateChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedDate(e.target.value);
  };

  const getDisplayTime = (): string => {
    if (!time) return '';

    const [hours, minutes] = time.split(':');
    let formattedHours = parseInt(hours);
    
    if (timeFormat === 'pm' && formattedHours < 12) {
      formattedHours += 12;
    } else if (timeFormat === 'am' && formattedHours === 12) {
      formattedHours = 0;
    }
    
    return `${formattedHours}:${minutes}`;
  };

  const generateDescription = (): string => {
    const formattedTime = getDisplayTime();

    switch (pattern) {
      case 'daily':
        return `Runs every day at ${formattedTime}.`;
      
      case 'weekly': {
        const selectedDaysList = Object.entries(selectedDays)
          .filter(([_, isSelected]) => isSelected)
          .map(([day]) => day.charAt(0).toUpperCase() + day.slice(1));

        if (selectedDaysList.length === 0) {
          return `Runs every week at ${formattedTime}.`;
        }

        return `Runs every week on ${selectedDaysList.join(', ')} at ${formattedTime}.`;
      }
      
      case 'monthly':
        return `Runs every month on the ${getOrdinalSuffix(selectedDate)} day at ${formattedTime}.`;
      
      default:
        return '';
    }
  };

  const getOrdinalSuffix = (day: string): string => {
    const num = parseInt(day);
    if (!num) return day;

    const lastDigit = num % 10;
    const lastTwoDigits = num % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
      return `${num}th`;
    }

    switch (lastDigit) {
      case 1:
        return `${num}st`;
      case 2:
        return `${num}nd`;
      case 3:
        return `${num}rd`;
      default:
        return `${num}th`;
    }
  };

  const daysOfMonthOptions = () => {
    const options = [];
    for (let i = 1; i <= 31; i++) {
      options.push(
        <option key={i} value={i.toString()}>
          {i}
        </option>
      );
    }
    return options;
  };

  return (
    <div className="recurrence-form">
      <div className="form-group">
        <label htmlFor="pattern">Recurrence Pattern</label>
        <select
          id="pattern"
          value={pattern}
          onChange={handlePatternChange}
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="time">Time</label>
        <div className="time-inputs">
          <input
            type="time"
            id="time"
            className="time-input"
            value={time}
            onChange={handleTimeChange}
          />
        </div>
      </div>

      {pattern === 'weekly' && (
        <div className="form-group">
          <label>Days of Week</label>
          <div className="days-selection">
            {Object.keys(selectedDays).map((day) => (
              <div key={day} className="day-checkbox">
                <input
                  type="checkbox"
                  id={`day-${day}`}
                  checked={selectedDays[day as keyof DaysSelection]}
                  onChange={() => handleDayChange(day as keyof DaysSelection)}
                />
                <label htmlFor={`day-${day}`}>
                  {day.charAt(0).toUpperCase() + day.slice(1)}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {pattern === 'monthly' && (
        <div className="form-group">
          <label htmlFor="day-of-month">Day of Month</label>
          <select
            id="day-of-month"
            value={selectedDate}
            onChange={handleDateChange}
          >
            {daysOfMonthOptions()}
          </select>
        </div>
      )}

      <div className="description">
        <h3>Generated Description:</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default RecurrencePatternGenerator;