async function encurtar() {
  const url = document.getElementById('urlInput').value;
  const btn = document.getElementById('btn-gerar');
  const resContainer = document.getElementById('resultado-container');

  if (!url) return alert("Por favor, cole uma URL!");

  btn.innerText = "Processando...";
  btn.disabled = true;

  try {
    const response = await fetch('/api/links/encurtar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ urlOriginal: url })
    });

    // se não estiver autenticado, manda pro login
    if (response.status === 401) {
      window.location.href = '/login';
      return;
    }

    const data = await response.json();

    if (!response.ok) {
      const msg =
        Array.isArray(data?.errors)
          ? data.errors.map(e => e.message).join('\n')
          : data?.error || 'Erro ao encurtar link';
      alert(msg);
      return;
    }

    if (data.shortCode) {
      const fullLink = `${window.location.origin}/${data.shortCode}`;
      const linkElement = document.getElementById('linkFinal');

      linkElement.href = fullLink;
      linkElement.innerText = fullLink;
      resContainer.style.display = 'block';
    }

  } catch (err) {
    console.error(err);
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

async function logout() {
    try {
        await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    } finally {
        localStorage.removeItem('token');
        window.location.href = '/login';
    }
}

async function carregarDashboard() {
    const token = localStorage.getItem('token');
    // Referências do htmlIntegration.js
    const container = document.getElementById('lista-links');
    const noLinksMsg = document.getElementById('no-links');

    try {
        const response = await fetch('/api/links/listar', {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        });

        const data = await response.json();

        // LIMPE SEMPRE O CONTAINER PRIMEIRO
        container.innerHTML = '';

        if (data.links && data.links.length > 0) {
            noLinksMsg.style.display = 'none';

            data.links.forEach(link => {
                const urlCurta = `${window.location.origin}/${link.shortCode}`;
                // Insere os cards retangulares que você criou
                container.innerHTML += `
                    <div class="link-card-horizontal">
                        <div class="link-content">
                            <span class="url-original-label">Original:</span>
                            <p class="url-original-text" title="${link.urlOriginal}">${link.urlOriginal}</p>
                            <a href="${urlCurta}" target="_blank" class="url-curta-link">${urlCurta}</a>
                        </div>
                        
                        <div class="link-stats">
                            <span class="clicks-badge"><b>${link.clicks || 0}</b> cliques</span>
                        </div>

                        <div class="link-actions">
                            <button class="btn-copy" onclick="copiarLinkDireto('${urlCurta}')">Copiar</button>
                            <button class="btn-del" onclick="deletarLink('${link.id}')">Excluir</button>
                        </div>
                    </div>
                `;
            });
        } else {
            // Se não houver nada, mostra a mensagem de vazio
            noLinksMsg.style.display = 'block';
        }
    } catch (err) {
        console.error("Erro ao carregar dashboard:", err);
    }
}
if (window.location.pathname.includes('dashboard')) {
    document.addEventListener('DOMContentLoaded', carregarDashboard);
}

document.addEventListener('DOMContentLoaded', async () => {
  const modal = document.getElementById('modal-bloqueio');

  try {
    const response = await fetch('/api/links/listar', {
      method: 'GET',
      credentials: 'include'
    });

    if (response.status === 401 || response.status === 403) {
      modal.style.display = 'flex';

      setTimeout(() => {
        window.location.href = '/login';
      }, 1500);

      return;
    }

    modal.style.display = 'none';
  } catch (err) {
    // Se der erro de rede, você decide o comportamento:
    modal.style.display = 'flex';
    console.error(err);
  }
});

async function deletarLink(id) {
    if (!confirm("Tem certeza que deseja excluir este link?")) return; //

    const token = localStorage.getItem('token'); //
    try {
        const res = await fetch(`/api/links/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (res.ok) {
            // Em vez de reload(), chamamos a função que desenha a tela
            carregarDashboard();
        }
    } catch (err) {
        alert("Erro ao excluir.");
    }
}

async function virarVip() {
  try {
    const res = await fetch('/api/billing/vip/checkout', {
      method: 'POST',
      credentials: 'include'
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data?.error || 'Erro ao iniciar pagamento.');
      return;
    }

    window.location.href = data.init_point;
  } catch (err) {
    alert('Erro de conexão com o servidor.');
  }
}