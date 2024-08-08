import { IGlobalState, setGlobalStore } from "#wf-local/store/index";

export function login(): boolean {
	const { setAuth } = setGlobalStore((state) => ({
		setAuth: state.setAuth,
	})) as Partial<IGlobalState>;

	setAuth(true);

	const { auth } = setGlobalStore((state) => ({
		auth: state.auth,
	})) as Partial<IGlobalState>;

	console.log(`After Login ${auth}`);
	return auth;
}

export function logout(): boolean {
	const { setAuth } = setGlobalStore((state) => ({
		setAuth: state.setAuth,
	})) as Partial<IGlobalState>;

	setAuth(false);

	const { auth } = setGlobalStore((state) => ({
		auth: state.auth,
	})) as Partial<IGlobalState>;

	console.log(`After Logout ${auth}`);
	return auth;
}

export default login;
