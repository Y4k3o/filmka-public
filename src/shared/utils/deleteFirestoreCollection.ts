import { deleteUser } from "firebase/auth";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { auth, db } from "../api/firebase";

export const deleteUserWithCollections = async (userId: string) => {
	const mediaListRef = collection(db, `users/${userId}/mediaList`);
	const mediaListSnapshot = await getDocs(mediaListRef);
	const deleteMediaPromises = mediaListSnapshot.docs.map((docSnap) => deleteDoc(docSnap.ref));

	await Promise.all(deleteMediaPromises);

	const userDocRef = doc(db, "users", userId);
	await deleteDoc(userDocRef);

	const currentUser = auth.currentUser;
	if (currentUser && currentUser.uid === userId) {
		await deleteUser(currentUser);
	}
};
