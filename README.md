# Market Seasonality Explorer

## Overview  
This React app visualizes market seasonality through an interactive calendar showing volatility, liquidity, and performance data. Users can toggle between daily, weekly, and monthly views and explore detailed metrics per date.

## Features  
- **Custom Calendar Views:** Daily, weekly, and monthly with smooth navigation.  
- **Volatility Heatmap:** Color-coded days (green/yellow/red) based on volatility levels.  
- **Performance Icons:** Up/down arrows and neutral indicators on each day.  
- **Liquidity Indicators:** Circles sized by trading volume on calendar cells.  
- **Interactive Dialog:** Click a day to see detailed volatility, liquidity, and performance.  
- **Navigation Controls:** Prev/Next month buttons and view toggle buttons.  
- **Responsive & Accessible:** Keyboard support, tooltips, and clear visual cues.

## Usage  
1. Install dependencies:  
   `npm install`  
2. Start the app:  
   `npm run dev`  
3. Navigate months, switch views, hover for tooltips, and click days for details.

## Code Structure  
- Single React component (`Calendar`) managing state for date, view mode, and selected day.  
- Utility functions handle calendar calculations.  
- Conditional rendering for different timeframe views.  
- Uses Material-UI components for UI consistency and accessibility.

## Assumptions  
- Uses mocked data for demonstration (volatility, liquidity, performance).  
- Designed for one instrument and basic metrics, easily extendable.  

## Next Steps  
- Integrate real-time or historical data APIs.  
- Add more detailed analytics and chart components.  
- Implement bonus features like export and alerts.
