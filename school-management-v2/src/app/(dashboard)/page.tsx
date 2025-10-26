import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = await currentUser();
  
  if (!user) {
    redirect("/sign-in");
  }

  const role = user.publicMetadata?.role as string;

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome back, {user.firstName}!
        </h1>
        <p className="text-gray-600">
          Here's what's happening in your school today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Students</p>
              <p className="text-2xl font-bold text-gray-900">1,234</p>
            </div>
            <div className="p-3 bg-lamaSkyLight rounded-full">
              <svg className="w-6 h-6 text-lamaSky" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Teachers</p>
              <p className="text-2xl font-bold text-gray-900">89</p>
            </div>
            <div className="p-3 bg-lamaGreenLight rounded-full">
              <svg className="w-6 h-6 text-lamaGreen" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Classes</p>
              <p className="text-2xl font-bold text-gray-900">24</p>
            </div>
            <div className="p-3 bg-lamaPurpleLight rounded-full">
              <svg className="w-6 h-6 text-lamaPurple" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a2 2 0 114 0 2 2 0 01-4 0zm8 0a2 2 0 114 0 2 2 0 01-4 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Attendance Today</p>
              <p className="text-2xl font-bold text-gray-900">94%</p>
            </div>
            <div className="p-3 bg-lamaYellowLight rounded-full">
              <svg className="w-6 h-6 text-lamaYellow" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activities</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-lamaSky rounded-full"></div>
              <p className="text-sm text-gray-600">New student enrolled in Grade 10</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-lamaGreen rounded-full"></div>
              <p className="text-sm text-gray-600">Math exam scheduled for tomorrow</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-lamaYellow rounded-full"></div>
              <p className="text-sm text-gray-600">Parent meeting scheduled</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="p-3 text-left bg-lamaSkyLight hover:bg-lamaSky text-lamaSky rounded-lg transition-colors">
              <p className="font-medium">Add Student</p>
              <p className="text-sm opacity-75">Enroll new student</p>
            </button>
            <button className="p-3 text-left bg-lamaGreenLight hover:bg-lamaGreen text-lamaGreen rounded-lg transition-colors">
              <p className="font-medium">Schedule Exam</p>
              <p className="text-sm opacity-75">Create new exam</p>
            </button>
            <button className="p-3 text-left bg-lamaPurpleLight hover:bg-lamaPurple text-lamaPurple rounded-lg transition-colors">
              <p className="font-medium">View Reports</p>
              <p className="text-sm opacity-75">Generate reports</p>
            </button>
            <button className="p-3 text-left bg-lamaYellowLight hover:bg-lamaYellow text-lamaYellow rounded-lg transition-colors">
              <p className="font-medium">Send Notice</p>
              <p className="text-sm opacity-75">Create announcement</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}