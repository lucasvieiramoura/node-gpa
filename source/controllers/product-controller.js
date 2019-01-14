'use strict'

const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const ValidationContrat = require('../validators/fluent-validator');
const repository = require('../repositories/product-repository');
const azure = require('azure-storage');
const guid = require('guid');
const config = require('../config');

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

exports.getByTag = async (req, res, next) => {
    try{
        var data = await repository.getByTag(req.params.tag);
        res.status(200).send(data)
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
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
        //Cria o Blob Service
        const blobSvc = azure.createBlobService(config.containerConnectionString);

        let filename = guid.raw().toString() + '.jpg';
        let rawdata = req.body.image;
        let matches = rawdata.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        let type = matches[1];
        let buffer = new Buffer(matches[2], 'base64');

        //Salva a imagem
        await blobSvc.createBlockBlobFromText('product-images', filename, buffer, {
            contentType: type
        }, function (error, result, response) {
            if(error){
                filename = "default-product.png"
            }
        });      
        

        await repository.create({
            title: req.body.title,
            slug: req.body.slug,
            description: req.body.description,
            price: req.body.price,
            active: true,
            tag: req.body.tag,
            image: 'https://nodegpa.blob.core.windows.net/product-images/' + filename

        });
        res.status(201).send({
            message: 'Produto cadastrado com sucesso!'
        });
    } catch (e) {
        console.log(e)
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

exports.delete = async (req, res, next)=> {
    try {
        await repository.delete(req.body.id)
            res.status(200).send(
                {message: 'Produto removido com sucesso!'
            });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }  
};