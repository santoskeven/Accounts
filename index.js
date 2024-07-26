const fs = require('fs');
const inquirer = require('inquirer');
const chalk = require('chalk');



//  A FUNÇÃO OPERATION É RESPONSÁVEL POR FORNECER AS OPÇÕES DE AÇÕES PARA O USUÁRIO

Operation()

function Operation(){

    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'O que deseja fazer?',
            choices: ['Criar Conta', 'Consultar Saldo', 'Depositar', 'Sacar', 'Sair']
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
               Sair()
            break;
        }

    }).catch(err => console.log(err))

}

//FUNÇÃO RESPONSÁVEL PELA CRIAÇÃO DA CONTA DO USUÁRIO
function CriarConta(){

    inquirer.prompt([
        {
            name: 'account',
            message: 'Qual o nome da sua conta?'
        }
    ]).then((answer) => {

        const AccountName = answer['account']

        if(!fs.existsSync('./accounts')){
            fs.mkdirSync('accounts')
        }

        if(fs.existsSync(`./accounts/${AccountName}.json`)){
            console.log(chalk.bgRed('Nome indisponivel!!'))
            return CriarConta()
        }

        fs.writeFileSync(`./accounts/${AccountName}.json`, '{"balance": 0}', function(err){console.log(err)})

        console.log(chalk.bgGreen('Conta criada com sucesso'))

        return Operation()

    }).catch(err => console.log(err))

}


//FUNÇÃO PARA CONSUTAR SALDO DA CONTA
function ConsultarSaldo(){
    
    inquirer.prompt([
        {
            name: 'account',
            message: 'Digite o nome da sua conta'
        }
    ]).then((answer) => {

        const AccountName = answer['account']

        if(!CheckAccount(AccountName)){
            return ConsultarSaldo()
        }

        const AccountData = PegarConta(AccountName)

        console.log(`Seu saldo é de ${AccountData.balance}`)

        return Operation()

    }).catch(err => console.log(err))

}


//FUNÇÃO PARA DEPOSITAR UM VALOR NA CONTA DO CLIENTE
function Depositar(){

    inquirer.prompt([
        {
            name: 'account',
            message: 'Digite o nome da sua conta'
        }
    ]).then((answer) => {

       const AccountName = answer['account']

       if(!CheckAccount(AccountName)){
            return Depositar()
        }
        
        inquirer.prompt([
            {
                name: 'amount',
                message: 'Quanto deseja depositar?'
            }
        ]).then((answer) => {

            const amount = answer['amount']

            const AccountData = PegarConta(AccountName)

            if(!amount){
                console.log('Digite um valor para depositar')
                return Depositar()
            }


            AccountData.balance = parseFloat(AccountData.balance) + parseFloat(amount)

            fs.writeFileSync(`./accounts/${AccountName}.json`,
                JSON.stringify(AccountData),
                function(err){console.log(err)}
            )

            console.log(chalk.bgBlue(`Você depositou ${amount} na sua conta`))

            return Operation()

        })

    }).catch(err => console.log(err))

}


//FUNÇÃO PARA SACAR UM VALOR NA CONTA DO USUÁRIO
function Sacar(){

    inquirer.prompt([
        {
            name: 'account',
            message: 'Digite o nome da sua conta'
        }
    ]).then((answer) => {

        const AccountName = answer['account']

        if(!CheckAccount(AccountName)){
            return Sacar()
        }

        inquirer.prompt([
            {
                name: 'amount',
                message: 'Digite o valor que deseja sacar'
            }
        ]).then((answer) => {

            const amount = answer['amount']

            const AccountData = PegarConta(AccountName);

            if(!amount){
                console.log(chalk.bgRed('digite um valor para sacar'))
            }

            if(AccountData.balance < amount){
                console.log(chalk.bgRed('valor indisponivel para saque'));
                return Sacar()
            }

            AccountData.balance = parseFloat(AccountData.balance) - parseFloat(amount)

            fs.writeFileSync(`./accounts/${AccountName}.json`,
                JSON.stringify(AccountData),
                function(err){console.log(err)}
            )

            console.log(chalk.bgGreen(`Você sacouj ${amount} da sua conta`))

            return Operation()

        }).catch(err => console.log(err))

    }).catch(err => console.log(err))

}


//FUNÇÃO AUXILIAR PARA PEGAR O NOME DE UMA CONTA
function PegarConta(AccountName){

    const AccountJson = fs.readFileSync(`./accounts/${AccountName}.json`)

    return JSON.parse(AccountJson)

}


//FUNÇÃO PARA VERIFICAR SE UMA CONTA EXISTE OU NÃO
function CheckAccount(AccountName){

    if(!fs.existsSync(`./accounts/${AccountName}.json`)){
        console.log(chalk.bgRed('essa conta não existe, tente novamente'))
        return false;
    }
    return true
}


//FUNÇÃO PARA SAIR ENCERAR O PROGRAMA 
function Sair(){

    inquirer.prompt([
        {
            type: 'list',
            name: 'action', 
            message: 'Deseja limpar o registro do sistema?',
            choices: ['Sim', 'Não']
        }
    ]).then((answer) => {

        const action = answer['action']

        switch(action){
            case 'Sim':
                console.clear()
                console.log('Obrigado por usar o Accounts, até a próxima')
                process.exit()
            break;
            case 'Não':
                console.log('Obrigado por usar o Accounts, até a próxima')
                process.exit()
            break;
        }

    }).catch(err => console.log(err))

}