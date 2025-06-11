import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useHealthData } from '../contexts/HealthDataContext';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { MentalHealthData } from '../types/health';

const COLORS = {
  primary: '#3b82f6',
  background: '#f8fafc',
  card: '#ffffff',
  text: '#1e293b',
};

const defaultAnalysis: MentalHealthData = {
  keyFindings: 'The assessment shows elevated levels of perfectionism and private-life overcommitment, combined with symptoms of fatigue and nervousness. These factors increase the individual\'s vulnerability to mental overload and emotional burnout. Proactive recovery and resilience-building strategies are recommended.',
  stressAndRecoveryBalance: {
    value: 74,
    unit: '/100',
    description: 'The individual has functional capacity but lacks sufficient recovery periods, particularly from private life stressors. Continued imbalance may lead to chronic fatigue and lowered performance.',
  },
  cognitivePerformance: {
    value: 61,
    unit: '/100',
    description: 'Moderate cognitive load issues are present, including difficulty concentrating and signs of mental fatigue. Preventative strategies are advised.',
  },
  recommendations: [
    {
      suggestion: 'Practice cognitive offloading techniques (e.g., journaling, task management apps).',
      category: 'Mental Recovery',
      description: 'Reduces working memory load and aids mental clarity.',
      priority: 'High',
      timeframe: 'Immediate',
      frequency: 'Daily'
    },
    {
      suggestion: 'Set personal boundaries and reduce non-essential private commitments.',
      category: 'Lifestyle Management',
      description: 'Helps prevent overcommitment from affecting emotional well-being.',
      priority: 'Medium',
      timeframe: 'Weekly',
      frequency: 'As needed'
    },
    {
      suggestion: 'Engage in moderate daily physical activity focused on strength and mobility.',
      category: 'Physical Health',
      description: 'Supports energy levels and reduces fatigue-related symptoms.',
      priority: 'High',
      timeframe: 'Daily',
      frequency: 'Daily'
    },
    {
      suggestion: 'Consider guided mindfulness or stress reduction programs.',
      category: 'Emotional Regulation',
      description: 'Decreases nervousness and improves emotional resilience.',
      priority: 'Medium',
      timeframe: 'Weekly',
      frequency: '2-3 times per week'
    },
  ],
  emotionalWellbeing: {
    description: '',
    measurements: {
      moodStability: {
        value: 0,
        unit: ''
      },
      emotionalRegulation: {
        value: 0,
        unit: ''
      }
    }
  },
  mentalResilience: {
    description: '',
    metrics: {
      stressResponseProfile: {
        value: 0,
        unit: ''
      },
      copingMechanisms: {
        value: 0,
        unit: ''
      }
    }
  },
  currentMentalActivity: {
    level: '',
    patterns: [],
    description: ''
  },
  primaryGoal: '',
  additionalNotes: []
};

const MentalHealth = () => {
  const navigate = useNavigate();
  const { setMentalHealthData} = useHealthData();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMentalHealthData(defaultAnalysis);
    const timer = setTimeout(() => setLoading(false), 4000); // 4 seconds delay
    return () => clearTimeout(timer);
  }, [setMentalHealthData]);

  const chartData = [
    {
      name: 'Stress Balance',
      Score: defaultAnalysis.stressAndRecoveryBalance?.value ?? 0,
    },
    {
      name: 'Cognitive Performance', 
      Score: defaultAnalysis.cognitivePerformance?.value ?? 0,
    }
  ];

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
    <Container maxWidth="lg" className="space-y-6 py-8">
      <Box className="flex justify-between items-center">
        <Button variant="outline" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Typography variant="h4" color={COLORS.text}>
          Mental Health Dashboard
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Card className="rounded-2xl shadow-md">
            <CardContent>
              <Typography variant="h6" color={COLORS.text} gutterBottom>
                Key Findings
              </Typography>
              <Typography variant="body1" color={COLORS.text}>
                {defaultAnalysis.keyFindings}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card className="rounded-2xl shadow-md">
            <CardContent>
              <Typography variant="h6" color={COLORS.text} gutterBottom>
                Stress & Recovery Balance
              </Typography>
              <Typography variant="subtitle1">
                {defaultAnalysis.stressAndRecoveryBalance?.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card className="rounded-2xl shadow-md">
            <CardContent>
              <Typography variant="h6" color={COLORS.text} gutterBottom>
                Cognitive Performance
              </Typography>
              <Typography variant="subtitle1">
                {defaultAnalysis.cognitivePerformance?.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card className="rounded-2xl shadow-md p-4">
            <Typography variant="h6" gutterBottom color={COLORS.text}>
              Visual Overview
            </Typography>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="Score" fill={COLORS.primary} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card className="rounded-2xl shadow-md">
            <CardContent>
              <Typography variant="h6" color={COLORS.text} gutterBottom>
                Recommendations
              </Typography>
              <List>
                {defaultAnalysis.recommendations?.map((rec, index) => (
                  <ListItem key={index} alignItems="flex-start">
                    <ListItemText
                      primary={rec.suggestion}
                      secondary={`${rec.category}: ${rec.description}`}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MentalHealth;
