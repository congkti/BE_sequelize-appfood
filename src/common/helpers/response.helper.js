export const responseSuccess = (
  metaData = null,
  message = `oke`,
  code = 200,
  status = `success`
) => {
  return {
    status: status,
    code: code,
    message: message,
    metaData: metaData,
    doc: `api.example.com`,
  };
};

export const responseError = ({
  message = "Internal Server Error",
  code = 500,
  stack = null,
}) => {
  return {
    status: `error`,
    code: code,
    message: message,
    stack: stack,
  };
};
