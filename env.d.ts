/// <reference types="vite/client" />

interface ImportMetaEnv {
	VITE_API_BASE_URL: string;
	VITE_API_VERSION: string;
	VITE_CLIENT_ID: string;
	VITE_FIREBASE_COLLECTION_NAME: string;
	VITE_FIREBASE_COLLECTION_ID: string;
  }
  
  declare module "*.vue";
