import { Outlet } from "react-router-dom";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// App shell shared by every route: Navbar on top, the matched page in the
// middle (<Outlet />), Footer at the bottom.
export function RootLayout() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pt-18">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
