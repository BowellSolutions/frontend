/**
 * @author: Adam Lisichin
 * @file: Handles dashboard examinations route - /dashboard/examinations/[id]
 * Authorized only route.
 **/
import {NextPage} from "next";
import {useRouter} from "next/router";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import DispatchLayout from "../../../components/views/utils/DispatchLayout";
import DoctorExaminationDetail from "../../../components/views/doctor/ExaminationDetail";
import PatientExaminationDetail from "../../../components/views/patient/ExaminationDetail";
import {AppState, wrapper} from "../../../redux/store";
import {authFail} from "../../../redux/reducers/auth";
import {checkAuth} from "../../../redux/actions/auth";

const ExaminationDetail: NextPage<AppState> = () => {
  const router = useRouter();
  // get examination id from url
  const {id} = router.query;

  return (
    <DispatchLayout
      doctor={
        <DashboardLayout
          title="Dashboard"
          description="Bowell Dashboard - Examination detail"
          brandText={`Examination #${id}`}
          type="doctor"
        >
          <DoctorExaminationDetail examinationID={id as string}/>
        </DashboardLayout>
      }
      patient={
        <DashboardLayout
          title="Dashboard"
          description="Bowell Dashboard - Examination detail"
          brandText={`Examination #${id}`}
          type="patient"
        >
          <PatientExaminationDetail examinationID={id as string}/>
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

      return {
        props: {}
      };
    }
);

export default ExaminationDetail;
