module.exports = {
  async up(db) {
    await db.createCollection("incomes");
  },
  async down(db) {
    await db.collection("incomes").drop();
  },
};
