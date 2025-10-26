import prisma from "@/lib/prisma";
import Table from "@/components/Table";
import Link from "next/link";
import { formatDateTime } from "@/lib/utils";

export default async function AssignmentsPage() {
  const assignments = await prisma.assignment.findMany({
    include: {
      lesson: {
        include: {
          subject: true,
          class: true,
        },
      },
    },
    orderBy: {
      dueDate: "asc",
    },
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Assignments</h1>
        <Link
          href="/list/assignments/new"
          className="bg-lamaSky text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Add Assignment
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <Table
          columns={[
            { header: "Title", accessor: "title" },
            { header: "Subject", accessor: "subject" },
            { header: "Class", accessor: "class" },
            { header: "Start Date", accessor: "startDate" },
            { header: "Due Date", accessor: "dueDate" },
            { header: "Actions", accessor: "actions" },
          ]}
          data={assignments}
          renderRow={(assignment) => (
            <>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {assignment.title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {assignment.lesson.subject.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {assignment.lesson.class.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {formatDateTime(assignment.startDate)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {formatDateTime(assignment.dueDate)}
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
            </>
          )}
        />
      </div>
    </div>
  );
}