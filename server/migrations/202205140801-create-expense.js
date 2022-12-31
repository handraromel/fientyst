module.exports = {
  async up(db) {
    await db.createCollection("expenses");
  },
  async down(db) {
    await db.collection("expenses").drop();
  },
};
