exports.get404 = (req, res, next) => {
  res.status(404).render("error", {
    errorData: { message: "Error (404): Page not found" },
    pageTitle: "An error occured!",
    path: "/error",
  });
};

exports.getErrorPage = (error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Unexpected error!";

  console.log(error); // DEBUGGING
  res.status(status).render("error", {
    errorData: {
      message: `Error (${status}): ${message}`,
    },
    pageTitle: "An error occured!",
    path: "/error",
  });
};
