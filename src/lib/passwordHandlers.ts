import bcrypt from 'bcrypt';

export async function hashPassword(plainPassword: string, saltRounds: number | string = 10) {
  return await bcrypt.hash(plainPassword, saltRounds);
}

export async function checkPassword(plainPassword: string, passwordHash: string) {
  return await bcrypt.compare(plainPassword, passwordHash);
}
