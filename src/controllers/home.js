const grupousu = require("../model/grupousuario");
const grupo = require("../model/grupo");
const usuario = require("../model/usuario");

module.exports = {
    async pagInicialGet(req, res) {
        res.render('../views/index', { pp: 0, ppp: 0 });
    },

    async pagInicialPost(req, res) {
        const { nome, edv } = req.body;

        try {
            const usuario2 = await usuario.findOne({
                where: { nome },
            });

            if (!usuario2) {
                // res.redirect('/#login')
                res.render('../views/index', { pp:0, ppp: 1 });
            } else {
                if (usuario2.Edv == edv) {
                    res.redirect('/inicio');
                    pp = 0;
                } else {
                    res.render('../views/index', { pp:1, ppp:0});
                }
                ppp = 0;
            }



        }
        catch (err) {
            console.error('Erro ao buscar o usuário:', err);
            res.status(500).json({ message: 'Erro no servidor!' });
        }
    }
}
