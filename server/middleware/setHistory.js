import administratorAdapter from "../adapters/adminAdapter.js";
async function setHistory(req, res, next) {
  try {
    if (req.body.action) {
      if (req.body.action === "Find") {
        await administratorAdapter.addAction(
          `Http request to search for a contact ${req.body.fullName}`,
          new Date()
        );
      }

      if (req.body.action === "Add") {
        await administratorAdapter.addAction(
          `Http request to create a contact ${req.body.fullName}`,
          new Date()
        );
      }
      if (req.body.action === "Delete") {
        await administratorAdapter.addAction(
          `Http request to delete a contact ${req.body.fullName}`,
          new Date()
        );
      }
      if (req.body.action === "Edit") {
        await administratorAdapter.addAction(
          `Http request to update a contact ${req.body.fullName}`,
          new Date()
        );
      }

      // await administratorAdapter.addAction(
      //   `Http: ${req.body.action} ${req.body.fullName}`,
      //   new Date()
      // );
    }

    next();
  } catch (error) {
    console.log(error);
    next();
  }
}

export { setHistory };
