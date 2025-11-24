import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
    FluentProvider,
    webDarkTheme,
    webLightTheme,
} from "@fluentui/react-components";
import useThemeStore from "./stores/ThemeStore";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import NotFound from "./components/NotFound";
import Loading from "./components/Loading";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Create a new router instance
const router = createRouter({
    routeTree,
    defaultNotFoundComponent: NotFound,
    defaultPendingComponent: Loading,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

const AppRoot = () => {
    const theme = useThemeStore((state) => state.theme);
    return (
        <FluentProvider theme={theme === "dark" ? webDarkTheme : webLightTheme}>
            <RouterProvider router={router} />
        </FluentProvider>
    );
};

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <AppRoot />
    </StrictMode>,
);
