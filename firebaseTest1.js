import fetch from 'node-fetch';

async function listProjects() {
    const accessToken = getAccessToken();
    const uri = 'https://firebase.googleapis.com/v1beta1/availableProjects';
    const options = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
        },
    };

    try {
        const rawResponse = await fetch(uri, options);
        const resp = await rawResponse.json();
        const projects = resp['projectInfo'];
        console.log('Project total: ' + projects.length);
        console.log('');
        for (let i in projects) {
            const project = projects[i];
            console.log('Project ' + i);
            console.log('ID: ' + project['project']);
            console.log('Display Name: ' + project['displayName']);
            console.log('');
        }
    } catch(err) {
        console.error(err);
    }
}

await listProjects()
