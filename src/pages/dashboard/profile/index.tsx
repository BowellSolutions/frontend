import {NextPage} from "next";
import Profile from "../../../components/views/doctor/Profile";
import DispatchLayout from "../../../components/views/utils/DispatchLayout";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import PatientProfile from "../../../components/views/patient/Profile";
import {AppState, wrapper} from "../../../redux/store";
import {authFail} from "../../../redux/reducers/auth";
import {checkAuth} from "../../../redux/actions/auth";
import {retrieveExaminations, retrievePatients, retrieveRecordings} from "../../../redux/actions/dashboard";

const ProfilePage: NextPage<AppState> = () => {
  return (
    <DispatchLayout
      doctor={
        <DashboardLayout
          title="Dashboard"
          description="Bowell Dashboard"
          brandText="Profile"
          type="doctor"
        >
          <Profile/>
        </DashboardLayout>
      }
      patient={
        <DashboardLayout
          title="Dashboard"
          description=""
          brandText="Profile"
          type="patient"
        >
          <PatientProfile/>
        </DashboardLayout>
      }
    />
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async (context) => {
      const cookies = context.req.cookies;
      // if there is no access cookie, dispatch fail and redirect to login
      if (!cookies.access) {
        await store.dispatch(authFail());
        return {
          redirect: {
            destination: '/login',
            permanent: false
          }
        };
      }

      // dispatch check auth to verify token, get user if token is valid - to fill state on server side
      await store.dispatch<any>(checkAuth(cookies.access));

      // load examinations, recordings, patients
      await store.dispatch<any>(retrieveExaminations(cookies.access));

      const {auth} = store.getState();
      if (auth?.user?.type === "DOCTOR") {
        await store.dispatch<any>(retrieveRecordings(cookies.access));
        await store.dispatch<any>(retrievePatients(cookies.access));
      }

      return {
        props: {}
      };
    }
);

export default ProfilePage;
