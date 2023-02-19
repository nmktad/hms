import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import RootLayout from "../../../layout/root";
import { api } from "../../../utils/api";

export default function CardSettings() {
  const { data: sessionData } = useSession();
  const [email, setEmail] = useState("");
  const [firstName, setFristName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAdress] = useState("");

  const { mutate, error, status } = api.users.createUser.useMutation();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log({ email, firstName, lastName, address });

    mutate({ name: firstName + " " + lastName, email, address });
  };

  const { data: PatientData } = api.patients.getAll.useQuery();

  if (!sessionData) {
    return <>No session data</>;
  }

  console.log({ PatientData });

  return (
    <RootLayout sessionData={sessionData}>
      <Head>
        <title>Create Employee - IETP HMS</title>
      </Head>
      <div className="bg-blueGray-100 relative mb-6 flex min-w-0 max-w-3xl flex-col break-words rounded-lg border-0 shadow-lg">
        <div className="mb-0 rounded-t bg-white px-6 py-6">
          <div className="flex justify-between text-center">
            <h6 className="text-blueGray-700 text-xl font-bold">
              Patient Registration
            </h6>
            <button
              className="bg-blueGray-700 active:bg-blueGray-600 mr-1 rounded px-4 py-2 text-xs font-bold uppercase  shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none"
              type="button"
            >
              Settings
            </button>
          </div>
        </div>
        <div className="flex-auto px-4 py-10 pt-0 lg:px-10">
          <form onSubmit={handleSubmit}>
            <h6 className="text-blueGray-400 mt-3 mb-6 text-sm font-bold uppercase">
              Patient Information
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full px-4 lg:w-6/12">
                <div className="relative mb-3 w-full">
                  <label
                    className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
                    htmlFor="grid-password"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                    value={email}
                  />
                </div>
              </div>
              <div className="w-full px-4 lg:w-6/12">
                <div className="relative mb-3 w-full">
                  <label
                    className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
                    htmlFor="grid-password"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setFristName(e.target.value)}
                    className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                    value={firstName}
                  />
                </div>
              </div>
              <div className="w-full px-4 lg:w-6/12">
                <div className="relative mb-3 w-full">
                  <label
                    className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
                    htmlFor="grid-password"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                  />
                </div>
              </div>
            </div>

            <hr className="border-b-1 border-blueGray-300 mt-6" />

            <h6 className="text-blueGray-400 mt-3 mb-6 text-sm font-bold uppercase">
              Contact Information
            </h6>
            <div className="flex flex-wrap">
              <div className="lg:w-12/12 w-full px-4">
                <div className="relative mb-3 w-full">
                  <label
                    className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
                    htmlFor="grid-password"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setAdress(e.target.value)}
                    className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                    value={address}
                  />
                </div>
              </div>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
      {status === "error" ? (
        <p>Something went wrong! {error.message}</p>
      ) : (
        status === "success" && <p>Successfully created</p>
      )}
      <>
        <div
          className={
            "relative mb-6 flex min-w-0 max-w-3xl flex-col break-words rounded shadow-lg "
          }
        >
          <div className="mb-0 rounded-t border-0 px-4 py-3">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full max-w-full flex-1 flex-grow px-4">
                <h3 className={"text-blueGray-700 text-lg font-semibold"}>
                  Employees
                </h3>
              </div>
            </div>
          </div>
          <div className="block w-full overflow-x-auto">
            {/* Projects table */}
            <table className="w-full border-collapse items-center bg-transparent">
              <thead>
                <tr>
                  <th
                    className={
                      "whitespace-nowrap border border-l-0 border-r-0 border-solid px-6 py-3 text-left align-middle text-xs font-semibold uppercase " +
                      "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                    }
                  >
                    Name
                  </th>

                  <th
                    className={
                      "whitespace-nowrap border border-l-0 border-r-0 border-solid px-6 py-3 text-left align-middle text-xs font-semibold uppercase " +
                      "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                    }
                  >
                    Status
                  </th>
                  <th
                    className={
                      "whitespace-nowrap border border-l-0 border-r-0 border-solid px-6 py-3 text-left align-middle text-xs font-semibold uppercase " +
                      "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                    }
                  >
                    Completion
                  </th>
                  <th
                    className={
                      "whitespace-nowrap border border-l-0 border-r-0 border-solid px-6 py-3 text-left align-middle text-xs font-semibold uppercase " +
                      "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                    }
                  ></th>
                </tr>
              </thead>
              <tbody>
                {PatientData?.map((patient) => (
                  <TableRows
                    key={patient.id}
                    name={patient.name || "no user"}
                    id={patient.id}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    </RootLayout>
  );
}

const TableRows = ({
  name,
  id,
}: {
  name: string;

  id: string;
}) => {
  return (
    <Link href={`/user/patient/${id}`}>
      <tr>
        <th className="flex items-center whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-6 text-left align-middle text-xs">
          <span className={"ml-3 font-bold " + "text-blueGray-600"}>
            {name}
          </span>
        </th>

        <td className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-6 align-middle text-xs">
          <i className="fas fa-circle mr-2 text-orange-500"></i> pending
        </td>
        <td className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-6 align-middle text-xs">
          <div className="flex items-center">
            <span className="mr-2">60%</span>
            <div className="relative w-full">
              <div className="flex h-2 overflow-hidden rounded bg-red-200 text-xs">
                <div
                  style={{ width: "60%" }}
                  className="flex flex-col justify-center whitespace-nowrap bg-red-500 text-center text-white shadow-none"
                ></div>
              </div>
            </div>
          </div>
        </td>
      </tr>
    </Link>
  );
};
