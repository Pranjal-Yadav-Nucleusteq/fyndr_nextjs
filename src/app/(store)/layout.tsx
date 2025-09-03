import React, { ReactNode } from "react";

import Footer from "@/components/global/navigation/footer";
import Navbar from "@/components/global/navigation/navbar";

const StoreLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar showStoreCart />
      <section className="flex min-h-screen flex-1 flex-col bg-secondary-10 pt-16">
        <div className="">{children}</div>
      </section>
      <Footer />
    </div>
  );
};

export default StoreLayout;
