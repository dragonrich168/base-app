/**
 * Static service metadata. Keep in one place so the router, health checks
 * and any future admin surfaces report the same identity.
 */
export const meta = {
  name: 'base-app',
  version: '0.1.0',
} as const;
