const API_PATH = 'repo/';

export const getReposData = async (basePath, reposPaths, errorHandler) => {
    return await fetch(basePath + API_PATH + reposPaths['firstRepo'] + "/compare/" + reposPaths['secondRepo'], {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }).then(response => {
        if (!response.ok) {
            throw response.status
        } else if (response.redirected) {
            throw Object.create({
                message: 'Server tried to redirect the request.'
            })
        }
        return response;
    })
        .then(response => response.json())
        .then(json => {
            return json
        })
        .catch(error => {
            console.log(error)
            errorHandler(error)
        })
}