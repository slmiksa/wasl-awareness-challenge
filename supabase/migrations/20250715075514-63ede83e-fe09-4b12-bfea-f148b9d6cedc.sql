-- تحديث سياسة الأمان للسماح لأي شخص بقراءة البيانات
DROP POLICY IF EXISTS "Authenticated users can view all registrations" ON public.incentive_registrations;

CREATE POLICY "Anyone can view registrations" 
ON public.incentive_registrations 
FOR SELECT 
USING (true);