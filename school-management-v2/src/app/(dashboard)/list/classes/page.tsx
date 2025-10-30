import prisma from "@/lib/prisma";
import Table from "@/components/Table";
import Link from "next/link";

export default async function ClassesPage() {
  const classes = await prisma.class.findMany({
    include: {
      grade: true,
      supervisor: true,
      _count: {
        select: {
          students: true,
        },
      },
    },
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Classes</h1>
        <Link
          href="/list/classes/new"
          className="bg-lamaSky text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Add Class
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <Table
          headers={[
            "Class Name",
            "Grade",
            "Capacity",
            "Current Students",
            "Supervisor",
            "Actions",
          ]}
        >
          {classes.map((classItem) => (
            <tr key={classItem.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {classItem.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                Grade {classItem.grade.level}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {classItem.capacity}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {classItem._count.students}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {classItem.supervisor
                  ? `${classItem.supervisor.name} ${classItem.supervisor.surname}`
                  : "Not assigned"}
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