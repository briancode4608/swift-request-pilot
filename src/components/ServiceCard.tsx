
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  route: string;
}

const ServiceCard = ({ title, description, icon, route }: ServiceCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className="service-card h-full flex flex-col">
      <CardHeader>
        <div className="mb-4 flex justify-center">
          <div className="p-3 rounded-full bg-primary/10 text-primary">
            {icon}
          </div>
        </div>
        <CardTitle className="text-center text-xl">{title}</CardTitle>
        <CardDescription className="text-center">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
      </CardContent>
      <CardFooter className="pt-4 flex justify-center">
        <Button 
          className="w-full" 
          onClick={() => navigate(route)}
        >
          Select {title}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
