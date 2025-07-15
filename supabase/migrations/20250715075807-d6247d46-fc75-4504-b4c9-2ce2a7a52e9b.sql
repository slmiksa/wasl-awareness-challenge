-- تحديث سياسة الأمان لجدول الزوار للسماح لأي شخص بقراءة البيانات
DROP POLICY IF EXISTS "Authenticated users can view visits" ON public.site_visits;

CREATE POLICY "Anyone can view visits" 
ON public.site_visits 
FOR SELECT 
USING (true);