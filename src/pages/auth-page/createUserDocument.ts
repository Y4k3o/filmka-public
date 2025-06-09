import { User } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../../shared/api/firebase";

export const createUserDocument = async (user: User) => {
	if (!user) return;

	const userRef = doc(db, "users", user.uid);
	await setDoc(userRef, {
		uid: user.uid,
		email: user.email,
		displayName: user.displayName || "Нет имени",
		avatarUrl: user.photoURL,
		createdAt: serverTimestamp(),
	});
};
