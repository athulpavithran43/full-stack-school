import prisma from "@/lib/prisma";
import Table from "@/components/Table";
import Link from "next/link";
import { formatDateTime } from "@/lib/utils";

export default async function ExamsPage() {
  const exams = await prisma.exam.findMany({
    include: {
      lesson: {
        include: {
          subject: true,
          class: true,
        },
      },
    },
    orderBy: {
      startTime: "asc",
    },
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Exams</h1>
        <Link
          href="/list/exams/new"
          className="bg-lamaSky text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Add Exam
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <Table
          headers={[
            "Title",
            "Subject",
            "Class",
            "Start Time",
            "End Time",
            "Actions",
          ]}
        >
          {exams.map((exam) => (
            <tr key={exam.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {exam.title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {exam.lesson.subject.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {exam.lesson.class.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {formatDateTime(exam.startTime)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {formatDateTime(exam.endTime)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex space-x-2">
                  <button className="text-lamaSky hover:text-blue-600">
                    Edit
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    Delete
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