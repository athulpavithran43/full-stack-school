import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create grades
  const grade1 = await prisma.grade.upsert({
    where: { level: 1 },
    update: {},
    create: { level: 1 },
  });

  const grade2 = await prisma.grade.upsert({
    where: { level: 2 },
    update: {},
    create: { level: 2 },
  });

  const grade3 = await prisma.grade.upsert({
    where: { level: 3 },
    update: {},
    create: { level: 3 },
  });

  // Create subjects
  const math = await prisma.subject.upsert({
    where: { name: "Mathematics" },
    update: {},
    create: { name: "Mathematics" },
  });

  const english = await prisma.subject.upsert({
    where: { name: "English" },
    update: {},
    create: { name: "English" },
  });

  const science = await prisma.subject.upsert({
    where: { name: "Science" },
    update: {},
    create: { name: "Science" },
  });

  const history = await prisma.subject.upsert({
    where: { name: "History" },
    update: {},
    create: { name: "History" },
  });

  // Create classes
  const class1A = await prisma.class.upsert({
    where: { name: "1A" },
    update: {},
    create: {
      name: "1A",
      capacity: 30,
      gradeId: grade1.id,
    },
  });

  const class1B = await prisma.class.upsert({
    where: { name: "1B" },
    update: {},
    create: {
      name: "1B",
      capacity: 30,
      gradeId: grade1.id,
    },
  });

  const class2A = await prisma.class.upsert({
    where: { name: "2A" },
    update: {},
    create: {
      name: "2A",
      capacity: 30,
      gradeId: grade2.id,
    },
  });

  // Create sample events
  await prisma.event.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: "School Assembly",
      description: "Weekly school assembly for all students",
      startTime: new Date("2024-01-15T08:00:00Z"),
      endTime: new Date("2024-01-15T09:00:00Z"),
      classId: null,
    },
  });

  await prisma.event.upsert({
    where: { id: 2 },
    update: {},
    create: {
      title: "Parent-Teacher Meeting",
      description: "Monthly parent-teacher meeting for Grade 1",
      startTime: new Date("2024-01-20T14:00:00Z"),
      endTime: new Date("2024-01-20T16:00:00Z"),
      classId: class1A.id,
    },
  });

  // Create sample announcements
  await prisma.announcement.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: "Welcome to New Academic Year",
      description: "We are excited to welcome all students and parents to the new academic year. Classes will begin on January 15th.",
      date: new Date("2024-01-10T09:00:00Z"),
      classId: null,
    },
  });

  await prisma.announcement.upsert({
    where: { id: 2 },
    update: {},
    create: {
      title: "Grade 1 Field Trip",
      description: "Grade 1 students will have a field trip to the local museum on January 25th. Please ensure your child brings a packed lunch.",
      date: new Date("2024-01-12T10:00:00Z"),
      classId: class1A.id,
    },
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });