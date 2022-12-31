module.exports = {
  async up(db) {
    await db.createCollection("budgets");
  },
  async down(db) {
    await db.collection("budgets").drop();
  },
};
