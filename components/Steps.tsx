interface IStep {
  id: number;
  title: string;
  des: string;
  progress: number;
}

const Steps = ({ id, title, des, progress }: IStep) => {
  return (
    <div className="group flex items-start gap-6 pb-12 last:pb-0">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 rounded-full bg-indigo-900 text-white flex items-center justify-center font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300">
          {id}
        </div>
      </div>

      <div className="flex-1 space-y-4">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-indigo-950 tracking-tight group-hover:text-indigo-700 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-gray-500 text-lg leading-relaxed max-w-lg">
            {des}
          </p>
        </div>

        <div className="w-full max-w-md h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-900 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default Steps;
