const Usuario = require("../model/usuario");

module.exports = {
    async pagInicialGet(req, res) {
        if (req.session.edv) {
            return res.redirect('/inicio');
        }
        res.render('../views/index', { pp: 0, ppp: 0 });
    },

    async pagInicialPost(req, res) {
        const { nome, edv } = req.body;

        try {
            const usuario2 = await Usuario.findOne({
                where: { nome },
            });

            if (!usuario2) {
                return res.render('../views/index', { pp: 0, ppp: 1 });
            }

            if (usuario2.Edv == edv) {
                req.session.edv = usuario2.Edv;
                return res.redirect('/inicio');
            }

            return res.render('../views/index', { pp: 1, ppp: 0 });
        }
        catch (err) {
            console.error('Erro ao buscar o usuário:', err);
            return res.status(500).json({ message: 'Erro no servidor!' });
        }
    }
};
