export const calculateTimeLeft = (targetTimezone) => {
  const now = new Date();
  const targetYear = now.getFullYear() + 1;
  const targetDateStr = new Date(`${targetYear}-01-01T00:00:00`).toLocaleString('en-US', { timeZone: targetTimezone });
  const targetDate = new Date(targetDateStr);
  const nowInZoneStr = now.toLocaleString('en-US', { timeZone: targetTimezone });
  const nowInZone = new Date(nowInZoneStr);
  
  const difference = +targetDate - +nowInZone;

  if (difference > 0) {
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      completed: false
    };
  }
  return { days: 0, hours: 0, minutes: 0, seconds: 0, completed: true };
};