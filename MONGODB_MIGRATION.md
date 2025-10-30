# MongoDB Migration Guide

This project has been migrated from PostgreSQL to MongoDB. Here's what changed and how to set it up.

## What Changed

### 1. Database Provider
- **Before**: PostgreSQL
- **After**: MongoDB

### 2. Prisma Schema
- Changed provider from `postgresql` to `mongodb`
- Updated all ID fields to use MongoDB's ObjectId format
- Changed auto-incrementing integer IDs to String IDs with `@default(auto())`
- Added `@map("_id")` and `@db.ObjectId` annotations to all ID fields
- Updated all foreign key references to use String with `@db.ObjectId`

### 3. Docker Configuration
- Replaced PostgreSQL container with MongoDB 7.0
- Updated connection strings and environment variables

## Setup Instructions

### Option 1: Local Development with Docker

1. **Start MongoDB with Docker Compose:**
   ```bash
   docker-compose up -d mongodb
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Generate Prisma Client:**
   ```bash
   npx prisma generate
   ```

4. **Push schema to MongoDB:**
   ```bash
   npx prisma db push
   ```

5. **Seed the database (optional):**
   ```bash
   npm run prisma:seed
   # or
   npx prisma db seed
   ```

6. **Start the application:**
   ```bash
   npm run dev
   ```

### Option 2: MongoDB Atlas (Cloud)

1. **Create a MongoDB Atlas account** at https://www.mongodb.com/cloud/atlas

2. **Create a new cluster** (free tier available)

3. **Get your connection string** from Atlas dashboard

4. **Update `.env` file:**
   ```
   DATABASE_URL="mongodb+srv://<username>:<password>@<cluster-url>/<database>?retryWrites=true&w=majority"
   ```

5. **Follow steps 2-6 from Option 1**

## Connection String Format

### Local Docker:
```
mongodb://admin:password@localhost:27017/school_management?authSource=admin
```

### MongoDB Atlas:
```
mongodb+srv://<username>:<password>@<cluster>.mongodb.net/school_management?retryWrites=true&w=majority
```

## Important Notes

### ID Fields
All ID fields are now String type using MongoDB ObjectId:
- Before: `id: number` (PostgreSQL auto-increment)
- After: `id: string` (MongoDB ObjectId)

### Many-to-Many Relations
MongoDB doesn't support implicit many-to-many relations. They've been converted to explicit array-based relations:

**Teacher ↔ Subject Relation:**
- Before: `subjects: Subject[]` (implicit relation)
- After: 
  ```typescript
  subjectIds: String[] @db.ObjectId
  subjects: Subject[] @relation(fields: [subjectIds], references: [id])
  ```

This means in your code:
- Before: `teacher.subjects` (array of Subject objects)
- After: `teacher.subjectIds` (array of ObjectId strings) + `teacher.subjects` (requires include in query)

### Code Changes Required
If your code has any type assertions or hardcoded number IDs, you'll need to update them:

```typescript
// Before (PostgreSQL)
const studentId: number = 123;

// After (MongoDB)
const studentId: string = "507f1f77bcf86cd799439011";
```

### Prisma Client
The Prisma Client has been regenerated. Make sure to run:
```bash
npx prisma generate
```

## Useful Commands

```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database (development)
npx prisma db push

# Open Prisma Studio to view data
npx prisma studio

# Reset database (careful - deletes all data!)
npx prisma db push --force-reset

# Seed database
npm run prisma:seed
```

## Troubleshooting

### "Can't reach database server"
- Ensure MongoDB is running: `docker-compose ps`
- Check connection string in `.env` file
- Verify MongoDB is accessible on port 27017

### "Authentication failed"
- Check username/password in connection string
- For Docker: default is `admin:password`
- For Atlas: use your Atlas credentials

### "Unknown datasource provider"
- Run `npm install` to ensure Prisma packages are updated
- Run `npx prisma generate` to regenerate the client

### Migration from existing PostgreSQL data
If you need to migrate existing data:
1. Export data from PostgreSQL
2. Transform ID fields from integers to ObjectId strings
3. Import into MongoDB using mongoimport or Prisma seed script

## Additional Resources

- [Prisma MongoDB Documentation](https://www.prisma.io/docs/concepts/database-connectors/mongodb)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Docker MongoDB Image](https://hub.docker.com/_/mongo)
