'use strict'

const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const ValidationContrat = require('../validators/fluent-validator');
const repository = require('../repositories/product-repository');

exports.get = async(req, res, next) => {
   try {
       var data = await repository.get();
       res.status(200).send(data);
   } catch (e) {
       res.status(500).send({
           message: 'Falha ao processar sua requisição'
       });
   }
}

exports.getBySlug = async (req, res, next) => {
    try{
    var data = await repository.getBySlug(req.params.slug);
    res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.getById = async (req, res, next) => {
    try{
        var data = await repository.getById(req.params.id);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};

exports.getByTags = async (req, res, next) => {
    try{
        var data = await repository.getByTags(tags);
        res.status(200).send(data)
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
    
    repository
        .getByTags(req.params.tags)
        .then(data => {
            res.status(201).send(data);
        }).catch(e => {
            res.status(400).send(e);
        });
};

exports.post = async (req, res, next)=> {
    let contrat = new ValidationContrat();
    contrat.hasMinLen(req.body.title, 3, 'O titulo deve conter pelo menos 3 caracteres');

    //Se os dados forem inválidos
    if (!contrat.isValid()){
        res.status(400).send(contrat.errors()).end();
        return;
    }

    try{
        await repository
        .create(req.body);
        res.status(201).send({
            message: 'Produto cadastrado com sucesso!'
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

exports.delete = (req, res, next)=> {
    repository.delete(req.body.id)
        .then(x => {
            res.status(200).send(
                {message: 'Produto removido com sucesso!'
            });
        }).catch(e => {
            res.status(400).send({ 
                message: 'Falha ao remover produto',
                data: e
            });
        });
};