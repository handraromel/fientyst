module.exports = {
  async up(db) {
    await db.createCollection("savings");
  },
  async down(db) {
    await db.collection("savings").drop();
  },
};
