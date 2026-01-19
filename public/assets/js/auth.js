async function doRegister() {
  const user = username.value;
  const mail = email.value;
  const pass = password.value;

  try {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: user, email: mail, password: pass })
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message);
      window.location.href = '/login';
      return;
    }
    const msg =
      Array.isArray(data?.errors)
        ? data.errors.map(e => e.message).join('\n')
        : data?.error
          ? data.error
          : data?.message
            ? data.message
            : 'Erro no cadastro';

    alert(msg);

  } catch (err) {
    alert('Erro de conexão com o servidor.');
  }
}


async function doLogin() {
  const mail = document.getElementById('email').value;
  const pass = document.getElementById('password').value;

  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: mail, password: pass })
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message || 'Login realizado!');
      window.location.href = '/'; 
      return;
    } 
    const msg =
      Array.isArray(data?.errors)
        ? data.errors.map(e => e.message).join('\n')
        : data?.error
        ? data.error
        : data?.message
        ? data.message
        : 'Erro no login';

    alert(msg);
  } catch (err) {
    console.error("Erro no fetch:", err);
  }
}