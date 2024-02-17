import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { upload } from './upload.js';


const firebaseConfig = {
  apiKey: "AIzaSyD0O3kRKuWUR3Vu4-N33AwnzrO7ROO1kc8",
  authDomain: "fe-upload-45fe4.firebaseapp.com",
  projectId: "fe-upload-45fe4",
  storageBucket: "fe-upload-45fe4.appspot.com",
  messagingSenderId: "278592886043",
  appId: "1:278592886043:web:b441003f7bd07c40b82fbe",
  measurementId: "G-X94R8TWZ5X"
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

upload('#file', {
  multi: true,
  accept: ['.png', '.jpg', '.jpeg', '.gif'],
  onUpload(files, blocks) {
    files.forEach((file, index ) => {
      const storageRef = ref(storage, `images/${file.name}`);
      const task = uploadBytes(storageRef, file);

      const block = blocks[index].querySelector('.preview-info-progress')
      
      task.then(snapshot => {
        console.log('Загрузка завершена');

        getDownloadURL(snapshot.ref).then(downloadURL => {
          console.log('URL загруженного файла:', downloadURL);
        });
        block.textContent = '100%';
        block.style.width = '100%';
      }).catch(error => {
        console.error(error);
        block.textContent = 'Ошибка';
        block.style.width = '0%';
      });
    });
  }
});