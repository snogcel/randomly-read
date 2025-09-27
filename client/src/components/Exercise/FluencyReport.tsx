import React, { useMemo, useState, useCallback } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Chip,
  Avatar,
  LinearProgress,
  Divider,
  useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  TrendingUp,
  TrendingDown,
  Remove,
  Assessment,
  DateRange,
  Download,
  Star,
  Timer,
  CheckCircle,
  School
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { FluencyReportProps, FluencyData, ProgressTrend } from './progressTypes';

const ReportContainer = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.spacing(2),
}));

const MetricCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  backgroundColor: theme.palette.grey[50],
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.spacing(1),
  height: '100%',
}));

const MetricValue = styled(Typography)(({ theme }) => ({
  fontSize: '2rem',
  fontWeight: 700,
  color: theme.palette.primary.main,
}));

const TrendIcon = styled(Box)<{ trend: 'up' | 'down' | 'stable' }>(({ theme, trend }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  color: 
    trend === 'up' ? theme.palette.success.main :
    trend === 'down' ? theme.palette.error.main :
    theme.palette.text.secondary,
}));

const ChartContainer = styled(Box)(({ theme }) => ({
  height: '300px',
  width: '100%',
  marginTop: theme.spacing(2),
}));

const HeaderSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
  flexWrap: 'wrap',
  gap: theme.spacing(2),
}));

const FilterSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  alignItems: 'center',
  flexWrap: 'wrap',
}));

const CHART_COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00ff00'];

const FluencyReport: React.FC<FluencyReportProps> = ({
  userId,
  dateRange,
  routineFilter,
  data,
  onGenerateReport,
  onExportReport,
  showCharts = true,
  showTrends = true,
  className,
}) => {
  const theme = useTheme();
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'quarter'>('month');
  const [selectedMetric, setSelectedMetric] = useState<'accuracy' | 'speed' | 'consistency'>('accuracy');

  // Calculate summary metrics
  const summaryMetrics = useMemo(() => {
    if (!data || data.sessions.length === 0) {
      return {
        totalSessions: 0,
        averageAccuracy: 0,
        totalWordsAttempted: 0,
        averageSessionTime: 0,
        improvementRate: 0,
        consistencyScore: 0,
      };
    }

    const sessions = data.sessions;
    const totalSessions = sessions.length;
    const totalWordsAttempted = sessions.reduce((sum, session) => sum + session.wordsAttempted, 0);
    const averageAccuracy = sessions.reduce((sum, session) => sum + session.accuracy, 0) / totalSessions;
    const averageSessionTime = sessions.reduce((sum, session) => sum + session.duration, 0) / totalSessions;

    // Calculate improvement rate (comparing first half to second half of sessions)
    const midPoint = Math.floor(sessions.length / 2);
    const firstHalfAccuracy = sessions.slice(0, midPoint).reduce((sum, s) => sum + s.accuracy, 0) / midPoint;
    const secondHalfAccuracy = sessions.slice(midPoint).reduce((sum, s) => sum + s.accuracy, 0) / (sessions.length - midPoint);
    const improvementRate = ((secondHalfAccuracy - firstHalfAccuracy) / firstHalfAccuracy) * 100;

    // Calculate consistency score (inverse of standard deviation)
    const accuracyMean = averageAccuracy;
    const accuracyVariance = sessions.reduce((sum, s) => sum + Math.pow(s.accuracy - accuracyMean, 2), 0) / totalSessions;
    const consistencyScore = Math.max(0, 100 - Math.sqrt(accuracyVariance) * 10);

    return {
      totalSessions,
      averageAccuracy: Math.round(averageAccuracy * 100),
      totalWordsAttempted,
      averageSessionTime: Math.round(averageSessionTime / 60), // Convert to minutes
      improvementRate: Math.round(improvementRate),
      consistencyScore: Math.round(consistencyScore),
    };
  }, [data]);

  // Prepare chart data
  const chartData = useMemo(() => {
    if (!data || data.sessions.length === 0) return [];

    return data.sessions.map((session, index) => ({
      session: index + 1,
      accuracy: Math.round(session.accuracy * 100),
      speed: session.wordsPerMinute || 0,
      date: new Date(session.date).toLocaleDateString(),
      consistency: session.consistencyScore || 0,
    }));
  }, [data]);

  // Difficulty distribution data
  const difficultyData = useMemo(() => {
    if (!data || data.difficultyBreakdown.length === 0) return [];

    return data.difficultyBreakdown.map((item) => ({
      name: item.level,
      value: item.percentage,
      count: item.count,
    }));
  }, [data]);

  // Progress trend analysis
  const progressTrend = useMemo((): ProgressTrend => {
    if (!data || data.sessions.length < 2) {
      return { direction: 'stable', percentage: 0, description: 'Insufficient data' };
    }

    const recent = data.sessions.slice(-5);
    const previous = data.sessions.slice(-10, -5);

    if (recent.length === 0 || previous.length === 0) {
      return { direction: 'stable', percentage: 0, description: 'Insufficient data' };
    }

    const recentAvg = recent.reduce((sum, s) => sum + s.accuracy, 0) / recent.length;
    const previousAvg = previous.reduce((sum, s) => sum + s.accuracy, 0) / previous.length;
    const change = ((recentAvg - previousAvg) / previousAvg) * 100;

    if (Math.abs(change) < 2) {
      return { direction: 'stable', percentage: Math.abs(change), description: 'Steady performance' };
    } else if (change > 0) {
      return { direction: 'up', percentage: change, description: 'Improving performance' };
    } else {
      return { direction: 'down', percentage: Math.abs(change), description: 'Declining performance' };
    }
  }, [data]);

  const getTrendIcon = useCallback((trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <TrendingUp />;
      case 'down':
        return <TrendingDown />;
      default:
        return <Remove />;
    }
  }, []);

  const handleExportReport = useCallback(() => {
    if (onExportReport) {
      onExportReport({
        userId,
        dateRange,
        metrics: summaryMetrics,
        chartData,
        format: 'pdf',
      });
    }
  }, [onExportReport, userId, dateRange, summaryMetrics, chartData]);

  const renderMetricCards = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={2}>
        <MetricCard>
          <Avatar sx={{ bgcolor: 'primary.main', mb: 1, mx: 'auto' }}>
            <Assessment />
          </Avatar>
          <MetricValue>{summaryMetrics.totalSessions}</MetricValue>
          <Typography variant="body2" color="textSecondary">
            Total Sessions
          </Typography>
        </MetricCard>
      </Grid>

      <Grid item xs={12} sm={6} md={2}>
        <MetricCard>
          <Avatar sx={{ bgcolor: 'success.main', mb: 1, mx: 'auto' }}>
            <CheckCircle />
          </Avatar>
          <MetricValue>{summaryMetrics.averageAccuracy}%</MetricValue>
          <Typography variant="body2" color="textSecondary">
            Average Accuracy
          </Typography>
        </MetricCard>
      </Grid>

      <Grid item xs={12} sm={6} md={2}>
        <MetricCard>
          <Avatar sx={{ bgcolor: 'info.main', mb: 1, mx: 'auto' }}>
            <School />
          </Avatar>
          <MetricValue>{summaryMetrics.totalWordsAttempted}</MetricValue>
          <Typography variant="body2" color="textSecondary">
            Words Practiced
          </Typography>
        </MetricCard>
      </Grid>

      <Grid item xs={12} sm={6} md={2}>
        <MetricCard>
          <Avatar sx={{ bgcolor: 'warning.main', mb: 1, mx: 'auto' }}>
            <Timer />
          </Avatar>
          <MetricValue>{summaryMetrics.averageSessionTime}m</MetricValue>
          <Typography variant="body2" color="textSecondary">
            Avg Session Time
          </Typography>
        </MetricCard>
      </Grid>

      <Grid item xs={12} sm={6} md={2}>
        <MetricCard>
          <TrendIcon trend={progressTrend.direction}>
            {getTrendIcon(progressTrend.direction)}
            <Box ml={1}>
              <MetricValue>{Math.abs(summaryMetrics.improvementRate)}%</MetricValue>
              <Typography variant="body2" color="textSecondary">
                Improvement
              </Typography>
            </Box>
          </TrendIcon>
        </MetricCard>
      </Grid>

      <Grid item xs={12} sm={6} md={2}>
        <MetricCard>
          <Avatar sx={{ bgcolor: 'secondary.main', mb: 1, mx: 'auto' }}>
            <Star />
          </Avatar>
          <MetricValue>{summaryMetrics.consistencyScore}</MetricValue>
          <Typography variant="body2" color="textSecondary">
            Consistency Score
          </Typography>
        </MetricCard>
      </Grid>
    </Grid>
  );

  const renderProgressChart = () => (
    <ChartContainer>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="session" />
          <YAxis domain={[0, 100]} />
          <Tooltip 
            formatter={(value, name) => [`${value}${name === 'accuracy' ? '%' : ''}`, name]}
            labelFormatter={(label) => `Session ${label}`}
          />
          <Line 
            type="monotone" 
            dataKey={selectedMetric} 
            stroke={theme.palette.primary.main} 
            strokeWidth={2}
            dot={{ fill: theme.palette.primary.main, strokeWidth: 2, r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );

  const renderDifficultyChart = () => (
    <ChartContainer>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={difficultyData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percentage }) => `${name}: ${percentage}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {difficultyData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );

  if (!data) {
    return (
      <ReportContainer className={className}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            No Data Available
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Complete some exercise sessions to see your fluency report.
          </Typography>
        </CardContent>
      </ReportContainer>
    );
  }

  return (
    <ReportContainer className={className}>
      <CardContent>
        <HeaderSection>
          <Box>
            <Typography variant="h5" gutterBottom>
              Fluency Progress Report
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {dateRange.start.toLocaleDateString()} - {dateRange.end.toLocaleDateString()}
            </Typography>
          </Box>

          <FilterSection>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Period</InputLabel>
              <Select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value as any)}
              >
                <MenuItem value="week">Week</MenuItem>
                <MenuItem value="month">Month</MenuItem>
                <MenuItem value="quarter">Quarter</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Metric</InputLabel>
              <Select
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value as any)}
              >
                <MenuItem value="accuracy">Accuracy</MenuItem>
                <MenuItem value="speed">Speed</MenuItem>
                <MenuItem value="consistency">Consistency</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="outlined"
              startIcon={<Download />}
              onClick={handleExportReport}
              size="small"
            >
              Export
            </Button>
          </FilterSection>
        </HeaderSection>

        {/* Summary Metrics */}
        {renderMetricCards()}

        <Divider sx={{ my: 4 }} />

        {/* Progress Trend */}
        {showTrends && (
          <Box mb={4}>
            <Typography variant="h6" gutterBottom>
              Progress Trend
            </Typography>
            <Box display="flex" alignItems="center" gap={2} mb={2}>
              <TrendIcon trend={progressTrend.direction}>
                {getTrendIcon(progressTrend.direction)}
              </TrendIcon>
              <Typography variant="body1">
                {progressTrend.description}
              </Typography>
              <Chip
                label={`${progressTrend.percentage.toFixed(1)}%`}
                color={progressTrend.direction === 'up' ? 'success' : progressTrend.direction === 'down' ? 'error' : 'default'}
                size="small"
              />
            </Box>
            <LinearProgress
              variant="determinate"
              value={Math.min(progressTrend.percentage, 100)}
              sx={{ height: 8, borderRadius: 4 }}
            />
          </Box>
        )}

        {/* Charts */}
        {showCharts && (
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Typography variant="h6" gutterBottom>
                Performance Over Time
              </Typography>
              {renderProgressChart()}
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Difficulty Distribution
              </Typography>
              {renderDifficultyChart()}
            </Grid>
          </Grid>
        )}
      </CardContent>
    </ReportContainer>
  );
};

export default FluencyReport;