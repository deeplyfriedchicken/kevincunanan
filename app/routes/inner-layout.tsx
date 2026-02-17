import { Outlet } from "react-router";
import { InnerNavbar } from "~/components/InnerNavbar";
import { Footer } from "~/components/Footer";

export default function InnerLayout() {
	return (
		<>
			<InnerNavbar />
			<Outlet />
			<Footer />
		</>
	);
}
