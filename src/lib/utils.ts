import { UserRole } from "@prisma/client";

/**
  *  Returns a string representation of a user role
  */
export function roleMapper(role: UserRole): string {
  if (role == UserRole.DEPTHEAD) {
    return "departmentHead";
  } else if (role == UserRole.COLLEGE_COORDINATOR) {
    return "coordinator"
  } else {
    return role.toLowerCase();
  }
}
