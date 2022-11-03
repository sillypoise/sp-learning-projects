import { Link } from "@remix-run/react";

export default function Index() {
    return (
        <main className="mlb-l">
            <article className="center stack [--center-width:theme(contentWidth.2)]">
                <h1 className="text-2 max-is-max">
                    Welcome to AI writing assistant app
                </h1>
                <button className="bg-scheme-dark-neutral-surface-3 p-2xs rounded-md self-center">
                    <Link to="/writing">Get started</Link>
                </button>
            </article>
        </main>
    );
}
