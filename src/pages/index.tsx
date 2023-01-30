import type { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

const Home = () => {
  return;
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user) {
    return {
      redirect: {
        permanent: false,
        destination: "/auth/login",
      },
    };
  } else {
    console.log("session is", { session });

    return {
      redirect:
        session.role === "ADMIN"
          ? { permanent: false, destination: "/admin/dashboard" }
          : { permanent: false, destination: "/user/dashboard" },
    };
  }
};

export default Home;
