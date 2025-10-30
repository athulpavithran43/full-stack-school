import prisma from "@/lib/prisma";
import Table from "@/components/Table";
import { formatDate } from "@/lib/utils";

export default async function AttendancePage() {
  const attendance = await prisma.attendance.findMany({
    include: {
      student: true,
      lesson: {
        include: {
          subject: true,
          class: true,
        },
      },
    },
    orderBy: {
      date: "desc",
    },
    take: 50, // Limit to recent 50 records
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Attendance</h1>
        <div className="flex space-x-2">
          <button className="bg-lamaGreen text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
            Mark Attendance
          </button>
          <button className="bg-lamaSky text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
            Generate Report
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <Table
          headers={[
            "Student",
            "Subject",
            "Class",
            "Date",
            "Status",
            "Actions",
          ]}
        >
          {attendance.map((record) => (
            <tr key={record.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={record.student.img || "/noAvatar.png"}
                      alt=""
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {record.student.name} {record.student.surname}
                    </div>
                    <div className="text-sm text-gray-500">
                      @{record.student.username}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {record.lesson.subject.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {record.lesson.class.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {formatDate(record.date)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    record.present
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {record.present ? "Present" : "Absent"}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex space-x-2">
                  <button className="text-lamaSky hover:text-blue-600">
                    Edit
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </Table>
      </div>
    </div>
  );
}