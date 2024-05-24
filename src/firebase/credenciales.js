// Importamos la función para inicializar la aplicación de Firebase
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA770hG-8-6II7eptwra6Gksl8Snz5RTcU",
    authDomain: "proyectotenis-f37f6.firebaseapp.com",
    projectId: "proyectotenis-f37f6",
    storageBucket: "proyectotenis-f37f6.appspot.com",
    messagingSenderId: "854112427826",
    appId: "1:854112427826:web:dbf8b2184826317a8a012b"
};

// Inicializamos la aplicación y la guardamos en firebaseApp
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

export { firebaseApp, storage };
