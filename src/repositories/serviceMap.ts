import { IMenuItem } from "#wf-types/enum";

export async function getServiceMap({ queryKey }) {
	const [_key, { env }] = queryKey;
	const url = `${JSON.stringify(import.meta.env["VITE_API_URL"]).replace(/"/gi, "")}/servicemap?env=${env}`;

	// Simulating API call
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}
	const data = await response.json();
	return data as IMenuItem[];
}

export default getServiceMap;
