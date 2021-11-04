import { useSession } from "next-auth/react";
import * as React from "react";

interface AuthGuardProps {
  children?: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  useSession({ required: true });
  return <>{children}</>;
}
