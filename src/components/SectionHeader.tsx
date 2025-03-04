
import React from "react";
import { Link } from "react-router-dom";

interface SectionHeaderProps {
  title: string;
  linkTo: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, linkTo }) => {
  return (
    <div className="flex justify-between items-center mb-4 animate-slideUp" style={{ animationDelay: "0.3s" }}>
      <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      <Link to={linkTo} className="text-sm text-health-primary font-medium hover:underline transition-colors">
        See all
      </Link>
    </div>
  );
};

export default SectionHeader;
