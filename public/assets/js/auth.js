async function doRegister() {
    const user = username.value;
    const mail = email.value;
    const pass = password.value;

    try {
        const response = await fetch('/auth/register', { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: user, email: mail, password: pass })
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message);
            window.location.href = '/auth/login';
        } else {
            alert(data.error || "Erro no cadastro");
        }
    } catch (err) {
        alert("Erro de conexão com o servidor.");
    }
}

async function doLogin() {
    const mail = document.getElementById('email').value;
    const pass = document.getElementById('password').value;

    try {
        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: mail, password: pass })
        });

        const data = await response.json();

        if (response.ok && data.token) {
            localStorage.setItem('token', data.token);
            console.log("TOKEN GRAVADO NO STORAGE!");
            window.location.href = '/';
        } else {
            console.error("O servidor não enviou o campo 'token'. Verifique o Controller.");
            alert("Erro crítico: Token não recebido.");
        }

    } catch (err) {
        console.error("Erro no fetch:", err);
    }
}