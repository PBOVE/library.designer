const hexMap = '0123456789abcdefijklmnopqrstuvwxyz';

export function buildSchemId(prefix?: string): string {
  let uuid = `${prefix}_`;
  for (let i = 1; i <= 8; i += 1) {
    uuid += hexMap[Math.floor(Math.random() * 34)];
  }

  return uuid;
}
