export {};

// JS
function proc(d) {
  return d.map((x) => x.n);
}

function extractCustomerNames(customers: Customer[]) {
  return customers.map((customer) => customer.name);
}

// Destructured options parameters
interface User {
  id: number;
  name: string;
  role: "admin" | "user" | "guest";
  active: boolean;
}

interface FetchUsersOptions {
  page?: number;
  pageSize?: number;
  role?: "admin" | "user" | "guest";
  includeInactive?: boolean;
}

// ❌ Avoid: positional params are easy to mix up, hard to make optional,
//    and give no hint at the call site what each argument means
async function fetchUsersOrdered(
  page: number,
  pageSize: number,
): Promise<User[]> {
  const response = await fetch(`/users?page=${page}&pageSize=${pageSize}`);
  return response.json();
}

// Caller has no idea what true/undefined mean without reading the signature
const result = await fetchUsers_BAD(1, 20);

// ✅ Prefer: destructured options
async function fetchUsers({
  page = 1,
  pageSize = 20,
  role,
  includeInactive = false,
}: FetchUsersOptions = {}): Promise<User[]> {
  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
    ...(role && { role }),
    ...(includeInactive && { includeInactive: "true" }),
  });
  const response = await fetch(`/users?${params}`);
  return response.json();
}

// All options are named and optional — no positional guessing
const admins = await fetchUsers({ role: "admin", pageSize: 50 });
const allUsers = await fetchUsers({ includeInactive: true });
const defaults = await fetchUsers();

/*
  TypeScript declarations in fetchUsers:

  { page = 1, pageSize = 20, ... }: FetchUsersOptions
    — Unpacks the options object. The `: FetchUsersOptions` annotation tells
      TypeScript which properties are valid and their types, giving autocomplete
      and a type error if you pass an unknown key like `{ pages: 1 }`.

  = {}
    — Default value for the entire options argument, so calling fetchUsers()
      with no argument is valid instead of requiring fetchUsers({}).

  : Promise<User[]>
    — Return type annotation. TypeScript verifies that what the function returns
      matches the User shape, catching mismatches between the API response type
      and how callers use the result.
*/

// don't use any type

function updateUser(user: any) {}
