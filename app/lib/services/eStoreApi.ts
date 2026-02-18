const API_BASE_URL = 'http://localhost:3002';

type CreateUserPayload = {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  gender: string;
  email: string;
};  

export async function fetchUsers() {
  const res = await fetch(`${API_BASE_URL}/users/user`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
}

export async function createUsers(payload:CreateUserPayload ) {
  const res = await fetch(`${API_BASE_URL}/users/create`, {
    method: 'POST',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error('Failed to create user');
  return res.json();
}