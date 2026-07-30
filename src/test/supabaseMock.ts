import { vi } from 'vitest';

export type InsertResult = { data: unknown; error: { message: string } | null };

export function createSupabaseMock(result: InsertResult = { data: null, error: null }) {
  const insert = vi.fn().mockResolvedValue(result);
  const from = vi.fn().mockReturnValue({ insert });
  return { from, insert };
}
