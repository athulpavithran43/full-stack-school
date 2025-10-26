# School Management System V2

A modern, comprehensive school management system built with Next.js 14, TypeScript, Prisma, and Clerk authentication.

## Features

- **Multi-role Authentication**: Admin, Teacher, Student, and Parent roles
- **Student Management**: Complete student lifecycle management
- **Teacher Management**: Teacher profiles and subject assignments
- **Class Management**: Class creation and student enrollment
- **Subject Management**: Subject creation and teacher assignments
- **Exam & Assignment Management**: Schedule and track academic activities
- **Attendance Tracking**: Monitor student attendance
- **Event Management**: School events and announcements
- **Results Management**: Track student performance
- **Responsive Design**: Mobile-first, modern UI

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Clerk
- **UI Components**: Custom components with Lucide React icons
- **Forms**: React Hook Form with Zod validation
- **Charts**: Recharts
- **Calendar**: React Big Calendar
- **Notifications**: React Toastify

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Clerk account for authentication

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd school-management-v2
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure your environment variables in `.env.local`:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/school_management_v2"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```

5. Set up the database:
```bash
npx prisma db push
npx prisma db seed
```

6. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Docker Setup

### Using Docker Compose

1. Create a `.env` file with your environment variables
2. Run the application:
```bash
docker-compose up -d
```

The application will be available at `http://localhost:3000`

### Using Docker

1. Build the image:
```bash
docker build -t school-management-v2 .
```

2. Run the container:
```bash
docker run -p 3000:3000 school-management-v2
```

## Database Schema

The application uses a comprehensive database schema with the following main entities:

- **Users**: Admin, Teacher, Student, Parent
- **Academic**: Grade, Class, Subject, Lesson
- **Assessment**: Exam, Assignment, Result
- **Management**: Attendance, Event, Announcement

## User Roles

### Admin
- Full system access
- Manage all users, classes, subjects
- View all reports and analytics

### Teacher
- Manage assigned classes and subjects
- Create exams and assignments
- Track attendance
- View student results

### Student
- View personal information
- Check exam schedules
- View assignments and results
- Check attendance records

### Parent
- View child's information
- Monitor academic progress
- Check attendance and results
- Receive announcements

## API Routes

The application uses Next.js App Router with server actions for data operations:

- `/api/students` - Student management
- `/api/teachers` - Teacher management
- `/api/classes` - Class management
- `/api/subjects` - Subject management
- `/api/exams` - Exam management
- `/api/assignments` - Assignment management

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email support@schoolmanagement.com or create an issue in the repository.