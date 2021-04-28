
const express = require ("express"),
funs = require ('../functions'),
router = express.Router();

const {initialElements} = funs;



// this route the homepage

router.get("/",(req,res) => {


    const elements = [...initialElements]

    const meta = funs.meta({
        description: "",
        keywords:"education for all",
    },req);

    res.render("homepage",{
        title: "Open Institute University environment club |  Home",
        meta,
        elements,
        path:funs.pathToTheRoot(req._parsedUrl.path),

    })
});


// this route to the sigup and register page
router.get("/login", (req,res)=>{

    // adding the css for the login page
    const elements = [...initialElements,"assets/css/login.min.css","assets/js/login.js",]

    let title = "Login | register Open University"
    const meta = funs.meta({
        description:"login and regsiter to open university",
        keywords:"education for all",
    },req);

    res.render("login", {
        title,
        meta,
        elements,
        path:funs.pathToTheRoot(req._parsedUrl.path),
    })
    
});




// this route renders the programme page
router.get("/programme", (req,res)=>{

    // adding the css for the login page
    const elements = [...initialElements,"assets/css/login.min.css","assets/js/prog.js","assets/css/prog.min.css",]

    let title = "Programmes | Open University"
    const meta = funs.meta({
        description:"join us open university",
        keywords:"education for all",
    },req);

    res.render("programme", {
        title,
        meta,
        elements,
        path:funs.pathToTheRoot(req._parsedUrl.path),
    })
    
});

// this route renders the programme page
router.get("/programmelist", (req,res)=>{

    // adding the css for the login page
    const elements = [...initialElements,"assets/css/login.min.css","assets/js/prog.js","assets/css/prog.min.css",]

    let title = "Programmes | Open University"
    const meta = funs.meta({
        description:"join us open university",
        keywords:"education for all",
    },req);

    res.render("programmelist", {
        title,
        meta,
        elements,
        path:funs.pathToTheRoot(req._parsedUrl.path),
    })
    
});





module.exports = router;
