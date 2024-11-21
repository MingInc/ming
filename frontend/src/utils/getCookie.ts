export const getCookie = (name: string): string | undefined => {
  const cookies = document.cookie.split("; ");
  const found = cookies.find((row) => row.startsWith(`${name}=`));
  return found ? found.split("=")[1] : undefined;
};
