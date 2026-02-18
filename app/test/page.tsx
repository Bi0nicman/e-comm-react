import { fetchUsers } from '../lib/services/eStoreApi';

export default async function Page() {
  const users = await fetchUsers();
  return <pre>{JSON.stringify(users, null, 2)}</pre>;
}
