import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const sleepChartData = [
  { name: 'HRV', value: 24 },
  { name: 'Recovery Score', value: 56 },
  { name: 'Sleep Quality', value: 53 },
  { name: 'Cortisol Profile', value: 48 },
];

const SleepRecoveryReport: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 4000); // 4 seconds delay
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <div className="text-center">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500"></div>
          <Typography variant="h6" className="mt-4">Analyzing... Loading...</Typography>
        </div>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" className="py-10">
      <Box className="flex justify-between items-center mb-8">
        <Button variant="outline" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Typography variant="h4">Sleep & Recovery Report</Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Card className="rounded-2xl shadow-md">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Summary Analysis
              </Typography>
              <Typography variant="body1">
                Based on HRV data and sleep metrics from April 8–13, the individual's recovery is moderately impacted by alcohol use and variable cortisol rhythms. Restorative sleep was achieved on only 1 of 5 days, with average HRV in the low-moderate range (24 ms). Stress reactions dominated up to 58% of the daily cycle with limited compensation through recovery phases. Cortisol pattern shows a flattened early peak profile, suggesting diminished adaptive capacity. Alcohol intake (&gt;2 units) on 4 nights clearly correlated with reduced sleep quality and recovery.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card className="rounded-2xl shadow-md">
            <CardContent>
              <Typography variant="h6">HRV & Recovery</Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Heart Rate Variability (HRV)"
                    secondary="Average: 24ms — Moderate (target >33ms)"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Stress-Recovery Balance"
                    secondary="Recovery time <30% on most days — insufficient compensatory rest"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card className="rounded-2xl shadow-md">
            <CardContent>
              <Typography variant="h6">Cortisol Rhythm</Typography>
              <Typography>
                Cortisol rhythm shows a moderately flattened curve with early peak; total daily output and awakening response are slightly reduced. This indicates impaired adaptability of the HPA axis.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card className="rounded-2xl shadow-md">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Visual Summary
              </Typography>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={sleepChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card className="rounded-2xl shadow-md">
            <CardContent>
              <Typography variant="h6">Recommendations</Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Limit alcohol intake"
                    secondary="Restrict to <1 unit per night to prevent sleep disruption and cortisol interference"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Improve sleep hygiene"
                    secondary="Maintain consistent bedtime routine and avoid screen exposure pre-sleep"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Support HPA axis"
                    secondary="Consider morning daylight exposure, adaptogenic herbs, and stress-buffering routines"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SleepRecoveryReport;
