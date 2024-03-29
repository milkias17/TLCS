import UserContext from "../context/UserContext";
import Link from "next/link";
import { useContext } from "react";
import HeroImage from "../../public/hero.jpg";
import { prettify } from "@lib/utils";

export default function Home() {
  const { user } = useContext(UserContext);
  return (
    <>
      <div
        className="hero min-h-screen absolute top-0"
        style={{
          backgroundImage: `url(${HeroImage.src})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">
              {user ? `Hello there ${prettify(user?.role)}` : "Hello there!"}
            </h1>
            <p className="mb-5">
              {user
                ? "Welcome to TLCS, the ultimate teaching learning collaborating system, checkout your dashboard to see what functions you have."
                : "Login to use Teaching Learning Co-ordinating System"}
            </p>
            <Link
              className="btn btn-primary"
              href={user ? `/${user.role.toLowerCase()}` : "/login/student"}
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
