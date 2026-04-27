// src/data/headerData.ts
import { all_routes } from "../routes/all_routes";

export interface NavItem {
  id: string;
  title: string;
  path: string;
  icon?: string;
  isMegaMenu?: boolean;
  children?: NavItem[];
  className?: string;
  target?: string;
  relativeLinks?: string[]; // Array of paths that should keep this menu item active
}

export const headerNavData: NavItem[] = [

];
