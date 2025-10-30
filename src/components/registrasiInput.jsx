export default function RegistrasiInput({
  handleRegister,
  state,
  handleFormChange,
}) {
  return (
    <>
      <form onSubmit={handleRegister} className="input-register">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" onChange={handleFormChange} />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={state.email}
          onChange={handleFormChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={state.password}
          onChange={handleFormChange}
        />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          onChange={handleFormChange}
          value={state.confirmPassword}
        />
        <button type="submit">Register</button>
      </form>
    </>
  );
}
