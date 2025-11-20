import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import useThemeStore from "../stores/ThemeStore";
import Header from "../components/Header";

useThemeStore.subscribe((state) => {
    document.documentElement.setAttribute("data-theme", state.theme);
});

document.documentElement.setAttribute(
    "data-theme",
    useThemeStore.getState().theme,
);

const RootLayout = () => (
    <>
        <Header />
        <main>
            <div className="container mx-auto py-6 px-8">
                <Outlet />
            </div>
        </main>
        <TanStackRouterDevtools />
    </>
);

export const Route = createRootRoute({ component: RootLayout });
