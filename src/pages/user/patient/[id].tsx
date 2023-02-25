import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { MyChart } from "../../../components/Chart";
import UserLayout from "../../../layout/root";
import { api } from "../../../utils/api";
import { type GetServerSideProps } from "next";

const Patient = () => {
  const router = useRouter();
  let { id } = router.query;

  if (!id || typeof id !== "string") {
    id = "";
  }

  const { data: sessionData } = useSession();

  const { data: patientData } = api.patients.getPatientInfo.useQuery({ id });

  if (!sessionData) {
    return <>No session data</>;
  }

  return (
    <UserLayout sessionData={sessionData}>
      <h1>{patientData?.name}</h1>
      <sub>{patientData?.id}</sub>
      <p>Admiited to: {patientData?.date}</p>

      <p>Current BPM reading: {BPM}</p>
    </UserLayout>
  );
};

// export const getServerSideProps: GetServerSideProps = async () => {
// const res = await fetch("http://192.168.43.229/data");
// const { BPM, SpO2 } = (await res.json()) as { BPM: number; SpO2: number };
// return {
//   props: {
//     BPM,
//     SpO2,
//   },
// };
// };

export default Patient;
