const GrupoUsuario = require("../model/grupousuario");
const Grupo = require("../model/grupo");
const Usuario = require("../model/usuario");
// var session = require("express-session");

module.exports = {
    async pagInicialGet(req, res) {
        res.render('../views/index', { pp: 0, ppp: 0 });
    },

    async pagInicialPost(req, res) {
        const session = req.session;

        const { nome, edv } = req.body;

        try {
            const usuario2 = await Usuario.findOne({
                where: { nome },
            });

            if (!usuario2) {
                res.render('../views/index', { pp: 0, ppp: 1 });
            } else {
                if (usuario2.Edv == edv) {
                    session.usuario2 = usuario2;
                    session.edv = edv;
                    res.redirect('/inicio');
                } else {
                    res.render('../views/index', { pp: 1, ppp: 0 });
                }
            }
        }
        catch (err) {
            console.error('Erro ao buscar o usuário:', err);
            res.status(500).json({ message: 'Erro no servidor!' });
        }
    }
}
