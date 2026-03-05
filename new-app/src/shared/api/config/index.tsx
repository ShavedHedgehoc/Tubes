export const proxyApiUrl = "/api/proxy";
const env = process.env;

export const externalApiUrl = typeof window === 'undefined'
    ? (env.INTERNAL_API_URL || env.NEXT_PUBLIC_API_URL)
    : env.NEXT_PUBLIC_API_URL;

console.log('RUNTIME ENV:', process.env.INTERNAL_API_URL);