import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, FileText, FileSpreadsheet, ArrowLeft, LogOut } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import 'jspdf-autotable';
import Logo from '@/components/Logo';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

// Extend jsPDF type to include autoTable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

interface IncentiveEntry {
  id: string;
  name: string;
  employee_id: string;
  created_at: string;
}

const Dashboard = () => {
  const [data, setData] = useState<IncentiveEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
    fetchData();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/auth');
      return;
    }
  };

  const fetchData = async () => {
    try {
      const { data: registrations, error } = await supabase
        .from('incentive_registrations')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setData(registrations || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ في تحميل البيانات",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ في تسجيل الخروج",
        variant: "destructive"
      });
    } else {
      navigate('/');
    }
  };

  const exportToPDF = () => {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });

    // Add Arabic font support (fallback to default)
    doc.setFont('helvetica', 'normal');
    
    // Title
    doc.setFontSize(16);
    doc.text('Incentives Registration Report', 20, 20);
    doc.text('تقرير تسجيل الحوافز', 20, 30);

    // Table data
    const tableData = data.map((item, index) => [
      (index + 1).toString(),
      item.name,
      item.employee_id,
      new Date(item.created_at).toLocaleDateString('ar-SA')
    ]);

    doc.autoTable({
      head: [['#', 'الاسم / Name', 'الرقم الوظيفي / Employee ID', 'التاريخ / Date']],
      body: tableData,
      startY: 40,
      styles: {
        font: 'helvetica',
        fontSize: 10,
        textColor: [0, 0, 0],
        fillColor: [255, 255, 255]
      },
      headStyles: {
        fillColor: [156, 132, 76],
        textColor: [255, 255, 255],
        fontSize: 12
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      }
    });

    doc.save('incentives-report.pdf');
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      data.map((item, index) => ({
        '#': index + 1,
        'الاسم': item.name,
        'الرقم الوظيفي': item.employee_id,
        'التاريخ': new Date(item.created_at).toLocaleDateString('ar-SA'),
        'الوقت': new Date(item.created_at).toLocaleTimeString('ar-SA')
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'تقرير الحوافز');
    
    XLSX.writeFile(workbook, 'incentives-report.xlsx');
  };

  return (
    <div className="min-h-screen bg-background dotted-bg">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => navigate('/')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                العودة للرئيسية
              </Button>
              
              <Button 
                variant="outline" 
                onClick={handleLogout}
                className="flex items-center gap-2 text-destructive hover:text-destructive"
              >
                <LogOut className="w-4 h-4" />
                تسجيل الخروج
              </Button>
            </div>
            
            <Logo />
          </div>

          {/* Dashboard Title */}
          <div className="text-center mb-8">
            <h1 className="arabic-title mb-4">
              لوحة تحكم الحوافز
            </h1>
            <p className="arabic-text text-muted-foreground">
              إدارة ومراجعة طلبات الحوافز المسجلة
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">إجمالي الطلبات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{data.length}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">طلبات اليوم</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">
                  {data.filter(item => 
                    new Date(item.created_at).toDateString() === new Date().toDateString()
                  ).length}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">آخر تحديث</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  {data.length > 0 
                    ? new Date(data[0].created_at).toLocaleString('ar-SA')
                    : 'لا توجد بيانات'
                  }
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Export Buttons */}
          <div className="flex gap-4 mb-6 justify-end">
            <Button 
              onClick={exportToPDF}
              className="flex items-center gap-2"
              variant="outline"
            >
              <FileText className="w-4 h-4" />
              تصدير PDF
            </Button>
            
            <Button 
              onClick={exportToExcel}
              className="flex items-center gap-2"
              variant="outline"
            >
              <FileSpreadsheet className="w-4 h-4" />
              تصدير Excel
            </Button>
          </div>

          {/* Data Table */}
          <Card>
            <CardHeader>
              <CardTitle className="text-right">بيانات المسجلين</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">
                  <div className="arabic-text text-muted-foreground">جاري تحميل البيانات...</div>
                </div>
              ) : data.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  لا توجد بيانات مسجلة حتى الآن
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-right">#</TableHead>
                        <TableHead className="text-right">الاسم</TableHead>
                        <TableHead className="text-right">الرقم الوظيفي</TableHead>
                        <TableHead className="text-right">تاريخ التسجيل</TableHead>
                        <TableHead className="text-right">الوقت</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data.map((item, index) => (
                        <TableRow key={item.id}>
                          <TableCell className="text-right">{index + 1}</TableCell>
                          <TableCell className="text-right font-medium">{item.name}</TableCell>
                          <TableCell className="text-right">{item.employee_id}</TableCell>
                          <TableCell className="text-right">
                            {new Date(item.created_at).toLocaleDateString('ar-SA')}
                          </TableCell>
                          <TableCell className="text-right">
                            {new Date(item.created_at).toLocaleTimeString('ar-SA')}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;