let pastebinUrl = '/player/src/data.txt';

let episodes = [];
fetch(pastebinUrl, {
        mode: 'no-cors'
    }).then(function(response) {
    response.text()
        .then(text => parseToArray(text))
        .then(data => {
            data.forEach(episode => {
                let episodeObject = getEpisodeObject(episode.replace(/SEZON \d+/, '').replace(/(\r\n|\n|\r)/gm, "") + '.mp4');

                loadEpisode(episodeObject);
                episodes.push(episodeObject);
            })

            episodes.pop();
        })
});

function parseToArray(text) {
    return decodeURIComponent(escape(window.atob(text))).split('.mp4');
}

function getIndex(string) {
    let index = string.match(/\d+/);
    if (index) {
        return index[0];
    }

    return '';
}

function getTitle(string) {
    return string.split('http')[0].replace(/\d+. /, '').replaceAll(/\t/g, '');
}

function getUrl(string) {
    let url = string.match(/http.*mp4/);

    if (url) {
        return url[0];
    }
    return '';
}

function getEpisodeObject(string) {
    return {
        index: getIndex(string),
        title: getTitle(string),
        url: getUrl(string)
    };
}

function loadEpisode(episode) {
    if (episode.url === '') return;
    let episodeContainer = document.createElement('div');
    episodeContainer.setAttribute('url', episode.url);
    episodeContainer.innerHTML = `${episode.index}. ${episode.title}`;

    episodeContainer.onclick = function(event) {
        playUrl(this.getAttribute('url'));
    }

    document.getElementById('episodes-container').append(episodeContainer);
}

function playUrl(url) {
    let videoPlayer = document.getElementById('player');
    videoPlayer.innerHTML = '';
    let source = document.createElement('source');

    source.setAttribute('src', url);
    source.setAttribute('type', 'video/mp4');

    videoPlayer.append(source);
    videoPlayer.load();
    videoPlayer.play();
}

document.getElementById('random-episode').onclick = function() {
    let randomEpisode = episodes[Math.floor(Math.random()*episodes.length)];

    playUrl(randomEpisode.url);
}