window.addEventListener('DOMContentLoaded', () => {
    const search = document.querySelector("#search");
    const results = document.querySelector("#results");

    const presentResults = (matches, empty, longEnough) => {
        while (results.firstChild) {
            results.removeChild(results.firstChild);
        }
        const notice = (text) => {
            const newChild = document.createElement('li');
            newChild.style = 'font-slant: italic';
            newChild.innerHTML = text;
            results.appendChild(newChild);
        }
        if (empty) {
        } else if (!longEnough) {
            notice('Query too short');
        } else if (matches.length == 0) {
            notice('No matches')
        } else {
            matches.forEach(([name, url]) => {
                const newChild = document.createElement('li');
                newChild.innerHTML += `<a href="${url}">${name}</a>`;
                results.appendChild(newChild);
            });
        }
    };

    const update = (searchString) => {
        console.log(searchString);
        const matches = [];
        const empty = searchString.length == 0;
        const longEnough = searchString.length >= 3;
        if (longEnough) {
            const expression = RegExp(searchString, "i");
            searchData.forEach((entry) => {
                if (entry[0].search(expression) != -1) {
                    matches.push(entry);
                }
            });
        }
        console.log(matches);
        presentResults(matches, empty, longEnough);
    }

    search.onchange = (event) => {
        update(search.value);
    };
    search.oninput = (event) => {
        update(search.value);
    }
})
