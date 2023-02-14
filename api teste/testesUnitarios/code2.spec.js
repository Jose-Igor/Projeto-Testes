const Contato = require('../src/models/ContatoModel');
const mongoose = require('mongoose');
const { loginRequired } = require('../src/middlewares/middleware');
require('dotenv').config();

describe('Editar contato com campo nome vazio', () => {
    let contatoId;
  
    beforeAll( () => {
        mongoose.connect(process.env.CONNECTIONSTRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    });
  
    afterAll(async () => {
      await mongoose.connection.close();
    });
  
    it('Deve editar um contato com sucesso', async () => {
      const contato = new Contato({
        nome: 'Testa',
        sobrenome: 'Dor',
        email: 'teste@gmail.com',
        telefone: '12345678',
      });
  
      await contato.register();
      contatoId = contato.contato._id;
  
      const contatoEditado = new Contato({
        nome: '',
        sobrenome: 'Tado',
        email: 'editado@gmail.com',
        telefone: '87654321',
      });
  
      await contatoEditado.edit(contatoId);
  
      expect(contatoEditado.errors.length).toBe(0);
    });
  
    afterEach(async () => {
      await Contato.delete(contatoId);
    });
});

describe('editando contato com email invalido', () => {
  it('adiciona erro ao array de erros quando email inválido é informado', async () => {
    const contato = new Contato({
      nome: 'Test',
      email: 'invalid_email'
    });

    await contato.edit('test_id');

    expect(contato.errors).toContain('E-mail inválido');
  });
});


describe('Editar contato com campo telefone vazio', () => {
  let contatoId;

  beforeAll(async () => {
    await mongoose.connect(process.env.CONNECTIONSTRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('Deve editar um contato com sucesso', async () => {
    const contato = new Contato({
      nome: 'Testa',
      sobrenome: 'Dor',
      email: 'teste@gmail.com',
      telefone: '',
    });

    await contato.register();
    contatoId = contato.contato._id;

    const contatoEditado = new Contato({
      nome: 'Ed',
      sobrenome: 'Tado',
      email: 'editado@gmail.com',
      telefone: '',
    });

    await contatoEditado.edit(contatoId);

    expect(contatoEditado.errors.length).toBe(0);
  });

  afterEach(async () => {
    await Contato.delete(contatoId);
});
});

describe('Editar contato com campo email vazio', () => {
    let contatoId;
  
    beforeAll(async () => {
      await mongoose.connect(process.env.CONNECTIONSTRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    });
  
    afterAll(async () => {
      await mongoose.connection.close();
    });
  
    it('Deve editar um contato com sucesso', async () => {
      const contato = new Contato({
        nome: 'Testa',
        sobrenome: 'Dor',
        email: '',
        telefone: '12345678',
      });
  
      await contato.register();
      contatoId = contato.contato._id;
  
      const contatoEditado = new Contato({
        nome: 'Ed',
        sobrenome: 'Tado',
        email: '',
        telefone: '87654321',
      });
  
      await contatoEditado.edit(contatoId);
  
      expect(contatoEditado.errors.length).toBe(0);
    });
  
    afterEach(async () => {
      await Contato.delete(contatoId);
    });
});

const express = require("express");

const app = express();
app.use("/contato/edit/:id", loginRequired);

describe('Test loginRequired middleware', () => {
  test('should redirect to login page if user is not logged in', (done) => {
    const req = {
      session: {
        user: null
      },
      flash: jest.fn()
    };
    const res = {
      redirect: jest.fn()
    };

    loginRequired(req, res, () => {});

    expect(req.flash).toHaveBeenCalledWith('errors', 'Você precisa fazer login.');
    expect(res.redirect).toHaveBeenCalledWith('/');
    done();
  });

});
