import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Settings } from "lucide-react";
import Logo from '@/components/Logo';
import Footer from '@/components/Footer';
import IncentivesApp from '@/components/IncentivesApp';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background dotted-bg">
      <div className="container mx-auto px-4 py-8">
        {/* Header with Logo and Dashboard Button */}
        <div className="flex justify-between items-center mb-8">
          <Logo />
          <Button 
            onClick={() => navigate('/auth')}
            variant="outline"
            className="arabic-text flex items-center gap-2"
          >
            <Settings className="w-4 h-4" />
            لوحة التحكم
          </Button>
        </div>

        {/* Main Incentives App */}
        <IncentivesApp />
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;