/**
 * Extract a human-readable error message from RTK Query / fetch errors.
 * Handles common backend shapes: { data: { message } }, { data: string },
 * { error: string }, or plain Error objects.
 */
export function getErrorMessage(error: unknown, fallback: string): string {
  if (!error) return fallback;

  // RTK Query: { data: { message: string } }
  if (
    typeof error === 'object' &&
    'data' in error &&
    error.data &&
    typeof error.data === 'object' &&
    'message' in (error.data as Record<string, unknown>)
  ) {
    const msg = (error.data as Record<string, unknown>).message;
    if (typeof msg === 'string' && msg.trim()) return msg;
  }

  // RTK Query: { data: string }
  if (
    typeof error === 'object' &&
    'data' in error &&
    typeof error.data === 'string' &&
    error.data.trim()
  ) {
    return error.data;
  }

  // { error: string }
  if (
    typeof error === 'object' &&
    'error' in error &&
    typeof error.error === 'string' &&
    error.error.trim()
  ) {
    return error.error;
  }

  // Error.message
  if (
    typeof error === 'object' &&
    'message' in error &&
    typeof error.message === 'string' &&
    error.message.trim()
  ) {
    return error.message;
  }

  return fallback;
}
