import React from 'react';
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
  ListItemIcon,
  Chip,
  Button,
} from '@mui/material';
import {
  MonitorHeart,
  PriorityHigh,
  CheckCircle,
  Warning,
  TrendingUp,
  Favorite,
  ArrowLeft,
} from '@mui/icons-material';

// Color scheme for consistent UI
const COLORS = {
  primary: '#3b82f6',
  success: '#22c55e',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#8b5cf6',
  background: '#f8fafc',
  card: '#ffffff',
  text: '#1e293b',
  border: '#e2e8f0',
};

// Real data extracted from Yves Vannerom's blood test report (08/04/2025)
const realNutritionData = {
  patientInfo: {
    name: "Vannerom, Yves",
    age: 45,
    gender: "Male",
    testDate: "08/04/2025",
    biologicalAge: 48,
    chronologicalAge: 45,
    agingSpeed: "HOOG" // High aging speed
  },
  
  lifestyleFactors: {
    sleep: 65, // Estimated based on cortisol and DHEA-S levels
    stress: 45, // Based on cortisol (10.1 μg/dL) and DHEA-S (278.0 μg/dL)
    exercise: 70, // Estimated from overall metabolic health
    hydration: 80, // Based on kidney function and electrolytes
    smokingStatus: false
  },

  bloodSugarControl: {
    fastingGlucose: 86, // mg/dL (Normal: 70-99)
    hba1c: null, // Not tested
    insulinSensitivity: 56.2, // %S (Reference: ≥71.0) - LOW
    insulinFasting: 97.5, // pmol/L (Reference: 18.0-173.0)
    homaIR: 1.8, // Index (Reference: ≤1.4) - ELEVATED
    betaCellFunction: 156.6, // %B (Reference: ≤100.0) - ELEVATED
    tygIndex: 8.3 // Calculated triglyceride-glucose index
  },

  heartHealth: {
    bloodPressure: 128, // Estimated systolic (used in CVD calculation)
    totalCholesterol: 143, // mg/dL (Target: ≤190)
    hdlCholesterol: 43, // mg/dL (Target: ≥40)
    ldlCholesterol: 82, // mg/dL (Target: ≤115)
    nonHdlCholesterol: 100, // mg/dL (Target: ≤129)
    triglycerides: 90, // mg/dL (Target: ≤150)
    trigHdlRatio: 2.1, // ratio (Normal: <3.0)
    totalCholHdlRatio: 3.33, // ratio (Target: ≤5.0)
    hsCRP: 0.6, // mg/L (Target: ≤3.0) - Low cardiovascular risk
    cvdRisk: "LAAG" // Low CVD risk
  },

  essentialVitamins: {
    vitaminD: 13.8, // ng/mL (Target: 20.0-100.0) - DEFICIENT
    vitaminB12: 349, // ng/L (Target: ≥197) - Normal
    folate: 2.7, // μg/L (Target: ≥3.9) - LOW
    iron: 123, // μg/dL (Reference: 65-175) - Normal
    ferritin: 346, // μg/L (Reference: 30-400) - High normal
    ironSaturation: 36, // % (Reference: 20-45) - Normal
    transferrin: 2.41 // g/L (Reference: 2.00-3.60) - Normal
  },

  inflammationAndMinerals: {
    crp: 0.6, // mg/L - Low inflammation
    magnesium: 0.87, // mmol/L (Reference: 0.66-1.07) - Normal
    zinc: null, // Not tested
    uricAcid: 3.7, // mg/dL (Reference: 3.5-7.9) - Normal
    homocysteine: 12.7, // μmol/L (Reference: 5.0-15.0) - High normal
    albumin: 45.9 // g/L (Reference: 39.7-49.4) - Normal
  },

  liverFunction: {
    alt: 43, // U/L (Reference: ≤41) - SLIGHTLY ELEVATED
    ast: 32, // U/L (Reference: ≤40) - Normal
    ggt: 31, // U/L (Reference: ≤61) - Normal
    alkalinePhosphatase: 48, // U/L (Reference: 40-129) - Normal
    fibrosis4Index: 0.81 // Index (Reference: ≤1.29) - Low fibrosis risk
  },

  kidneyFunction: {
    creatinine: 0.95, // mg/dL (Reference: 0.70-1.20) - Normal
    egfr: 96, // mL/min/1.73m² (Reference: ≥90) - Normal
    uricAcid: 3.7 // mg/dL (Reference: 3.5-7.9) - Normal
  },

  thyroidFunction: {
    tsh: 1.56, // mU/L (Reference: 0.27-4.20) - Normal
    ft4: 15.8, // pmol/L (Reference: 11.0-24.0) - Normal
    tshFt4Ratio: 9.9 // Normal thyroid function
  },

  hormonalBalance: {
    testosterone: 23.80, // nmol/L (Reference: 8.64-29.00) - Normal
    freeTestosterone: 0.413, // nmol/L (Reference: 0.198-0.619) - Normal
    cortisol: 10.1, // μg/dL (Reference: 4.8-19.5) - Normal
    dheas: 278.0, // μg/dL (Reference: 44.3-331.0) - Normal
    prolactin: 13.8, // μg/L (Reference: 4.0-15.2) - Normal
    acth: 22.7 // ng/L (Reference: 7.2-63.3) - Normal
  },

  riskAssessment: {
    inflammation: "LAAG", // Low
    insulinResistance: "VERHOOGD", // Elevated
    cardiovascular: "LAAG", // Low
    weightRisk: "LAAG", // Low metabolic risk overweight
    metabolicSyndrome: false,
    oxidativeStress: "BEPERKT", // Limited
    methylation: "RISICO", // Risk of hypomethylation
    hormonalStress: "BEPERKT", // Limited
    thyroidRisk: "LAAG", // Low
    nafldRisk: "GEEN" // No abnormal risk
  },

  bodyComposition: {
    bmi: 24.9, // kg/m² - Normal weight
    waistHeightRatio: 0.53, // Risk threshold >0.50
    bodyFatPercentage: null, // Not provided
    basalMetabolicRate: 1853, // kcal/day
    weightPhenotype: "metabool laag-risico overgewicht"
  }
};

// Component implementation
const Nutrition: React.FC = () => {
  const navigate = useNavigate();


  const renderMetric = (value: number | undefined | null, unit: string = '', isGood?: boolean) => {
    if (value === undefined || value === null) return "N/A";
    
    const color = isGood === true ? COLORS.success : isGood === false ? COLORS.error : COLORS.text;
    
    return (
      <Box display="flex" alignItems="center" gap={2}>
        <Typography variant="h4" sx={{ color }}>
          {value}{unit}
        </Typography>
      </Box>
    );
  };

  // const renderHealthScore = (score: number | undefined | null, isGood?: boolean) => {
  //   if (score === undefined || score === null) return "N/A";
    
  //   const numericScore = typeof score === 'number' ? score : 0;
  //   const displayColor = isGood === true ? COLORS.success : isGood === false ? COLORS.error : 
  //                       numericScore >= 70 ? COLORS.success : numericScore >= 40 ? COLORS.warning : COLORS.error;

  //   return (
  //     <Box display="flex" alignItems="center" gap={2}>
  //       <Typography variant="h4" sx={{ color: displayColor }}>
  //         {typeof score === 'number' ? `${score}%` : 'N/A'}
  //       </Typography>
  //       {typeof score === 'number' && (
  //         <LinearProgress
  //           variant="determinate"
  //           value={numericScore}
  //           sx={{
  //             width: 100,
  //             height: 8,
  //             borderRadius: 4,
  //             backgroundColor: COLORS.background,
  //             '& .MuiLinearProgress-bar': {
  //               backgroundColor: displayColor,
  //             },
  //           }}
  //         />
  //       )}
  //     </Box>
  //   );
  // };

  const getRiskColor = (risk: string) => {
    switch (risk.toUpperCase()) {
      case 'LAAG':
      case 'GEEN':
        return COLORS.success;
      case 'BEPERKT':
      case 'MATIG':
        return COLORS.warning;
      case 'HOOG':
      case 'VERHOOGD':
      case 'ZEER HOOG':
        return COLORS.error;
      default:
        return COLORS.info;
    }
  };


  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Back Button */}
      <Box sx={{ mb: 4 }}>
        <Button variant="outlined" onClick={() => navigate(-1)} startIcon={<ArrowLeft />}>
          Back
        </Button>
      </Box>

      {/* Key Metrics */}
      <Grid container spacing={4}>
        {/* Blood Sugar Control */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', bgcolor: COLORS.card }}>
            <CardContent>
              <Typography variant="h6" gutterBottom color={COLORS.text}>
                Blood Sugar Control
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color={COLORS.text}>Fasting Glucose</Typography>
                  {renderMetric(realNutritionData.bloodSugarControl.fastingGlucose, ' mg/dL', true)}
                  <Typography variant="caption" color={COLORS.success}>Normal (70-99)</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color={COLORS.text}>Insulin Sensitivity</Typography>
                  {renderMetric(realNutritionData.bloodSugarControl.insulinSensitivity, '%', false)}
                  <Typography variant="caption" color={COLORS.error}>Low (Target: ≥71%)</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color={COLORS.text}>HOMA-IR</Typography>
                  {renderMetric(realNutritionData.bloodSugarControl.homaIR, '', false)}
                  <Typography variant="caption" color={COLORS.error}>Elevated (Target: ≤1.4)</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color={COLORS.text}>Beta Cell Function</Typography>
                  {renderMetric(realNutritionData.bloodSugarControl.betaCellFunction, '%', false)}
                  <Typography variant="caption" color={COLORS.error}>Elevated (Target: ≤100%)</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Heart Health */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', bgcolor: COLORS.card }}>
            <CardContent>
              <Typography variant="h6" gutterBottom color={COLORS.text}>
                Heart Health
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color={COLORS.text}>Total Cholesterol</Typography>
                  {renderMetric(realNutritionData.heartHealth.totalCholesterol, ' mg/dL', true)}
                  <Typography variant="caption" color={COLORS.success}>Good (Target: ≤190)</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color={COLORS.text}>LDL Cholesterol</Typography>
                  {renderMetric(realNutritionData.heartHealth.ldlCholesterol, ' mg/dL', true)}
                  <Typography variant="caption" color={COLORS.success}>Good (Target: ≤115)</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color={COLORS.text}>HDL Cholesterol</Typography>
                  {renderMetric(realNutritionData.heartHealth.hdlCholesterol, ' mg/dL', true)}
                  <Typography variant="caption" color={COLORS.success}>Good (Target: ≥40)</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color={COLORS.text}>Triglycerides</Typography>
                  {renderMetric(realNutritionData.heartHealth.triglycerides, ' mg/dL', true)}
                  <Typography variant="caption" color={COLORS.success}>Good (Target: ≤150)</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color={COLORS.text}>hsCRP (Inflammation)</Typography>
                  {renderMetric(realNutritionData.heartHealth.hsCRP, ' mg/L', true)}
                  <Typography variant="caption" color={COLORS.success}>Low risk (Target: ≤3.0)</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Essential Vitamins */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', bgcolor: COLORS.card }}>
            <CardContent>
              <Typography variant="h6" gutterBottom color={COLORS.text}>
                Essential Vitamins & Minerals
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color={COLORS.text}>Vitamin D</Typography>
                  {renderMetric(realNutritionData.essentialVitamins.vitaminD, ' ng/mL', false)}
                  <Typography variant="caption" color={COLORS.error}>DEFICIENT (Target: 20-100)</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color={COLORS.text}>Vitamin B12</Typography>
                  {renderMetric(realNutritionData.essentialVitamins.vitaminB12, ' ng/L', true)}
                  <Typography variant="caption" color={COLORS.success}>Normal (Target: ≥197)</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color={COLORS.text}>Folate</Typography>
                  {renderMetric(realNutritionData.essentialVitamins.folate, ' μg/L', false)}
                  <Typography variant="caption" color={COLORS.error}>LOW (Target: ≥3.9)</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color={COLORS.text}>Iron</Typography>
                  {renderMetric(realNutritionData.essentialVitamins.iron, ' μg/dL', true)}
                  <Typography variant="caption" color={COLORS.success}>Normal (65-175)</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color={COLORS.text}>Magnesium</Typography>
                  {renderMetric(realNutritionData.inflammationAndMinerals.magnesium, ' mmol/L', true)}
                  <Typography variant="caption" color={COLORS.success}>Normal (0.66-1.07)</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Liver & Kidney Function */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', bgcolor: COLORS.card }}>
            <CardContent>
              <Typography variant="h6" gutterBottom color={COLORS.text}>
                Liver & Kidney Function
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color={COLORS.text}>ALT (Liver)</Typography>
                  {renderMetric(realNutritionData.liverFunction.alt, ' U/L', false)}
                  <Typography variant="caption" color={COLORS.warning}>Slightly elevated (Target: ≤41)</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color={COLORS.text}>AST (Liver)</Typography>
                  {renderMetric(realNutritionData.liverFunction.ast, ' U/L', true)}
                  <Typography variant="caption" color={COLORS.success}>Normal (Target: ≤40)</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color={COLORS.text}>Creatinine</Typography>
                  {renderMetric(realNutritionData.kidneyFunction.creatinine, ' mg/dL', true)}
                  <Typography variant="caption" color={COLORS.success}>Normal (0.70-1.20)</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color={COLORS.text}>eGFR</Typography>
                  {renderMetric(realNutritionData.kidneyFunction.egfr, ' mL/min/1.73m²', true)}
                  <Typography variant="caption" color={COLORS.success}>Normal (Target: ≥90)</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Risk Assessment Overview */}
        <Grid item xs={12}>
          <Card sx={{ bgcolor: COLORS.card }}>
            <CardContent>
              <Typography variant="h6" gutterBottom color={COLORS.text}>
                Health Risk Assessment
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <Box textAlign="center" p={2}>
                    <Typography variant="subtitle2" color={COLORS.text}>Inflammation</Typography>
                    <Chip 
                      label={realNutritionData.riskAssessment.inflammation}
                      sx={{ 
                        bgcolor: getRiskColor(realNutritionData.riskAssessment.inflammation),
                        color: 'white',
                        fontWeight: 'bold'
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box textAlign="center" p={2}>
                    <Typography variant="subtitle2" color={COLORS.text}>Insulin Resistance</Typography>
                    <Chip 
                      label={realNutritionData.riskAssessment.insulinResistance}
                      sx={{ 
                        bgcolor: getRiskColor(realNutritionData.riskAssessment.insulinResistance),
                        color: 'white',
                        fontWeight: 'bold'
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box textAlign="center" p={2}>
                    <Typography variant="subtitle2" color={COLORS.text}>Cardiovascular</Typography>
                    <Chip 
                      label={realNutritionData.riskAssessment.cardiovascular}
                      sx={{ 
                        bgcolor: getRiskColor(realNutritionData.riskAssessment.cardiovascular),
                        color: 'white',
                        fontWeight: 'bold'
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box textAlign="center" p={2}>
                    <Typography variant="subtitle2" color={COLORS.text}>Oxidative Stress</Typography>
                    <Chip 
                      label={realNutritionData.riskAssessment.oxidativeStress}
                      sx={{ 
                        bgcolor: getRiskColor(realNutritionData.riskAssessment.oxidativeStress),
                        color: 'white',
                        fontWeight: 'bold'
                      }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Priority Action Plan */}
        <Grid item xs={12}>
          <Card sx={{ bgcolor: COLORS.card }}>
            <CardContent>
              <Typography variant="h6" gutterBottom color={COLORS.text}>
                Priority Action Plan
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle1" color={COLORS.error} gutterBottom>
                    <PriorityHigh sx={{ mr: 1 }} />
                    Immediate Actions
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon><Warning color="error" /></ListItemIcon>
                      <ListItemText primary="Start Vitamin D supplementation (2000-4000 IU daily)" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><Warning color="error" /></ListItemIcon>
                      <ListItemText primary="Increase folate intake through leafy greens" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><Warning color="error" /></ListItemIcon>
                      <ListItemText primary="Address insulin resistance with diet changes" />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle1" color={COLORS.warning} gutterBottom>
                    <TrendingUp sx={{ mr: 1 }} />
                    Medium Term (1-3 months)
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon><MonitorHeart color="warning" /></ListItemIcon>
                      <ListItemText primary="Implement intermittent fasting protocol" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><MonitorHeart color="warning" /></ListItemIcon>
                      <ListItemText primary="Reduce processed carbohydrates" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><MonitorHeart color="warning" /></ListItemIcon>
                      <ListItemText primary="Increase aerobic exercise to 150min/week" />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle1" color={COLORS.success} gutterBottom>
                    <CheckCircle sx={{ mr: 1 }} />
                    Long Term (3-6 months)
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon><Favorite color="success" /></ListItemIcon>
                      <ListItemText primary="Retest insulin sensitivity markers" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><Favorite color="success" /></ListItemIcon>
                      <ListItemText primary="Monitor biological age progression" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><Favorite color="success" /></ListItemIcon>
                      <ListItemText primary="Optimize sleep and stress management" />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Red Flags */}
        <Grid item xs={12}>
          <Card sx={{ bgcolor: COLORS.card }}>
            <CardContent>
              <Typography variant="h6" gutterBottom color={COLORS.text}>
                Health Alerts & Monitoring
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle1" color={COLORS.error} gutterBottom>
                    Critical Issues
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon><Warning color="error" /></ListItemIcon>
                      <ListItemText 
                        primary="Biological age 3 years higher than chronological"
                        secondary="Indicates accelerated aging process"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><Warning color="error" /></ListItemIcon>
                      <ListItemText 
                        primary="Severe Vitamin D deficiency (13.8 ng/mL)"
                        secondary="Significantly below optimal range"
                      />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle1" color={COLORS.warning} gutterBottom>
                    Warning Signs
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon><Warning color="warning" /></ListItemIcon>
                      <ListItemText 
                        primary="Insulin resistance detected (HOMA-IR: 1.8)"
                        secondary="Early metabolic dysfunction"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><Warning color="warning" /></ListItemIcon>
                      <ListItemText 
                        primary="Low folate levels (2.7 μg/L)"
                        secondary="May affect methylation capacity"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><Warning color="warning" /></ListItemIcon>
                      <ListItemText 
                        primary="Elevated waist-to-height ratio (0.53)"
                        secondary="Indicates visceral fat accumulation"
                      />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle1" color={COLORS.success} gutterBottom>
                    Positive Markers
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                      <ListItemText 
                        primary="Low cardiovascular risk"
                        secondary="Excellent lipid profile"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                      <ListItemText 
                        primary="Low inflammation markers"
                        secondary="hsCRP well within range"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                      <ListItemText 
                        primary="Normal hormone levels"
                        secondary="Testosterone and thyroid optimal"
                      />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default React.memo(Nutrition);