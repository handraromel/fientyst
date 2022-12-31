module.exports = {
  async up(db) {
    await db.createCollection("merchants");
  },
  async down(db) {
    await db.collection("merchants").drop();
  },
};
