import { useEffect } from 'react';

const App = ({ children }: { children: React.ReactNode }) => {
	useEffect(() => {
		const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
		if (prefersDarkMode) {
			document.body.classList.add("dark", "bg-zinc-950");
		}
	}, []);

	return <>{children}</>;
};

export default App;
