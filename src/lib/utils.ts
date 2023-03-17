import { Departments, UserRole } from "@prisma/client";

/**
 *  Returns a UserRole object from string representation
 */
export function roleMapper(role: string) {
  switch (role) {
    case "student":
      return UserRole.STUDENT;
    case "college_coordinator":
      return UserRole.COLLEGE_COORDINATOR;
    case "instructor":
      return UserRole.INSTRUCTOR;
    case "admin":
      return UserRole.ADMIN;
    case "depthead":
      return UserRole.DEPTHEAD;
    default:
      throw new Error("Invalid role argument");
  }
}

export function departmentMapper(dept: string) {
  switch (dept) {
    case "software":
      return Departments.SOFTWARE;
    case "mechanical":
      return Departments.MECHANICAL;
    case "electrical":
      return Departments.ELECTRICAL;
    case "law":
      return Departments.LAW;
    case "medicine":
      return Departments.MEDICINE;
    default:
      throw new Error("Invalid department argument");
  }
}

export function prettify(text: string): string {
  switch (text) {
    case "depthead":
      return "Department Head";
    case "college_coordinator":
      return "College Coordinator";
    default:
      return text[0].toUpperCase() + text.slice(1).toLowerCase();
  }
}

export function parseRole(url: string): string {
  const splitted = url.split("/");
  return splitted[1].toUpperCase();
}
