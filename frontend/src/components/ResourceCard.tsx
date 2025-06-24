
import React from "react";
import { ExternalLink } from "lucide-react";

export interface ResourceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  actionLabel?: string;
  link: string,
  className?: string;
}

const ResourceCard: React.FC<ResourceCardProps> = ({
  title,
  description,
  icon,
  actionLabel = "Learn more",
  link,
  className = "",
}) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 transition-all duration-300 hover:shadow-md ${className}`}>
      <div className="flex items-start space-x-3">
        <div className="mt-0.5 p-2 bg-primary/10 dark:bg-primary/20 rounded-lg">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-sm">{title}</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{description}</p>

          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 text-primary dark:text-primary/90 text-xs font-medium inline-flex items-center hover:underline"
          >
            {actionLabel}
            <ExternalLink className="ml-1 w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;
