import ErrorPage from "../../components/shared/ErrorPage";

export default function ErrorPage503() {
  return (
    <ErrorPage
      errorConfig={{
        code: "503",
        title: "Service Unavailable",
        message: "We're temporarily down for maintenance.",
      }}
    />
  );
}
