import { useAuth } from "#wf-local/hooks/useAuth";
import { useRoute } from "#wf-local/hooks/useRoute";
import { LoginStateProvider } from "#wf-local/providers/LoginStateProvider";
import { useRouter, useSearch } from "@tanstack/react-router";
import React, { useCallback } from "react";

import { App } from "antd";

let { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;

HOMEPAGE = HOMEPAGE?.replace(/"/gi, "");

export const Login: React.FC = (): JSX.Element => {
	const { message } = App.useApp();

	const { signIn, signOut, isLoggedIn } = useAuth();
	const { redirect } = useSearch({ from: "/_public/m/login" });

	const router = useRouter();
	const { push } = useRoute();

	const logIn = useCallback(async () => {
		signIn();
		router.invalidate();
		message.success("Login Success!");
		window.location.pathname = redirect || HOMEPAGE;
	}, [redirect]);

	const logOut = useCallback(() => {
		signOut();
		router.invalidate();
		push("/m/login");
	}, [redirect]);

	return (
		<LoginStateProvider>
			<div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<img
						className="mx-auto h-10 w-auto"
						src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
						alt="Your Company"
					/>
					<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
						Sign {isLoggedIn() ? "out" : "in"} to your account
					</h2>
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					{isLoggedIn() ? (
						<button
							onClick={logOut}
							className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>
							Sign Out
						</button>
					) : (
						<button
							onClick={logIn}
							className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>
							Sign in
						</button>
					)}
				</div>
			</div>
		</LoginStateProvider>
	);
};
