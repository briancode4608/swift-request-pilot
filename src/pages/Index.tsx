
import { Truck, Package } from "lucide-react";
import ServiceCard from "@/components/ServiceCard";
import Navbar from "@/components/Navbar";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
            Delivery Drive
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Fast, reliable transport and delivery services at your fingertips
          </p>
        </div>

        <section className="py-8">
          <h2 className="text-2xl font-bold mb-8 text-center">Our Services</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <ServiceCard
              title="Transport"
              description="Request a vehicle for your personal transport needs"
              icon={<Truck size={32} />}
              route="/transport"
            />
            <ServiceCard
              title="Delivery"
              description="Send packages and products to any destination"
              icon={<Package size={32} />}
              route="/delivery"
            />
          </div>
        </section>

        <section className="py-8 mt-8 bg-muted rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Why Choose Delivery Drive?</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="bg-background p-6 rounded-lg shadow">
              <h3 className="font-bold mb-2">Fast Delivery</h3>
              <p className="text-muted-foreground">Get your items delivered quickly and efficiently</p>
            </div>
            <div className="bg-background p-6 rounded-lg shadow">
              <h3 className="font-bold mb-2">Reliable Service</h3>
              <p className="text-muted-foreground">Count on our experienced drivers for timely service</p>
            </div>
            <div className="bg-background p-6 rounded-lg shadow">
              <h3 className="font-bold mb-2">Secure Transport</h3>
              <p className="text-muted-foreground">Your items are handled with care and security</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4 md:h-16">
          <p className="text-sm text-muted-foreground">
            © 2025 Delivery Drive. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy Policy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
