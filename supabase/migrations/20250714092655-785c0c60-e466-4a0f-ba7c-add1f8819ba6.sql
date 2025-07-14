-- Create site_visits table to track website visits
CREATE TABLE public.site_visits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  visitor_ip TEXT,
  user_agent TEXT,
  page_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.site_visits ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert visits (for tracking)
CREATE POLICY "Anyone can record visits" 
ON public.site_visits 
FOR INSERT 
WITH CHECK (true);

-- Only authenticated users can view visit statistics
CREATE POLICY "Authenticated users can view visits" 
ON public.site_visits 
FOR SELECT 
TO authenticated 
USING (true);