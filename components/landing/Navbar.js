import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import Image from "next/image";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar({navLinks}) {
  const navigation = [
    ...navLinks,
  ];
  
  return (
    <>
      <Disclosure as="nav" className="bg-transparent">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-20 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-[#DF2A88] hover:text-[#DF2A88] focus:ring-2 focus:ring-pink-500 focus:outline-hidden focus:ring-inset">
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
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex shrink-0 items-center">
                <Image
                  alt="QuestLog Logo"
                  src="/images/logo.svg"
                  className="h-12 w-auto"
                  width={48}
                  height={48}
                  priority
                />
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-8">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      aria-current={item.current ? "page" : undefined}
                      className={classNames(
                        item.current
                          ? "text-[#DF2A88] border-b-2 border-[#DF2A88]"
                          : "text-[#DF2A88] hover:text-[#DF2A88] hover:border-b-2 hover:border-[#DF2A88]",
                        "px-4 py-2 text-xl font-medium transition-all duration-200"
                      )}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <DisclosurePanel className="sm:hidden bg-white">
          <div className="space-y-1 px-2 pt-2 pb-3">
            {navigation.map((item) => (
              <DisclosureButton
                key={item.name}
                as="a"
                href={item.href}
                aria-current={item.current ? "page" : undefined}
                className={classNames(
                  item.current
                    ? "text-[#DF2A88] border-b-2 border-[#DF2A88]"
                    : "text-[#DF2A88] hover:text-[#DF2A88] hover:border-b-2 hover:border-[#DF2A88]",
                  "block px-4 py-3 text-xl font-medium transition-all duration-200"
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
