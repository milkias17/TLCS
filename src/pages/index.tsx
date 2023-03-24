import UserContext from "@/context/UserContext";
import Link from "next/link";
import { useContext } from "react";
import HeroImage from "../../public/hero.jpg";

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
          <div className="max-w-md mx-auto">
            <h1 className="mb-5 text-5xl font-bold text-primary tracking-wide">
              {user ? `Hello there, ${user?.role}!` : "Hello there!"}
            </h1>
            <p className="mb-8 text-lg text-gray-600">
              {user
                ? "Welcome to TLCS, the ultimate teaching learning collaborating system, checkout your dashboard to see what functions you have."
                : "Login to use TLCS"}
            </p>
            <Link
              className="btn btn-primary px-8 py-3 rounded-full text-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out"
              href={user ? `/${user.role.toLowerCase()}` : "/login/student"}
            >
              {user ? `Get Started` : `Log In`}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
