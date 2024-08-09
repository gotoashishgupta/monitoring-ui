import { IGlobalState, useGlobalStore } from "#wf-local/store/index";

export function login(): boolean {
	const { setAuth } = useGlobalStore((state) => ({
		setAuth: state.setAuth,
	})) as Partial<IGlobalState>;

	setAuth(true);

	const { auth } = useGlobalStore((state) => ({
		auth: state.auth,
	})) as Partial<IGlobalState>;

	console.log(`After Login ${auth}`);
	return auth;
}

export function logout(): boolean {
	const { setAuth } = useGlobalStore((state) => ({
		setAuth: state.setAuth,
	})) as Partial<IGlobalState>;

	setAuth(false);

	const { auth } = useGlobalStore((state) => ({
		auth: state.auth,
	})) as Partial<IGlobalState>;

	console.log(`After Logout ${auth}`);
	return auth;
}

export default login;
