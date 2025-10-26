import { prisma } from "@/lib/prisma";
import Table from "@/components/Table";

export default async function ResultsPage() {
  const results = await prisma.result.findMany({
    include: {
      student: true,
      exam: {
        include: {
          lesson: {
            include: {
              subject: true,
            },
          },
        },
      },
      assignment: {
        include: {
          lesson: {
            include: {
              subject: true,
            },
          },
        },
      },
    },
    orderBy: {
      id: "desc",
    },
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Results</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <Table
          headers={[
            "Student",
            "Type",
            "Subject",
            "Score",
            "Date",
            "Actions",
          ]}
        >
          {results.map((result) => (
            <tr key={result.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={result.student.img || "/noAvatar.png"}
                      alt=""
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {result.student.name} {result.student.surname}
                    </div>
                    <div className="text-sm text-gray-500">
                      @{result.student.username}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {result.exam ? "Exam" : "Assignment"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {result.exam
                  ? result.exam.lesson.subject.name
                  : result.assignment?.lesson.subject.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    result.score >= 80
                      ? "bg-green-100 text-green-800"
                      : result.score >= 60
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {result.score}%
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {result.exam
                  ? new Date(result.exam.startTime).toLocaleDateString()
                  : result.assignment
                  ? new Date(result.assignment.dueDate).toLocaleDateString()
                  : "N/A"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex space-x-2">
                  <button className="text-lamaSky hover:text-blue-600">
                    View
                  </button>
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