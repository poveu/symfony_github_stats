<?php
namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

use App\Service\ApiGateway;

class RepoData
{

    private $apiGateway;
    public function __construct(ApiGateway $apiGateway)
    {
        $this->apiGateway = $apiGateway;
    }
    
    /**
    * @Route("/repo")
    * @Route("/repo/{path}", requirements={"path"="[a-zA-Z0-9\-_]*\/*[a-zA-Z0-9\-_]*"})
    */

    public function printRepoData(Request $request, $path=null)
    {

        $response = new JsonResponse();

        $repoData = $this->apiGateway->getRepoData($path);
 
        $response->setData($repoData);
        $response->setEncodingOptions($response->getEncodingOptions() | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES );

        return $response;

    }

}