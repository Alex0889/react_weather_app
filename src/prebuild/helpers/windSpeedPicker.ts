export function windSpeedPicker(wind: number): string {
  const windSpeed = [
    0.2,
    1.5,
    3.3,
    5.4,
    7.9,
    10.7,
    13.8,
    17.1,
    20.7,
    24.4,
    28.4,
    32.6,
    Infinity,
  ];
  const names = [
    'штиль',
    'тихий ветер',
    'слабый ветер',
    'тихий ветер',
    'умеренный ветер',
    'свежий ветер',
    'сильный ветер',
    'крепкий ветер',
    'очень крепкий ветер',
    'шторм',
    'сильный шторм',
    'жесткий шторм',
    'ураган'
  ];
  for (let i = 0; i < windSpeed.length; i++) {
    if (wind <= windSpeed[i]) return names[i];
  }
  return 'error';
}