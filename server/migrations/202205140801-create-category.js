module.exports = {
  async up(db) {
    await db.createCollection("categories");
  },
  async down(db) {
    await db.collection("categories").drop();
  },
};
