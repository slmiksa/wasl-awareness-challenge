import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-footer-bg text-white py-16 mt-16">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-12">
          {/* Company Info */}
          <div className="text-center lg:text-right">
            <h3 className="text-2xl font-bold mb-6 text-arabic-gold border-b border-arabic-gold/30 pb-3">
              شركة الوصل الوطنية
            </h3>
            <p className="text-base leading-relaxed text-muted-foreground">
              لتحصيل ديون جهات التمويل
            </p>
            <p className="text-sm leading-relaxed mt-4 text-muted-foreground">
              نقدم خدمات متميزة في مجال تحصيل الديون بأعلى معايير الجودة والمهنية
            </p>
          </div>

          {/* Contact Information */}
          <div className="text-center lg:text-right">
            <h4 className="text-xl font-bold mb-6 text-arabic-gold border-b border-arabic-gold/30 pb-3">
              معلومات التواصل
            </h4>
            <div className="space-y-4">
              <div className="flex items-start justify-center lg:justify-end gap-3">
                <div className="text-right">
                  <p className="text-sm font-medium">العنوان</p>
                  <span className="text-xs text-muted-foreground">
                    جدة - مركز الورود التجاري 6892
                    <br />
                    ص.ب 4214, 23224 - الدور الثاني - مكتب رقم 207
                  </span>
                </div>
                <MapPin className="w-5 h-5 text-arabic-gold flex-shrink-0 mt-1" />
              </div>
              
              <div className="flex items-center justify-center lg:justify-end gap-3">
                <div className="text-right">
                  <p className="text-sm font-medium">البريد الإلكتروني</p>
                  <span className="text-xs text-muted-foreground">info@alwaslsaudi.com</span>
                </div>
                <Mail className="w-5 h-5 text-arabic-gold flex-shrink-0" />
              </div>
            </div>
          </div>

          {/* Phone Numbers */}
          <div className="text-center lg:text-right">
            <h4 className="text-xl font-bold mb-6 text-arabic-gold border-b border-arabic-gold/30 pb-3">
              أرقام التواصل
            </h4>
            <div className="space-y-4">
              <div className="flex items-center justify-center lg:justify-end gap-3">
                <div className="text-right">
                  <p className="text-sm font-medium">الهاتف الرئيسي</p>
                  <span className="text-xs text-muted-foreground">920013620</span>
                </div>
                <Phone className="w-5 h-5 text-arabic-gold flex-shrink-0" />
              </div>
              
              <div className="flex items-center justify-center lg:justify-end gap-3">
                <div className="text-right">
                  <p className="text-sm font-medium">الرقم المجاني</p>
                  <span className="text-xs text-muted-foreground">8001240299</span>
                </div>
                <Phone className="w-5 h-5 text-arabic-gold flex-shrink-0" />
              </div>
              
              <div className="flex items-center justify-center lg:justify-end gap-3">
                <div className="text-right">
                  <p className="text-sm font-medium">ساعات العمل</p>
                  <span className="text-xs text-muted-foreground">الأحد - الخميس: 8:00 - 17:00</span>
                </div>
                <Clock className="w-5 h-5 text-arabic-gold flex-shrink-0" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="border-t border-border/30 mt-12 pt-8 text-center">
          <p className="text-xs text-muted-foreground">
            © 2024 شركة الوصل الوطنية لتحصيل ديون جهات التمويل. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;