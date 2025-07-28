# Learning Hub API Documentation

## Overview
The Learning Hub API provides endpoints for tracking user progress, achievements, XP, and streaks in learning activities.

## Authentication
All endpoints require authentication via Bearer token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Available Endpoints

### 1. Update Progress
**POST** `/api/v1/learning-hub/progress`

Updates user progress for a lesson.

**Request Body:**
```json
{
  "courseId": "string",
  "lessonId": "string", 
  "progressPercentage": 85,
  "timeSpent": 1200
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "courseId": "string",
    "lessonId": "string",
    "progressPercentage": 85,
    "isCompleted": false,
    "timeSpent": 1200,
    "lastAccessedAt": "2025-07-28T13:00:00.000Z"
  },
  "message": "Progress updated successfully"
}
```

### 2. Get User Progress
**GET** `/api/v1/learning-hub/progress?courseId=<courseId>`

Gets user progress for all lessons or specific course.

**Response:**
```json
{
  "progress": [...],
  "courseProgress": {
    "totalLessons": 10,
    "completedLessons": 3,
    "progressPercentage": 30,
    "totalTimeSpent": 3600
  }
}
```

### 3. Get User Achievements
**GET** `/api/v1/learning-hub/achievements`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "type": "first_lesson",
      "title": "First Steps",
      "description": "Completed your first lesson!",
      "xpReward": 50,
      "icon": "🎯",
      "unlockedAt": "2025-07-28T13:00:00.000Z"
    }
  ]
}
```

### 4. Get User XP
**GET** `/api/v1/learning-hub/xp`

**Response:**
```json
{
  "userXp": {
    "totalXp": 450,
    "level": 3,
    "currentLevelXp": 50,
    "nextLevelXp": 200
  },
  "transactions": [...],
  "xpBySource": [
    {
      "source": "lesson_completion",
      "total": 325
    }
  ]
}
```

### 5. Get User Streak
**GET** `/api/v1/learning-hub/streak`

**Response:**
```json
{
  "success": true,
  "data": {
    "currentStreak": 5,
    "longestStreak": 12,
    "totalActiveDays": 45,
    "lastActivityDate": "2025-07-28T00:00:00.000Z"
  }
}
```

### 6. Get User Stats (Combined)
**GET** `/api/v1/learning-hub/stats`

Returns all user learning hub data in one call.

**Response:**
```json
{
  "progress": [...],
  "achievements": [...],
  "xp": {...},
  "streak": {...},
  "recentTransactions": [...]
}
```

### 7. Get Leaderboard
**GET** `/api/v1/learning-hub/leaderboard`

**Response:**
```json
{
  "xpLeaderboard": [...],
  "streakLeaderboard": [...]
}
```

## Frontend Integration

### 1. State Management
Create a learning hub context/store that:
- Fetches initial data on app load
- Updates local state when progress is made
- Syncs with backend periodically

### 2. Data Persistence Solution
```typescript
// Example React context setup
const LearningHubContext = createContext();

export const LearningHubProvider = ({ children }) => {
  const [state, setState] = useState({
    progress: [],
    achievements: [],
    xp: null,
    streak: null,
    loading: true
  });

  // Load data on mount and auth changes
  useEffect(() => {
    if (user) {
      loadLearningHubData();
    }
  }, [user]);

  const loadLearningHubData = async () => {
    try {
      const response = await fetch('/api/v1/learning-hub/stats', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setState({
        ...data,
        loading: false
      });
    } catch (error) {
      console.error('Failed to load learning hub data:', error);
    }
  };

  const updateProgress = async (courseId, lessonId, progressPercentage, timeSpent) => {
    try {
      const response = await fetch('/api/v1/learning-hub/progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          courseId,
          lessonId,
          progressPercentage,
          timeSpent
        })
      });
      
      const result = await response.json();
      
      // Refresh data to get updated achievements, XP, etc.
      await loadLearningHubData();
      
      return result;
    } catch (error) {
      console.error('Failed to update progress:', error);
    }
  };

  return (
    <LearningHubContext.Provider value={{
      ...state,
      updateProgress,
      refreshData: loadLearningHubData
    }}>
      {children}
    </LearningHubContext.Provider>
  );
};
```

### 3. Achievement System
The backend automatically awards achievements for:
- First lesson completion (50 XP)
- Course completion (200 XP)
- Streak milestones: 7, 30, 100, 365 days
- XP milestones: 1K, 5K, 10K, 25K, 50K
- Level milestones: 10, 25, 50, 100

### 4. XP System
- Lesson completion: 25 XP
- Course completion: 100 XP
- Achievement unlocks: Variable XP
- Level progression: 100 + (level-1) * 50 XP per level

## Troubleshooting

### Data Loss on Reload
If data is lost on page reload, ensure:
1. The learning hub data is fetched on app initialization
2. User authentication state is properly restored
3. API calls include valid JWT tokens
4. Error handling is in place for failed API calls

### Common Issues
1. **401 Unauthorized**: Check JWT token validity
2. **404 Not Found**: Verify endpoint URLs
3. **500 Server Error**: Check server logs for entity/database issues

## Testing the API

You can test the endpoints using curl:

```bash
# Get user stats
curl -X GET "http://localhost:3001/api/v1/learning-hub/stats" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Update progress
curl -X POST "http://localhost:3001/api/v1/learning-hub/progress" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "courseId": "course-1",
    "lessonId": "lesson-1",
    "progressPercentage": 100,
    "timeSpent": 300
  }'
```