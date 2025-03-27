"use client";

import { MotionValue, useMotionValue, motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";
import { ChevronRight, BarChart2, PieChart, Brain, LineChart, Users, TrendingUp, Palette, DollarSign, GraduationCap } from "lucide-react";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

type ImageProps = {
  src: string;
  alt?: string;
};

type FeatureSectionProps = {
  icon: React.ReactNode;
  heading: string;
  description: string;
  buttons: {
    title: string;
    variant?: "default" | "secondary" | "link";
    size?: "default" | "sm" | "lg" | "link";
    iconRight?: React.ReactNode;
    href?: string;
  }[];
  image: ImageProps;
};

type Props = {
  icon: React.ReactNode;
  heading: string;
  description: string;
  featureSections: FeatureSectionProps[];
};

export type Layout408Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

const calculateScales = (totalSections: number, scrollYProgress: MotionValue<number>) => {
  return Array.from({ length: totalSections }, (_, index) => {
    const sectionFraction = 1 / totalSections;
    const start = sectionFraction * index;
    const end = sectionFraction * (index + 1);

    return index < totalSections - 1
      ? useTransform(scrollYProgress, [start, end], [1, 0.8])
      : useMotionValue(1);
  });
};

export const Layout408 = (props: Layout408Props) => {
  const { icon, description, featureSections } = {
    ...Layout408Defaults,
    ...props,
  };

  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end 60%"],
  });

  const scales = calculateScales(featureSections.length, scrollYProgress);

  return (
    <section id="relume" className="px-6 py-8 mt-24">
      <div className="">
        <div className="mb-12 w-full text-left md:mb-18 lg:mb-20 flex flex-col items-start">
          <div className="flex justify-start md:mb-4 text-primary mb-8">
            {icon}
          </div>
          <h1 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-4xl">Knowledge Zones</h1>
          <p className="md:text-md">{description}</p>
        </div>
        <div ref={containerRef} className="sticky top-0 grid grid-cols-1 gap-6 md:gap-0">
          {featureSections.map((featureSection, index) => (
            <FeatureSection key={index} {...featureSection} scale={scales[index]} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const FeatureSection = ({
  scale,
  index,
  ...featureSection
}: FeatureSectionProps & {
  scale: MotionValue<number>;
  index: number;
}) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      className="static grid grid-cols-1 content-center overflow-hidden border rounded-lg bg-background/70 backdrop-blur-md md:sticky md:top-[10%] md:mb-[10vh] md:h-[50vh] md:grid-cols-2"
      style={{ scale }}
    >
      <FeatureSectionContent isEven={isEven} {...featureSection} />
    </motion.div>
  );
};

const FeatureSectionContent = ({
  isEven,
  ...featureSection
}: FeatureSectionProps & { isEven: boolean }) => (
  <React.Fragment>
    <div
      className={clsx(
        "order-first flex flex-col justify-center p-6 md:p-8 lg:p-12",
        isEven ? "md:order-first" : "md:order-last",
      )}
    >
      <div className="mb-4 text-primary">
        {featureSection.icon}
      </div>
      <h2 className="rb-5 mb-5 text-2xl font-bold leading-[1.2] md:mb-6 md:text-3xl lg:text-4xl">
        {featureSection.heading}
      </h2>
      <p>{featureSection.description}</p>
      <div className="mt-6 flex items-center gap-x-4">
        {featureSection.buttons.map((button, index) => (
          button.href ? (
            <Link key={index} href={button.href}>
              <Button variant={button.variant}>
                {button.title}
                {button.iconRight}
              </Button>
            </Link>
          ) : (
            <Button key={index} variant={button.variant}>
              {button.title}
              {button.iconRight}
            </Button>
          )
        ))}
      </div>
    </div>
    <div
      className={clsx(
        "order-last flex flex-col items-center justify-center",
        isEven ? "md:order-last" : "md:order-first",
      )}
    >
      <Image 
        src={featureSection.image.src} 
        alt={featureSection.image.alt || ""}
        width={800}
        height={600}
        className="w-full h-[50vh] object-cover"
      />
    </div>
  </React.Fragment>
);

export const Layout408Defaults: Props = {
  icon: <GraduationCap size={40} />,
  heading: "Analytics Academy",
  description: "Explore our comprehensive learning paths designed to build your analytics expertise",
  featureSections: [
    {
      icon: <BarChart2 size={32} />,
      heading: "Consumption Analytics Framework",
      description: 
        "Master the fundamentals of consumption analytics, from key metrics to advanced diagnostics. Learn how to analyze market share drivers, sales performance, and consumer behavior through hands-on application of core analytical concepts.",
      buttons: [
        {
          title: "View Knowledge Zone",
          variant: "default", 
          size: "default",
          iconRight: <ChevronRight />,
          href: "/academy/all-trainings?tab=Consumption%20Analytics%20Framework"
        },
      ],
      image: {
        src: "/hero.jpg",
        alt: "Analytics Framework illustration",
      },
    },
    {
      icon: <Users size={32} />,
      heading: "Consumer Insights",
      description:
        "Develop a deep understanding of consumer behavior, preferences, and trends. Learn to leverage qualitative and quantitative research methods to uncover actionable insights that drive strategic business decisions and product development.",
      buttons: [
        {
          title: "View Knowledge Zone",
          variant: "default",
          size: "default", 
          iconRight: <ChevronRight />,
          href: "/academy/all-trainings?tab=Consumer%20Insights"
        },
      ],
      image: {
        src: "/hero.jpg",
        alt: "Consumer Insights illustration",
      },
    },
    {
      icon: <Brain size={32} />,
      heading: "AI & Machine Learning",
      description:
        "Discover how AI and machine learning are transforming analytics capabilities. Learn to apply advanced algorithms to predict market trends, optimize promotional strategies, and automate insight generation for faster, more accurate decision-making.",
      buttons: [
        {
          title: "View Knowledge Zone",
          variant: "default",
          size: "default",
          iconRight: <ChevronRight />,
          href: "/academy/all-trainings?tab=AI"
        },
      ],
      image: {
        src: "/hero.jpg",
        alt: "AI & Machine Learning illustration", 
      },
    },
    {
      icon: <LineChart size={32} />,
      heading: "Media Analytics",
      description:
        "Master the techniques for measuring and optimizing media performance across channels. Learn to analyze campaign effectiveness, attribute conversions, and develop data-driven strategies to maximize return on marketing investments.",
      buttons: [
        {
          title: "View Knowledge Zone",
          variant: "default",
          size: "default",
          iconRight: <ChevronRight />,
          href: "/academy/all-trainings?tab=Media%20Analytics"
        },
      ],  
      image: {
        src: "/hero.jpg",
        alt: "Media Analytics illustration",
      },
    },
    {
      icon: <PieChart size={32} />,
      heading: "Panel Literacy",
      description:
        "Build expertise in panel data analysis to uncover household buying behavior patterns. Learn to design panel studies, analyze longitudinal data, and extract actionable insights about consumer preferences, loyalty, and purchase decision factors.",
      buttons: [
        {
          title: "View Knowledge Zone",
          variant: "default",
          size: "default",
          iconRight: <ChevronRight />,
          href: "/academy/all-trainings?tab=Panel%20Literacy"
        },
      ],  
      image: {
        src: "/hero.jpg",
        alt: "Panel Literacy illustration",
      },
    },
    {
      icon: <Palette size={32} />,
      heading: "Creative Excellence",
      description:
        "Develop skills to measure and enhance creative performance through data-driven approaches. Learn to evaluate creative effectiveness, optimize messaging, and implement frameworks that connect creative execution to business outcomes.",
      buttons: [
        {
          title: "View Knowledge Zone",
          variant: "default",
          size: "default",
          iconRight: <ChevronRight />,
          href: "/academy/all-trainings?tab=Creative%20Excellence"
        },
      ],  
      image: {
        src: "/hero.jpg",
        alt: "Creative Excellence illustration",
      },
    },
    {
      icon: <TrendingUp size={32} />,
      heading: "Forecasting & Optimization",
      description:
        "Master the art of forecasting and optimization to drive strategic planning and operational excellence. Learn how to translate category forecasts into actionable plans for market share growth and sales performance.",
      buttons: [
        {
          title: "View Knowledge Zone",
          variant: "default",
          size: "default",
          iconRight: <ChevronRight />,
          href: "/academy/all-trainings?tab=Forecasting"
        },
      ],  
      image: {
        src: "/hero.jpg",
        alt: "Forecasting & Optimization illustration",
      },
    },
    {
      icon: <DollarSign size={32} />,
      heading: "Price & Trade Promo",
      description:
        "Develop expertise in pricing strategy and trade promotion effectiveness. Learn to analyze price elasticity, optimize promotional spending, and create data-driven pricing models that maximize revenue while maintaining customer value perception.",
      buttons: [
        {
          title: "View Knowledge Zone",
          variant: "default",
          size: "default",
          iconRight: <ChevronRight />,
          href: "/academy/all-trainings?tab=Price%20%26%20Trade%20Promo"
        },
      ],  
      image: {
        src: "/hero.jpg",
        alt: "Price & Trade Promotion illustration",
      },
    }
  ],
};
