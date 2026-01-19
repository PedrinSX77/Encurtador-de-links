const db = require('../../db');
const { MercadoPagoConfig, Preference} = require('mercadopago');

const mpClient = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN
});

const preference = new Preference(mpClient);
exports.createCheckoutSession = async (req, res) => {
    try{
        const userId = req.user.id;
        const amount = Number(process.env.VIP_PRICE);

        //criar ordem no banco de dados
        const [result] = await db.execute(
            'INSERT INTO orders (userId, type, status, amount) VALUES (?, ?, ?, ?)',
            [userId, 'VIP', 'pending', amount]
        )

        const orderId = result.insertId;

        // Criar Checkout no Mercado Pago

        const mpResponse = await preference.create({
            body: {
                items: [
                    {
                        title: 'Assinatura VIP',
                        quantity: 1,
                        unit_price: amount,
                        currency_id: 'BRL',
                    }
                ],
                external_reference: String(orderId),
                back_urls: {
                    success: `${process.env.APP_URL}/vip/sucesso`,
                    failure: `${process.env.APP_URL}/vip/erro`,
                    pending: `${process.env.APP_URL}/vip/pendente`
                },
                notification_url: `${process.env.APP_URL}/webhook/mercadopago`
            }
        });

        //Salvar preferenceId no banco de dados
        await db.execute(
            'UPDATE orders SET mpPreferenceId = ? WHERE id = ?',
            [mpResponse.id, orderId]
        );

        // Retornar a URL de checkout para o frontend
        res.json({checkoutUrl: mpResponse.init_point});
    } catch (error) {
        console.error('Erro ao criar sessão de checkout:', error);
        res.status(500).json({error: 'Erro ao criar sessão de checkout'});
    }
}