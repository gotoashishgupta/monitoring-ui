import { IMenuItem } from "#wf-types/enum";

export async function getNavMenu({ queryKey }): Promise<IMenuItem[]> {
	const [_key] = queryKey;
	const url = `${JSON.stringify(import.meta.env["VITE_API_URL"]).replace(/"/gi, "")}/nav-menu`;

	// Simulating API call
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}
	const data = await response.json();
	return data as IMenuItem[];
}

export default getNavMenu;
