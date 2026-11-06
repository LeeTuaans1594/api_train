import { ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-8 items-center justify-center h-screen">
      <p className="text-3xl font-bold">Welcome to Summoner's Rift</p>
      <button
        className="flex flex-row gap-2 hover:text-white cursor-pointer"
        onClick={() => {
          navigate("/data");
        }}
      >
        Click here to play <ExternalLink />
      </button>
    </div>
  );
}
