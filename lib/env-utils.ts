// Utility to check if we're in build time vs runtime
export const isBuildTime = process.env.NODE_ENV === 'production' && !process.env.VERCEL_URL;

// Check if environment variables are available
export const hasSupabaseConfig = () => {
  return !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
};

// Check if Resend is configured
export const hasResendConfig = () => {
  return !!process.env.RESEND_API_KEY;
};

// Safe environment variable getter
export const getEnvVar = (key: string, fallback = '') => {
  return process.env[key] || fallback;
};