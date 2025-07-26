import React, { useState } from 'react';
import { Grid, Button, Typography, Tooltip, Dialog, DialogTitle, DialogContent, ToggleButton, ToggleButtonGroup } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';

// Mock volatility data: (Day-of-month) -> Level
const mockVolatility = {
  1: 'low',    2: 'medium', 3: 'high',    4: 'low',    5: 'medium',
  6: 'high',   7: 'medium', 8: 'low',     9: 'low',   10: 'medium',
 11: 'high',  12: 'medium',13: 'low',    14: 'high',  15: 'medium',
 16: 'low',   17: 'medium',18: 'high',   19: 'medium',20: 'low',
 21: 'medium',22: 'high',  23: 'medium', 24: 'low',   25: 'medium',
 26: 'high',  27: 'medium',28: 'low',    29: 'medium',30: 'high',
 31: 'low'
};
// Volatility level to color
const volatilityColors = {
  low:    '#a8d5a2',   // Green
  medium: '#f5cc7b',   // Yellow/Orange
  high:   '#e07b7b',   // Red
};

// Performance: values can be 'positive', 'negative', or 'neutral'
const mockPerformance = {
 1: 'positive', 2: 'neutral', 3: 'negative', 4: 'positive', 5: 'neutral',
 6: 'negative', 7: 'neutral', 8: 'positive', 9: 'positive', 10: 'neutral',
 11: 'negative', 12: 'neutral', 13: 'positive', 14: 'negative', 15: 'neutral',
 16: 'positive', 17: 'neutral', 18: 'negative', 19: 'neutral', 20: 'positive',
 21: 'neutral', 22: 'negative', 23: 'neutral', 24: 'positive', 25: 'neutral',
 26: 'negative', 27: 'neutral', 28: 'positive', 29: 'neutral', 30: 'negative', 31: 'positive'
};

function daysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}
function firstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}
function monthYearString(year, month) {
  return new Date(year, month, 1).toLocaleString('default', { month: 'long', year: 'numeric' });
}

function Calendar() {
  const today = new Date();
  const [selectedDay, setSelectedDay] = useState(null);
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [calendarView, setCalendarView] = useState('day');

  const mockLiquidity = {
    1: 13, 2: 8, 3: 20, 4: 5, 5: 12,
    6: 18, 7: 10, 8: 6, 9: 7, 10: 15,
    11: 22, 12: 11, 13: 9, 14: 19, 15: 13,
    16: 6, 17: 12, 18: 17, 19: 11, 20: 7,
    21: 12, 22: 21, 23: 14, 24: 5, 25: 10,
    26: 17, 27: 13, 28: 6, 29: 8, 30: 20, 31: 7
  };

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentYear(currentYear - 1);
      setCurrentMonth(11);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };
  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentYear(currentYear + 1);
      setCurrentMonth(0);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };
  const handleCloseDashboard = () => setSelectedDay(null);

  // Calendar slots
  const daysInCurrentMonth = daysInMonth(currentYear, currentMonth);
  const firstDay = firstDayOfMonth(currentYear, currentMonth);
  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) calendarDays.push(null);
  for (let day = 1; day <= daysInCurrentMonth; day++) calendarDays.push(day);
  while (calendarDays.length % 7 !== 0) calendarDays.push(null);

  // Chunk into weeks
  const weeks = [];
  for (let i = 0; i < calendarDays.length; i += 7)
    weeks.push(calendarDays.slice(i, i + 7));

  const isToday = (day) =>
    day === today.getDate() &&
    currentMonth === today.getMonth() &&
    currentYear === today.getFullYear();

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div>
      <Dialog open={!!selectedDay} onClose={handleCloseDashboard}>
        <DialogTitle>
            {selectedDay ? `Day ${selectedDay} Details` : ''}
        </DialogTitle>
        <DialogContent>
            {selectedDay && (
            <div>
                <Typography>
                <b>Date:</b> {monthYearString(currentYear, currentMonth)} {selectedDay}
                </Typography>
                <Typography>
                <b>Volatility:</b> {mockVolatility[selectedDay]}
                </Typography>
                <Typography>
                <b>Liquidity (volume):</b> {mockLiquidity[selectedDay]}k
                </Typography>
                <Typography>
                <b>Performance:</b> {mockPerformance[selectedDay]}
                </Typography>
            </div>
            )}
        </DialogContent>
      </Dialog>

      <Typography variant="h5" align="center" gutterBottom>
        {monthYearString(currentYear, currentMonth)}
      </Typography>

      <ToggleButtonGroup
        value={calendarView}
        exclusive
        onChange={(e, newView) => { if (newView) setCalendarView(newView); }}
        sx={{ margin: '16px 0' }}
        aria-label="Calendar view"
      >
        <ToggleButton value="day" aria-label="Daily">Day</ToggleButton>
        <ToggleButton value="week" aria-label="Weekly">Week</ToggleButton>
        <ToggleButton value="month" aria-label="Monthly">Month</ToggleButton>
      </ToggleButtonGroup>

      <Grid container spacing={1} justifyContent="center" alignItems="center">
        <Grid item>
          <Button variant="outlined" onClick={prevMonth}>Prev</Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" onClick={nextMonth}>Next</Button>
        </Grid>
      </Grid>

      {calendarView === 'day' && (
        <>
          <Grid container spacing={1} sx={{ marginTop: 2 }}>
            {weekdays.map((wd, idx) => (
              <Grid item xs={1.71} key={wd + idx} style={{ flexGrow: 1 }}>
                <Typography align="center" fontWeight="bold">{wd}</Typography>
              </Grid>
            ))}
          </Grid>
          {weeks.map((week, i) => (
            <Grid container spacing={1} key={i} sx={{ marginTop: 0.5 }}>
              {week.map((day, j) => (
                <Grid item xs={1.71} key={j} style={{ flexGrow: 1 }}>
                  {day ? (
                    <Tooltip 
                      title={mockVolatility[day] ? `Volatility: ${mockVolatility[day][0].toUpperCase() + mockVolatility[day].slice(1)}` : 'No data'} 
                      arrow
                      >
                      <Button
                        onClick={() => setSelectedDay(day)}
                        variant="outlined"
                        fullWidth
                        sx={{
                          minHeight: 60,
                          minWidth: 0,
                          padding: 0,
                          backgroundColor: volatilityColors[mockVolatility[day]] || '#fafafa',
                          border: isToday(day) ? '3px solid #1976d2' : undefined,
                          color: isToday(day) ? '#1976d2' : undefined,
                          fontWeight: isToday(day) ? 'bold' : undefined,
                          boxShadow: isToday(day) ? '0 0 8px #1976d2aa' : undefined,
                          position: 'relative',
                          zIndex: isToday(day) ? 1 : 0
                        }}
                      >
                        {day}
                        {mockPerformance[day] && (
                        <span style={{ 
                          position: 'absolute', 
                          top: 6, right: 8, 
                          zIndex: 3, 
                          fontSize: 20, 
                          display: "flex", 
                          alignItems: "center" 
                        }}>
                          {mockPerformance[day] === 'positive' && <ArrowUpwardIcon sx={{ color: '#2e7d32', fontSize: 18 }} />}
                          {mockPerformance[day] === 'negative' && <ArrowDownwardIcon sx={{ color: '#d32f2f', fontSize: 18 }} />}
                          {mockPerformance[day] === 'neutral' && <HorizontalRuleIcon sx={{ color: '#6d6d6d', fontSize: 18 }} />}
                        </span>
                        )}
                        {mockLiquidity[day] && (
                          <div
                            style={{
                            position: "absolute",
                            right: 6,
                            bottom: 6,
                            borderRadius: "50%",
                            background: "#2196f3",
                            opacity: 0.75,
                            width: `${10 + mockLiquidity[day]}px`,
                            height: `${10 + mockLiquidity[day]}px`,
                            color: "white",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 10,
                            zIndex: 2,
                            boxShadow: '0 1px 3px #2224'
                            }}
                            title={`Volume: ${mockLiquidity[day]}k`}
                          >
                            <span>{mockLiquidity[day]}</span>
                          </div>
                        )}
                      </Button>
                    </Tooltip>
                  ) : (
                    <div style={{ minHeight: 60 }} />
                  )}
                </Grid>
              ))}
            </Grid>
          ))}
        </>
      )}

      {calendarView === 'week' && (
        <Grid container spacing={2} sx={{ marginTop: 2, paddingLeft: 4 }}>
          {[0,1,2,3,4].map(weekIdx => {
            const weekStart = weekIdx * 7 + 1;
            const weekEnd = Math.min(weekStart + 6, daysInCurrentMonth);
            let sumVol = 0, sumLiq = 0, pos=0, neg=0, neu=0, days=0;
            for(let d=weekStart; d<=weekEnd; d++){
              if(mockVolatility[d]) days += 1;
              if(mockVolatility[d]==='high') sumVol+=3;
              if(mockVolatility[d]==='medium') sumVol+=2;
              if(mockVolatility[d]==='low') sumVol+=1;
              sumLiq += mockLiquidity[d]||0;
              if(mockPerformance[d]==='positive') pos+=1;
              if(mockPerformance[d]==='negative') neg+=1;
              if(mockPerformance[d]==='neutral') neu+=1;
            }
            return (
              <Grid item xs={12} key={weekIdx}>
                <Typography>
                  <b>Week {weekIdx+1}:</b>
                  {' '}Volatility Avg: {days? (sumVol/days).toFixed(1):'N/A'}
                  {' '}| Total Liquidity: {sumLiq}k
                  {' '}| Performance: 
                  <span style={{ color: '#2e7d32' }}>{' ▲'.repeat(pos)}</span>
                  <span style={{ color: '#d32f2f' }}>{' ▼'.repeat(neg)}</span>
                  <span style={{ color: '#888' }}>{' –'.repeat(neu)}</span>
                </Typography>
              </Grid>
            );
          })}
        </Grid>
      )}

      {calendarView === 'month' && (
        <div style={{ margin: '32px 0', textAlign: 'center' }}>
          <Typography variant="h6">Monthly Overview</Typography>
          <Typography>
            <b>Avg Volatility Level: </b>
            {(() => {
              let score = 0, days = 0;
              for(let d=1; d<=daysInCurrentMonth; d++) {
                if(mockVolatility[d]==='low') score+=1;
                else if(mockVolatility[d]==='medium') score+=2;
                else if(mockVolatility[d]==='high') score+=3;
                days++;
              }
              const levels = ['Low','Medium','High'];
              return days ? levels[Math.round(score/days)-1] : 'N/A';
            })()}
          </Typography>
          <Typography>
            <b>Total Liquidity:</b> {
              Object.values(mockLiquidity).reduce((a, b) => a + (b||0), 0)
            }k
          </Typography>
          <Typography>
            <b>Performance:</b> {
              (() => {
                let pos=0,neg=0,neu=0;
                for(let d=1;d<=daysInCurrentMonth; d++){
                  if(mockPerformance[d]==='positive') pos++;
                  if(mockPerformance[d]==='negative') neg++;
                  if(mockPerformance[d]==='neutral') neu++;
                }
                return (
                  <span>
                    <span style={{ color: '#2e7d32' }}>{' ▲'.repeat(pos)}</span>{' '}
                    <span style={{ color: '#d32f2f' }}>{' ▼'.repeat(neg)}</span>{' '}
                    <span style={{ color: '#888' }}>{' –'.repeat(neu)}</span>
                  </span>
                );
              })()
            }
          </Typography>
        </div>
      )}
    </div>
  );
}

export default Calendar;

