export const verifyUser = async () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  const res = await fetch("/login/verifyUser", {
    method: "POST",
    headers: {
      Authorization: token,
    },
  });
  return res.json();
};
