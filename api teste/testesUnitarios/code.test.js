const {register} = require('../src/controllers/loginController');

describe('register', () => {
  it('seta uma mensagem de erro', async () => {
    const req = {
      body: { password: 'password' },
      flash: jest.fn(),
      session: {
        save: jest.fn(),
      },
    };
    const res = {
      redirect: jest.fn(),
    };
  
    await register(req, res);
  
    expect(req.flash).toHaveBeenCalledWith('erros', [
      'A senha deve conter números, letras e caracteres especiais.',
    ]);
  });
});
