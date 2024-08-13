import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { MainNav } from "../../components/dashboard/main-nav";
import { SignIn } from "../../components/dashboard/signIn";
import { auth } from "@/auth";

export default function Dashboard() {
    const [showWelcome, setShowWelcome] = useState(true);
    const router = useRouter();
    const [session, setSession] = useState(null);

    useEffect(() => {
        const fetchAuth = async () => {
            const sessionData = await auth();
            setSession(sessionData);

            // Wait 2 seconds and then redirect to the dashboard
            setTimeout(() => {
                setShowWelcome(false);
            }, 2000);
        };

        fetchAuth();
    }, []);

    useEffect(() => {
        if (!showWelcome && session) {
            // Redirect to the actual dashboard page after the welcome message
            router.push("/dashboard"); // Update with the actual dashboard route if needed
        }
    }, [showWelcome, session, router]);

    if (!session) {
        return (
            <div>
                <header className="border-b">
                    <div className="flex h-16 items-center px-4">
                        <MainNav className="mx-6" />
                        <div className="ml-auto flex items-center space-x-4">
                            <SignIn />
                        </div>
                    </div>
                </header>
                <main className="p-8">
                    <h1>Please sign in to continue</h1>
                </main>
            </div>
        );
    }

    return (
        <>
            {showWelcome ? (
                <div className="flex flex-col items-center justify-center h-screen">
                    <h1 className="text-4xl font-bold">Welcome, {session.user?.name}!</h1>
                </div>
            ) : (
                // The actual dashboard content (or empty since it's redirecting)
                <div></div>
            )}
        </>
    );
}
