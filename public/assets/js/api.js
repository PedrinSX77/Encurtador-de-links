async function encurtar() {
    const token = localStorage.getItem('token');
    const url = document.getElementById('urlInput').value;
    const btn = document.querySelector('button');
    const resContainer = document.getElementById('resultado-container');

    if (!url) return alert("Por favor, cole uma URL!");

    btn.innerText = "Processando...";
    btn.disabled = true;

    try {
        const res = await fetch('/encurtar', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ urlOriginal: url })
    });

        const data = await res.json();

        if (data.shortCode) {
            const fullLink = window.location.origin + '/' + data.shortCode;
            const linkElement = document.getElementById('linkFinal');

            linkElement.href = fullLink;
            linkElement.innerText = fullLink;
            resContainer.style.display = 'block';
        }
    } catch (err) {
        alert("Erro ao conectar com o servidor.");
    } finally {
        btn.innerText = "Gerar Link Curto";
        btn.disabled = false;
    }
}

function copiarLink() {
    const link = document.getElementById('linkFinal').innerText;
    navigator.clipboard.writeText(link).then(() => {
        const btn = document.querySelector('.btn-copy');
        btn.innerText = "Copiado!";
        btn.style.background = "#22c55e"; 
        
        setTimeout(() => {
            btn.innerText = "Copiar";
            btn.style.background = "#38bdf8";
        }, 2000);
    });
}

function logout() {
    localStorage.removeItem('token');
    window.location.href = '/auth/login';
}

document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    const modal = document.getElementById('modal-bloqueio');

    if (!token) {
        modal.style.display = 'flex'; 
        
        setTimeout(() => {
            if(!token) window.location.href = '/auth/login/';
        }, 3000);
    }
});