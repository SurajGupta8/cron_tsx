import React, { useState, useEffect, ChangeEvent } from 'react';

interface CronFields {
  seconds: string;
  minutes: string;
  hours: string;
  days: string;
  month: string;
  dayOfWeek: string;
}

interface ActiveFields {
  seconds: boolean;
  minutes: boolean;
  hours: boolean;
  days: boolean;
  month: boolean;
  dayOfWeek: boolean;
}

const CronExpressionEvaluator: React.FC = () => {
  const [cronExpression, setCronExpression] = useState<string>('* * * * * *');
  const [parsedFields, setParsedFields] = useState<CronFields>({
    seconds: '*',
    minutes: '*',
    hours: '*',
    days: '*',
    month: '*',
    dayOfWeek: '*',
  });
  const [activeFields, setActiveFields] = useState<ActiveFields>({
    seconds: false,
    minutes: false,
    hours: false,
    days: false,
    month: false,
    dayOfWeek: false,
  });

  useEffect(() => {
    parseCronExpression(cronExpression);
  }, [cronExpression]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCronExpression(e.target.value);
  };

  const parseCronExpression = (expression: string) => {
    const trimmedExpression = expression.trim();
    const parts = trimmedExpression
      .split(/\s+/)
      .filter((part) => part.length > 0);

    if (parts.length !== 6) {
      setParsedFields({
        seconds: '*',
        minutes: '*',
        hours: '*',
        days: '*',
        month: '*',
        dayOfWeek: '*',
      });
      setActiveFields({
        seconds: false,
        minutes: false,
        hours: false,
        days: false,
        month: false,
        dayOfWeek: false,
      });
      return;
    }

    const normalizedParts = parts.map(normalizeCronValue);
    
    const newFields: CronFields = {
      seconds: normalizedParts[0],
      minutes: normalizedParts[1],
      hours: normalizedParts[2],
      days: normalizedParts[3],
      month: normalizedParts[4],
      dayOfWeek: normalizedParts[5],
    };

    const newActive: ActiveFields = {
      seconds: normalizedParts[0] !== '*',
      minutes: normalizedParts[1] !== '*',
      hours: normalizedParts[2] !== '*',
      days: normalizedParts[3] !== '*',
      month: normalizedParts[4] !== '*',
      dayOfWeek: normalizedParts[5] !== '*',
    };

    setParsedFields(newFields);
    setActiveFields(newActive);
  };

  const normalizeCronValue = (value: string): string => {
    if (value === '*') return value;

    const monthNames = {
      'jan': '1', 'feb': '2', 'mar': '3', 'apr': '4', 'may': '5', 'jun': '6',
      'jul': '7', 'aug': '8', 'sep': '9', 'oct': '10', 'nov': '11', 'dec': '12'
    };
    
    const dayNames = {
      'sun': '0', 'mon': '1', 'tue': '2', 'wed': '3', 'thu': '4', 'fri': '5', 'sat': '6'
    };

    const lowerValue = value.toLowerCase();
    if (Object.keys(monthNames).includes(lowerValue)) {
      return monthNames[lowerValue as keyof typeof monthNames];
    }

    if (Object.keys(dayNames).includes(lowerValue)) {
      return dayNames[lowerValue as keyof typeof dayNames];
    }

    return value;
  };

  return (
    <div className="cron-evaluator">
      <div className="cron-inputs">
        <label htmlFor="cronInput">Cron Expression</label>
        <input
          type="text"
          id="cronInput"
          value={cronExpression}
          onChange={handleInputChange}
          placeholder="e.g., 0 */5 * * * *"
        />
      </div>

      <div className="cron-fields-preview">
        <h4>Parsed Fields</h4>
        <div className="cron-field">
          <strong>Seconds:</strong> {parsedFields.seconds}
          {activeFields.seconds && <span> (active)</span>}
        </div>
        <div className="cron-field">
          <strong>Minutes:</strong> {parsedFields.minutes}
          {activeFields.minutes && <span> (active)</span>}
        </div>
        <div className="cron-field">
          <strong>Hours:</strong> {parsedFields.hours}
          {activeFields.hours && <span> (active)</span>}
        </div>
        <div className="cron-field">
          <strong>Days:</strong> {parsedFields.days}
          {activeFields.days && <span> (active)</span>}
        </div>
        <div className="cron-field">
          <strong>Month:</strong> {parsedFields.month}
          {activeFields.month && <span> (active)</span>}
        </div>
        <div className="cron-field">
          <strong>Day of Week:</strong> {parsedFields.dayOfWeek}
          {activeFields.dayOfWeek && <span> (active)</span>}
        </div>
      </div>
    </div>
  );
};

export default CronExpressionEvaluator;