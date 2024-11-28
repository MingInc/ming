export async function SaveUserToDB(user) {
  const response = await fetch(`http://localhost:3000/api/v1/user`, {
    method: "POST",
    body: JSON.stringify(user),
  });

  const data = await response.json();
  return data;
}

