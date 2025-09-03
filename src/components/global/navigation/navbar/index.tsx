import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";

import Account from "./account";
import StoreCartLink from "./cart/store-cart-link";
import Logo from "./logo";
import MobileNavigation from "./mobile-navigation";
// import MobileNavigationDrawer from "./mobile-navigation-drawer";
import NavLinks from "./nav-links";
import SearchAndLocationRenderer from "./search-and-location-renderer";

type Props = {
  showStoreCart?: boolean;
};

const Navbar = ({ showStoreCart }: Props) => {
  return (
    <nav className="flex-between fixed inset-x-0 top-0 z-50 min-h-16 w-full gap-2 bg-primary p-2 px-4 xs:px-8 sm:gap-4">
      <Logo className="mr-2 md:mr-0" />
      <div className="relative flex w-full max-w-2xl items-center justify-end gap-2 md:justify-center md:gap-4 lg:justify-end lg:gap-8">
        <SearchAndLocationRenderer />
      </div>

      <div className="flex-between gap-5">
        <section className="mx-4 hidden w-full min-w-40 max-w-48 justify-end gap-4 lg:flex">
          <NavLinks className="md:flex-center small-regular hidden flex-col gap-1 text-white" />
        </section>
        {showStoreCart && <StoreCartLink className="lg:mr-2" />}
        <Button
          variant={"outline"}
          className={
            "body-medium hidden self-center rounded-lg border-2 border-white bg-transparent px-3 py-4 text-white hover:bg-transparent hover:text-white lg:flex"
          }
        >
          <Link href={ROUTES.OFFERS_AND_EVENTS}>Offers & Events</Link>
        </Button>
        <Account className="hidden md:flex" />
        <MobileNavigation />
        {/* <MobileNavigationDrawer /> */}
      </div>
    </nav>
  );
};

export default Navbar;
