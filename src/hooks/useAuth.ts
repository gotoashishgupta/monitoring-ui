// src/hooks/useAuth.ts
import { useUserActions, useUserInfo } from "#wf-local/store/userStore";

export const useAuth = () => {
	const setAuth = useUserActions((state) => state.setAuth);
	const clearAuth = useUserActions((state) => state.clearAuth);
	const auth = useUserInfo((state) => state.auth);

	const signIn = () => {
		setAuth(true);
	};

	const signOut = () => {
		clearAuth();
	};

	const isLoggedIn = () => {
		return auth;
	};

	return { signIn, signOut, isLoggedIn };
};

export type AuthContext = ReturnType<typeof useAuth>;
