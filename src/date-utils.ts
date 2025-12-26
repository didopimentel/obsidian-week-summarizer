function getWeekRange(reference = new Date()) {
  const day = reference.getDay(); // Sunday = 0
  const diffToMonday = day === 0 ? -6 : 1 - day;

  const monday = new Date(reference);
  monday.setDate(reference.getDate() + diffToMonday);

  const friday = new Date(monday);
  friday.setDate(monday.getDate() + 4);

  return { monday, friday };
}

function getISOWeekNumber(date: Date): number {
  const temp = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));

  // Set to nearest Thursday (ISO week date system)
  const day = temp.getUTCDay() || 7;
  temp.setUTCDate(temp.getUTCDate() + 4 - day);

  const yearStart = new Date(Date.UTC(temp.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((temp.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);

  return weekNo;
}


export { getWeekRange, getISOWeekNumber };