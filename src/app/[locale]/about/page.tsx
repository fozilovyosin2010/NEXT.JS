import { getTranslations } from "next-intl/server";

const About = async () => {
  const t = await getTranslations();

  return (
    <div className="container mx-auto px-4 py-12 md:px-8 lg:px-16">
      {/* Our Story Section */}
      <section className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
        <div className="space-y-6 order-2 lg:order-1">
          <h1 className="text-4xl font-semibold md:text-5xl">
            {t("story_title")}
          </h1>
        </div>
        <div className="order-1 lg:order-2">
          <img
            // src={shopers}
            alt="Happy shoppers"
            className="rounded-md w-full"
          />
        </div>
      </section>
    </div>
  );
};

export default About;
