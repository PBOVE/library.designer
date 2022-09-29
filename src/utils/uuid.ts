const hexMap = '0123456789abcdefijklmnopqrstuvwxyz';

export function buildSchemId(prefix?: string): string {
  let uuid = `${prefix}_`;
  for (let i = 1; i <= 8; i += 1) {
    uuid += hexMap[Math.floor(Math.random() * 34)];
  }

  return uuid;
}

export function buildUUID(): string {
  let uuid = '';
  for (let i = 1; i <= 36; i += 1) {
    if (i === 9 || i === 14 || i === 19 || i === 24) {
      uuid += '-';
    } else if (i === 15) {
      uuid += 4;
    } else if (i === 20) {
      uuid += hexMap[(Math.random() * 4) | 8];
    } else {
      uuid += hexMap[(Math.random() * 16) | 0];
    }
  }
  return uuid;
}
