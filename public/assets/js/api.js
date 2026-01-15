async function encurtar() {
    const url = document.getElementById('urlInput').value;
    const btn = document.querySelector('button');
    const resContainer = document.getElementById('resultado-container');

    if (!url) return alert("Por favor, cole uma URL!");

    btn.innerText = "Processando...";
    btn.disabled = true;

    try {
        const res = await fetch('/encurtar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
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
    navigator.clipboard.writeText(link);
    alert("Copiado para a área de transferência!");
}