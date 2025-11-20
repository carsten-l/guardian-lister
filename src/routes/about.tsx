import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">About</h1>
            <p>Hello "/about"!</p>
            <p>This is the about page of the Guardian Article Lister.</p>
            <p>
                The routes sole purpose is to have somwhere to navigate to test
                staletime on the loader...
            </p>
        </div>
    );
}
