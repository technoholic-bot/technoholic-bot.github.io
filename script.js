const NAME = "Salil";
const WELCOME_MESSAGE_TEMPLATE = ["night", "morning", "afternoon", "evening"];

const SHORTCUT_STARTER = 'tab' 

const SHORTCUT_TIMEOUT = 1500;

const MASTER_MAP = [
    {
        "groupName": "Trends",
        "items":[
            {"name": "USA", "shortcutKey": "1", "url": "https://trends.google.com/trends/trendingsearches/daily?geo=US"},
            {"name": "UK", "shortcutKey": "2", "url": "https://trends.google.com/trends/trendingsearches/daily?geo=GB"},
            {"name": "India", "shortcutKey": "3", "url": "https://trends.google.com/trends/trendingsearches/daily?geo=IN"}
        ]
    },
    {
        "groupName": "Read",
        "items":[
            {"name": "Reddit", "shortcutKey": "r", "url": "https://www.reddit.com/r/Android+answers+AskNetsec+AskTechnology+battlestations+BollyBlindsNGossip+bollywood+CasualUK+compsci+cscareerquestions+cscareerquestionsEU+Damnthatsinteresting+explainlikeimfive+geek+glasgow+Goa+GooglePixel+googleplaydeals+IAmA+IllegalLifeProTips+ImmigrationCanada+india+IndiaSpeaks+InternetIsBeautiful+java+LifeProTips+MadeMeSmile+movies+mumbai+netsec+OutOfTheLoop+pics+programming+rasberrypi+raspberry_pi+selfhosted+startpages+tabled+technology+todayilearned"},
            {"name": "Hacker News", "shortcutKey": "h", "url": "https://news.ycombinator.com"},
            {"name": "KickStarter", "shortcutKey": "k", "url": "https://www.kickstarter.com/discover/advanced?sort=most_funded"},
            {"name": "Product Hunt", "shortcutKey": "t", "url": "https://www.producthunt.com"},
            {"name": "Pocket", "shortcutKey": "p", "url": "https://getpocket.com/users/technoholic/feed/all"}
        ]
    },
]

let $container = document.getElementById("content");
let getUrl = {};

let $shortcutDisplayList = document.getElementsByClassName("shortcut");
let listeningForShortcut = false;
let listenerTimeout;

function setupWelcomeMessage(){
    let curHours = new Date().getHours();
    curHours = Math.floor(curHours/6);
    if (curHours == 4) curHours = 3;
    let welcome = "Good " + WELCOME_MESSAGE_TEMPLATE[curHours] + ", " + NAME;
    document.getElementById("welcome-string").innerHTML = welcome;
}

function setupGroups(){
    for (let i = 0; i < MASTER_MAP.length; i++){
        let curGroupData = MASTER_MAP[i];

        let group = document.createElement("div");
        group.className = "group";
        $container.appendChild(group);

        let header = document.createElement("h1");
        header.innerHTML = curGroupData.groupName;
        group.appendChild(header);

        for (let j = 0; j < curGroupData.items.length; j++){
            let curItemData = curGroupData.items[j];

            let pContainer = document.createElement("p");
            group.appendChild(pContainer);

            let link = document.createElement("a");
            link.innerHTML = curItemData.name;
            link.setAttribute("href", curItemData.url);
            pContainer.appendChild(link);

            let shortcutDisplay = document.createElement("span");
            shortcutDisplay.innerHTML = curItemData.shortcutKey;
            shortcutDisplay.className = "shortcut";
            shortcutDisplay.style.animation = "none";
            pContainer.appendChild(shortcutDisplay);

            getUrl[curItemData.shortcutKey] = curItemData.url
        }
    }
}

function shortcutListener(e) {
    let key = e.key.toLowerCase();

    if (listeningForShortcut && getUrl.hasOwnProperty(key)){
        window.location = getUrl[key];
    }

    if (key === SHORTCUT_STARTER) {
        clearTimeout(listenerTimeout);
        listeningForShortcut = true;

        // Animation reset
        for (let i = 0; i < $shortcutDisplayList.length; i++){
            $shortcutDisplayList[i].style.animation = "none";
            setTimeout(function() { $shortcutDisplayList[i].style.animation = ''; }, 10);
        }

        listenerTimeout = setTimeout(function(){ listeningForShortcut = false; }, SHORTCUT_TIMEOUT);
    }
}

function main(){
    setupWelcomeMessage();
    setupGroups();
    document.addEventListener('keyup', shortcutListener, false);
}

main();
