export const getTimeNotification = () => {
  const hour = new Date().getHours()
  return hour < 12 ? '上午好' : '下午好'
}