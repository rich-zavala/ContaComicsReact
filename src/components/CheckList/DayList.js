export function DayList(days) {
  return days.forEach(day => {
    <div>
      <div><b>{ day }</b></div>
    </div>
  });
}