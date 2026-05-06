// Server-side utility helpers for rate limiting and environment configuration
type RateBucket = { count: number; reset: number };

function envNumber(name: string, fallback: number) {
  const v = process.env[name];
  if (!v) return fallback;
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

export { envNumber as getEnvNumber };

// Simple in-memory rate limiter. Persisted on globalThis for reuse in dev.
const GLOBAL_KEY = '__IATERPRETER_RATE_LIMIT_STORE__';
const store: Map<string, RateBucket> = (globalThis as any)[GLOBAL_KEY] || new Map();
(globalThis as any)[GLOBAL_KEY] = store;

export async function rateLimit(request: Request, keyPrefix = 'rl') {
  try {
    const windowMs = envNumber('RATE_LIMIT_WINDOW_MS', 60_000);
    const maxRequests = envNumber('RATE_LIMIT_MAX', 30);

    // Determine client id from headers
    const ip = (request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'local') as string;
    const key = `${keyPrefix}:${ip}`;

    const now = Date.now();
    const bucket = store.get(key);
    if (!bucket) {
      store.set(key, { count: 1, reset: now + windowMs });
      return;
    }

    if (now > bucket.reset) {
      store.set(key, { count: 1, reset: now + windowMs });
      return;
    }

    bucket.count += 1;
    if (bucket.count > maxRequests) {
      const retryAfter = Math.ceil((bucket.reset - now) / 1000);
      const err: any = new Error('Too many requests');
      err.status = 429;
      err.retryAfter = retryAfter;
      throw err;
    }

    // store updated bucket
    store.set(key, bucket);
  } catch (e) {
    throw e;
  }
}

export function enforceMaxOutputTokens(defaultTokens = 512) {
  return envNumber('MAX_OUTPUT_TOKENS', defaultTokens);
}

export function maxInputChars(defaultChars = 20000) {
  return envNumber('MAX_INPUT_CHARS', defaultChars);
}

export function maxFileBytes(defaultBytes = 10 * 1024 * 1024) {
  return envNumber('MAX_FILE_BYTES', defaultBytes);
}
