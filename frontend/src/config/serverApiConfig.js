// 현재 접속한 호스트(IP 또는 도메인)를 동적으로 가져옵니다.
const currentHost = window.location.hostname;
const currentProtocol = window.location.protocol; // http: 또는 https:

// 배포 여부 확인 (Vite 기본 변수 사용)
const isProd = import.meta.env.PROD || import.meta.env.VITE_DEV_REMOTE === 'remote';

// [핵심 수정] 
// 1. 도메인을 직접 적지 않고 현재 접속한 주소를 따라가게 설정 (상대 경로)
// 2. Nginx가 /api를 8888로 넘겨주므로, 포트 번호(:8888)를 뺄 수 있습니다.
export const API_BASE_URL = isProd 
  ? "/api/" 
  : `${currentProtocol}//${currentHost}:8888/api/`;

export const BASE_URL = isProd 
  ? "/" 
  : `${currentProtocol}//${currentHost}:8888/`;

export const WEBSITE_URL = isProd
  ? "/" // 현재 도메인 그대로 사용
  : `${currentProtocol}//${currentHost}:3000/`;

export const DOWNLOAD_BASE_URL = isProd
  ? "/download/"
  : `${currentProtocol}//${currentHost}:8888/download/`;

export const ACCESS_TOKEN_NAME = 'x-auth-token';
export const FILE_BASE_URL = import.meta.env.VITE_FILE_BASE_URL || "/public/";

// export const API_BASE_URL =
//   import.meta.env.PROD || import.meta.env.VITE_DEV_REMOTE == 'remote'
//     ? import.meta.env.VITE_BACKEND_SERVER + 'api/'
//     : 'http://localhost:8888/api/';
// export const BASE_URL =
//   import.meta.env.PROD || import.meta.env.VITE_DEV_REMOTE
//     ? import.meta.env.VITE_BACKEND_SERVER
//     : 'http://localhost:8888/';

// export const WEBSITE_URL = import.meta.env.PROD
//   ? 'http://cloud.idurarapp.com/'
//   : 'http://localhost:3000/';
// export const DOWNLOAD_BASE_URL =
//   import.meta.env.PROD || import.meta.env.VITE_DEV_REMOTE
//     ? import.meta.env.VITE_BACKEND_SERVER + 'download/'
//     : 'http://localhost:8888/download/';
// export const ACCESS_TOKEN_NAME = 'x-auth-token';

// export const FILE_BASE_URL = import.meta.env.VITE_FILE_BASE_URL;
