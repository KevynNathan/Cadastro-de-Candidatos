class Pessoa{

    constructor(nome, sobrenome, cpf, nasc, vaga){
        this.nome_completo = {
            'nome': nome,
            'sobrenome': sobrenome
        };
        this.cpf = cpf;
        this.nasc = nasc;
        this.vaga = vaga;
    }

}

function analisa_cpf(cadastro, cpf){
    if(cadastro.cpf == cpf){
        return false;
    }

    return true;
}

$(document).ready(function(){

    var cadastros = [];
    var i = 0;
    
    $('.formulario').submit(function(e){

        var nome = $('#nome').val();
        var sobrenome = $('#sobrenome').val();
        var cpf = $('#cpf').val();
        var nasc = $('#data-nasc').val();
        var vaga = $('#vaga').val();

        try{

            if(i > 9){
                throw "Número máximo de participantes excedido!";
            }
            if(!nome){
                throw "Nome é um campo obrigatório!";
            }
            if(!sobrenome){
                throw "Sobrenome é um campo obrigatório";
            }
            if(!cpf){
                throw "CPF é um campo obrigatório!";
            }
            if(!nasc){
                throw "Data de nascimento é um campo obrigatório!";
            }
            for(j = 0; j < i; j++){
                if(!analisa_cpf(cadastros[j], cpf)){
                    throw "Cadastro já realizado!";
                }
            }
            

            cadastros[i] = new Pessoa(
                nome,
                sobrenome,
                cpf,
                nasc,
                vaga
            );

            var nome_vaga = "";

            switch(cadastros[i].vaga){
                case 'vaga1':
                    nome_vaga = "Desenvolvedor Júnior"
                    break;
                case 'vaga2':
                    nome_vaga = "Desenvolvedor Pleno"
                    break;
                case 'vaga3':
                    nome_vaga = "Desenvolvedor Sênior"
                    break;
                default:
                    nome_vaga = ""
                    break;
            }

            var idade = (new Date().getFullYear()) - (new Date(cadastros[i].nasc)).getFullYear();

            $('#tabela > tbody:last-child').append(`
            <tr> 
                <td>${i+1}</td> 
                <td>${cadastros[i].nome_completo.nome + " " + cadastros[i].nome_completo.sobrenome}</td>
                <td>${(cadastros[i].cpf).replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")}</td> 
                <td>${cadastros[i].nasc}</td> 
                <td>${idade}</td>
                <td>${idade >= 18? "Sim": "Não"}</td>  
                <td>${nome_vaga}</td>  
            </tr>`)

            i++;

        } catch(error){
            alert(error);
        }

        e.preventDefault();

    })

    $('#btn-inscricao').click(function(){

        if(cadastros.length > 0 ){
            alert("Usuários cadastrados com sucesso!");
            window.location.reload();
        } else{
            alert("Nenhum usuário inserido na lista de cadastro!");
        }
    })

});