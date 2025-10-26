import { prisma } from "@/lib/prisma";
import Table from "@/components/Table";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

export default async function AnnouncementsPage() {
  const announcements = await prisma.announcement.findMany({
    include: {
      class: true,
    },
    orderBy: {
      date: "desc",
    },
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Announcements</h1>
        <Link
          href="/list/announcements/new"
          className="bg-lamaSky text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Add Announcement
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <Table
          headers={[
            "Title",
            "Description",
            "Date",
            "Class",
            "Actions",
          ]}
        >
          {announcements.map((announcement) => (
            <tr key={announcement.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {announcement.title}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                {announcement.description}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {formatDate(announcement.date)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {announcement.class ? announcement.class.name : "All Classes"}
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