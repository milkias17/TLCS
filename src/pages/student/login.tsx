export default function Login() {
  return (
    <form action="/api/login" method="post">
      <label htmlFor="email">Email</label>
      <input type="email" id="email" name="email" required />
      <label htmlFor="password">Password</label>
      <input type="password" id="password" name="password" required />
    </form>
  );
}
