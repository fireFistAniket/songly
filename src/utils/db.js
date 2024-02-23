// IndexedDBService.js
const DB_NAME = import.meta.env.VITE_DB_NAME;
const AUDIO_STORE_NAME = "audioStore";
const CURRENT_AUDIO_TIME = "audioTime";
const CURRENT_AUDIO_NAME = "audioName";

export const initializeDB = () => {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(DB_NAME, 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(AUDIO_STORE_NAME)) {
        db.createObjectStore(AUDIO_STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
      if (!db.objectStoreNames.contains(CURRENT_AUDIO_NAME)) {
        db.createObjectStore(CURRENT_AUDIO_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
      if (!db.objectStoreNames.contains(CURRENT_AUDIO_TIME)) {
        db.createObjectStore(CURRENT_AUDIO_TIME, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
};

export const saveAudio = (db, audioBlob) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(AUDIO_STORE_NAME, "readwrite");
    const store = transaction.objectStore(AUDIO_STORE_NAME);
    const request = store.put({ audioBlob });

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
};

export const saveCurrentAudio = (db, audioBlob) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(CURRENT_AUDIO_NAME, "readwrite");
    const store = transaction.objectStore(CURRENT_AUDIO_NAME);
    // store.clear();
    const request = store.put(audioBlob);
    request.onsuccess = () => {
      resolve(request.result);
    };
    request.onerror = () => {
      reject(request.error);
    };
  });
};

export const saveCurrentAudioTimer = (db, audioTime) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(CURRENT_AUDIO_TIME, "readwrite");
    const store = transaction.objectStore(CURRENT_AUDIO_TIME);
    const request = store.put(audioTime);
    request.onsuccess = () => {
      resolve(request.result);
    };
    request.onerror = () => {
      reject(request.error);
    };
  });
};

export const getAllAudio = async (db) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(AUDIO_STORE_NAME, "readonly");
    const audioStore = transaction.objectStore(AUDIO_STORE_NAME);
    const request = audioStore.getAll();

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
};

export const getAudioById = (db, audioId) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(AUDIO_STORE_NAME, "readonly");
    const store = transaction.objectStore(AUDIO_STORE_NAME);
    console.log(audioId);
    const request = store.get(audioId);

    request.onsuccess = () => {
      const audioData = request.result;
      if (audioData) {
        resolve(audioData.audioBlob);
      } else {
        resolve(null);
      }
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
};

export const getCurrentAudio = (db) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(CURRENT_AUDIO_NAME, "readonly");
    const store = transaction.objectStore(CURRENT_AUDIO_NAME);
    const request = store.getAll();

    request.onsuccess = () => {
      const audioData = request.result;
      if (audioData) {
        resolve(audioData);
      } else {
        resolve(null);
      }
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
};

export const getCurrentAudioTime = (db) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(CURRENT_AUDIO_TIME, "readonly");
    const store = transaction.objectStore(CURRENT_AUDIO_TIME);
    const request = store.getAll();

    request.onsuccess = () => {
      const audioData = request.result;
      if (audioData) {
        resolve(audioData);
      } else {
        resolve(null);
      }
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
};

export const deleteAudio = (db, audioId) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(AUDIO_STORE_NAME, "readwrite");
    const store = transaction.objectStore(AUDIO_STORE_NAME);
    const request = store.delete(audioId);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
};

export const deleteDatabase = () => {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.deleteDatabase(DB_NAME);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
};
