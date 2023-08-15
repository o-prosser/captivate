import { Loading } from "@/ui/loading";
import { RouteSheet } from "@/ui/route-sheet";

const LoadingModal = () => {
  return (
    <RouteSheet>
      <div className="flex h-full items-center justify-center">
        <Loading text="Loading..." />
      </div>
    </RouteSheet>
  );
};

export default LoadingModal;
