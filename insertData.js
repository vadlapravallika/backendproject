const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Insert authors
  const author1 = await prisma.author.create({ data: { name: 'John Doe' } });
  const author2 = await prisma.author.create({ data: { name: 'Jane Smith' } });
  // Insert genres
  const genre1 = await prisma.genre.create({ data: { name: 'Fiction' } });
  const genre2 = await prisma.genre.create({ data: { name: 'Non-fiction' } });
  // Insert books
  const book1 = await prisma.book.create({
    data: {
      title: 'Book 1',
      authorId: author1.id,
      genreId: genre1.id
    }
  });
  const book2 = await prisma.book.create({
    data: {
      title: 'Book 2',
      authorId: author2.id,
      genreId: genre2.id
    }
  });
  // Log the inserted data
  console.log('Inserted authors:', author1, author2);
  console.log('Inserted genres:', genre1, genre2);
  console.log('Inserted books:', book1, book2);
}

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
