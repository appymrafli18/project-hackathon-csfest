import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MainLayout from "@/layouts/MainLayout";

export default function EnrollPage() {
  return (
    <MainLayout>
    <div className="min-h-screen w-full p-6 flex justify-center items-start">
      <div className="w-full max-w-3xl">
        <Card className="shadow-xl rounded-2xl p-6">
          <CardHeader>
            <CardTitle className="text-3xl font-semibold text-gray-800">
              Enrolment Options
            </CardTitle>
            <p className="text-sm text-gray-500 mt-1">
              TKJ-Kewarganegaraan-TKJ 2A-2022/2023-Genap
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Teacher: Ayres Pradiptyas
            </p>
          </CardHeader>

          <CardContent className="mt-6 space-y-8">
            {/* Teacher Section */}
            <div className="border rounded-xl p-5 bg-white shadow-sm">
              <h2 className="text-lg font-semibold mb-3 text-gray-800">
                Self Enrolment (Teacher)
              </h2>

              <label className="text-sm text-gray-600">Enrolment key</label>
              <Input placeholder="Enter enrolment key" className="mt-1" />

              <Button className="mt-4">Enrol me</Button>
            </div>

            {/* Student Section */}
            <div className="border rounded-xl p-5 bg-white shadow-sm">
              <h2 className="text-lg font-semibold mb-3 text-gray-800">
                Self Enrolment (Student)
              </h2>

              <label className="text-sm text-gray-600">Enrolment key</label>
              <Input placeholder="Enter enrolment key" className="mt-1" />

              <Button className="mt-4">Enrol me</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </MainLayout>
  );
}
