import { prisma } from "@/lib/prisma";
import Table from "@/components/Table";
import Link from "next/link";

export default async function TeachersPage() {
  const teachers = await prisma.teacher.findMany({
    include: {
      subjects: true,
    },
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Teachers</h1>
        <Link
          href="/list/teachers/new"
          className="bg-lamaSky text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Add Teacher
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <Table
          headers={[
            "Name",
            "Subjects",
            "Email",
            "Phone",
            "Blood Type",
            "Sex",
            "Actions",
          ]}
        >
          {teachers.map((teacher) => (
            <tr key={teacher.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={teacher.img || "/noAvatar.png"}
                      alt=""
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {teacher.name} {teacher.surname}
                    </div>
                    <div className="text-sm text-gray-500">
                      @{teacher.username}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {teacher.subjects.map((subject) => subject.name).join(", ")}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {teacher.email || "N/A"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {teacher.phone || "N/A"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {teacher.bloodType}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {teacher.sex}
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