"use client";

import { useRef } from "react";
import { MotionStyle, MotionValue, motion, useScroll, useTransform } from "framer-motion";
import { useRouter } from "next/navigation";
import { 
  BarChart3, 
  UsersRound, 
  DollarSign, 
  ShoppingCart, 
  LineChart, 
  Palette, 
  RadioTower, 
  Brain, 
  Search 
} from "lucide-react";

type ImageProps = {
  src: string;
  alt?: string;
};

type FeatureSectionProps = {
  icon: ImageProps | React.ReactNode;
  title: string;
  description: string;
};

type Props = {
  heading: string;
  featureSections: FeatureSectionProps[];
};

export type Layout417Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Layout417 = (props: Layout417Props) => {
  const { heading, featureSections } = {
    ...Layout417Defaults,
    ...props,
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  return (
    <section id="relume" ref={containerRef}>
      <div className="container">
        <div className="relative h-[300svh] lg:h-[300vh]">
          <div className="sticky top-0 grid h-svh grid-cols-1 content-center items-center justify-center px-[5%] md:flex md:content-normal md:px-0 lg:h-screen">
            <div className="absolute bottom-auto left-0 right-0 top-0 flex w-full justify-center overflow-hidden pt-20 md:inset-auto md:pt-0">
              <h1 className="whitespace-nowrap text-8xl font-medium sm:text-[5.5rem] md:text-[7.5rem] lg:text-[10rem] leading-[1.5]">
                {heading}
              </h1>
            </div>
            <div className="sticky top-0 mx-auto mt-12 flex min-h-[24.5rem] w-full max-w-sm flex-col items-center justify-center sm:mt-24 md:relative lg:mt-0">
              {featureSections.map((section, index) => (
                <FeatureSection
                  key={index}
                  section={section}
                  index={index}
                  totalSections={featureSections.length}
                  scrollYProgress={scrollYProgress}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 mt-[80vh]" />
    </section>
  );
};

const FeatureSection = ({
  section,
  index,
  totalSections,
  scrollYProgress,
}: {
  section: FeatureSectionProps;
  index: number;
  totalSections: number;
  scrollYProgress: MotionValue<number>;
}) => {
  const router = useRouter();
  const sectionScrollStart = index / totalSections;
  const sectionScrollEnd = (index + 1) / totalSections;

  const rotate = useTransform(
    scrollYProgress,
    [sectionScrollStart, sectionScrollEnd],
    [0 + index * 3, -30],
  );

  const translateY = useTransform(
    scrollYProgress,
    [sectionScrollStart, sectionScrollEnd],
    ["0vh", "-120vh"],
  );

  const translateX = useTransform(
    scrollYProgress,
    [sectionScrollStart, sectionScrollEnd],
    ["0vw", "-10vw"],
  );

  const handleCardClick = () => {
    // Map the section title to its corresponding tab in the all-trainings page
    const tabMapping: Record<string, string> = {
      "Analytics Framework": "Analytics",
      "Panel Literacy": "Panel",
      "Pricing": "Pricing",
      "Trade & Promotion": "Trade",
      "Forecasting": "Forecasting",
      "Creative Principles": "Creative",
      "Media Analytics": "Media",
      "Artificial Intelligence": "AI",
      "Consumer Insights": "Insights"
    };
    
    // Get the mapped tab name or use the title as fallback
    const tabName = tabMapping[section.title] || section.title;
    
    // Navigate to the all-trainings page with the correct tab selected
    router.push(`/academy/all-trainings?tab=${encodeURIComponent(tabName)}`);
  };

  return (
    <motion.div
      onClick={handleCardClick}
      className="absolute w-[600px] mx-6 flex flex-col justify-between border shadow-lg rounded-lg bg-background/50 backdrop-blur-md p-8 md:mx-0 hover:scale-105 transition-all duration-300 hover:-rotate-1 hover:border-primary cursor-pointer"
      style={
        {
          rotate: index === totalSections - 1 ? "13deg" : rotate,
          translateY: index === totalSections? undefined : translateY,
          translateX: index === totalSections ? undefined : translateX,
          zIndex: totalSections - index,
        } as MotionStyle
      }
    >
      <div className="rb-6 mb-6 md:mb-8">
        {section.icon && typeof section.icon === 'object' && 'src' in section.icon ? (
          <img src={section.icon.src} alt={section.icon.alt} className="size-12" />
        ) : (
          section.icon
        )}
      </div>
      <h3 className="mb-3 text-xl font-semibold md:mb-4 md:text-2xl">{section.title}</h3>
      <p>{section.description}</p>
    </motion.div>
  );
};

export const Layout417Defaults: Props = {
  heading: "Knowledge Areas",
  featureSections: [
    {
      icon: <BarChart3 className="size-10" />,
      title: "Analytics Framework",
      description:
        "Learn the construct of consumption analytics, build foundational understanding of key measures and concepts to diagnose drivers of market share and sales performance. Bring concepts and connections to life through hands-on application.",
    },
    {
      icon: <UsersRound className="size-10" />,
      title: "Panel Literacy",
      description:
        "Learn about our new Omni Panel to uncover changes in household buying behavior and the variety of business questions that can be answered leveraging this information to complement market performance analytics.",
    },
    {
      icon: <DollarSign className="size-10" />,
      title: "Pricing",
      description:
        "Build knowledge around pricing from strategy development to evaluating performance. Understand what pricing coefficients are and how they are leveraged in projecting the impact of pricing actions.",
    },
    {
      icon: <ShoppingCart className="size-10" />,
      title: "Trade & Promotion",
      description:
        "Learn about the different roles trade promotion plays with both retailers and consumers, outlining trade objectives and how to evaluate performance against those objectives.",
    },
    {
      icon: <LineChart className="size-10" />,
      title: "Forecasting",
      description:
        "Discover the different factors that influence the category forecast, how the category forecast gets translated to the retailer and finally brand level as a key input into building our AOP and SBP plans.",
    },
    {
      icon: <Palette className="size-10" />,
      title: "Creative Principles",
      description:
        "Learn about best practices when it comes to quality creative, neuro principles and the tools to use for testing across different stages of Creative Development.",
    },
    {
      icon: <RadioTower className="size-10" />,
      title: "Media Analytics",
      description:
        "Explore our new media measurement framework and tools that help evaluate and optimize performance. Learn what the key metrics within an MMM mean and how they influence ROI. Gain insight about the growing space of retail media.",
    },
    {
      icon: <Brain className="size-10" />,
      title: "Artificial Intelligence",
      description:
        "Learn about the foundations of Artificial Intelligence, including the different areas and core principles, how they get applied within Kimberly-Clark and will shift the way we work.",
    },
    {
      icon: <Search className="size-10" />,
      title: "Consumer Insights",
      description:
        "Understand the multi-faceted world of consumer research from brand health to demand spaces to innovation testing. At the expert level, learn the intracacies and application of different testing methodologies.",
    },
  ],
};
