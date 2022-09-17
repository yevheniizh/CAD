import { app } from "./init";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const db = getFirestore(app);

export const addData = async () => {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      first: "Ada",
      last: "Lovelace",
      born: 1815
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getData = async () => {
  const querySnapshot = await getDocs(collection(db, "users"));

  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
  });
};

