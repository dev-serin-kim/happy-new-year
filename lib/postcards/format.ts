const parts = (iso: string) => {
  const f = new Intl.DateTimeFormat('ko-KR', { timeZone: 'Asia/Seoul', year: 'numeric', month: 'numeric', day: 'numeric' })
  const p = Object.fromEntries(f.formatToParts(new Date(iso)).map((x) => [x.type, x.value]))
  return { year: p.year, month: p.month, day: p.day }
}

// "12.31"
export const shortDate = (iso: string) => {
  const { month, day } = parts(iso)
  return `${month}.${day}`
}

// "2026년 12.31"
export const longDate = (iso: string) => `${parts(iso).year}년 ${shortDate(iso)}`

export const yearOf = (iso: string) => parts(iso).year
