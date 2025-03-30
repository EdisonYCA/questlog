import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bars3Icon, XMarkIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { useStateContext } from "@/context/StateContent";
import { auth } from "@/library/firebaseConfig";
import { signOut } from "firebase/auth";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar({navLinks}) {
  const pathname = usePathname();
  const { user, setUser } = useStateContext();
  
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const filteredNavLinks = navLinks.filter(link => {
    if (user) {
      return !['Login', 'Sign Up'].includes(link.name);
    }
    return true;
  });
  
  return (
    <>
      <Disclosure as="nav" className="bg-[#150A18]">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-20 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-[#FF2E63] hover:text-[#FF2E63] focus:ring-2 focus:ring-[#FF2E63] focus:outline-hidden focus:ring-inset">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <Bars3Icon
                  aria-hidden="true"
                  className="block size-6 group-data-open:hidden"
                />
                <XMarkIcon
                  aria-hidden="true"
                  className="hidden size-6 group-data-open:block"
                />
              </DisclosureButton>
            </div>
            <div className="flex flex-1 items-center sm:items-stretch sm:justify-end">
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-8">
                  {filteredNavLinks.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        pathname === item.href
                          ? "text-[#FF2E63] border-b-2 border-[#FF2E63]"
                          : "text-[#FF2E63] hover:text-[#FF2E63] hover:border-b-2 hover:border-[#FF2E63]",
                        "px-4 py-2 text-xl font-medium transition-all duration-200 cursor-pointer font-mono"
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {user ? (
                <Menu as="div" className="relative ml-3">
                  <MenuButton className="flex rounded-full bg-[#1F1225] text-sm focus:outline-none focus:ring-2 focus:ring-[#FF2E63] focus:ring-offset-2 focus:ring-offset-[#150A18]">
                    <span className="sr-only">Open user menu</span>
                    <UserCircleIcon className="h-8 w-8 text-[#FF2E63]" />
                  </MenuButton>
                  <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-[#1F1225] py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <MenuItem>
                      {({ active }) => (
                        <Link
                          href="/dashboard"
                          className={classNames(active ? 'bg-[#FF2E63]/10' : '', 'block px-4 py-2 text-sm text-[#FF2E63] font-mono')}
                        >
                          Dashboard
                        </Link>
                      )}
                    </MenuItem>
                    <MenuItem>
                      {({ active }) => (
                        <button
                          onClick={handleSignOut}
                          className={classNames(active ? 'bg-[#FF2E63]/10' : '', 'block w-full text-left px-4 py-2 text-sm text-[#FF2E63] font-mono')}
                        >
                          Sign out
                        </button>
                      )}
                    </MenuItem>
                  </MenuItems>
                </Menu>
              ) : null}
            </div>
          </div>
        </div>

        <DisclosurePanel className="sm:hidden bg-[#150A18]">
          <div className="space-y-1 px-2 pt-2 pb-3">
            {filteredNavLinks.map((item) => (
              <DisclosureButton
                key={item.name}
                as={Link}
                href={item.href}
                className={classNames(
                  pathname === item.href
                    ? "text-[#FF2E63] border-b-2 border-[#FF2E63]"
                    : "text-[#FF2E63] hover:text-[#FF2E63] hover:border-b-2 hover:border-[#FF2E63]",
                  "block px-4 py-3 text-xl font-medium transition-all duration-200 cursor-pointer font-mono"
                )}
              >
                {item.name}
              </DisclosureButton>
            ))}
          </div>
        </DisclosurePanel>
      </Disclosure>
    </>
  );
}
