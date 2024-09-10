import {
	BrowserRouter as Router,
	Route,
	Routes,
} from "react-router-dom";
import Header from "./conponents/Header";
import Footer from "./conponents/Footer";
import SendNexa from "./pages/SendNexa";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Wallet from "./pages/Wallet";

const App = () => {
	return (
		<div className="flex flex-col min-h-screen">
			<Router>
				<Header />
				<main className="flex-grow flex items-center justify-center">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/receive-nexa" element={<SendNexa />} />
						<Route path="/wallet" element={<Wallet />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</main>
				<Footer />
			</Router>
		</div>
	);
};

export default App;
