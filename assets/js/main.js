
// Global Variables

// mobile menu bar button 
let menubar = document.querySelector('#menubar');
// mobile menu closing button
 let closebar = document.querySelector('#closebar');
// navbar section that contains navlinks
// we are adding and removing the class in the dom utlizing this element
 let section = document.querySelector('#navbarsec');






// dom reloading function
document.addEventListener('DOMContentLoaded', function(){

    // an eventlister attached to the menubar and the closebar to show the mobile nav and hide the section element containing navlinks
    menubar.addEventListener('click',openAndCloseNav);
    closebar.addEventListener('click',openAndCloseNav);


    

    // creating a variable with the partners element created in the views folder 
    // passing the data from the json file that stores our partners pictures 
    // this is useful when our project is getting complex where we have to render assests from our database
    // I will be using axios to render the json file stored in the assests folder

    const partnersTemp = (data) => {

        return `
            <div class="partners__logo">
                <img class="partners__pic" src="${data.Partner__img}" alt="partners logo">
            </div>`;
    };

    axios.get(window.location.origin + '/assets/data/partners.json')
    .then(data => {
        let partnerData = data.data 

        // quick check to know if our data is accurate
        // console.log(partnerData)

        if(partnerData.length){
            // we are checking if the json files in it 

            // we will call the wrapper and create a variable housing the partners data
            const partnerWrapper = document.querySelector('#partnerswrapper');

            // to empty the contiainer because we want only the partners in it
            partnerWrapper.innerHTML = ''

            // looping over the data rendered 
            for (let partner of partnerData){
                // using insertadjacentHtml to insert our datas inside the partnerwrapper element
                partnerWrapper.insertAdjacentHTML("afterbegin",partnersTemp(partner));
            }

        }
    })

    // this checks for error when our data is about to be rendered
    .catch(error =>{
        console.log(error)
    })

    


}); 


 // this function adds and removes the classlist active-nav created in the our style.scss with function  openAndCloseNav
function openAndCloseNav(e){

    if(e.currentTarget === menubar ){
        section.classList.add('active-nav');
    }else{
        section.classList.remove('active-nav');
    }
}





