import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Settings } from "lucide-react";
import { useEffect } from "react";
import { supabase } from '@/integrations/supabase/client';
import Logo from '@/components/Logo';
import Footer from '@/components/Footer';
import IncentivesApp from '@/components/IncentivesApp';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Track site visit
    const trackVisit = async () => {
      try {
        await supabase
          .from('site_visits')
          .insert({
            visitor_ip: null, // We'll keep this simple for privacy
            user_agent: navigator.userAgent,
            page_url: window.location.href
          });
      } catch (error) {
        // Silently fail - don't break the app if tracking fails
        console.log('Visit tracking failed:', error);
      }
    };

    trackVisit();
  }, []);

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