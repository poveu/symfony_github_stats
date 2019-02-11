<?php
namespace App\Service;

use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpFoundation\JsonResponse;

class ApiGateway
{
    public function callAPI($path, $nullIfNotFound = true) {
        $curl = curl_init();

        curl_setopt($curl, CURLOPT_URL, $_ENV["GH_API_URL"].trim($path)."?client_id=".$_ENV["GH_CLIENT_ID"]."&client_secret=".$_ENV["GH_CLIENT_SECRET"]);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false); //testing
        curl_setopt($curl, CURLOPT_HTTPHEADER, array(
            'User-Agent: '.$_ENV["GH_USER_AGENT"],
            'Time-Zone: '.$_ENV["TIMEZONE"]
        ));
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

        $result = curl_exec($curl);

        $httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);

        curl_close($curl);
        
        $result = json_decode($result, true);

        //if API returned 404 and it's handled, then return null instead of throwing an error
        if ($nullIfNotFound && $httpCode == 404)
            return null;

        //throw an error if response is empty or contains error message
        if ($result == "" || isset($result['message'])) {

            //add repo path to an error
            $result['message'] = $result['message'] ?: "Empty response";
            $result['path'] = $path;
            return $result;
        }

        return $result;
    }

    function extractData($inputData, $outputData, $dieIfNoData = true) {
        
        $result = array();

        foreach ($outputData as $node) {
            //if current node is date - reformat it (optional)
            $result[$node]['value'] = ($node == "published_at") ? $this->formatDate($inputData[$node]) : $inputData[$node];
        }

        //throw an error, if response is empty
        if ($dieIfNoData && count($result) < 1) {
            //add repo path to an error
            $result = ['message' => 'Couldn\'t find required data in repos info', 'path' => $path];
        }

        return $result;
    }

    function formatDate($date) {
        if ($date) {
            $newDate = strtotime($date);
            return date($_ENV["DATE_FORMAT"], $newDate);
        } else {
            return "No releases";
        }
    }

    function getRepoData($path) {
        $reposData = ['name', 'forks_count', 'stargazers_count', 'subscribers_count'];
        $releasesData = ['published_at'];

        if(empty($path))
            return ['message' => 'Repo path missing'];

        //fetch raw data from API
        $repoData = $this->callAPI($path);

        if (!$repoData)
            return ['message' => 'Repository with path "'.$path.'" not found'];

        //extract selected data from repos info
        $repoExtractedData = $this->extractData($repoData, $reposData);

        //fetch latest release info
        $repoReleaseData = $this->callAPI($path.'/releases/latest', true);

        //extract selected data from latest release info
        $repoReleaseExtractedData = $this->extractData($repoReleaseData, $releasesData, false);

        //add latest release info to repos info
        $repoExtractedData['latest_release'] = $repoReleaseExtractedData;

        return $repoExtractedData;
    }
}