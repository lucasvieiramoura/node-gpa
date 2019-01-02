'use strict'

const ValidationContrat = require('../validators/fluent-validator');
const repository = require('../repositories/customer-repository');

exports.post = async (req, res, next)=> {
    let contrat = new ValidationContrat();
    contrat.hasMinLen(req.body.name, 3, 'O titulo deve conter pelo menos 3 caracteres');
    contrat.isEmail(req.body.email, 'E-mail inválido');
    contrat.hasMinLen(req.body.password, 6, 'A senha deve conter no mínimo 6 caracteres');

    //Se os dados forem inválidos
    if (!contrat.isValid()){
        res.status(400).send(contrat.errors()).end();
        return;
    }

    try{
        await repository.create(req.body);
        res.status(201).send({
            message: 'Cliente cadastrado com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};

exports.put = async (req, res, next)=> {
    try{
        await repository.update(req.params.id, req.body);
            res.status(200).send(
            {message: 'Produto altualizado com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }     
};