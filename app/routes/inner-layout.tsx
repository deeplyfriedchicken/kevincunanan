import { Outlet } from "react-router";
import { Footer } from "~/components/Footer";
import { InnerNavbar } from "~/components/InnerNavbar";

export default function InnerLayout() {
	return (
		<>
			<InnerNavbar />
			<Outlet />
			<Footer />
		</>
	);
}
