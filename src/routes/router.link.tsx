import { Navigate, Route } from "react-router";
import { all_routes } from "./all_routes";
import { lazy, Suspense } from "react";

//Doctor Module Components
const DoctorDashboard = lazy(() => import("@/pages/doctor-modules/doctor-dashboard/doctorDashboard"));
const DoctorHistory = lazy(() => import("@/pages/doctor-modules/history/history"));
const SignsSymptoms = lazy(() => import("@/pages/doctor-modules/signsSymptoms/signsSymptomps"));
const PhysicalExams = lazy(() => import("@/pages/doctor-modules/physicalExams/physicalExams"));
const MyPatients = lazy(() => import("@/pages/doctor-modules/my-patients/myPatients"));
const ReviewofSystem = lazy(() => import("@/pages/doctor-modules/reviewofSystem/reviewofSystem"));
const WardCourse = lazy(() => import("@/pages/doctor-modules/wardCourse/wardCourse"));
const DrugsMeds = lazy(() => import("@/pages/doctor-modules/drugsMeds/drugsMeds"));
const Procedures = lazy(() => import("@/pages/doctor-modules/procedures/procedures"));
const PatientlabDiag = lazy(() => import("@/pages/doctor-modules/patientLabDiag/patientLabDiag"));
const Desposition = lazy(() => import("@/pages/doctor-modules/desposition/desposition"));
const Physician = lazy(() => import("@/pages/doctor-modules/physician/physician"));
const Signatory = lazy(() => import("@/pages/doctor-modules/signatory/signatory"));
const Diagnosis = lazy(() => import("@/pages/doctor-modules/diagnosis/diagnosis"));

//Auth Components
const LoginEmail = lazy(() => import("@/pages/authentication/login/login-email"));
const LoginPhone = lazy(() => import("@/pages/authentication/login/login-phone"));
const Comingsoon = lazy(() => import("@/pages/authentication/coming soon"));
const Maintenance = lazy(() => import("@/pages/authentication/maintanence"));
const Error404 = lazy(() => import("@/pages/authentication/error-404/error404"));
const Error500 = lazy(() => import("@/pages/authentication/error-500/error500"));

const route = all_routes;
console.log("doctorWardCourse path:", route.doctorWardCourse);
const suspenseFallback = <div></div>;

//Public Routes
export const publicRoutes = [
  {
    path: "/",
    name: "Root",
    element: <Navigate to={route.doctorDashboard} />,
    route: Route,
  },
];

//Auth Routes
export const authRoutes = [
  {
    id: "1",
    path: route.login,
    element: (
      <Suspense fallback={suspenseFallback}>
        {/* <Login /> */}
      </Suspense>
    ),
    route: Route,
    meta_title: "BRHMC",
  },
  {
    id: "5",
    path: route.loginEmail,
    element: (
      <Suspense fallback={suspenseFallback}>
        <LoginEmail />
      </Suspense>
    ),
    route: Route,
    meta_title: "BRHMC",
  },
  {
    id: "10",
    path: route.loginPhone,
    element: (
      <Suspense fallback={suspenseFallback}>
        <LoginPhone />
      </Suspense>
    ),
    route: Route,
    meta_title: "BRHMC",
  },
  {
    id: "11",
    path: route.comingSoon,
    element: (
      <Suspense fallback={suspenseFallback}>
        <Comingsoon />
      </Suspense>
    ),
    route: Route,
    meta_title: "BRHMC",
  },
  {
    id: "12",
    path: route.maintenance,
    element: (
      <Suspense fallback={suspenseFallback}>
        <Maintenance />
      </Suspense>
    ),
    route: Route,
    meta_title: "BRHMC",
  },
  {
    id: "13",
    path: route.error404,
    element: (
      <Suspense fallback={suspenseFallback}>
        <Error404 />
      </Suspense>
    ),
    route: Route,
    meta_title: "BRHMC",
  },
  {
    id: "14",
    path: route.error500,
    element: (
      <Suspense fallback={suspenseFallback}>
        <Error500 />
      </Suspense>
    ),
    route: Route,
    meta_title: "BRHMC",
  },
];


//Custom layout Doctors Module
export const customLayout = [
  {
    id: "1",
    path: route.doctorDashboard,
    element: (
      <Suspense fallback={suspenseFallback}>
        <DoctorDashboard />
      </Suspense>
    ),
    route: Route,
    meta_title: "BRHMC",
  },
  {
    id: "2",
    path: route.doctorHistory,
    element: (
      <Suspense fallback={suspenseFallback}>
        <DoctorHistory />
      </Suspense>
    ),
    route: Route,
    meta_title: "BRHMC",
  },
  {
    id: "3",
    path: route.doctorSignsSymps,
    element: (
      <Suspense fallback={suspenseFallback}>
        <SignsSymptoms />
      </Suspense>
    ),
    route: Route,
    meta_title: "BRHMC",
  },
  {
    id: "4",
    path: route.doctorphysicalExams,
    element: (
      <Suspense fallback={suspenseFallback}>
        <PhysicalExams />
      </Suspense>
    ),
    route: Route,
    meta_title: "BRHMC",
  },
  {
    id: "5",
    path: route.doctorMypatients,
    element: (
      <Suspense fallback={suspenseFallback}>
        <MyPatients />
      </Suspense>
    ),
    route: Route,
    meta_title: "BRHMC",
  },
  {
    id: "6",
    path: route.doctorreviewofSystem,
    element: (
      <Suspense fallback={suspenseFallback}>
        <ReviewofSystem />
      </Suspense>
    ),
    route: Route,
    meta_title: "BRHMC",
  },
  {
    id: "7",
    path: route.doctorWardCourse,
    element: (
      <Suspense fallback={suspenseFallback}>
        <WardCourse />
      </Suspense>
    ),
    route: Route,
    meta_title: "BRHMC",
  },
  {
    id: "8",
    path: route.doctordrugsMeds,
    element: (
      <Suspense fallback={suspenseFallback}>
        <DrugsMeds />
      </Suspense>
    ),
    route: Route,
    meta_title: "BRHMC",
  },
  {
    id: "9",
    path: route.doctorProcedures,
    element: (
      <Suspense fallback={suspenseFallback}>
        <Procedures />
      </Suspense>
    ),
    route: Route,
    meta_title: "BRHMC",
  },
  {
    id: "10",
    path: route.doctorPatientLabDiag,
    element: (
      <Suspense fallback={suspenseFallback}>
        <PatientlabDiag />
      </Suspense>
    ),
    route: Route,
    meta_title: "BRHMC",
  },
  {
    id: "11",
    path: route.doctorDesposition,
    element: (
      <Suspense fallback={suspenseFallback}>
        <Desposition/>
      </Suspense>
    ),
    route: Route,
    meta_title: "BRHMC",
  },
  {
    id: "12",
    path: route.doctorPhysicain,
    element: (
      <Suspense fallback={suspenseFallback}>
        <Physician />
      </Suspense>
    ),
    route: Route,
    meta_title: "BRHMC",
  },
  {
    id: "13",
    path: route.doctorSignatory,
    element: (
      <Suspense fallback={suspenseFallback}>
        <Signatory />
      </Suspense>
    ),
    route: Route,
    meta_title: "BRHMC",
  },
  {
    id: "14",
    path: route.doctorDiagnosis,
    element: (
      <Suspense fallback={suspenseFallback}>
        <Diagnosis />
      </Suspense>
    ),
    route: Route,
    meta_title: "BRHMC",
  },
];

