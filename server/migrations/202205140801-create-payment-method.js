module.exports = {
  async up(db) {
    await db.createCollection("paymentmethods");
  },
  async down(db) {
    await db.collection("paymentmethods").drop();
  },
};
