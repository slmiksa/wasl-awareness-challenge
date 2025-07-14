import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Send } from 'lucide-react';

const IncentivesApp = () => {
  const [formData, setFormData] = useState({
    name: '',
    employeeId: ''
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.employeeId.trim()) {
      return;
    }

    setLoading(true);
    
    try {
      const { error } = await supabase
        .from('incentive_registrations')
        .insert([
          {
            name: formData.name.trim(),
            employee_id: formData.employeeId.trim()
          }
        ]);
      
      if (error) throw error;
      
      // Show success message
      toast({
        title: "تم الإرسال بنجاح",
        description: "تم تسجيل طلبك للحصول على الحوافز الفورية"
      });

      // Reset form
      setFormData({ name: '', employeeId: '' });
      
    } catch (error: any) {
      console.error('Error saving data:', error);
      toast({
        title: "خطأ في الإرسال",
        description: "حدث خطأ في حفظ البيانات، يرجى المحاولة مرة أخرى",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      
      {/* Main Title */}
      <div className="text-center mb-12">
        <h1 className="arabic-title mb-4">
          حوافز الوصل الوطنية
        </h1>
        <h2 className="text-xl text-primary font-medium mb-2">
          لتحصيل ديون جهات التمويل
        </h2>
        <p className="arabic-text text-muted-foreground">
          للإطلاع والتسجيل في الحوافز الفورية
        </p>
      </div>

      {/* Registration Form */}
      <div className="bg-card rounded-lg shadow-lg p-8 border border-border">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2 text-right">
              الاسم :
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="form-field w-full text-right"
              placeholder="أدخل اسمك الكامل"
            />
          </div>

          {/* Employee ID Field */}
          <div>
            <label htmlFor="employeeId" className="block text-sm font-medium text-foreground mb-2 text-right">
              الرقم الوظيفي :
            </label>
            <input
              type="number"
              id="employeeId"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleInputChange}
              required
              className="form-field w-full text-right"
              placeholder="أدخل رقمك الوظيفي"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center pt-4">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary inline-flex items-center gap-2 min-w-[200px] justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
              {loading ? 'جاري الإرسال...' : 'إرسال'}
            </button>
          </div>
        </form>
      </div>

      {/* Additional Information */}
      <div className="mt-8 text-center">
        <div className="bg-arabic-beige rounded-lg p-6 border border-primary/20">
          <h3 className="text-lg font-semibold text-primary mb-3">
            معلومات مهمة
          </h3>
          <p className="arabic-text text-sm">
            يرجى التأكد من صحة البيانات المدخلة للحصول على الحوافز الفورية.
            سيتم التواصل معكم خلال 24 ساعة من تاريخ التسجيل.
          </p>
        </div>
      </div>

      {/* Dashboard Link */}
      <div className="mt-6 text-center">
        <a 
          href="/auth" 
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
        >
          <span className="text-sm">لوحة التحكم</span>
        </a>
      </div>
    </div>
  );
};

export default IncentivesApp;