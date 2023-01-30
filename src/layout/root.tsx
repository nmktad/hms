import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn, signOut } from "next-auth/react";
import type { Session } from "next-auth";

export default function RootLayout({
  children,
  sessionData,
}: //   ...other
{
  children: React.ReactNode;
  sessionData: Session;
}) {
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  const router = useRouter();
  return (
    <>
      <nav className="relative z-10 flex flex-wrap items-center justify-between bg-white py-4 px-6 shadow-xl md:fixed md:left-0 md:top-0 md:bottom-0 md:block md:w-64 md:flex-row md:flex-nowrap md:overflow-hidden md:overflow-y-auto">
        <div className="mx-auto flex w-full flex-wrap items-center justify-between px-0 md:min-h-full md:flex-col md:flex-nowrap md:items-stretch">
          {/* Toggler */}
          {/* Brand */}
          <Link
            href="/"
            className="text-blueGray-600 mr-0 inline-block whitespace-nowrap p-4 px-0 text-left text-sm font-bold uppercase md:block md:pb-2"
          >
            IETP HMS
          </Link>
          <button
            className="cursor-pointer rounded border border-solid border-transparent bg-transparent px-3 py-1 text-xl leading-none text-black opacity-50 md:hidden"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            open
          </button>

          <div
            className={
              "absolute top-0 left-0 right-0 z-40 h-auto flex-1 items-center overflow-y-auto overflow-x-hidden rounded shadow md:relative md:mt-4 md:flex md:flex-col md:items-stretch md:opacity-100 md:shadow-none " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="border-blueGray-200 mb-4 block border-b border-solid pb-4 md:hidden md:min-w-full">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link
                    href="/"
                    className="text-blueGray-600 mr-0 inline-block whitespace-nowrap p-4 px-0 text-left text-sm font-bold uppercase md:block md:pb-2"
                  >
                    IETP HMS
                  </Link>
                </div>
                <div className="flex w-6/12 justify-end">
                  <button
                    type="button"
                    className="cursor-pointer rounded border border-solid border-transparent bg-transparent px-3 py-1 text-xl leading-none text-black opacity-50 md:hidden"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <i className="fas fa-times">close</i>
                  </button>
                </div>
              </div>
            </div>
            {/* Form */}
            <form className="mt-6 mb-4 md:hidden">
              <div className="mb-3 pt-0">
                <input
                  type="text"
                  placeholder="Search"
                  className="border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 h-12 w-full rounded  border border-solid bg-white px-3 py-2 text-base font-normal leading-snug shadow-none outline-none focus:outline-none"
                />
              </div>
            </form>

            {sessionData.role === "ADMIN" && (
              <>
                {/* Divider */}
                <hr className="my-4 md:min-w-full" />
                {/* Heading */}
                <h6 className="text-blueGray-500 block pt-1 pb-4 text-xs font-bold uppercase no-underline md:min-w-full">
                  Admin Layout Pages
                </h6>
                {/* Navigation */}

                <ul className="flex list-none flex-col md:min-w-full md:flex-col">
                  <li className="items-center">
                    <Link
                      href="/admin/maps"
                      className={
                        "block py-3 text-xs font-bold uppercase " +
                        (router.pathname.indexOf("/admin/maps") !== -1
                          ? "text-lightBlue-500 hover:text-lightBlue-600"
                          : "text-blueGray-700 hover:text-blueGray-500")
                      }
                    >
                      <i
                        className={
                          "fas fa-map-marked mr-2 text-sm " +
                          (router.pathname.indexOf("/admin/maps") !== -1
                            ? "opacity-75"
                            : "text-blueGray-300")
                        }
                      ></i>{" "}
                      Maps
                    </Link>
                  </li>
                </ul>
                {/* Divider */}
                <hr className="my-4 md:min-w-full" />
                {/* Heading */}
                <h6 className="text-blueGray-500 block pt-1 pb-4 text-xs font-bold uppercase no-underline md:min-w-full">
                  Auth Layout Pages
                </h6>
                {/* Navigation */}

                <ul className="flex list-none flex-col md:mb-4 md:min-w-full md:flex-col">
                  <li className="items-center">
                    <Link
                      href="/auth/register"
                      className="text-blueGray-700 hover:text-blueGray-500 block py-3 text-xs font-bold uppercase"
                    >
                      <i className="fas fa-clipboard-list text-blueGray-300 mr-2 text-sm"></i>{" "}
                      Register
                    </Link>
                  </li>
                </ul>
              </>
            )}

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="text-blueGray-500 block pt-1 pb-4 text-xs font-bold uppercase no-underline md:min-w-full">
              No Layout Pages
            </h6>
            {/* Navigation */}

            <ul className="flex list-none flex-col md:mb-4 md:min-w-full md:flex-col">
              <li className="items-center">
                <Link
                  href="/landing"
                  className="text-blueGray-700 hover:text-blueGray-500 block py-3 text-xs font-bold uppercase"
                >
                  <i className="fas fa-newspaper text-blueGray-400 mr-2 text-sm"></i>{" "}
                  Landing Page
                </Link>
              </li>

              <li className="items-center">
                <Link
                  href="/profile"
                  className="text-blueGray-700 hover:text-blueGray-500 block py-3 text-xs font-bold uppercase"
                >
                  <i className="fas fa-user-circle text-blueGray-400 mr-2 text-sm"></i>{" "}
                  Profile Page
                </Link>
              </li>
            </ul>

            {/* Navigation */}
            {/* spacer */}
            <div className="flex flex-1"></div>
            <button
              className="rounded-full bg-white/10 px-10 py-3 font-semibold  no-underline transition hover:bg-white/20"
              onClick={
                sessionData
                  ? () => void signOut({ callbackUrl: "/" })
                  : () => void signIn()
              }
            >
              {sessionData ? "Sign out" : "Sign in"}
            </button>
          </div>
        </div>
      </nav>

      <div className="bg-blueGray-100 relative md:ml-64">
        <div className="mx-auto min-h-screen w-full p-4 md:p-8">
          hello world
          {children}
        </div>
      </div>
    </>
  );
}
