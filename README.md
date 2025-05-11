# Cron Expression Visualizer

A visual tool to help developers understand cron expressions and recurrence patterns better. This tool allows you to enter a cron expression and see which components (hours, days, months) are being set. You can also choose recurrence patterns using a form and see a human-readable description generated based on your selections.

## Features

- **Cron Expression Visualizer**: Enter a cron expression and see it parsed into its six components (Seconds, Minutes, Hours, Days, Month, Day of Week)
- **Active Field Highlighting**: Fields with explicitly set values are marked as active
- **Recurrence Pattern Generator**: Choose from Daily, Weekly, or Monthly patterns and see a human-readable description
- **Dynamic Form Fields**: Input fields change based on the selected recurrence pattern
- **Real-time Updates**: Both visualizer and description update as you make changes

## How to Use

1. **Cron Expression Visualizer**: 
   - Enter a valid cron expression (e.g., "0 15 12 1 JAN MON")
   - See the parsed components immediately

2. **Recurrence Pattern Generator**:
   - Select a pattern type (Daily, Weekly, Monthly)
   - Fill in the relevant fields that appear
   - Read the automatically generated description

## Technologies

- React with TypeScript
- Modern UI components
- Real-time validation and parsing

## Live Demo

Try it out live at: [https://cron-tsx.vercel.app/](https://cron-tsx.vercel.app/)