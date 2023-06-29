<?php
/**
 * Created by PhpStorm.
 * User: diogoazevedo
 * Date: 23/11/15
 * Time: 22:30
 */

namespace App\Http\Services;


use App\Repositories\SigepeRepository;
use PhpSigep\Bootstrap;
use PhpSigep\Config;
use PhpSigep\Model\AccessData;
use PhpSigep\Model\AccessDataHomologacao;
use PhpSigep\Model\Destinatario;
use PhpSigep\Model\DestinoNacional;
use PhpSigep\Model\Dimensao;
use PhpSigep\Model\Etiqueta;
use PhpSigep\Model\ObjetoPostal;
use PhpSigep\Model\PreListaDePostagem;
use PhpSigep\Model\Remetente;
use PhpSigep\Model\ServicoAdicional;
use PhpSigep\Model\ServicoDePostagem;
use PhpSigep\Pdf\CartaoDePostagem2016;
use PhpSigep\Pdf\CartaoDePostagem2018;
use PhpSigep\Services\Real\SolicitaEtiquetas;
use PhpSigep\Services\SoapClient\Real;

class SigepeService
{




    public function store($data)
    {

        $accessDataParaAmbienteDeHomologacao =  new AccessDataService();

        $config = new Config;
        $config->setAccessData($accessDataParaAmbienteDeHomologacao);
        $config->setEnv(Config::ENV_PRODUCTION);
        $config->setCacheOptions(array('storageOptions' => array('enabled' => true,'ttl' => 60*60*24*7,'cacheDir' => sys_get_temp_dir(),)));

        Bootstrap::start($config);

        // ***  DADOS DA ENCOMENDA QUE SERÁ DESPACHADA *** //

        if ($data['dimensao'] == 1){
            $dimensao = new Dimensao;
            $dimensao->setAltura(15);
            $dimensao->setLargura(27);
            $dimensao->setComprimento(23);
            $dimensao->setDiametro(0);
            $dimensao->setTipo(Dimensao::TIPO_PACOTE_CAIXA);
        }

        $destinatario = new Destinatario();
        $destinatario->setNome($data['destinatario']);
        $destinatario->setLogradouro($data['address']);
        $destinatario->setNumero($data['number']);
        $destinatario->setComplemento($data['complement']);
        $destinatario->setBairro($data['neighborhood']);
        $destinatario->setCep($data['zipcode']);
        $destinatario->setCidade($data['city']);
        $destinatario->setUf($data['state']);


        $destino = new DestinoNacional;
        $destino->setBairro($data['neighborhood']);
        $destino->setCep($data['zipcode']);
        $destino->setCidade($data['city']);
        $destino->setUf($data['state']);


        $etiquetas = new SolicitaEtiquetas;
        $params    = new \PhpSigep\Model\SolicitaEtiquetas(array(
            'qtdEtiquetas'      => 1,
            'servicoDePostagem' => new ServicoDePostagem(ServicoDePostagem::SERVICE_SEDEX_CONTRATO_AGENCIA_03220),
            'accessData'        => new AccessData(array(
                'cnpjEmpresa' => '39.887.330/0001-86',
                'usuario'     => '39887330',
                'senha'       => '4ffe0o',
            ))
        ));
        $params->setAccessData($accessDataParaAmbienteDeHomologacao);

        $result =  $etiquetas->execute($params);
        $etiqueta_retornada = $result->getResult()[0]->get('etiquetaSemDv');

        $etiqueta = new Etiqueta;
        $etiqueta->setEtiquetaSemDv($etiqueta_retornada);
        $etiqueta_salvar = $etiqueta->getEtiquetaComDv();



        $servicoAdicional = new ServicoAdicional;
        $servicoAdicional->setCodigoServicoAdicional(ServicoAdicional::SERVICE_REGISTRO);
        // Se não tiver valor declarado informar 0 (zero)
        $servicoAdicional->setValorDeclarado(0);

        $encomenda = new ObjetoPostal;
        $encomenda->setServicosAdicionais(array($servicoAdicional));
        $encomenda->setDestinatario($destinatario);
        $encomenda->setDestino($destino);
        $encomenda->setDimensao($dimensao);
        $encomenda->setEtiqueta($etiqueta);
        $encomenda->setPeso(0.900);// 500 gramas
        $encomenda->setServicoDePostagem(new ServicoDePostagem(ServicoDePostagem::SERVICE_SEDEX_CONTRATO_AGENCIA_03220));



        $remetente = new Remetente;
        $remetente->setNome('CCB');
        $remetente->setLogradouro('Rua Aleixo Netto');
        $remetente->setNumero('1226');
        $remetente->setComplemento('loja 2');
        $remetente->setBairro('Praia do Canto');
        $remetente->setCep('29055-260');
        $remetente->setUf('ES');
        $remetente->setCidade('Vitoria');

        $plp = new PreListaDePostagem;
        $plp->setAccessData(new AccessDataHomologacao);
        $plp->setEncomendas(array($encomenda));
        $plp->setRemetente($remetente);


        $phpSigep = new Real;
        $phpSigep->fechaPlpVariosServicos($plp);


        $logoFile = public_path('img/logo.png');


        $layoutChancela = array();
        $pdf = new CartaoDePostagem2018($plp, time(), $logoFile, $layoutChancela);
        $pdf->render('F', 'sigepe/'.$etiqueta_salvar.'.pdf');
        /*

        ;
        $pdf = new CartaoDePostagem2016($plp, time(), $logoFile, $layoutChancela);
        $pdf->render('F', 'sigepe/'.$etiqueta_salvar.'.pdf');
        */

        return $etiqueta_salvar;
    }


}
