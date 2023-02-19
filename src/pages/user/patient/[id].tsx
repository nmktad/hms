import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { MyChart } from "../../../components/Chart";
import UserLayout from "../../../layout/root";
import { api } from "../../../utils/api";

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
      {JSON.stringify(patientData)}
    </UserLayout>
  );
};

export default Patient;
