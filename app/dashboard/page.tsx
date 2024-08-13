import { MainNav } from "../../components/dashboard/main-nav";

export default async function Dashboard() {
    return (
        <div>
            <header className="border-b">
                <div className="flex h-16 items-center px-4">
                    <MainNav className="mx-6" />
                    <div className="ml-auto flex items-center space-x-4">
                    </div>
                </div>
            </header>
            <main className="p-8">
                <h1>Hello!</h1>
            </main>
        </div>
    );
}
