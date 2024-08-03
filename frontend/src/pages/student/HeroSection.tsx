import React from "react";

const HeroSection: React.FC = () => {
  return (
    <section className="bg-blue-600 text-white py-20">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl font-bold">Optimize Your Patient Outcomes!</h1>
        <p className="mt-4">
          Simplify the discharge process, reduce readmissions, and improve
          patient satisfaction with our innovative platform.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
