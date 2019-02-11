<?php
namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

use App\Service\ApiGateway;

class CompareRepos
{

    private $apiGateway;
    public function __construct(ApiGateway $apiGateway)
    {
        $this->apiGateway = $apiGateway;
    }
    
    /**
    * @Route("/repo/{firstPath}/compare", requirements={"firstPath"="[a-zA-Z0-9\-_]*\/*[a-zA-Z0-9\-_]*"})
    * @Route("/repo/{firstPath}/compare/{secondPath}", requirements={"firstPath"="[a-zA-Z0-9\-_]*\/*[a-zA-Z0-9\-_]*", "secondPath"="[a-zA-Z0-9\-_]*\/*[a-zA-Z0-9\-_]*"})
    */

    public function printRepoData(Request $request, $firstPath=null, $secondPath=null)
    {

        $response = new JsonResponse();

        $firstRepoData = $this->apiGateway->getRepoData($firstPath);
        //if response contains error message, then return it
        if (isset($firstRepoData['message']))
            $reposFullData = $firstRepoData;
        else {
            $secondRepoData = $this->apiGateway->getRepoData($secondPath);
            //if response contains error message, then return it
            if (isset($secondRepoData['message']))
                $reposFullData = $secondRepoData;
            else {
                //merge data of two repos to single array
                $mergedData = array($firstRepoData, $secondRepoData);
                $reposFullData = $this->addDifferenceData($mergedData, ['forks_count', 'stargazers_count', 'subscribers_count']);
            }
        }

        $response->setData($reposFullData);
        $response->setEncodingOptions($response->getEncodingOptions() | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);

        return $response;

    }

    //if difference between stats exists, display it
    function addDifferenceData($reposData, $toCompare) {
        
        foreach ($toCompare as $node) {
            //if comparing data exists in both repos, then get difference
            if (isset($reposData[0][$node]['value']) && isset($reposData[1][$node]['value'])) {
                $difference = $reposData[0][$node]['value'] - $reposData[1][$node]['value'];
                if ($difference <> 0) {
                    $reposData[0][$node]['difference'] = ($difference > 0) ? abs($difference) : -1 * abs($difference);
                    $reposData[1][$node]['difference'] = ($difference > 0) ? -1 * abs($difference) : abs($difference);
                }
            }
        }

        return $reposData;
        
    }

}