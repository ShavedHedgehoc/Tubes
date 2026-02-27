// export const externalApiUrl = "/api_tubes" //"http://localhost:8000/api_tubes/";


const IS_SERVER = typeof window === 'undefined';


export const proxyApiUrl = "/api/proxy";

// export const externalApiUrl = IS_SERVER
//     ? "http://tubes_api:7100/api_tubes" // Используем имя сервиса из docker-compose
// : "/api_tubes";

// export const externalApiUrl = typeof window === 'undefined'
//     ? process.env.INTERNAL_API_URL
//     : process.env.NEXT_PUBLIC_API_URL;
const env = process.env;

export const externalApiUrl = typeof window === 'undefined'
    ? (env.INTERNAL_API_URL || env.NEXT_PUBLIC_API_URL)
    : env.NEXT_PUBLIC_API_URL;

console.log('RUNTIME ENV:', process.env.INTERNAL_API_URL);