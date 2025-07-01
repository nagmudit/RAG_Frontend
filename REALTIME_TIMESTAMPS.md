# Real-time Timestamp Updates

## Feature: Live Timestamp Updates in Chat Messages

### Problem Solved:
Previously, the `formatTimeAgo` timestamps (like "2m ago", "1h ago") only updated when new messages were sent to the chat. This meant that a message showing "just now" would continue to show "just now" even after several minutes had passed.

### Solution Implemented:
Added real-time timestamp updates using React hooks (`useState` and `useEffect`) with a periodic update mechanism.

### How It Works:

1. **State Management**:
   ```tsx
   const [timeAgo, setTimeAgo] = useState(() => formatTimeAgo(message.timestamp));
   ```
   - Each `ChatMessage` component maintains its own `timeAgo` state
   - Initialized with the formatted time when component mounts

2. **Real-time Updates**:
   ```tsx
   useEffect(() => {
     // Update immediately
     setTimeAgo(formatTimeAgo(message.timestamp));

     // Set up interval to update every minute
     const interval = setInterval(() => {
       setTimeAgo(formatTimeAgo(message.timestamp));
     }, 60000); // Update every 60 seconds

     // Cleanup interval on unmount
     return () => clearInterval(interval);
   }, [message.timestamp]);
   ```

3. **Update Frequency**: 
   - Updates every **60 seconds** (60,000 milliseconds)
   - Balances accuracy with performance
   - Sufficient for the time granularity we show (minutes/hours/days)

### Behavior:

- **"just now"** → **"1m ago"** → **"2m ago"** (updates every minute)
- **"5m ago"** → **"6m ago"** → **"7m ago"** (continues updating)
- **"1h ago"** → **"2h ago"** (when an hour passes)
- **"1d ago"** → **"2d ago"** (when a day passes)

### Performance Considerations:

1. **Efficient Updates**: Only updates the specific message's timestamp, not the entire chat
2. **Cleanup**: Properly clears intervals when components unmount to prevent memory leaks
3. **Minimal Re-renders**: Only the timestamp text changes, not the entire message
4. **Battery Friendly**: 60-second intervals are reasonable for mobile devices

### Test Scenarios:

1. **Send a message** → Should show "just now"
2. **Wait 1 minute** → Should automatically update to "1m ago"
3. **Wait another minute** → Should update to "2m ago"
4. **Send another message** → New message shows "just now", old message shows current time
5. **Navigate away and back** → Timestamps should still be updating correctly

### Edge Cases Handled:

- **Component Unmounting**: Intervals are properly cleaned up
- **Timestamp Dependencies**: Updates when `message.timestamp` changes
- **Initial State**: Correctly calculates initial time on component mount
- **Multiple Messages**: Each message updates independently

Now your chat timestamps will always show the current relative time, providing a much more accurate and dynamic user experience! ⏰✨
