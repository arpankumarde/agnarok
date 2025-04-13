import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className="playground-landing bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="hero-section bg-blue-600 text-white py-20 px-6 text-center">
        <div className="hero-content max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to Agentic AI Playground
          </h1>
          <p className="text-lg mb-6">
            Unleash the power of AI to create, innovate, and transform your
            ideas into reality.
          </p>
          <Button
            className="bg-white text-blue-600 font-semibold py-2 px-4 rounded shadow hover:bg-gray-100"
            asChild
          >
            <Link href="/playground/create">Customize Your Agent</Link>
          </Button>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-10">
          Why Choose Agentic AI?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded shadow hover:shadow-lg">
            <h3 className="text-xl font-semibold mb-2">
              Intelligent Automation
            </h3>
            <p>
              Streamline your workflows with AI-driven automation tailored to
              your needs.
            </p>
          </div>
          <div className="bg-white p-6 rounded shadow hover:shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Creative Assistance</h3>
            <p>
              Generate unique ideas and solutions with the help of advanced AI
              models.
            </p>
          </div>
          <div className="bg-white p-6 rounded shadow hover:shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Scalable Solutions</h3>
            <p>
              Scale your operations effortlessly with AI-powered tools and
              insights.
            </p>
          </div>
        </div>
      </section>

      {/* Possibilities Section */}
      <section className="bg-gray-100 py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-6">
          Endless Possibilities
        </h2>
        <p className="text-center max-w-3xl mx-auto mb-8">
          Explore the limitless potential of Agentic AI in various domains:
        </p>
        <ul className="list-disc list-inside max-w-3xl mx-auto text-left space-y-2">
          <li>Personalized customer experiences</li>
          <li>Advanced data analysis and predictions</li>
          <li>Creative content generation</li>
          <li>Enhanced decision-making processes</li>
        </ul>
      </section>

      {/* Call-to-Action Section */}
      <section className="bg-blue-600 text-white py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-lg mb-6">
          Take the first step towards building your custom AI agent today.
        </p>
        <Button
          className="bg-white text-blue-600 font-semibold py-2 px-4 rounded shadow hover:bg-gray-100"
          asChild
        >
          <Link href="/playground/create">Customize Your Agent</Link>
        </Button>
      </section>
    </div>
  );
};

export default Page;
