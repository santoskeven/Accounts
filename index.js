const fs = require('fs');
const inquirer = require('inquirer');
const chalk = require('chalk');

Operation()

function Operation(){

    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'O que deseja fazer?',
            Choices: ['Criar Conta', 'Consultar Saldo', 'Depositar', 'Sacar', 'Sair']
        }
    ]).then((answer) => {

        const action = answer['action']

        switch(action){
            case 'Criar Conta':
                CriarConta()
            break;
            case 'Consultar Saldo':
                ConsultarSaldo()
            break;
            case 'Depositar':
                Depositar()
            break;
            case 'Sacar':
                Sacar()
            break;
            case 'Sair':
                process.exit()
            break;
        }

    }).catch(err => console.log(err))

}

