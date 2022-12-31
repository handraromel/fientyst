module.exports = {
  async up(db) {
    await db.createCollection("payment-methods");
  },
  async down(db) {
    await db.collection("payment-methods").drop();
  },
};
