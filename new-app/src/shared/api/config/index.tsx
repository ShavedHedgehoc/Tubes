// export const externalApiUrl = "/api_tubes" //"http://localhost:8000/api_tubes/";



const IS_SERVER = typeof window === 'undefined';

export const externalApiUrl = IS_SERVER
    ? "http://api_tubes:7100/api_tubes"
    : "/api_tubes";

export const proxyApiUrl = "/api/proxy";