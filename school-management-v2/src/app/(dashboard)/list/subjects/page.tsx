import { prisma } from "@/lib/prisma";
import Table from "@/components/Table";
import Link from "next/link";

export default async function SubjectsPage() {
  const subjects = await prisma.subject.findMany({
    include: {
      teachers: true,
      _count: {
        select: {
          lessons: true,
        },
      },
    },
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Subjects</h1>
        <Link
          href="/list/subjects/new"
          className="bg-lamaSky text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Add Subject
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <Table
          headers={[
            "Subject Name",
            "Teachers",
            "Lessons",
            "Actions",
          ]}
        >
          {subjects.map((subject) => (
            <tr key={subject.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {subject.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {subject.teachers.length > 0
                  ? subject.teachers
                      .map((teacher) => `${teacher.name} ${teacher.surname}`)
                      .join(", ")
                  : "No teachers assigned"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {subject._count.lessons}
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