import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
const Footer = () => {
  return <footer className="bg-footer-bg text-white py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div className="text-center md:text-right">
            <h3 className="text-xl font-semibold mb-4 text-arabic-gold">
              شركة الوصل الوطنية
            </h3>
            <p className="text-sm leading-relaxed mb-4">لتحصيل ديون جهات التمويل</p>
          </div>

          {/* Contact Information */}
          <div className="text-center md:text-right">
            <h4 className="text-lg font-semibold mb-4 text-arabic-gold">معلومات التواصل</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-center md:justify-end gap-2">
                <span>

جدة - مركز الورود التجاري 6892 - ص.ب 4214 , 23224 - الدور الثاني - مكتب رقم 207</span>
                <MapPin className="w-4 h-4 text-arabic-gold flex-shrink-0" />
              </div>
              <div className="flex items-center justify-center md:justify-end gap-2">
                <span>info@alwaslsaudi.com</span>
                <Mail className="w-4 h-4 text-arabic-gold flex-shrink-0" />
              </div>
              <div className="flex items-center justify-center md:justify-end gap-2">
                <span>920013620</span>
                <Phone className="w-4 h-4 text-arabic-gold flex-shrink-0" />
              </div>
              <div className="flex items-center justify-center md:justify-end gap-2">
                <span>8001240299</span>
                <Phone className="w-4 h-4 text-arabic-gold flex-shrink-0" />
              </div>
              <div className="flex items-center justify-center md:justify-end gap-2">
                <span>920013620</span>
                <Clock className="w-4 h-4 text-arabic-gold flex-shrink-0" />
              </div>
            </div>
          </div>
        </div>

        {/* Social Media */}
        
      </div>
    </footer>;
};
export default Footer;