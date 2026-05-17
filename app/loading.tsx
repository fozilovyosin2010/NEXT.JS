import { SpinnerCom } from "@/components/Loader";

const loading = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50/50">
      <SpinnerCom />
    </div>
  );
};

export default loading;
