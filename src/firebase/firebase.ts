import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore";

const app = initializeApp({
	apiKey: "AIzaSyDQZ3Vx-bKlZy9YJHkzvuYG2QACQNjpBxw",
	authDomain: "auto-save-vue3.firebaseapp.com",
	projectId: "auto-save-vue3",
	storageBucket: "auto-save-vue3.appspot.com",
	messagingSenderId: "949018088665",
	appId: "1:949018088665:web:ff871afb6051e58ae55ac8"
});

const DB = getFirestore(app);
export { DB }