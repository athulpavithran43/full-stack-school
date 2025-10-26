import { prisma } from "@/lib/prisma";
import Table from "@/components/Table";
import Link from "next/link";
import { formatTime } from "@/lib/utils";

export default async function LessonsPage() {
  const lessons = await prisma.lesson.findMany({
    include: {
      subject: true,
      class: true,
      teacher: true,
    },
    orderBy: {
      startTime: "asc",
    },
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Lessons</h1>
        <Link
          href="/list/lessons/new"
          className="bg-lamaSky text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Add Lesson
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <Table
          headers={[
            "Lesson Name",
            "Subject",
            "Class",
            "Teacher",
            "Day",
            "Time",
            "Actions",
          ]}
        >
          {lessons.map((lesson) => (
            <tr key={lesson.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {lesson.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {lesson.subject.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {lesson.class.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {lesson.teacher.name} {lesson.teacher.surname}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {lesson.day}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {formatTime(lesson.startTime)} - {formatTime(lesson.endTime)}
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