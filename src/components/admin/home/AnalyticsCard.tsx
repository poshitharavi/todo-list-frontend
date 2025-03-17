import {
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  useTheme,
} from "@mui/material";
import { TaskAnalytics } from "../../../services/task.service";

const AnalyticsCard = ({ analytics }: { analytics: TaskAnalytics }) => {
  const theme = useTheme();

  const getProgressColor = (percentage: number) => {
    if (percentage >= 75) return theme.palette.success.main;
    if (percentage >= 50) return theme.palette.warning.main;
    return theme.palette.error.main;
  };

  return (
    <Card
      sx={{
        mb: 3,
        p: 2,
        borderRadius: 4,
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.2s",
        "&:hover": { transform: "translateY(-4px)" },
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h6" gutterBottom>
              {analytics.userName}
            </Typography>

            <Box display="flex" gap={4} mt={1}>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Total Tasks
                </Typography>
                <Typography variant="h4">{analytics.totalTasks}</Typography>
              </Box>

              <Box>
                <Typography variant="body2" color="text.secondary">
                  Completed
                </Typography>
                <Typography variant="h4" color="success.main">
                  {analytics.completedTasks}
                </Typography>
              </Box>

              <Box>
                <Typography variant="body2" color="text.secondary">
                  Pending
                </Typography>
                <Typography variant="h4">{analytics.pendingTasks}</Typography>
              </Box>

              <Box>
                <Typography variant="body2" color="text.secondary">
                  Expired
                </Typography>
                <Typography variant="h4" color="error.main">
                  {analytics.expiredTasks}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box position="relative" display="inline-flex">
            <CircularProgress
              variant="determinate"
              value={analytics.completionPercentage}
              size={80}
              thickness={4}
              sx={{ color: getProgressColor(analytics.completionPercentage) }}
            />
            <Box
              top={0}
              left={0}
              bottom={0}
              right={0}
              position="absolute"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="h6" component="div">
                {`${Math.round(analytics.completionPercentage)}%`}
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AnalyticsCard;
