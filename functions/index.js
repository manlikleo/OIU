/**
 * Get the Translated phrase or word of the passed language
 * @param _ the word to lookup to
 * @param lang the language to look into
 * This helps in translating the page
 */



exports.initialElements = [ "assets/css/style.min.css","//cdn.jsdelivr.net/npm/axios/dist/axios.min.js","../assets/js/main.js"
    /* "assets/js/functions.js","assets/js/nav_.js ,,
       'assets/js/functions.js'" */
    //    "assets/lib/materialize/css/icons.css", "assets/lib/materialize/css/materialize.min.css"
];

exports.meta = (data, req) => {
    // let lang = this.getAppCookies(req)['language'];
    let { title, keywords, description, preview_image, theme_color } = data;

    /* description = description === "" ? this.language("@company_short_description", lang) : description || this.language("@company_short_description", lang);
    preview_image = preview_image === "" ? this.pathToTheRoot(req._parsedUrl.path) + this.language("@company_default_preview_image", lang) : this.pathToTheRoot(req._parsedUrl.path) + preview_image || this.pathToTheRoot(req._parsedUrl.path) + this.language("@company_default_preview_image", lang); */

    let meta = [{
            name: "title",
            content: title,
        },
        {
            name: "keywords",
            content: keywords,
        },
        {
            name: "description",
            content: description,
        }, {
            name: "apple-mobile-web-app-status-bar-style",
            content: `default`,
        },
        {
            name: "theme-color",
            content: theme_color || `#fff`,
        },
        {
            property: "og:type",
            content: "website",
        },
        {
            property: "og:url",
            content: `${req.headers.host}`,
        },
        {
            property: "og:title",
            content: title,
        },
        {
            property: "og:description",
            content: description,
        },
        {
            property: "og:image",
            content: preview_image || '',
        },
        {
            property: "twiter:card",
            content: `summery_large_image`,
        },
        {
            property: "twiter:url",
            content: `${req.headers.host}`,
        },
        {
            property: "twiter:title",
            content: title,
        },
        {
            property: "twiter:description",
            content: description,
        },
        {
            property: "twiter:image",
            content: preview_image || '',
        }
    ];

    return meta;
}





exports.getAppCookies = (req) => {
    // We extract the raw cookies from the request headers
    const rawCookies = req.headers.cookie.split('; ');
    // rawCookies = ['myapp=secretcookie, 'analytics_cookie=beacon;']

    const parsedCookies = {};
    rawCookies.forEach(rawCookie => {
        const parsedCookie = rawCookie.split('=');
        // parsedCookie = ['myapp', 'secretcookie'], ['analytics_cookie', 'beacon']
        parsedCookies[parsedCookie[0]] = parsedCookie[1];
    });
    return parsedCookies;
};
/**
 * Get the real path to the root
 * @param {*} path This a request path [req._parsedUrl.path]
 * This helps to go to statics on front-end with easy.
 * Expample [path = '/this/is/a/pth/df/fdf/dsd/fdf/fdf] = hard to read and replacing it with ../../etc is hard
 * So better path the rootPath to pathToTheRoot so we can get the ../../etc for front-end
 * 
 * Returns String ./ or ../ or [etc]
 */

exports.pathToTheRoot = (path) => {
    let rootPath = path,
        rPath = ['./'];

    if (rootPath.match(/\/\w/ig)) {
        // rPath = [];
        rootPath.match(/\/\w/ig).map(p => rPath.push(".." + p.match(/\//ig)[0]));
    }

    return rPath.join(""); //return the real path [now this is like ../../etc]
};

exports.useLocals = (req, res, next) => {
    // res.locals.logged_in = typeof req.isAuthenticated !== "undefined" ? req.isAuthenticated() : false;
    req.app.set('logged_in', typeof req.isAuthenticated !== "undefined" ? req.isAuthenticated() : false)
    next();

}
