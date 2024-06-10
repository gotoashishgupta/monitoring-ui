// Function to fetch data (simulated)
import { ITaskGroup } from "../store/index";
export async function getStatus({ queryKey }): Promise<ITaskGroup[]> {
	const [_key, { service }] = queryKey;
	let url = `${JSON.stringify(import.meta.env["VITE_API_URL"]).replace(/"/gi, "")}/status`;
	if (service) {
		url = `${url}?repo=${service}`;
	}

	// Simulating API call
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}
	const data = await response.json();
	return data as ITaskGroup[];
}

export default getStatus;
