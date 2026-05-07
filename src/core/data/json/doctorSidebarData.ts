import { all_routes } from "@/routes/all_routes";

export interface DoctorSidebarItem {
  label: string;
  path: string;
  icon?: string;
  badge?: number;
  relativeLinks?: string[]; 
}

export const doctorSidebarData: DoctorSidebarItem[] = [
  {
    label: "Dashboard",
    path: all_routes.doctorDashboard,
    icon: "isax isax-category-2",
  },
  {
    label: "Account Information",
    path: all_routes.doctorMypatients,
    icon: "fa-solid fa-user-injured", 
  },
  {
    label: "History",
    path: all_routes.doctorHistory,
    icon: "isax isax-clock",
  },
  {
    label: "Signs | Symptoms",
    path: all_routes.doctorSignsSymps,
    icon: "isax isax-calendar-1",
  },
  {
    label: "Physical Exams",
    path: all_routes.doctorphysicalExams,
    icon: "isax isax-calendar-tick",
  },
  {
    label: "Review of System",
    path: all_routes.doctorreviewofSystem,
    icon: "isax isax-clipboard-tick",
  },
  {
    label: "Ward Course",
    path: all_routes.doctorWardCourse,
    icon: "isax isax-star-1",
  },
  {
    label: "Drugs & Meds",
    path: all_routes.doctordrugsMeds,
    icon: "isax isax-profile-tick",
  },
  {
    label: "Procedure",
    path: all_routes.doctorProcedures,
    icon: "isax isax-document-text",
  },
  {
    label: "Patient Lab/Diag",
    path: all_routes.doctorPatientLabDiag,
    icon: "isax isax-search-status", 
  },
  {
    label: "Diagnosis",
    path: all_routes.doctorDiagnosis,
    icon: "isax isax-activity", 
  },
  {
    label: "Desposition",
    path: all_routes.doctorDesposition,
    icon: "isax isax-export-1", 
  },
  {
    label: "Physician",
    path: all_routes.doctorPhysicain,
    icon: "isax isax-user", 
  },
  {
    label: "Signatory",
    path: all_routes.doctorSignatory,
    icon: "isax isax-edit-2", 
  },
];