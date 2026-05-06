import Card from "@/components/Card";
import { Banknote, Code, Hospital } from "lucide-react";

import img1 from "../public/imgs/Img1.png";
import Steps from "@/components/Steps";

const page = () => {
  const cardList: {
    id: number;
    des: string;
    icon: React.ReactNode;
    title: string;
    link: string;
    color: "indigo" | "blue" | "slate";
  }[] = [
    {
      id: 1,
      des: "Software engineering, data science, and cloud architecture roles.",
      icon: <Code size={28} />,
      title: "Technology",
      link: "Browse 1.2k+ jobs",
      color: "indigo",
    },
    {
      id: 2,
      des: "Specialized medical, nursing, and healthcare management positions.",
      icon: <Hospital size={28} />,
      title: "Healthcare",
      link: "Browse 850+ jobs",
      color: "blue",
    },
    {
      id: 3,
      des: "Investment banking, fintech, and accounting opportunities.",
      icon: <Banknote size={28} />,
      title: "Finance",
      link: "Browse 640+ jobs",
      color: "slate",
    },
  ];

  const stepList = [
    {
      id: 1,
      title: "Create Your Profile",
      des: "Showcase your professional journey with our AI-enhanced profile builder designed for maximum visibility.",
      progress: 20,
    },
    {
      id: 2,
      title: "Apply with Precision",
      des: "Our algorithm matches you with roles that perfectly align with your skill set and career aspirations.",
      progress: 80,
    },
    {
      id: 3,
      title: "Secure the Role",
      des: "Navigate the interview process with expert insights and secure competitive compensation packages.",
      progress: 20,
    },
  ];

  return (
    <main className="min-h-screen bg-[#F8FAFC] max-w-[1440px] mx-auto">
      <section className="p-[96px_25px]">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="space-y-3">
            <h2 className="text-4xl md:text-5xl font-extrabold text-indigo-950 tracking-tight leading-tight">
              Featured Job Categories
            </h2>
            <p className="text-gray-500 text-lg md:text-xl font-medium max-w-2xl">
              Explore opportunities across high-growth industries.
            </p>
          </div>
          <a
            href="#"
            className="text-indigo-700 font-bold text-sm tracking-widest uppercase hover:text-indigo-900 transition-all duration-300 border-b-2 border-indigo-700 hover:border-indigo-900 pb-1 whitespace-nowrap"
          >
            View All Categories
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cardList.map((e) => (
            <Card key={e.id} {...e} />
          ))}
        </div>
      </section>
      <section className="py-32 px-6 bg-white">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-4xl md:text-5xl font-extrabold text-indigo-950 tracking-tight">
            Precision Recruitment
          </h2>
          <p className="text-gray-500 text-lg md:text-xl font-medium max-w-2xl mx-auto">
            Our streamlined process ensures the perfect match between talent and
            vision.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative group">
            <div className="absolute -inset-4 bg-indigo-100 rounded-3xl opacity-50 group-hover:opacity-70 transition-opacity blur-2xl -z-10" />
            <img
              src={img1.src}
              alt="Recruitment Process"
              className="w-full h-auto rounded-2xl shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>

          <div className="space-y-2">
            {stepList.map((e) => (
              <Steps key={e.id} {...e} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default page;
