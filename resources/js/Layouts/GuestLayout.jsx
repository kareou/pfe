import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";

export default function Guest({ children }) {
    return (
        <div className="h-full flex flex-row items-stretch bg-my_white overflow-hidden">
          <div className="flex place-items-center">
            {children}
          </div>
        </div>
      );

}
