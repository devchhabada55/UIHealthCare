import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const bioAgeChart = [
  { label: 'Chronological Age', value: 45 },
  { label: 'Biological Age', value: 48 },
];

const liverChart = [
  { name: 'GGT', value: 31 },
  { name: 'ALT', value: 43 },
  { name: 'AST', value: 32 },
];

const skinChart = [
  { name: 'Wrinkles', value: 65 },
  { name: 'Pigmentation', value: 55 },
  { name: 'Redness', value: 70 },
];

const HealthReport: React.FC = () => {
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
      <Box className="flex justify-start items-center mb-8">
        <Button variant="outline" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
      </Box>

      <Grid container spacing={4}>
        {/* Biological Age Section */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Biological vs Chronological Age</Typography>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={bioAgeChart}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" />
                  <YAxis domain={[0, 60]} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
              <Typography variant="body2" className="mt-2">
                The patient shows signs of accelerated biological aging. Skin pigmentation, elevated oxidative stress, and liver enzymes suggest cellular wear and chronic inflammation.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Liver Health */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Liver Function (GGT, ALT, AST)</Typography>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={liverChart}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#f97316" />
                </BarChart>
              </ResponsiveContainer>
              <Typography variant="body2" className="mt-2">
                Slightly elevated ALT and borderline GGT may indicate early liver overload. Consider reducing processed foods, alcohol, and improving antioxidant intake.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Skin Health */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">Skin Health Overview</Typography>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={skinChart}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#6366f1" />
                </BarChart>
              </ResponsiveContainer>
              <Typography variant="body2" className="mt-2">
                Signs of moderate wrinkles and pigmentation were observed. Daily sunscreen use, hydration, and antioxidant-rich nutrition are recommended.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Oxygen & Sleep */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">Oxygen & Respiratory Considerations</Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Hemoglobin"
                    secondary="16.9 g/dL — high-normal. Combined with fatigue, suggests further investigation into nocturnal oxygen saturation or sleep apnea screening."
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="CRP & Ferritin"
                    secondary="Ferritin: 346 µg/L (high), CRP: <0.6 mg/L (low). High ferritin without inflammation indicates possible iron overload."
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Respiratory/Digestive Report"
                    secondary="No acute infection; fatigue and digestive symptoms may be linked to low methylation and oxidative stress load."
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Lifestyle Recommendations */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">Recommendations</Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Consider sleep study"
                    secondary="Rule out sleep apnea and evaluate oxygen saturation trends overnight."
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Reduce liver stress"
                    secondary="Limit alcohol, processed foods; increase cruciferous vegetables and hydration."
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Skin restoration plan"
                    secondary="Include topical vitamin C, retinoids, and SPF 30+ daily."
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

export default HealthReport;